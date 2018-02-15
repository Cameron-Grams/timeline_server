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
    userId:{
        type: Array,
        required: true
    },
    Entries:{
        type: Array,
    }
} );

const Timeline = mongoose.model( 'Timeline', TimelineSchema );

module.exports = { Timeline }; 

