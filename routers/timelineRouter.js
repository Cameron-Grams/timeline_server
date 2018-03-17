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
const requiredFields = require( '../Middleware/requiredFields' );

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
    .post( passport.authenticate('jwt', { session: false }), requiredFields( "timelineTitle"), (req, res) => { 
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
    } )


router.route( '/timelines/:userId')
    .delete( passport.authenticate('jwt', { session: false }), requiredFields( "timelineId"), (req, res) => { 
        timeline.deleteOne( {
            _id: req.body.timelineId
        })
        .then( ( ) => { 
            user.findByIdAndUpdate( { _id: req.params.userId }, { $pull: { userTimelines: req.body.timelineId } }, { new: true } )
                .then( ( user ) => {
                    console.log( '[timelineRouter ] user found: ', user );  
                    res.json( {
                        _id: user._id,
                        name: user.name,
                        timelines: user.userTimelines
                    });
                } ); 
        } )
        .catch( err => res.status( 400 ).send( err ) );
} )
 
     
module.exports = router;

