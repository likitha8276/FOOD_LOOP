import React, { useContext } from "react";
import './FoodCard.css';
import { StoreContext } from "../../context/StoreContext";
import { assets } from '../../assets/assets';

const FoodCard = ({ id, name, price, description, image }) => {
  const { cartItems, addToCart, removeFromCart, url } = useContext(StoreContext); 

  return (
    <div className='food-item'>
      <div className="food-item-image-container">
        <img src={`${url}/images/${image}`} alt={name} className="food-item-image" /> 
        {
          !cartItems[id] ? (
            <img
              onClick={() => addToCart(id)}
              src={assets.add_icon_white}
              className="add"
              alt="Add to cart"
            />
          ) : (
            <div className="food-item-counter">
              <img
                onClick={() => removeFromCart(id)}
                src={assets.remove_icon_red}
                alt="Remove from cart"
              />
              <p>{cartItems[id]}</p>
              <img
                onClick={() => addToCart(id)}
                src={assets.add_icon_green}
                alt="Add more"
              />
            </div>
          )
        }
      </div>

      <div className="food-item-info">
        <p className="food-item-name">{name}</p>
        <p className="food-item-desc">{description}</p>
        <div className="food-item-price-rating">
          <p className="food-item-price">₹{price}</p>
          <img src={assets.rating_starts} alt="Rating stars" />
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
