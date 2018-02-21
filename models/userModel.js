const mongoose = require( 'mongoose' ); 

const userSchema = mongoose.Schema( {
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
        type: mongoose.Schema.Types.ObjectId, ref: 'timeline' 
    }]
} );

const user = mongoose.model( 'user', userSchema );

module.exports = { user };

