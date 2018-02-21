const mongoose = require( 'mongoose' );

const timelineSchema = mongoose.Schema( {
    title:{
        type: String,
        required: true,
        unique: true
    },
    userId:{ type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    entries: [{ 
        type: mongoose.Schema.Types.ObjectId, ref: 'entries' 
    }]
} );

const timeline = mongoose.model( 'timeline', timelineSchema );

module.exports = { timeline }; 

