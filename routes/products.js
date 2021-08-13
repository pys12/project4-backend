const express = require("express");
const router = express.Router();
const Product = require("../models/product");
const Seed = require("../data/seedProducts");

//seed data
router.get("/seed", async (req, res) => {
  try {
    res.status(200).json(await Product.create(Seed));
  } catch (err) {
    res.status(400).json(err);
  }
});

//get product by id
router.get("/:id", async (req, res) => {
  try {
    res.status(200).json(await Product.findById(req.params.id));
  } catch (err) {
    res.status(400).json(err);
  }
});

// create new product
router.post("/", async (req, res) => {
  try {
      let track = req.body.tracklist.split(",");
    const newProduct = new Product({
      title: req.body.title,
      cover: req.body.cover,
      tracklist: track,
      releaseDate: req.body.releaseDate,
      price: req.body.price,
    });
    res.status(200).json(await newProduct.save());
  } catch (err) {
    res.status(400).json(err);
  }
});

//edit product by id
router.put("/:id", async (req, res) => {
  try {
    res.status(200).json(
        await Product.findByIdAndUpdate(req.params.id, req.body, {new: true}))
      
  } catch (err) {
    res.status(400).json(err);
  }
});

//get all products
router.get("/", async (req, res) => {
  try {
    res.status(200).json(await Product.find({}));
  } catch (err) {
    res.status(400).json(err);
  }
});

//delete product by id
router.delete("/:id", async (req, res) => {
  try {
    res.status(200).json(await Product.findByIdAndRemove(req.params.id));
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
