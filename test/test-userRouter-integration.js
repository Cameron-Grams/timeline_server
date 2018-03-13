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
    
    function tearDownDb() {   
        return new Promise ((resolve, reject) => {     
            console.warn('Deleting database');     
            mongoose.connection.dropDatabase()       
            .then(result => resolve(result))       
            .catch(err => reject(err));   }); 
        }

    before( () => {
        console.log( 'Beginning User specific tests on port and url', PORT, TEST_DATABASE_URL );
        runServer( PORT, TEST_DATABASE_URL )
        const testUser = {
            name: "I am tester",
            email: "test@here.com",
            password: "readyplayerone"
        };

        return user.create( testUser )
            .then( ( tUser ) => { console.log( 'test user created: ' ) } )
            .catch( console.log( "Problems...nothing but problems" ) );
    } );

    after( () => {
        tearDownDb();
        closeServer( TEST_DATABASE_URL );
    } ); 



    describe( "User registration", () => {
        it( 'registers a new user', () => {
                const newUserOne = {
                    userName: "new User One",
                    userEmail: "nu1@here.com",
                    userPassword: "colddayinmarch"
                };

                return chai.request( app )
                    .post( '/api/users/register' )
                    .send( newUserOne )
                    .then( function( res ){
                        expect( res ).to.be.json;
                        expect( res.body ).to.have.keys( "status", "message" );
                        expect( res.body.status ).to.equal( "Success" );
                    } )
            })
        });
    
    describe( "Manages a known user", () => {


        it( "logs in a user with proper credentials", () => {
            const userRequest = {
                userEmail: "test@here.com",
                userPassword: "readyplayerone"
            };

            return chai.request( app )
                .post( '/api/users/login' )
                .send( userRequest )
                .then( function( res ){
                    expect( res ).to.be.json;
                })
        })
    })
})
