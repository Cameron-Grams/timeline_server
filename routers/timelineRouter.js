const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const { PORT, DATBASE_URL } = require( '../Config/config' );

const router = express.Router();
const jsonParser = bodyParser.json();

const { timeline } = require( '../models/timelineModel' ); 
const { user } = require( '../models/userModel' );
const { entry } = require( '../models/entryModel' );

var passport = require('passport');  
var jwt = require('jsonwebtoken');
// adds an entry to the timeline specified in params
router.route('/timelines/:timelineId')
    .post( ( req, res ) => { 
        const dateArray = req.body.date.split( '/' );
        const recordDate = new Date( dateArray[ 2 ], dateArray[ 0 ], dateArray[ 1 ] ); 

        entry.create( {
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
            timeline.findOneAndUpdate( { "_id": req.params.timelineId }, 
                { $push: { entries: { $each: [ entry ], $sort: { dateObject: 1 } } }}, { new: true } )
                   
           .then( ( updated ) => {  return res.json( updated ) } )
              
           .catch( err => { return res.json( err ) } ); 
        } )
        .catch( err => res.json( err ) ); 
    })

// finds the requested timeline by id number    
router.route( `/timelines` )
    .post( ( req, res ) => {
        timeline.findOne( {
            _id: req.body.timelineId
        } )
        .populate( "entries" )
        .then( timeline => {
            return res.json( timeline )            
        } )
        .catch( err => res.send( err ) ); 
    });

//creates a new id with the userId associated
router.route( '/timelines/new-timeline/:userId')
    .post( ( req, res ) => {

        timeline.findOne( {
            title: req.body.timelineTitle
        })
        .then( foundTimeline => {
            if ( foundTimeline ){
                return res.status(400).json({ success: false, message: 'That timeline already exists.'});
            } else {
                timeline.create( {
                    title: req.body.timelineTitle,
                    userId: req.params.userId,
                    Entries: [ ]
                })

                .then( createdTimeline => { 
                    console.log( ' timelineRouter, createdTimeline ', createdTimeline ); 
                    user.findByIdAndUpdate( req.params.userId, { $push: { userTimelines: createdTimeline._id } }, { new: true } )
//                    user.findOneAndUpdate( { "_id": req.params.userId }, 
//                        { $push: { userTimelines: { $each: [ createdTimeline._id ] } }}, { new: true } )
                        .then( () => res.json( createdTimeline ) ) 
                } )
               .catch( err => res.status( 400 ).send( err ) );
            }
        })
        .catch( err => res.status( 400 ).send( err ) )
    })
     
module.exports = router;

