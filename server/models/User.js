const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({

    userName: {
        type: String,
        required: true,
        min: 3,
        max: 18,
        unique: true
    },

    email: {
        type: String,
        required: true,
        max: 40,
        unique: true
    },

    password: {
        type: String,
        required: true,
        min: 4
    }
}, { timestamps: true });

module.exports = mongoose.model("User", UserSchema);