const chai = require('chai');
const chaiHttp = require('chai-http');
const should = require('chai').should();
const expect = require( 'chai' ).expect;
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const { user } = require('../models/userModel');

chai.use( chaiHttp );

const { app, runServer, closeServer } = require( '../index' );
const { PORT, TEST_DATABASE_URL, SECRET } = require( '../Config/config' );

describe( "Tests the User Router functionality", () => {
    
    let accessibleUser;

    function tearDownDb() {   
        return new Promise ((resolve, reject) => {     
            console.warn('Deleting users database');     
            mongoose.connection.dropDatabase()       
            .then(result => resolve(result))       
            .catch(err => reject(err));   }); 
        }

    before( () => {
        console.log( 'Beginning User specific tests on port and url', PORT, TEST_DATABASE_URL );
        runServer( PORT, TEST_DATABASE_URL )
    } );


    beforeEach( () => {
        const testUser = {
            name: "HEY MAN!",
            email: "test@here.com",
            password: "readyplayerone"
        };
        
        return user.create( testUser )
            .then( ( tUser ) => { 
                accessibleUser = tUser; 
                console.log( 'test user created: ' ) 
            } )
            .catch( console.log( "Problems...nothing but problems" ) );
    })

    afterEach( () => {
        tearDownDb();
    });



    after( () => {
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
        });

        it( "should return basic information if the user has a token", ( ) => {
            const token = jwt.sign( { _id: accessibleUser._id, email: accessibleUser.email, userName: accessibleUser.name }, SECRET, { expiresIn: 10000 });

            return chai.request( app )
                .get( "/api/users/basicInfo" )
                .set( 'Authorization', `Bearer ${ token }` )
                .then( ( res ) => {
                    expect( res ).to.be.json;
                })
        })
    })
})


//  , name: testUser.name, timelines: testUser.userTimelines