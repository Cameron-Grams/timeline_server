// const mongoose = require('mongoose');
const express = require('express');
// const bodyParser = require('body-parser');
// var passport = require('passport');  
//var jwt = require('jsonwebtoken'); 
//const { SECRET, PORT, DATBASE_URL } = require( './config/mainConfig.js' );

const router = express.Router();
// const jsonParser = bodyParser.json();
 

//two data models exported models folder
// const { User } = require( './models/user' );

//
//route to register a user and create the initial user db entry; from register-logic.js
router.route('/timeline')
    .get( ( req, res ) => {  
        if( !req.body.name || !req.body.email || !req.body.password ) {
        return res.status(400).json( { success: false, message: 'Please complete the entire form.' } );
        } else {
        User.findOne( {
            email: req.body.email 
        }).then( foundUser => { 
            if ( foundUser ){
                return res.status(400).json({ success: false, message: 'That email address already exists.'});
            } else {
                User.create( {
                    name: req.body.name,   
                    email: req.body.email,
                    password: req.body.password,
                    level: 0
                } ).then( ( createdUser ) => { 
                       res.json( createdUser );
                    } )
                } 
            })
        }
});
   
module.exports = router;