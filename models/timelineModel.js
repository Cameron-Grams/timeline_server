const mongoose = require( 'mongoose' );

const TimelineSchema = mongoose.Schema( {
    title:{
        type: String,
        required: true
    },
    userId:{ type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    Entries: [{ 
        type: mongoose.Schema.Types.ObjectId, ref: 'Entries' 
    }]
} );

const Timeline = mongoose.model( 'Timeline', TimelineSchema );

module.exports = { Timeline }; 

