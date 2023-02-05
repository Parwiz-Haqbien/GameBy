import React, { useEffect } from 'react';
import ProductCard from '../productCard/productCard';
import { useStoreContext } from '../../utils/globalState';
import { REPLACE_PRODUCTS } from '../../utils/index';
import { useQuery } from '@apollo/client';
import { QUERY_PRODUCTS } from '../../utils/queries';
import { indexedDBRequest } from '../../utils/helpers';

function ProductList() {
  const [state, dispatch] = useStoreContext();

  const { loading, data } = useQuery(QUERY_PRODUCTS);

  useEffect(() => {
    if (data) {
      dispatch({
        type: REPLACE_PRODUCTS,
        products: data.products,
      });
      data.products.forEach((product) => {
        indexedDBRequest('products', 'put', product);
      });
    } else if (!loading) {
        indexedDBRequest('products', 'get').then((products) => {
        dispatch({
          type: REPLACE_PRODUCTS,
          products: products,
        });
      });
    }
  }, [data, loading, dispatch]);

  return (
    <div className="container">
      {state.products.length ? (
        <div className="productList">
          {state.products().map((product) => (
            <ProductCard
              key={product._id}
              _id={product._id}
              image={product.image}
              name={product.name}
              price={product.price}
            />
          ))}
        </div>
      ) : (
        <h3>No products have been added yet!</h3>
      )}
      {loading ? "waiting" : null}
    </div>
  );
}

export default ProductList;
