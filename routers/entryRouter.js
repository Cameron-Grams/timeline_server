const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
 var passport = require('passport');  
var jwt = require('jsonwebtoken'); 
const { PORT, DATABASE_URL } = require( '../Config/config' ); 
const router = express.Router();
const jsonParser = bodyParser.json();
const { entry } = require( '../models/entryModel' );
const { timeline } = require( '../models/timelineModel' ); 

// adds entries to the timeline by the timeline Id
router.route('/entries/:timelineId')
    .post( passport.authenticate('jwt', { session: false }), (req, res) => { 
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
            timeline.findOne( {
                "_id": req.params.timelineId
            })
            .populate( "entries" )        
            .then( foundTimeline => {   
                console.log( '[ entryROuter ] found TL ', foundTimeline ); 
                timeline.findOneAndUpdate( { "_id": req.params.timelineId }, 
                    { $push: { entries: { $each: [ entry ], $sort: { dateObject: 1 } } }}, { new: true } )
                    .then( ( updated ) => {  
                        console.log( '[ entryRouter ] updated item ', updated ); 
                        return res.json( updated ) } )
                    .catch( err => { return res.json( err ) } ) 
            } )
            .catch( err => res.json( err ) ) 
        } )
        .catch( err => res.json( err ) ); 
    })
    
   .put( passport.authenticate('jwt', { session: false }), (req, res) => { 
        entry.updateOne(
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
        .then( entry => res.json( entry ) )
    } );


module.exports = router;