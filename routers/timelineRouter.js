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

router.route('/timelines/:timelineId')
    .post( ( req, res ) => { 

        const dateArray = req.body.date.split( '/' );
        const recordDate = new Date( dateArray[ 2 ], dateArray[ 0 ], dateArray[ 1 ] ); 

        const newEntry = {
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
                    timelineId: 8, 
                    userId: req.params.userId,
                    Entries: [ ]
                })
                .then( createdTimeline => { return res.json( createdTimeline ) } )
                .catch( err => res.status( 400 ).send( err ) );
                User.findOneAndUpdate( {
                    userId: req.params.userId
                })
                .then(
                    { $push: { timelines: { title: req.body.timelineTitle, timelineId: 8 } } }, { new: true } 
                )
            }
        })
        .catch( err => res.status( 400 ).send( err ) )
    })
     
module.exports = router;

