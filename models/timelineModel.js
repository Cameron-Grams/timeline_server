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
    Entries: [{ 
        date: String,
        dateObject: Date,
        source: String,
        what: String,
        where: String,
        who: String,
        content: String
    }]
} );

const Timeline = mongoose.model( 'Timeline', TimelineSchema );

module.exports = { Timeline }; 

