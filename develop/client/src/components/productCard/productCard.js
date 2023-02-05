import React from "react";
import { Link } from "react-router-dom";
import { useStoreContext } from "../../utils/globalState";
import { ADD_TO_CART} from "../../utils/index";
import { indexedDBRequest } from "../../utils/helpers";

function ProductCard(item) {
  const [dispatch] = useStoreContext();

  const {
    image,
    name,
    _id,
    price,
  } = item;

  const addToCart = () => {
    dispatch({
        type: ADD_TO_CART,
        product: { ...item, purchaseQuantity: 1 }
    });
    indexedDBRequest('cart', 'put', { ...item, purchaseQuantity: 1 });
}


  return (
    <div className="container">
      <Link to={`/products/${_id}`}>
        <img
          alt={name}
          src={`/images/${image}`}
        />
        <p>{name}</p>
      </Link>
      <div>
        <span>${price}</span>
      </div>
      <button onClick={addToCart}>Add to cart</button>
    </div>
  );
}

export default ProductCard;
