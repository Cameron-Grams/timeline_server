const mongoose = require('mongoose');
const express = require('express');
// const bodyParser = require('body-parser');
// var passport = require('passport');  
//var jwt = require('jsonwebtoken'); 
//const { SECRET, PORT, DATBASE_URL } = require( './config/mainConfig.js' );
const { PORT, DATABASE_URL } = require( '../config' ); 

const router = express.Router();
const jsonParser = bodyParser.json();
const { User } = require( '../models/userModel' );


router.route('/users/login')
    .post( ( req, res ) => {  
        User.findOne( { 
            email: req.body.email
        } )
        .then( user => {
            if ( user.password === req.body.password ){
                return res.json( { ...user, token: "loggedIn" } ); 
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
            if ( req.token === "loggedIn" ){
                return res.json( { userId: user.userId, name: user.name, userTimelines: user.userTimelines } )
            } else {
                return res.json( )
            }
        } )
        .catch( err => res.send( err ) ); 
    })
  
router.route('/users/new-timeline' ) 
    .post( ( req, res ) => {  
        const keys = Object.keys( timelinesIndex ); 
        const newIndex = keys.length + 1;
        const newTimeline = {
            title: req.body.timelineTitle,
            id: newIndex,
            entries: []
        };

        const result = {
            ...timelinesIndex,
            };

        result[ newIndex ] = newTimeline;

        return res.status( 200 ).json( { title: req.body.timelineTitle, id: newIndex } );  
});



module.exports = router;