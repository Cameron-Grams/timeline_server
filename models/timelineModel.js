const mongoose = require( 'mongoose' );

const TimelineSchema = mongoose.Schema( {
    title:{
        type: String,
        required: true
    },
    timelineId:{
        type: String,
        required: true
    },
    userId:{ type: mongoose.Schema.Types.ObjectId, ref: 'Entries' },
    Entries: [{ 
        type: mongoose.Schema.Types.ObjectId, ref: 'Entries' 
    }]
} );

const Timeline = mongoose.model( 'Timeline', TimelineSchema );

module.exports = { Timeline }; 

