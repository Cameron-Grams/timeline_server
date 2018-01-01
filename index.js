const bodyParser = require('body-parser');
const express = require('express');

const {PORT, } = require('./config');
const { myData } = require( './modelData' );

const app = express();

app.use(bodyParser.json());

app.get( '/myData', ( req, res ) => {
    return( res.json( myData ) );
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