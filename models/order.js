const mongoose = require("mongoose");
const Schema = mongoose.Schema

const orderSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
      orderItems: [
        {
          title: { type: String, required: true },
          quantity: { type: Number, required: true },
          cover: { type: String, required: true },
          price: { type: Number, required: true },
          product: {
            type: Schema.Types.ObjectId,
            ref: 'Product',
            required: true,
          },
        },
      ],
      shippingAddress: {
        streetAddress: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        zipcode: { type: String, required: true },
      },
      paymentMethod: {
        type: String,
        required: true,
      },
      paymentResult: {
        id: { type: String },
        status: { type: String },
        update_time: { type: String },
        email_address: { type: String },
      },
      totalPrice: {
        type: Number,
        required: true,
        default: 0.00,
      },
      isPaid: {
        type: Boolean,
        required: true,
        default: false,
      },
      paidAt: {
        type: Date,
      },
      isDelivered: {
        type: Boolean,
        required: true,
        default: false,
      },
      deliveredAt: {
        type: Date,
      },
    },{timestamps: true,}
  )
  
module.exports = mongoose.model('order', orderSchema)
