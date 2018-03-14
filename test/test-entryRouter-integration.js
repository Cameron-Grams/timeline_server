const chai = require('chai');
const chaiHttp = require('chai-http');
const should = require('chai').should();
const expect = require( 'chai' ).expect;
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const { user } = require('../models/userModel');
const { timeline } = require('../models/timelineModel');
const { entry } = require('../models/entryModel');

chai.use( chaiHttp );

const { app, runServer, closeServer } = require( '../index' );
const { PORT, TEST_DATABASE_URL, SECRET } = require( '../Config/config' );

describe( "Tests the Entry Router functionality", () => {
    
    let accessibleUser;
    let accessibleTimelineId; 
    let accessibleEntry;

    function tearDownDb() {   
        return new Promise (( resolve, reject ) => {     
            console.warn( 'Deleting timelines database' );     
            mongoose.connection.dropDatabase()       
            .then( result => resolve( result ) )       
            .catch( err => reject( err ) );   }); 
        }

    before( () => {
        console.log( 'Beginning Timeline specific tests on port and url', PORT, TEST_DATABASE_URL );
        runServer( PORT, TEST_DATABASE_URL )
    } );


    beforeEach( () => {
        const testUserObject = {
            name: "Wake Up!",
            email: "testtest@here.com",
            password: "readyplayertwo"
        };

        const recordDate = Date.now(); 
        const testEntry = {
            title: "something important",
            what: "something cool",
            dateObject: recordDate,
            date: "1/1/2020",
            who: "someone",
            where: "somewhere",
            content: "something",
            source: "someplace"
        }
        
        return user.create( testUserObject )
            .then( ( testUser ) => { 
                console.log( ' are we in test user? ', testUser._id );

                accessibleUser = testUser; 
                return testUser;
            } )
                .then( ( testUser ) => {
                    return timeline.create( {
                        title: "first dummy TL",
                        userId: testUser._id,
                        Entries: [ ]
                    } )
                } )
                    .then( createdTimeline => { 
                        user.findByIdAndUpdate( accessibleUser._id, { $push: { userTimelines: createdTimeline._id } }, { new: true } )
                            .then( () => {
                                accessibleTimelineId = createdTimeline._id; 
                                entry.create( testEntry )
                                .then( ( entry ) => {
                                    timeline.findByIdAndUpdate( { "_id": createdTimeline._id },
                                        { $push: { entries: { $each: [ entry ], $sort: { dateObject: 1 } } }}, { new: true } )
                                        .populate( "entries" )
                                        .then( ( updated ) => {  
                                            console.log( 'WORKING UPDATED IS ', updated );
                                            return updated;
                                        } )
                                }) 
                            } ) 
                            .catch( err => err )
                    } )
                    .catch( err => err )
                .catch( err => err )
            .catch( console.log( "Problems...probably not news" ) );
    })





    afterEach( () => {
        tearDownDb();
    });

    after( () => {
        closeServer( TEST_DATABASE_URL );
    } ); 

    describe( " test for entry creation", () => {
            
        it( 'should create a new timeline for the user', () => {
            const token = jwt.sign( { _id: accessibleUser._id, email: accessibleUser.email, userName: accessibleUser.name }, SECRET, { expiresIn: 10000 });
            console.log( 'in first entry test.... ' );     
        });
    });









})






/*
    describe( "entry creation", () => {
            
        it( 'should create a new timeline for the user', () => {
            const token = jwt.sign( { _id: accessibleUser._id, email: accessibleUser.email, userName: accessibleUser.name }, SECRET, { expiresIn: 10000 });
            return chai.request( app )
                .post( `/api/timelines/${ accessibleUser._id }`)
                .send( { timelineTitle: "This is your new Timeline" } )               
                .set( 'Authorization', `Bearer ${ token }` )
                .then( ( res ) => {
                    expect( res ).to.be.json; 
                })
        });
    });


    
    describe( "entry update", () => {
        it( 'should produce the required timeline by id', () => {
            const token = jwt.sign( { _id: accessibleUser._id, email: accessibleUser.email, userName: accessibleUser.name }, SECRET, { expiresIn: 10000 });
            return chai.request( app )
                .post( '/api/timelines' )
                .send( { timelineId: accessibleTimelineId } )
                .set( 'Authorization', `Bearer ${ token }` )
                .then( ( res ) => {
                    expect( res ).to.be.json; 
                })
        })
    })

    describe( "entry deleted", () => {
        it( 'should produce the required timeline by id', () => {
            const token = jwt.sign( { _id: accessibleUser._id, email: accessibleUser.email, userName: accessibleUser.name }, SECRET, { expiresIn: 10000 });
            return chai.request( app )
                .post( '/api/timelines' )
                .send( { timelineId: accessibleTimelineId } )
                .set( 'Authorization', `Bearer ${ token }` )
                .then( ( res ) => {
                    expect( res ).to.be.json; 
                })
        })
    })


*/



