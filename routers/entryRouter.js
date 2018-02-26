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
router.route('/entries/:entryId')
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
                timeline.findOneAndUpdate( { "_id": req.params.timelineId }, 
                    { $push: { entries: { $each: [ entry ], $sort: { dateObject: 1 } } }}, { new: true } )
                    .populate( "entries" )
                    .then( ( updated ) => {  
                        return res.json( updated ) } )
                    .catch( err => { return res.json( err ) } ) 
            } )
            .catch( err => res.json( err ) ) 
        } )
        .catch( err => res.json( err ) ); 
    })
   .put( passport.authenticate('jwt', { session: false }), (req, res) => { 
       console.log( '[ entryROuter ] PUT to update entry with ', req.body );

        entry.updateOne(
            { _id: req.params.timelineId,
            "entries": { $elemMatch: { "_id": { $eq: req.body._id } } } },
            { $set: { "entries.$": { 
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
        .then( entry => {
            console.log( '[ entryRouter ] updated entry ', entry ); 
            return res.json( entry );  
        } )
        .catch( err => res.json( err ) ); 
    } )

    // return auth... 
  .delete( (req, res) => { 
        timeline.update(
            { "entries": req.params.entryId },
            { "$pull": { "entries": req.params.entryId } },
        ).then(() => entry.findByIdAndRemove(req.params.entryId))
        .then(
            () => res.status( 204 ).send()
        )
        .catch(err => res.json(err))
    });





 /*   
router.route( '/entries/update/:timelineId')
   .put( passport.authenticate('jwt', { session: false }), (req, res) => { 
       console.log( '[ entryROuter ] PUT to update entry with ', req.body );

        entry.updateOne(
            { _id: req.params.timelineId,
            "entries": { $elemMatch: { "_id": { $eq: req.body._id } } } },
            { $set: { "entries.$": { 
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
        .then( entry => {
            console.log( '[ entryRouter ] updated entry ', entry ); 
            return res.json( entry );  
        } )
        .catch( err => res.json( err ) ); 
    } );

router.route( '/entries/delete/:timelineId')
   .delete( passport.authenticate('jwt', { session: false }), (req, res) => { 
       console.log( '[ entryRouter ] delete to update entry with ', req.body );

        entry.delete(
            { _id: req.params.entryId }, { } 
        )
        .then(
            timeline.findByIdAndRemove(
                { "entries.$": { $elemMatch: { "_id": req.body._id } } }, { }
            )
            .then( timeline => { return res.json( timeline ) } )
            .catch( err => res.json( err ) )
        )
        .catch( err => res.json( err ) ); 
    } );
*/

module.exports = router;