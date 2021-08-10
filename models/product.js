const mongoose = require("mongoose");

const Schema = mongoose.Schema

const productSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    cover: {
        type: String,
    },
    tracklist: {
        type:Array,
    },
    releaseDate: {
        type: Date,
    },
    price: {
        type:Number
    }
}, {timestamps:true})

module.exports = mongoose.model('product', productSchema)