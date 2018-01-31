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

const auth1 = ( userReqBody ) => {
    if ( userReqBody.password === user1.password && userReqBody.email === user1.email ){
        return user1;
    }
    return false; 
}

const auth1 = ( userReqBody ) => {
    if ( userReqBody.password === user2.password && userReqBody.email === user2.email ){
        return user2;
    }
    return false; 
}

router.route('/users/login')
    .post( ( req, res ) => {  
        if ( auth1( req.body ) ){
            return res.json( {
                user1
            } ); 
        }; 
        if ( auth2( req.body ) ){
            return res.json( user2 ); 
        }; 
        return false; 
    })
    .catch( ( res ) => { 
        return res.status( 400 ) } 
    );
   
module.exports = router;