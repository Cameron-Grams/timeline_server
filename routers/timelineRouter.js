const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
// var passport = require('passport');  
//var jwt = require('jsonwebtoken'); 
const { PORT, DATBASE_URL } = require( '../config' );

const router = express.Router();
const jsonParser = bodyParser.json();

const { order } = require( '../Helpers/order' );
const { Timeline } = require( '../models/timelineModel' ); 
 
const timelines = require( '../data/older/timelines' );
const timelineIndex = require( '../Helpers/timelineIndex' ); 

router.route('/timelines/new-entry/:timelineId')
    .post( ( req, res ) => { 
        Timeline.findOne( {
            timelineId: req.params.timelineId
        })
        .then( timeline => {
            const oldTimeline = timeline;

            const dateArray = req.body.date.split( '/' );
            const recordDate = new Date( dateArray[ 2 ], dateArray[ 0 ], dateArray[ 1 ] ); 

            const numberEntries = Object.keys( timeline.Entries ).length; 

            const newEntry = {
                entryId: numberEntries + 1,
                what: req.body.what,
                dateObject: recordDate,
                date: req.body.date,
                who: req.body.who,
                where: req.body.where,
                content: req.body.content,
                source: req.body.source
            }
            console.log( '[ timelineRouter ] added entry ', newEntry ); 
            Timeline.findOneAndUpdate( {
                timelineId: req.body.timelineId
            })
            .then( changeTimeline => {
                console.log( '[ timelineRouter ] second timeline ', changeTimeline.title ); 
                const returnValue = {
                    ...changeTimeline,
                    Entries: [ ...Entries, newEntry ]
                }
                return res.json( returnValue ); 
            } )
            .catch( err => res.status( 500 ).send( err, { status: "problem altering timeline object " } ) )
        return res.json( timeline );
        } )
        .catch( err => res.status( 500 ).send( err, { status: "problem adding entry " } ) ); 
});


router.route( `/timelines` )
    .post( ( req, res ) => {
        console.log( '[ timelineRouter ] received ', req.body );
        Timeline.findOne( {
            timelineId: req.body.timelineId
        } )
        .then( timeline => {
            return res.json( timeline );
        })
        .catch( err => res.send( err, req.body ) ); 
    });
     
module.exports = router;

