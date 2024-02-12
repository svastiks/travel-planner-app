const router = require("express").Router();

const User = require("../models/User"); //User model

//Create a user

router.post("/", async (req, res) => {

    const newUser = new User(req.body);

    try {
        const user = await newUser.save();
        res.status(200).json(user);
        console.log("SUCCESS-> New user created.");
    }
    catch (err) {
        console.log("FAILED -> User not created.");
        res.status(500).json(err);
    }
})