const mongoose = require( 'mongoose' );

const EntrySchema = new mongoose.Schema( {
    title: {
        type: String,
        required: true
    },
    what: {
        type: String,
        required: true
    },
    dateObject: {
        type: Date, 
        require: true
    },
    date: {
        type: String,
        required: true,
    who: {
        type: String,
        required: true
    },
    where:{
        type: String,
        required: true
    },
    content:{
        type: String,
        required: true
    },
    source:{
        type: String,
        required: true
    }
},{
    timestamps: true
} );