import React, { useEffect } from 'react';
import ProductItem from '../ProductItem';
import { useStoreContext } from '../../utils/GlobalState';
import { UPDATE_PRODUCTS } from '../../utils/actions';
import { useQuery } from '@apollo/client';
import { QUERY_PRODUCTS } from '../../utils/queries';
import { idbPromise } from '../../utils/helpers';

function ProductList() {
  const [state, dispatch] = useStoreContext();
  
  const { loading, data } = useQuery(QUERY_PRODUCTS);
  
  useEffect(() => {
  if (data) {
  dispatch({
  type: UPDATE_PRODUCTS,
  products: data.products,
  });
  data.products.forEach((product) => {
  idbPromise('products', 'put', product);
  });
  } else if (!loading) {
  idbPromise('products', 'get').then((products) => {
  dispatch({
  type: UPDATE_PRODUCTS,
  products: products,
  });
  });
  }
  }, [data, loading, dispatch]);

 
  const products = state.products.filter((product) => product);
  
  return (
  <div className="container">
  {products.length ? (
  <div className="productCard">
     {Array.isArray(products) ? products.map((product) => (
             <ProductItem
             key={product._id}
             _id={product._id}
             image={product.image}
             name={product.name}
             price={product.price}
             quantity={product.quantity}
           />
  )) : null}
  </div>
  ) : (
  <h3>No added any products yet</h3>
  )}
  {loading ? <h1>loading</h1> : null}
  </div>
  );
  }

export default ProductList;
