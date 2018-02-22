const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');

const { PORT, DATABASE_URL, SECRET, EXPIRATION } = require( '../Config/config' ); 
const router = express.Router();
const jsonParser = bodyParser.json();
const { user } = require( '../models/userModel' );

var passport = require('passport');  
var jwt = require('jsonwebtoken'); 

router.route('/users/login')
    .post( ( req, res ) => {  

        user.findOne( { 
            email: req.body.userEmail
        } )
        .populate( "userTimelines" )
        .then( ( foundUser ) => {
            const isAuthorized = foundUser.comparePassword( req.body.userPassword ); 

            if (!isAuthorized) {
                return res.status(400).json({
                    generalMessage: 'Email or password is incorrect',
                });
            }
            const tokenPayload = {
                _id: foundUser._id,
                email: foundUser.email,
                userName: foundUser.name,
                userTimelines: foundUser.userTimelines,
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
        })
        .catch( err => res.status(400).json( err ) );
    });

router.route( '/users/basicInfo' )
    .post( passport.authenticate('jwt', { session: false }), (req, res) => { 
        console.log( '[ usersRouter ] current req body ', req.body ); 

        user.findOne( {
            userId: req.body.userId
        } )
        .then( user => {
            if ( user ){
                return res.json( { userId: user._id, name: user.name, userTimelines: user.userTimelines } )
            } else {
                return res.json( { status: "problem retrieving basic info, from usersRouter "} )
            }
        } )
        .catch( err => res.send( err ) ); 
    })
 

router.route( '/users/register' )
    .post( ( req, res ) => {  
        console.log( '[ userRouter ] registration with request ', req.body ); 
        if( !req.body.userName || !req.body.userEmail || !req.body.userPassword ) {
        return res.status(400).json( { success: false, message: 'Please complete the entire form.' } );
        } else {
        user.findOne( {
            email: req.body.userEmail 
        }).then( foundUser => { 
            if ( foundUser ){
                console.log( '[ userRouter ] found user ', foundUser ); 
                return res.status(400).json({ success: false, message: 'That email address already exists.'});
            } else {
                user.create( {
                    name: req.body.userName,   
                    email: req.body.userEmail,
                    password: req.body.userPassword,
                } ).then( ( createdUser ) => { 
                        console.log( ' [ usersRouter ] created user ', createdUser );
                        return res.json( { status: "Success", message: "Created New User" } );
                    } )
                    .catch( err => res.send( { message: "error creating user" } ) )
                } 
            })
            .catch( err => res.send( { message: "error with found user" } ) )
        }
});




module.exports = router;