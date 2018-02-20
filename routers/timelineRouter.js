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
const { User } = require( '../models/userModel' );
const { Entry } = require( '../models/entryModel' );

// adds an entry to the timeline specified in params
router.route('/timelines/:timelineId')
    .post( ( req, res ) => { 
        const dateArray = req.body.date.split( '/' );
        const recordDate = new Date( dateArray[ 2 ], dateArray[ 0 ], dateArray[ 1 ] ); 

        Entry.create( {
                title: req.body.title,
                what: req.body.what,
                dateObject: recordDate,
                date: req.body.date,
                who: req.body.who,
                where: req.body.where,
                content: req.body.content,
                source: req.body.source
        } )
        .then( entry => {
            Timeline.findOneAndUpdate( { "_id": req.params.timelineId }, 
                { $push: { Entries: { $each: [ entry ], $sort: { dateObject: 1 } } }}, { new: true } )
            .then( 
                updated => { return res.json( updated ) }
            )
            .catch( err => { return res.json( err ) } ); 
        } )
        .catch( err => res.json( err ) ); 
    })
    .put( ( req, res ) => {
        console.log( '[ timelineRouter ] updating entry, received: ', req.body ); 
        Timeline.updateOne(
            { _id: req.params.timelineId,
            "Entries": { $elemMatch: { "entryId": { $eq: req.body.entryId } } } },
            { $set: { "Entries.$": { 
                title: req.body.title,
                what: req.body.what,
                dateObject: req.body.dateObject,
                date: req.body.date,
                who: req.body.who,
                where: req.body.where,
                content: req.body.content,
                source: req.body.source
             } } }
        )
        .then( timeline => res.json( timeline ) )
    } );
        
    




// finds the requested timeline by id number    
router.route( `/timelines` )
    .post( ( req, res ) => {
        Timeline.findOne( {
            _id: req.body.timelineId
        } )
        .then( timeline => {
            return res.json( timeline )            
        } )
        .catch( err => res.send( err ) ); 
    });

//creates a new id with the userId associated
router.route( '/timelines/new-timeline/:userId')
    .post( ( req, res ) => {

        Timeline.findOne( {
            title: req.body.timelineTitle
        })
        .then( foundTimeline => {
            if ( foundTimeline ){
                return res.status(400).json({ success: false, message: 'That timeline already exists.'});
            } else {
                Timeline.create( {
                    title: req.body.timelineTitle,
                    userId: req.params.userId,
                    Entries: [ ]
                })
                .then( createdTimeline => { 
                    console.log( '[ timelineRouter ] attempting to add TL to user ', createdTimeline ); 

                    User.findOneAndUpdate( { "_id": req.params.userId }, 
                        { $push: { userTimelines: { $each: [ createdTimeline ], $sort: { dateObject: 1 } } }}, { new: true } );
                    
                    return res.json( createdTimeline );
                } )
               .catch( err => res.status( 400 ).send( err ) );
            }
        })
        .catch( err => res.status( 400 ).send( err ) )
    })
     
module.exports = router;

