// const mongoose = require('mongoose');
const express = require('express');
// const bodyParser = require('body-parser');
// var passport = require('passport');  
//var jwt = require('jsonwebtoken'); 
//const { SECRET, PORT, DATBASE_URL } = require( './config/mainConfig.js' );

const router = express.Router();
// const jsonParser = bodyParser.json();
 
const user1 = require( '../data/user1' ); 

//two data models exported models folder
// const { User } = require( './models/user' );

//
//route to register a user and create the initial user db entry; from register-logic.js
router.route('/users/register')
    .post( ( req, res ) => {  
        console.log( '[ userRoter, register, 20 ] on register ', req.body ); 
        return res.status(200).json( req.body ); 
});




router.route('/users/login')
    .post( ( req, res ) => {  
        if ( req.body.userPassword === user1.password ){
            return res.json( user1 ); 
        }; 
});
   
module.exports = router;