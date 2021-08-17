const express = require("express");
const router = express.Router();
const Order = require("../models/order");
const isAuthenticated = require("../utils/isAuthenticated");

//create new order
router.post("/", isAuthenticated, async (req, res) => {
  if (req.body.orderItems.length === 0) {
    res.status(400).send("Shopping cart is empty" );
  } else {
    const order = new Order({
      user: req.user.id,
      orderItems: req.body.orderItems,
      itemsPrice: req.body.itemsPrice,
      totalPrice: req.body.totalPrice,
      shippingAddress: req.body.shippingAddress,
      paymentMethod: req.body.paymentMethod,
    });
    const createdOrder = await order.save();
    res.status(201).json( createdOrder );
  }
});

//get order by id
router.get("/:id", isAuthenticated, async (req, res) => {
        const order = await Order.findById(req.params.id);
        if (order) {
            res.status(200).json(order);
        }else{
        res.status(400).json(err);
      }
})

//find all orders
router.get("/", async (req, res) => {
    try {
      res.status(200).json(await Order.find({}));
    } catch (err) {
      res.status(400).json(err);
    }
});
  
module.exports = router;
