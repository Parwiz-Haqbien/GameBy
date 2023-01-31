const mongoose = require('mongoose');

const { Schema } = mongoose;

  // Setting the criteria for product that will be displayed in the page
const productSchema = new Schema({
    product_name: {
       type: String,
       required: true,
       trim: true 
    },
    
    description: {
        type: String
    },

    image: {
        type: String
    },

    price: {
        type: Number,
        required: true,
        min: 0.99
    },

    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true
      }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;