const bodyParser = require('body-parser');
const express = require('express');

const {PORT, } = require('./config');
const { myData } = require( './modelData' );

const app = express();

app.use(bodyParser.json());

/* Middlewares */
// CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');
    next();
});


app.get( '/users', ( req, res ) => {
    return( res.json( myData.users ) );
})

app.get( '/timelines', ( req, res ) => {
    return( res.json( myData.timelines ) );
})
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