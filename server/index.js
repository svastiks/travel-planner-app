// express -> open a port so we can listen to client
// mongoose -> schemas, DBs

const express = require("express");
const mongoose = require("mongoose");
const env = require("dotenv");
const locationRoute = require("./routes/location");
const userRoute = require("./routes/users");
const pingRoute = require("./routes/ping");

const app = express();

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(express.json()); // send JSON data to the client
env.config();

mongoose.connect("mongodb+srv://travelAdmin:admin@traveldb.lnkhvug.mongodb.net/?retryWrites=true&w=majority").then(() => {
    console.log("SUCCESS -> Conected to DB.")
}).catch((err) => console.log("FAILED -> Could not connect to DB!"))

app.use("/locations", locationRoute);

app.use("/users", userRoute);

app.use("/ping", pingRoute);

app.listen(3000, () => {
    console.log("SUCCESS -> Backend server started.")
})



