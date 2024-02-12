const router = require("express").Router(); // router

const Location = require("../models/Location"); // Location model

// Store selected location in DB

// req -> sending as the client, res -> response to the request
router.post("/", async (req, res) => {

    const newLocation = new Location(req.body); // this will create an object from the request body

    try {
        const saveLocation = await newLocation.save();
        res.status(200).json(saveLocation);
        console.log("SUCCESS -> Location added to DB.")
    }
    catch (err) {
        console.log("FAILED -> Location added to DB.")
        res.status(500).json(err);
    }

})

// Retrieve PIN to display on client side

router.get("/", async (req, res) => {

    try {
        const location = await Location.find();
        res.status(200).json(location);
        console.log("SUCCESS -> All location's retrieved.")
    }
    catch (err) {
        console.log("FAILED -> Location added to DB.")
        res.status(500).json(err);
    }
})

module.exports = router; // export router