const mongoose = require("mongoose");
const Schema = mongoose.Schema

const productSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    artist: {
        type: String,
        required: true
    },
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
        type: Number,
        required: true,
    },
    stockCount: {
        type: Number,
        required: true,
        default:0
    }
}, {timestamps:true})

module.exports = mongoose.model('product', productSchema)