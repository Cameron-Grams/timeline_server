const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');

const { PORT, DATABASE_URL, SECRET, EXPIRATION } = require( '../Config/config' ); 
const router = express.Router();
const jsonParser = bodyParser.json();
const { user } = require( '../models/userModel' );
const requiredFields = require( '../Middleware/requiredFields' );

var passport = require('passport');  
var jwt = require('jsonwebtoken'); 

router.route('/users/login')
    .post( requiredFields( "userEmail", "userPassword" ), requiredFields( "userEmail", "userPassword" ), ( req, res ) => {  

        user.findOne( { 
            email: req.body.userEmail
        } )
        .populate( "userTimelines" )
        .then( ( foundUser ) => {
            foundUser.comparePassword( req.body.userPassword )
            .then( ( isAuthorized ) => {
                if (!isAuthorized) {
                    return res.status(400).json({
                        generalMessage: 'Email or password is incorrect',
                    });
                }
                const tokenPayload = {
                    _id: foundUser._id,
                    email: foundUser.email,
                    userName: foundUser.name,
                };

                const token = jwt.sign( tokenPayload, SECRET, {
                    expiresIn: EXPIRATION,
                });

                return res.json( { 
                    token: `Bearer ${token}`,
                    _id: foundUser._id,
                    name: foundUser.name,
                    timelines: foundUser.userTimelines
                });
            }  )
        })
        .catch( err => res.status(400).json( { generalMessage: 'Email or password is incorrect' } ) );
    });

router.route( '/users/basicInfo' )
    .get( passport.authenticate('jwt', { session: false }), (req, res) => { 
        user.findOne( {
            _id: req.user._id
        } )
        .populate( "userTimelines" )
        .then( user => {
            if ( user ){
                return res.json( { _id: user._id, name: user.name, timelines: user.userTimelines } )
            } else {
                return res.json( { status: "problem retrieving basic info, from usersRouter "} )
            }
        } )
        .catch( err => res.send( err ) ); 
    })

router.route( '/users/register' )
    .post( requiredFields( "userName", "userEmail", "userPassword" ), ( req, res ) => {  
        user.findOne( {
            email: req.body.userEmail 
        }).then( foundUser => { 
            if ( foundUser ){
                return res.status(400).json({ success: false, message: 'That email address already exists.'});
            } else {
                user.create( {
                    name: req.body.userName,   
                    email: req.body.userEmail,
                    password: req.body.userPassword,
                } ).then( ( createdUser ) => { 
                        return res.json( { status: "Success", message: "Created New User" } );
                    } )
                    .catch( err => res.send( { message: "error creating user" } ) )
                } 
            })
            .catch( err => res.send( { message: "error with found user" } ) )
        }
);




module.exports = router;