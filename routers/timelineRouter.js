
// const mongoose = require('mongoose');
const express = require('express');
// const bodyParser = require('body-parser');
// var passport = require('passport');  
//var jwt = require('jsonwebtoken'); 
//const { SECRET, PORT, DATBASE_URL } = require( './config/mainConfig.js' );

const router = express.Router();
// const jsonParser = bodyParser.json();

const { order } = require( '../Helpers/order' );
 
const timelines = require( '../data/older/timelines' );
const timelineIndex = require( '../Helpers/timelineIndex' ); 

router.route('/timelines/new-entry/:timelineId')
    .post( ( req, res ) => {  
        console.log( ' hit new entry ' ); 
       const neededIndexParam = req.params; 
       const neededNumber = neededIndexParam.timelineId;
       const workingTimeline = timelineIndex[ neededNumber ]; 
       const returnTimeline = order.orderEntryInput( workingTimeline, req.body ); 
       return res.status( 200 ).json( returnTimeline );  
});


router.route('/timelines/:timelineId/:entryId')
    .patch( ( req, res ) => {  
        const { timelineId, entryId } = req.params;
        const neededNumber = neededIndexParam.timelineId;
        const workingTimeline = timelineIndex[ neededNumber ]; 
        const workingArray = workingTimeline.entries;

        let targetIndex;
        for ( let i = 0; i < workingArray.length; i++ ){
            if ( workingArray[ i ].entryId === req.body.entryId ){
                workingArray[ i ].title = req.body.title,
                workingArray[ i ].what = req.body.what,
                workingArray[ i ].date = req.body.date,
                workingArray[ i ].dateObject = req.body.dateObject,
                workingArray[ i ].who = req.body.who,
                workingArray[ i ].where = req.body.where,
                workingArray[ i ].content = req.body.content,
                workingArray[ i ].source = req.body.source
            }
        }

        const returnTimeline = order.orderEntryInput( workingTimeline, req.body ); 
        console.log( '[ timelineRouter ] updated TL: ', returnTimeline ); 
        return res.status( 200 ).json( returnTimeline );  
});



router.route( `/timelines` )
    .post( ( req, res ) => {
        const requestTimeline = timelineIndex[ req.body.index ]; 
        const result = order.orderTimelines( requestTimeline ); 
        return res.status( 200 ).json( result ); 
    });
     
module.exports = router;


