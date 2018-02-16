const mongoose = require( 'mongoose' ); 

const UserSchema = mongoose.Schema( {
    name:{
        type: String,
        required: true
    },
    userId:{
        type: String,
        required: true
    },
    email:{
        type: String,
        lowercase: true,
        unique: true,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    userTimelines:{
        type: [ {
            title: String,
            timelineId: String
        } ]
    } 
} );

const User = mongoose.model( 'User', UserSchema );

module.exports = { User };

