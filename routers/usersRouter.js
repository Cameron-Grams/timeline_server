const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
// var passport = require('passport');  
//var jwt = require('jsonwebtoken'); 
const { PORT, DATABASE_URL } = require( '../config' ); 

const router = express.Router();
const jsonParser = bodyParser.json();
const { User } = require( '../models/userModel' );


router.route('/users/login')
    .post( ( req, res ) => {  
        User.findOne( { 
            email: req.body.userEmail
        } )
        .then( user => {
            if ( user.password === req.body.userPassword ){
                user.token = "loggedIn"; 
                return res.json( user ); 
            } else {
                return res.status( 400 ).json( { status: "bad password" } ); 
            }
        } )
        .catch( err => res.send( err ) );  
    });

router.route( '/users/basicInfo' )
    .post( ( req, res ) => {

        User.findOne( {
            userId: req.body.userId
        } )
        .then( user => {
            if ( req.body.token ){
                return res.json( { userId: user.userId, name: user.name, userTimelines: user.userTimelines } )
            } else {
                return res.json( { status: "problem retrieving basic info, from usersRouter "} )
            }
        } )
        .catch( err => res.send( err ) ); 
    })
 

// this will change with the bcrypt
router.route( '/users/register' )
    .post( ( req, res ) => {  
        console.log( '[ userRouter ] registration with request ', req.body ); 
        if( !req.body.userName || !req.body.userEmail || !req.body.userPassword ) {
        return res.status(400).json( { success: false, message: 'Please complete the entire form.' } );
        } else {
        User.findOne( {
            email: req.body.userEmail 
        }).then( foundUser => { 
            if ( foundUser ){
                console.log( '[ userRouter ] found user ', foundUser ); 
                return res.status(400).json({ success: false, message: 'That email address already exists.'});
            } else {
                User.create( {
                    name: req.body.userName,   
                    userId: 8, 
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