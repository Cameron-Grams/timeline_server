// const mongoose = require('mongoose');
const express = require('express');
// const bodyParser = require('body-parser');
// var passport = require('passport');  
//var jwt = require('jsonwebtoken'); 
//const { SECRET, PORT, DATBASE_URL } = require( './config/mainConfig.js' );

const router = express.Router();
// const jsonParser = bodyParser.json();
 
const timeline = require( '../data/timelines' ); 

//two data models exported models folder
// const { User } = require( './models/user' );

//
//route to register a user and create the initial user db entry; from register-logic.js
router.route('/timelines')
    .get( ( req, res ) => {  
       return res.json( timeline );  
});
   
module.exports = router;