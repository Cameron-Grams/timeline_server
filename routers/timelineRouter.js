
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
const { Timeline3 } = require( '../data/timeline3' ); 

const timelineIndex = {
    1: JudoDateEntries,
    2: FinancialDateEntries,
    3: Timeline3
}

router.route('/timelines/new-timeline' ) 
    .post( ( req, res ) => {  
        console.log( '[ timelineRouter ] new timeline: ', req.body ); 
       return res.status( 200 ).json( req.body );  
});


router.route('/timelines/new-entry/:timelineId')
    .post( ( req, res ) => {  
       const neededIndexParam = req.params; 
       const neededNumber = neededIndexParam.timelineId;
       const workingTimeline = timelineIndex[ neededNumber ]; 
       workingTimeline.entries.push( req.body ); 
       console.log( '[ timelineRouter ] output timeline ', workingTimeline );
       return res.status( 200 ).json( req.body );  
});



router.route( `/timelines` )
    .post( ( req, res ) => {
        const result = timelineIndex[ req.body.index ]; 
        return res.status( 200 ).json( result ); 
    });
     
module.exports = router;


