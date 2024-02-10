// express -> open a port so we can listen to client
// mongoose -> schemas, DBs

const express = require("express");

const mongoose = require("mongoose");

const app = express();

app.listen(3000, () => {
    console.log("Listening to port 3000")
})