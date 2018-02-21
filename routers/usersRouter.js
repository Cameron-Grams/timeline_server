const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');

const { PORT, DATABASE_URL, SECRET } = require( '../Config/config' ); 
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
        .then( 
         user => {
            if ( !user ){
                res.status( 400 ).send( { success: false, message: 'Authentication failed. User not found.' } );
            } else {
                user.comparePassword( req.body.password, ( err, isMatch ) => {
                    if ( isMatch && !err ){
                        var token = jwt.sign( 
                            { id: user._id, userName: user.name }, 
                            SECRET, {
                            expiresIn: 600000000
                        } );
                        res.json( { success: true, token: 'Bearer ' + token, _id: user._id } );
                    } else {
                        res.status( 400 ).send( { success: false, message: 'Authentication failed. User not found.' } );
                    }
                })
            }
        } ).catch( err => res.send( err ) );
  
    });

router.route( '/users/basicInfo' )
    .post( passport.authenticate('jwt', { session: false }), (req, res) => { 
        user.findOne( {
            userId: req.body.userId
        } )
        .then( user => {
            if ( req.body.token ){
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
                        return res.json( createdUser );
                    } )
                    .catch( err => res.send( { message: "error creating user" } ) )
                } 
            })
            .catch( err => res.send( { message: "error with found user" } ) )
        }
});




module.exports = router;