// express -> open a port so we can listen to client
// mongoose -> schemas, DBs

const express = require("express");

const mongoose = require("mongoose");

const env = require("dotenv");

const app = express();

env.config();

mongoose.connect(process.env.MONGO_CONNECTION).then(() => {
    console.log("SUCCESS -> Conected to DB.")
})

app.listen(3000, () => {
    console.log("SUCCESS -> Backend server started.")
})



