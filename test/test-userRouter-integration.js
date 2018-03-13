const chai = require('chai');
const chaiHttp = require('chai-http');
const should = require('chai').should();
const expect = require( 'chai' ).expect;
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const { user } = require('../models/userModel');

chai.use( chaiHttp );

const { app, runServer, closeServer } = require( '../index' );
const { PORT, TEST_DATABASE_URL, TEST_SECRET } = require( '../Config/config' );

describe( "Tests the User Router functionality", () => {
    const setUp = "So set up...";

    function tearDownDb() {   
        return new Promise ((resolve, reject) => {     
        console.warn('Deleting database');     
        mongoose.connection.dropDatabase()       
        .then(result => resolve(result))       
        .catch(err => reject(err));   }); }
    console.log( 'port and url', PORT, TEST_DATABASE_URL );

    before( () => runServer( PORT, TEST_DATABASE_URL ) );
    
    afterEach( () => tearDownDb() )    
    
    
    after( () => closeServer( TEST_DATABASE_URL ) ); 

    it( 'recognizes testing...', () => {
        console.log( "in userRouter integration: ", setUp ); 
    })

    describe( "User registration", () => {
        it( 'registers a new user', () => {
                const newUserOne = {
                    userName: "new User One",
                    userEmail: "nu1@here.com",
                    userPassword: "colddayinmarch"
                };

                console.log( 'before' );

                return chai.request( app )
                    .post( '/api/users/register' )
                    .send( newUserOne )
                    .then( function( res ){
                        expect( res ).to.be.json;
                        expect( res.body ).to.have.keys( "status", "message" );
                        expect( res.body.status ).to.equal( "Success" );
                    } )
                console.log( 'after' ); 
            })
        })
})
