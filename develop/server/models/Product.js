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

    category_name: {
        type: String,
        Reference: {
        model: 'Category',
        key: "id"
        }
    }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;