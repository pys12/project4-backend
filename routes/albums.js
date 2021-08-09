const express = require("express");
const router = express.Router();
const Album = require("../models/album");
const Seed = require("../models/seed");

//seed data
router.get("/seed", async (req, res) => {
  try {
    res.status(200).json(await Album.create(Seed));
  } catch (err) {
    res.status(400).json(err);
  }
});

//get album by id
router.get("/:id", async (req, res) => {
  try {
    res.status(200).json(await Album.findById(req.params.id));
  } catch (err) {
    res.status(400).json(err);
  }
});

// post
router.post("/", async (req, res) => {
  try {
      let track = req.body.tracklist.split(",");
    const newAlbum = new Album({
      title: req.body.title,
      cover: req.body.cover,
      tracklist: track,
      releaseDate: req.body.releaseDate,
      price: req.body.price,
    });
    res.status(200).json(await newAlbum.save());
  } catch (err) {
    res.status(400).json(err);
  }
});

//edit album by id
router.put("/:id", async (req, res) => {
  try {
    res.status(200).json(
        await Album.findByIdAndUpdate(req.params.id, req.body, {new: true}))
      
  } catch (err) {
    res.status(400).json(err);
  }
});

//get all albums
router.get("/", async (req, res) => {
  try {
    res.status(200).json(await Album.find({}));
  } catch (err) {
    res.status(400).json(err);
  }
});

//delete album by id
router.delete("/:id", async (req, res) => {
  try {
    res.status(200).json(await Album.findByIdAndRemove(req.params.id));
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
