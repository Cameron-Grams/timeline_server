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

// finds the requested timeline by id number    
router.route( `/timelines` )
    .post( passport.authenticate('jwt', { session: false }), (req, res) => { 
        timeline.findOne( {
            _id: req.body.timelineId
        } )
        .populate( "entries" )
        .then( timeline => {
// wouldn't have thought this would work...
            const allEntries = timeline.entries;
            allEntries.sort( ( first, second ) => {
                return first.dateObject - second.dateObject;
            })
            return res.json( timeline )            
        } )
        .catch( err => res.send( err ) ); 
    });
//creates a new id with the userId associated
router.route( '/timelines/:userId')
    .post( passport.authenticate('jwt', { session: false }), (req, res) => { 
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
                    user.findByIdAndUpdate( req.params.userId, { $push: { userTimelines: createdTimeline._id } }, { new: true } )
                        .then( () => res.json( createdTimeline ) ) 
                } )
               .catch( err => res.status( 400 ).send( err ) );
            }
        })
        .catch( err => res.status( 400 ).send( err ) )
    })
     
module.exports = router;

