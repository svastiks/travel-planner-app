const mongoose = require("mongoose");

const LocationSchema = new mongoose.Schema({

    userName: {
        type: String,
        required: true
    },

    title: {
        type: String,
        required: true,
        min: 3 // characters
    },

    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },

    latitude: {
        type: Number,
        required: true,

    },

    longitude: {
        type: Number,
        required: true
    },

    descr: {
        type: String,
        required: true,
    }
}, { timestamps: true });

module.exports = mongoose.model("Location", LocationSchema);