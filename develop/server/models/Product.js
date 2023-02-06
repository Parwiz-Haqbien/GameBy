const mongoose = require('mongoose');

const { Schema } = mongoose;

  // Setting the criteria for product that will be displayed in the page
const productSchema = new Schema({
    name: {
       type: String,
       required: true,
       trim: true 
    },

    image: {
        type: String
    },

    price: {
        type: Number,
        required: true,
        min: 0.99
    },

    quantity: {
        type: Number,
        min: 0,
        default: 0
      },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;