const { AuthenticationError } = require('apollo-server-express');
const { Product, User, Category, Order } = require('../models');
const { signToken } = require('../utils/auth');
const PayPal = require(process.env.PAYPAL_CLIENT_ID)

const resolvers = {
    Query: {
        //find all the categories 
        categories: async () => {
            return await Category.find();
        },
        // return products based on user filter and not all
        products: async (parent, { category, name }) => {
            const filterProduct = {};
      
            if (category) {
                filterProduct.category = category;
            }
      
            if (name) {
                filterProduct.name = {
                $regex: name
              };
            }
            return await Product.find(filterProduct).populate('category');
    },
        //To return the result 
        product: async (parent, { _id }) => {
        return await Product.findById(_id).populate('category');
        },
        user: async (parent, args, context) => {
            if (context.user) {
              const user = await User.findById(context.user._id).populate({
                path: 'orders.products',
                populate: 'category'
              });
      
              user.orders.sort((a, b) => b.purchaseDate - a.purchaseDate);
      
              return user;
            }
      
            throw new AuthenticationError('Not logged in');
          },
          order: async (parent, { _id }, context) => {
            if (context.user) {
              const user = await User.findById(context.user._id).populate({
                path: 'orders.products',
                populate: 'category'
              });
      
              return user.orders.id(_id);
            }
      
            throw new AuthenticationError('Not logged in');
          },
         
}

}