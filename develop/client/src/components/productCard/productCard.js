import React from "react";
import { Link } from "react-router-dom";
import { useStoreContext } from "../../utils/globalState";
import { ADD_TO_CART} from "../../utils/index";
import { idbPromise } from "../../utils/helpers";

function ProductItem(item) {
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
    idbPromise('cart', 'put', { ...item, purchaseQuantity: 1 });
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

export default ProductItem;
