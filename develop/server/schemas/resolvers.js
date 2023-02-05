const { AuthenticationError } = require('apollo-server-express');
const { Product, User, Order } = require('../models');
const { signToken } = require('../utils/auth');
// const PayPal = require('paypal-checkout')

const resolvers = {
    Query: {
        //find all the categories 
        // return products based on user filter and not all
        products: async () => {
          return Product.find();
        },

        //To return the result 
        product: async (parent, { _id }) => {
          return await Product.findById(_id).populate("products");
        },

        user: async (parent, args, context) => {
          if (context.user) {
            return Profile.findOne({ _id: context.user._id });
          }
          throw new AuthenticationError(" Not logged in");
        },
            order: async (parent, { _id }, context) => {
              if (context.user) {
              const user = await User.findById(context.user._id).populate({
                path: "orders.products",
                populate: "products"
              });
      
              return user.orders.id(_id);
            }
      
            throw new AuthenticationError('Not logged in');
          },
          // checkout: async (parent, args, context) => {
          //      const url = new URL(context.headers.referer).origin;
          //      const order = new Order({ products: args.products });
          //      const line_items = [];

          //      const { products } = await order.populate('products');
          //      for (let i = 0; i < products.length; i++) {
          //       //Create a PayPal payment object
          //       const payment = await PayPal.payment.create({
          //         intent: 'sale',
          //         payer: {
          //           payment_method: 'paypal'
          //         },
          //         transactions: [{
          //           item_list: {
          //             items: [{
          //               name: products[i].name,
          //               description: products[i].description,
          //               quantity: 1,
          //               price: products[i].price,
          //               currency: 'AUD'
          //             }]
          //           },
          //           amount: {
          //             currency: 'AUD',
          //             total: products[i].price
          //           }
          //         }],
          //         redirect_urls: {
          //           return_url: `${url}/success`,
          //           cancel_url: `${url}/`
          //         }
          //       });
            
          //       //Add the payment ID to the line_items array
          //       line_items.push({
          //         payment: payment.id,
          //       });
          //     }
            
          //     //Execute the PayPal payment
          //     const execution = await PayPal.payment.execute(line_items[0].payment, { payer_id: payerId });
            
          //     //Return the payment ID
          //     return { payment: execution.id };
          //   }

    },
    Mutation: {
        login: async (parent, { email, password }) => {
            const profile = await User.findOne({ email });
      
            if (!profile) {
              throw new AuthenticationError('Profile with this email was not found');
            }
      
            const correctPw = await profile.isCorrectPassword(password);
      
            if (!correctPw) {
              throw new AuthenticationError('Invalid login credentials. Please check your email and password.');
            }
      
            const token = signToken(profile);
      
            return { token, profile };
          },
          addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);
      
            return { token, user };
          },
          updateUser: async (parent, args, context) => {
            if (context.user) {
              return await User.findByIdAndUpdate(context.user._id, args, { new: true });
            }
      
            throw new AuthenticationError('Not logged in');
          },

          updateProduct: async (parent, { _id, quantity }) => {
            const decrement = Math.abs(quantity) * -1;
      
            return await Product.findByIdAndUpdate(_id, { $inc: { quantity: decrement } }, { new: true });
          },
          
          addOrder: async (parent, { products }, context) => {
            console.log(context);
            if (context.user) {
              const order = new Order({ products });
      
              await User.findByIdAndUpdate(context.user._id, { $push: { orders: order } });
      
              return order;
            }
      
            throw new AuthenticationError('Not logged in');
          },
    },
};
module.exports = resolvers;