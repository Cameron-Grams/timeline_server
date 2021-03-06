const mongoose = require( 'mongoose' );
const bodyParser = require('body-parser');
const express = require('express');

mongoose.Promise = global.Promise;

const {PORT, DATABASE_URL } = require('./Config/config');
const timelineRouter = require( './routers/timelineRouter' );
const usersRouter = require( './routers/usersRouter' ); 
const entryRouter = require( './routers/entryRouter' ); 
const app = express();

app.use(bodyParser.json());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,PATCH,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');
    next();
});

var passport = require('passport');  
var jwt = require('jsonwebtoken');  

app.use( passport.initialize() );
const { basicStrategy: Strategy } = require( './Config/passportStrategy' );
Strategy( passport );

app.use( '/api', usersRouter );
app.use( '/api', timelineRouter );
app.use( '/api', entryRouter ); 

let server;

function runServer( port=PORT, database=DATABASE_URL ) {

    return new Promise( ( resolve, reject ) => {
        mongoose.connect( database, err  => {
            if ( err ){
                return reject( err ); 
            }
            server = app.listen( port, () => {
            console.log( `Server on ${ port } from config` );
            resolve();
            })
            .on( 'error', err => {
            mongoose.disconnect();
            reject( err );
            });
        } )
    } );
};

function closeServer() {
    return mongoose.disconnect().then( () => {     
        return new Promise( ( resolve, reject ) => {
            console.log( 'Closing server' );
            server.close(err => {
                if ( err ) {
                    return reject( err );
                }
                resolve();
            });
        });
    } )
};

if ( require.main === module ) {
    runServer().catch( err => console.error( err ));
  };
  
  module.exports = { app, runServer, closeServer };
