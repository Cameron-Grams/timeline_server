const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
// var passport = require('passport');  
//var jwt = require('jsonwebtoken'); 
const { PORT, DATBASE_URL } = require( '../config' );

const uuidv4 = require( 'uuid/v4' ); 

const router = express.Router();
const jsonParser = bodyParser.json();

const { order } = require( '../Helpers/order' );
const { Timeline } = require( '../models/timelineModel' ); 
const { User } = require( '../models/userModel' );

// adds an entry to the timeline specified in params
router.route('/timelines/:timelineId')
    .post( ( req, res ) => { 

        const dateArray = req.body.date.split( '/' );
        const recordDate = new Date( dateArray[ 2 ], dateArray[ 0 ], dateArray[ 1 ] ); 

        const newEntry = {
                entryId: uuidv4(), 
                what: req.body.what,
                dateObject: recordDate,
                date: req.body.date,
                who: req.body.who,
                where: req.body.where,
                content: req.body.content,
                source: req.body.source
            }
        Timeline.findOneAndUpdate( { "timelineId": req.params.timelineId }, 
        { $push: { Entries: { $each: [newEntry], $sort: { dateObject: 1 } } }}, { new: true } )
        .then( 
            updated => res.json( updated ) 
        )
});

// updates an entry on the timeline from params and data in the request
router.route( '/timelines/update-entry/:timelineId' )
    .post( ( req, res ) => {
        Timeline.updateOne(
            { _id: req.params.timelineId,
            "Entries": { $elemMatch: { "entryId": { $eq: req.body.entryId } } } },
            { $set: { "Entries.$": { ...req.body } } }
        )
        .then( timeline => res.json( timeline ) )
    } )




// finds the requested timeline by id number    
router.route( `/timelines` )
    .post( ( req, res ) => {
        Timeline.findOne( {
            timelineId: req.body.timelineId
        } )
        .then( timeline => {
            return res.json( timeline );
        })
        .catch( err => res.send( err, req.body ) ); 
    });

//creates a new id with the userId associated
router.route( '/timelines/new-timeline/:userId')
    .post( ( req, res ) => {

        let transportTimelineId; 

        Timeline.findOne( {
            title: req.body.timelineTitle
        })
        .then( foundTimeline => {
            if ( foundTimeline ){
                return res.status(400).json({ success: false, message: 'That timeline already exists.'});
            } else {
                Timeline.create( {
                    title: req.body.timelineTitle,
                    timelineId: uuidv4(),
                    userId: req.params.userId,
                    Entries: [ ]
                })
                .then( createdTimeline => { 
                    console.log( '[ timelineRouter ] new timeline created ', createdTimeline ); 
                    transportTimelineId = createdTimeline.timelineId;
                    return res.json( createdTimeline ) } )
                .catch( err => res.status( 400 ).send( err ) );
                User.findOneAndUpdate( {
                    userId: req.params.userId
                })
                .then(
                    { $push: { userTimelines: { title: req.body.timelineTitle, timelineId: transportTimelineId } } }, { new: true } 
                )
            }
        })
        .catch( err => res.status( 400 ).send( err ) )
    })
     
module.exports = router;

