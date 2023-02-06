import { gql } from '@apollo/client';

export const QUERY_PRODUCTS = gql`
query getProducts {
  products {
    _id
    name
    price
    quantity
    image
  }
}
`;

export const QUERY_CHECKOUT = gql`
  query getCheckout($products: [ID]!) {
    checkout(products: $products) {
      session
    }
  }
`;

export const QUERY_ALL_PRODUCTS = gql`
  {
    products {
      _id
      name
      price
      quantity
    }
  }
`;

export const QUERY_USER = gql`
  {
    user {
      userName
      orders {
        _id
        purchaseDate
        products {
          _id
          name
          price
          quantity
          image
        }
      }
    }
  }
`;
