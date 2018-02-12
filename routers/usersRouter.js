
// const mongoose = require('mongoose');
const express = require('express');
// const bodyParser = require('body-parser');
// var passport = require('passport');  
//var jwt = require('jsonwebtoken'); 
//const { SECRET, PORT, DATBASE_URL } = require( './config/mainConfig.js' );

const router = express.Router();
// const jsonParser = bodyParser.json();
 
const user1 = require( '../data/user1' ); 
const user2 = require( '../data/user2' ); 
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
    if ( userReqBody.userPassword === user1.password && userReqBody.userEmail === user1.email ){
        return user1;
    }
    return false; 
}

const auth2 = ( userReqBody ) => {
    if ( userReqBody.userPassword === user2.password && userReqBody.userEmail === user2.email ){
        return user2;
    }
    return false; 
}

router.route('/users/login')
    .post( ( req, res ) => {  
        if ( auth1( req.body ) ){
           return res.json( {
                ...user1
            } ); 
        }; 
        if ( auth2( req.body ) ){
            return res.json( user2 ); 
        }; 
        return false; 
    });


const auth3 = ( userReqBody ) => {
    if ( userReqBody.token === user1.token ){
        return user1;
    }
    return false; 
}

const auth4 = ( userReqBody ) => {
    if ( userReqBody.token === user2.token ){
        return user2;
    }
    return false; 
}
router.route( '/users/basicInfo' )
    .post( ( req, res ) => {
        if ( auth3( req.body ) ){
           return res.json( {
                ...user1
            } ); 
        }; 
        if ( auth4( req.body ) ){
            return res.json( user2 ); 
        }; 
        return false; 

    })
  


module.exports = router;