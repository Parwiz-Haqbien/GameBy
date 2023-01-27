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
    category: Category
  }

  type Order {
    _id: ID
    products: [Product]
  }

  type User {
    _id: ID
    userName: String
    email: String
    order: [Order]
  }

  type Checkout {
    session: ID
  }

  type Auth {
    token: ID
    user: User
  }

  type Query {
    categories: [Category]
    products(name: ID, category: ID): [Product]
    product(_id: ID!): Product
    user: User
    order(_id: ID!): Order
    checkout(products: [ID]!): Checkout
  }

  type Mutation {
    addUser(userName: String!, email: String!, password: String!): Auth
    addOrder(products: [ID]!): Order
    updateUser(userName: String, email: String, password: String): User
    updateProduct(_id: ID!, quantity: Int!): Product
    login(email: String!, password: String!): Auth
  }
`;
module.exports = typeDefs;