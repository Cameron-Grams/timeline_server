// const mongoose = require('mongoose');
const express = require('express');
// const bodyParser = require('body-parser');
// var passport = require('passport');  
//var jwt = require('jsonwebtoken'); 
//const { SECRET, PORT, DATBASE_URL } = require( './config/mainConfig.js' );

const router = express.Router();
// const jsonParser = bodyParser.json();
 
const timelines = require( '../data/older/timelines' );
const { FinancialDateEntries } = require( '../data/financeTimeline' ); 
const { JudoDateEntries } = require( '../data/judoTimeline' ); 

//two data models exported models folder
// const { User } = require( './models/user' );

//route to register a user and create the initial user db entry; from register-logic.js
/*
router.route( '/timelines' )
    .get( ( req, res ) => {
        return res.json( timelines );
    } );
*/
router.route('/timelines/2')
    .get( ( req, res ) => {  
        console.log( ' in response ' );
        return res.json( FinancialDateEntries );  
});

router.route('/timelines/1')
    .get( ( req, res ) => {  
       return res.json( JudoDateEntries );  
});
     
module.exports = router;


