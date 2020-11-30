const mongoose = require("mongoose")
var Schema = mongoose.Schema

const url = new Schema({
    _id: Schema.Types.ObjectId,
    dates: {type: Array, required: false},//array of dates in which the link was shortened, we will use this to rank the most visited pages with the length of the array
    url: String,
    shortened: String
}, {collection: "urls"})

module.exports = mongoose.model('Url', url)