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
    .post( ( req, res ) => {  
        Entry.findOne( { 
            _id: req.body.entryId
        } )
        .then( entry => {
            return res.json( entry ) 
        } )
        .catch( err => res.send( err ) );  
    });




module.exports = router;