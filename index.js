const bodyParser = require('body-parser');
const express = require('express');

const {PORT, } = require('./config');
const timelines = require( './data/timelines' );
const users = require( './data/users' );

const app = express();

app.use(bodyParser.json());
  
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.get( '/users', ( req, res ) => res.json( users ) );

app.get( '/timelines', ( req, res ) => res.json( timelines ) );

let server;

function runServer( port=PORT ) {

    return new Promise( ( resolve, reject ) => {
        server = app.listen( port, () => {
          console.log( `Server on ${ port } from config` );
          resolve();
        })
        .on( 'error', err => {
          reject( err );
        });
      });
};

function closeServer() {
        return new Promise( ( resolve, reject ) => {
        console.log( 'Closing server' );
        server.close(err => {
            if ( err ) {
                return reject( err );
            }
            resolve();
        });
    });
};
  




if ( require.main === module ) {
    runServer().catch( err => console.error( err ));
  };
  
  module.exports = { app, runServer, closeServer };
