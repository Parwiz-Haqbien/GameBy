const { AuthenticationError } = require('apollo-server-express');
const { User, Product, Category, Order } = require('../models');
const { signToken } = require('../utils/auth');
const PayPal = require(process.env.PAYPAL_CLIENT_ID)