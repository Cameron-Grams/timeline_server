const mongoose = require( 'mongoose' ); 

const UserSchema = mongoose.Schema( {
    name:{
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
    userTimelines: [{ 
        type: mongoose.Schema.Types.ObjectId, ref: 'Timeline' 
    }]
} );

const User = mongoose.model( 'User', UserSchema );

module.exports = { User };

