import express from "express";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

// set up a new route separate from the main app
const router = express.Router();

// register (create) the user (POST)
router.post('/register', async(req, res) => {
    const {username, password} = req.body;

    // bcrypt hashes passwords entered during login so we handle that asynchronously
    // the number 10 is the salt round that tells us the cost of hashing; the higher the cost the more secure
    const hashedPassword = await bcrypt.hash(password, 10);
    // create the new user using the User model and pass in the hashed password
    const user = new User({ username, password: hashedPassword });
    await user.save();

    res.json({ message: "New user created" });
});

// Login the user (POST)
// a login is a POST because we don't want to make any changes to any existing data on the server; we want a new record each time
router.post('/login', async(req, res) => {
    // get user data from the request body
    const { username, password } = req.body;

    // find the username in db; findOne() passes the first found document in 
    const user = await User.findOne({ username });
    // if there's no username, return
    if(!user) return res.status(400).json({ message: "User not found"});

    // if we do find the username, compare the encrypted password stored to the one the user enters
    const isMatch = await bcrypt.compare(password, user.password);
    // if the passwords don't match throw an error
    if(!isMatch) return res.status(400).json("Invalid password");

    // create a JWT token
    // pass in the id that gets created with the schema, the JWT from the .env, and the expiry time
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1hr" });

    res.json({ token });
});

export default router;

