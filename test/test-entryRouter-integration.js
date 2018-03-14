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
        
        user.create( testUserObject )
        .then( newUser => {
            accessibleUser = newUser;
        } )

        return timeline.create( {
                title: "first dummy TL",
                Entries: [ ]
            } )
            .then( createdTimeline => { 
                accessibleTimelineId = createdTimeline._id; 
                return entry.create( testEntry )
                    .then( ( entry ) => {
                        accessibleEntry = entry;
                        timeline.findByIdAndUpdate( { "_id": createdTimeline._id },
                        { $push: { entries: { $each: [ entry ], $sort: { dateObject: 1 } } }}, { new: true } )
                        .populate( "entries" )
                        .then( updatedTimeline => {
                            return updatedTimeline;
                        })
                    } )
                } )
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
            const newRecordDate = Date.now();
            const newTestEntry = {
                timelineId: accessibleTimelineId,
                title: "new something important",
                what: "new something cool",
                dateObject: newRecordDate,
                date: "1/2/2020",
                who: "new someone",
                where: "new somewhere",
                content: "new something",
                source: "new someplace"
            }
    
            return chai.request( app )
            .post( `/api/entries/${ accessibleTimelineId }` )
            .set( 'Authorization', `Bearer ${ token }` )
            .send( newTestEntry )
            .then( res => {
                expect( res ).to.be.json;
            })
        });
    } );

   describe( " test for entry update", () => {
        it( 'should update an entry for the user', () => {
            const secondToken = jwt.sign( { _id: accessibleUser._id, email: accessibleUser.email, userName: accessibleUser.name }, SECRET, { expiresIn: 10000 });
            const secondRecordDate = Date.now();
            const secondTestEntry = {
                title: "new something important",
                what: "new something cool",
                dateObject: secondRecordDate,
                date: "1/2/2020",
                who: "new someone",
                where: "new somewhere",
                content: "new something",
                source: "new someplace"
            };
   
            const desiredEnpoint = accessibleEntry._id;

            return chai.request( app )
            .put( `/api/entries/${ desiredEnpoint }` )
            .set( 'Authorization', `Bearer ${ secondToken }` )
            .send( secondTestEntry )
            .then( res => {
                expect( res ).to.be.json;
            } )
        } );
    } );
});


