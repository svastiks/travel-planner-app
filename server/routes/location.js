const router = require("express").Router(); // router

const location = require("../models/Location"); // Location model

// Store selected location in DB

// req -> sending as the client, res -> response to the request
router.post("/", async (req, res) => {

    const newLocation = new Location(req.body); // this will create an object from the request body



})

// Retrieve PIN to display on client side

// 

