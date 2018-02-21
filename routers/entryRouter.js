const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
// var passport = require('passport');  
//var jwt = require('jsonwebtoken'); 
const { PORT, DATABASE_URL } = require( '../config' ); 
const router = express.Router();
const jsonParser = bodyParser.json();
const { Entry } = require( '../models/entryModel' );


router.route('/entries')

    .put( ( req, res ) => {
        console.log( '[ timelineRouter ] updating entry, received: ', req.body ); 
        Entry.updateOne(
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


module.exports = router;