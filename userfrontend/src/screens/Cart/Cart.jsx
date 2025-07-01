import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import { assets } from '../../assets/assets';
import './Cart.css';

const Cart = () => {
  const { cartItems, food_list, removeFromCart, addToCart, getTotalCartAmount,url } = useContext(StoreContext);
  const navigate = useNavigate(); // 
  const total = getTotalCartAmount();
  const deliveryFee = total === 0 ? 0 : 20;
  const grandTotal = total + deliveryFee;

  return (
    <div className="cart">
      <div className="cart-items-title">
        <p>Items</p>
        <p>Title</p>
        <p>Price</p>
        <p>Total</p>
        <p>Quantity</p>
        <p>Modify</p>
      </div>
      <br />
      <hr />
      {food_list.map((food) => {
        if (cartItems[food._id] > 0) {
          return (
            <div className="cart-items-item" key={food._id}>
             <img src={`${url}/images/${food.image}`} alt={food.name} />
              <p>{food.name}</p>
              <p>₹{food.price}</p>
              <p>₹{cartItems[food._id] * food.price}</p>
              <div className="food-item-counter-cart-counter">
                <img
                  onClick={() => removeFromCart(food._id)}
                  src={assets.remove_icon_red}
                  alt="Remove"
                />
                <p>{cartItems[food._id]}</p>
                <img
                  onClick={() => addToCart(food._id)}
                  src={assets.add_icon_green}
                  alt="Add"
                />
              </div>
              <p></p>
            </div>
          );
        }
        return null;
      })}

      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Total</h2>
          <div>
            <hr />
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>₹{total}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>₹{deliveryFee}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Total</p>
              <p>₹{grandTotal}</p>
            </div>
          </div>
          <button onClick={() => navigate('/order')}>Proceed to checkout</button> 
        </div>

        <div className="cart-promocode">
          <p>If you have a promo code enter it here</p>
          <div className="cart-promocode-input">
            <input type="text" placeholder="Enter promo code" />
            <button>Apply</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
