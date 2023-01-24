const { gql } = require('apollo-server-express');

const typeDefs = gql `
  type Category {
    _id: ID
    category_name: String
  }

  type Product {
    _id: ID
    product_name: String
    description: String
    image: String
    price: Float
    category_name: Category
  }

  type Order {
    _id: ID
    products: [Product]
  }


`