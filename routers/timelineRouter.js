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
router.route('/timelines/new')
    .post( ( req, res ) => {  
       return res.status( 200 ).json( req.body );  
});


router.route('/timelines/1')
    .get( ( req, res ) => {  
       return res.json( JudoDateEntries );  
});

router.route('/timelines/2')
    .get( ( req, res ) => {  
        return res.json( FinancialDateEntries );  
});

router.route( '/timelines/3' )
    .post( ( req, res ) => {
        console.log( '[ timelineRouter ] results ', req.body );
        return res.status( 200 ).json( req.body ); 
    });
     
module.exports = router;


