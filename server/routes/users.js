const router = require("express").Router();

const User = require("../models/User"); //User model

const bcrypt = require("bcrypt");

//Create a user (Register)

router.post("/register", async (req, res) => {

    try {

        const salt = await bcrypt.genSalt(10);

        const hashPass = await bcrypt.hash(req.body.password, salt); // now encrypted and has salt

        const newUser = new User({

            userName: req.body.userName,
            email: req.body.email,
            password: hashPass
        })

        const saveUser = await newUser.save(); // Push to DB

        console.log("SUCCESS-> New user created.");
        res.status(200).json(saveUser._id);
    }
    catch (err) {
        console.log("FAILED -> User not created.");
        res.status(500).json(err);
    }
});

// Login

router.post("/login", async (req, res) => {

    try {
        const user = await User.findOne({ userName: req.body.userName }); // Is the username equal?

        if (!user) {
            console.log("FAILED -> Login could not be completed.");
            res.status(400).json("Incorrect username or password!")
        }

        else {

            const pass = await bcrypt.compare(req.body.password, user.password);

            if (!pass) {
                console.log("FAILED -> Login could not be completed.");
                res.status(400).json("Incorrect username or password!");
            }
            else {
                console.log("SUCESS -> User logged in successfully!");
                res.status(200).json("Login Successful.");
            }
        }
    }
    catch (err) {
        console.log("FAILED -> User not found!")
        res.status(500).json(err);
    }
});

module.exports = router;