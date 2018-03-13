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

    before( () => runServer( PORT, TEST_DATABASE_URL ) );

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

                const sendData = JSON.stringify( newUserOne );

                return chai.request( app )
                    .post( '/api/users/register' )
                    .set( { 'Content-type': 'application/json' } )
                    .send( sendData )
                    .end( function( res ){
                        console.log( 'response to the send of a new user', res ); 
                        expect( res ).to.be.json;
                        expect( res.body ).to.have.keys( "status", "message" );
                        expect( res.body.status ).to.equal( "Success" );
                        done();
                    } )
            })
        })
})
