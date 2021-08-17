const express = require("express");
const router = express.Router();
const Product = require("../models/product");
//const Seed = require("../../data/seedProducts");
const isAuthenticated = require("../utils/isAuthenticated");
const isAdmin = require("../utils/isAdmin");
const User = require("../models/user");

//seed data
// router.get("/seed", async (req, res) => {
//   try {
//     res.status(200).json(await Product.create(Seed));
//   } catch (err) {
//     res.status(400).json(err);
//   }
// });

//get product by id
router.get("/:id", async (req, res) => {
  try {
    res.status(200).json(await Product.findById(req.params.id));
  } catch (err) {
    res.status(400).json(err);
  }
});

// create new product
router.post("/", isAuthenticated, isAdmin, async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
    const newProduct = new Product({
      user:user._id,
      artist: "sample artist",
      title: "sample title",
      cover: "https://www.sugarizeevents.com/wp-content/uploads/2015/03/product-image-coming-soon.png",
      tracklist:["sample song"],
      releaseDate: Date.now(),
      price: 0,
      stockCount: 0,
    });
    res.status(200).json(await newProduct.save());
  } catch (err) {
    res.status(400).json("create failed");
  }
});

//edit product by id
router.put("/:id", isAuthenticated, isAdmin, async (req, res) => {
    const product = await Product.findById(req.params.id)
    if(product){
      let track = req.body.tracklist.split(",");
      product.artist = req.body.artist
      product.title = req.body.title
      product.cover = req.body.cover
      product.tracklist = track
      product.releaseDate = req.body.releaseDate
      product.price = req.body.price
      product.stockCount = req.body.stockCount
        
      const updatedProduct = await product.save()
      res.status(200).json(updatedProduct);
    } else{
    res.status(400).json("update failed");
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
router.delete("/:id", isAuthenticated, isAdmin, async (req, res) => {
  try {
    res.status(200).json(await Product.findByIdAndRemove(req.params.id));
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
