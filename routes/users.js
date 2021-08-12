const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require('bcryptjs')
const SeedUsers = require("../data/seedUsers")
const generateToken = require("../utils/generateToken")
const isAuthenticated = require('../utils/isAuthenticated')
//seed users
router.get("/seedusers", async (req, res) => {
    try {
      res.status(200).json(await User.create(SeedUsers));
    } catch (err) {
      res.status(400).json(err);
    }
});
  
//create new user
router.post("/login", async (req, res) => {
  const foundUser = await User.findOne({ email: req.body.email });
  if (foundUser) {
    const matchedPassword = await bcrypt.compareSync(req.body.password,foundUser.password);
    if (matchedPassword) {
      res.status(200).json({
        _id: foundUser._id,
        name: foundUser.name,
        email: foundUser.email,
        isAdmin: foundUser.isAdmin,
        token:generateToken(foundUser._id)
      });
        return
    } 
  } 
    res.status(401).json("Invalid email or password");
  
});
       
router.get('/profile', isAuthenticated ,async (req, res) => {
  const foundUser = await User.findById(req.user.id);
    if (foundUser) {
        res.status(200).json({
        _id: foundUser._id,
        name: foundUser.name,
        email: foundUser.email,
        isAdmin: foundUser.isAdmin,
        });
    } else {
        res.status(404).json("No user found");
    }
    
})
//get users
router.get("/", async (req, res) => {
    try {
      res.status(200).json(await User.find({}));
    } catch (err) {
      res.status(400).json(err);
    }
  });
module.exports = router;