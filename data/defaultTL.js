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
        console.log( '[ timelineRouter ] request ', req.body ); 
        timeline.findOne( {
            title: req.body.timelineTitle
        })
        .then( foundTimeline => {
            if ( foundTimeline ){
                return res.status(400).json({ success: false, message: 'That timeline already exists.'});
            } else {
                const recordDateNow = new Date(); 
                const formatDate = (value) => {
                        return value.getMonth()+1 + "/" + value.getDate() + "/" + value.getFullYear();
                    };
                const todayDateString = formatDate( recordDateNow ); 

                console.log( '[ timelineRouter ] values record date ', recordDateNow, ' and date string ', todayDateString );

                entry.create( {
                    title: "Timeline Started",
                    what: "First Entry",
                    dateObject: new Date(),
                    date: todayDateString,
                    who: '',
                    where: '',
                    content: '',
                    source: ''
                } )
                .then( ( entry ) => {
                    console.log( '[ timelineRouter ] new request ', entry );

                    timeline.create( {
                        title: req.body.timelineTitle,
                        userId: req.params.userId,
                        Entries: [ entry ]
                    })
                    .then( createdTimeline => { 
                        console.log( '[ timelineRouter ] created timeline ', createdTimeline ); 
                        user.findByIdAndUpdate( req.params.userId, { $push: { userTimelines: createdTimeline._id } }, { new: true } )
                            .then( () => res.json( createdTimeline ) ) 
                    } )
                    .catch( err => res.status( 400 ).json( { message: "WTF" } ) );
                } )
                .catch( err => res.status( 400 ).json( { status: "failed", message: "trying to add entry..."  } ) )
            } } )
        .catch( err => res.status( 400 ).json( { message: "outer catch" } ) )
    })
     
module.exports = router;

