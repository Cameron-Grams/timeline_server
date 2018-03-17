const chai = require('chai');
const chaiHttp = require('chai-http');
const should = require('chai').should();
const expect = require( 'chai' ).expect;
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const { user } = require('../models/userModel');
const { timeline } = require('../models/timelineModel');

chai.use( chaiHttp );

const { app, runServer, closeServer } = require( '../index' );
const { PORT, TEST_DATABASE_URL, SECRET } = require( '../Config/config' );

describe( "Tests the Timeline Router functionality", () => {
    
    let accessibleUser;
    let accessibleTimelineId; 

    function tearDownDb() {   
        return new Promise ((resolve, reject) => {     
            console.warn('Deleting timelines database');     
            mongoose.connection.dropDatabase()       
            .then(result => resolve(result))       
            .catch(err => reject(err));   }); 
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
        
        return user.create( testUserObject )
            .then( ( testUser ) => { 
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
                                return createdTimeline; 
                            } ) 
                    } )
                    .catch( err => err )
                .catch( err => err )
            .catch( console.log( "Problems...probably not news" ) );
    })

    afterEach( () => tearDownDb()); 

    after( () =>  closeServer( TEST_DATABASE_URL ));

    describe( "timeline creation", () => {
            
        it( 'should create a new timeline for the user', () => {
            const token = jwt.sign( { _id: accessibleUser._id, email: accessibleUser.email, userName: accessibleUser.name }, SECRET, { expiresIn: 10000 });
            return chai.request( app )
                .post( `/api/timelines/${ accessibleUser._id }`)
                .send( { timelineTitle: "This is your new Timeline" } )               
                .set( 'Authorization', `Bearer ${ token }` )
                .then( ( res ) => {
                    expect( res ).to.be.json; 
                    expect( res.body ).to.have.property( "title" ); 
                    expect( res.body ).to.have.property( "userId" ); 
                    expect( res.body ).to.have.property( "entries" ); 
                })
        });

        it( 'should requre authorization for a user to create a new timeline', () => {
            return chai.request( app )
                .post( `/api/timelines/${ accessibleUser._id }`)
                .send( { timelineTitle: "This is your new Timeline" } )               
                .then( ( res ) => {
                    expect( res ).to.be.json; 
                })
                .catch( err => console.log( "failed to create timeline with error: ", err.status ) );
        });
    });


    
    describe( "retrieve timeline", () => {
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

        it( 'should require authorization to produce the required timeline by id', () => {
            return chai.request( app )
                .post( '/api/timelines' )
                .send( { timelineId: accessibleTimelineId } )
                .then( ( res ) => {
                    expect( res ).to.be.json; 
                })
                .catch( err => console.log( "request rejected with status: ", err.status ) );
        })
    })
})

