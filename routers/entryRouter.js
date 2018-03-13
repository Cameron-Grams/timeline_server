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
const requiredFields = require( '../Middleware/requiredFields' );

const requiredEntryFields = [ "title", "what", "date", "who", "where", "content", "source" ];  

// adds entries to the timeline by the timeline Id
router.route('/entries/:entryId')
    .post( passport.authenticate('jwt', { session: false }), requiredFields( ...requiredEntryFields ), (req, res) => { 
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
        .then( ( entry ) => {
            timeline.findByIdAndUpdate( { "_id": req.body.timelineId },
                { $push: { entries: { $each: [ entry ], $sort: { dateObject: 1 } } }}, { new: true } )
                .populate( "entries" )
                .then( ( updated ) => {  
                    return res.json( updated ) } )
                .catch( err => { return res.json( err ) } )
        } )
        .catch( err => res.json( err ) ) 
    } )

// updates a single entry based on the PUT call with values
   .put( passport.authenticate('jwt', { session: false }), requiredFields( ...requiredEntryFields ), (req, res) => { 

        entry.updateOne(
            { _id: req.params.entryId },
                { $set: { 
                    title: req.body.title,
                    what: req.body.what,
                    dateObject: req.body.dateObject,
                    date: req.body.date,
                    who: req.body.who,
                    where: req.body.where,
                    content: req.body.content,
                    source: req.body.source
                    }
                }
        )
        .then( ( item ) => {
           res.json( { _id: req.params.entryId, ...req.body } );  
        } )
        .catch( err => res.json( err ) ); 
    } )

   .delete( passport.authenticate('jwt', { session: false }), (req, res) => { 
        timeline.update(
            { "entries": req.params.entryId },
            { "$pull": { "entries": req.params.entryId } },
        ).then(() => entry.findByIdAndRemove(req.params.entryId))
        .then( 
            res.status( 200 ).json( { _id: req.params.entryId } )
        )
        .catch(err => res.json(err))
    });

module.exports = router;
