const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require('bcryptjs')
//const SeedUsers = require("../../data/seedUsers")
const generateToken = require("../utils/generateToken")
const isAuthenticated = require('../utils/isAuthenticated');
const isAdmin = require("../utils/isAdmin");

//seed users
// router.get("/seedusers", async (req, res) => {
//     try {
//       res.status(200).json(await User.create(SeedUsers));
//     } catch (err) {
//       res.status(400).json(err);
//     }
// });

//create new user
router.post('/', async (req, res) => {
  const currentUser = await User.findOne({ email: req.body.email });
    if (currentUser) {
        res.status(400).json("User with this email already exists")
    } else {
        const hashed = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
        const newUser = await User.create({
          name: req.body.name,
          email: req.body.email,
          password: hashed,
        });
        res.status(200).json(newUser)
    }
})

//auth user and get token
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

//get user profile
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
//update user by id
router.put("/:id", async (req, res) => {
    try {
        const updatedUser = {
            name: req.body.name,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10)),
            isAdmin: req.body.isAdmin
        }
      res.status(200).json(
          await User.findByIdAndUpdate(req.params.id, updatedUser, {new: true}))
    } catch (err) {
      res.status(400).json(err);
    }
});
  
//get all users
router.get("/:id", isAuthenticated, isAdmin, async (req, res) => {
  try {
    res.status(200).json(await User.findById(req.params.id));
  } catch (err) {
    res.status(400).json(err);
  }
});

//get all users
router.get("/", isAuthenticated, isAdmin, async (req, res) => {
    try {
      res.status(200).json(await User.find({}));
    } catch (err) {
      res.status(400).json(err);
    }
});
  
//delete user by id
router.delete("/:id", isAuthenticated, isAdmin,async (req, res) => {
  try {
    res.status(200).json(await User.findByIdAndRemove(req.params.id));
  } catch (err) {
    res.status(400).json(err);
  }
});
module.exports = router;