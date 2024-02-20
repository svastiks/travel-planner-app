// express -> open a port so we can listen to client
// mongoose -> schemas, DBs

const express = require("express");
const mongoose = require("mongoose");
const env = require("dotenv");
const locationRoute = require("./routes/location");
const userRoute = require("./routes/users");

const app = express();

app.use(express.json()); // send JSON data to the client
env.config();

mongoose.connect("mongodb+srv://travelAdmin:admin@traveldb.lnkhvug.mongodb.net/?retryWrites=true&w=majority").then(() => {
    console.log("SUCCESS -> Conected to DB.")
}).catch((err) => console.log("FAILED -> Could not connect to DB!"))

app.use("/api/locations", locationRoute);

app.use("/api/users", userRoute);

app.listen(3000, () => {
    console.log("SUCCESS -> Backend server started.")
})



