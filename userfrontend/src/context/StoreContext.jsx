import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const StoreContext = createContext();

const StoreContextProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState({});
  const [food_list, setFoodList] = useState([]);
  const url = 'http://localhost:4000';

  const [token, setToken] = useState(() => localStorage.getItem("token") || "");

  const fetchFoodList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);
      setFoodList(response.data.data);
    } catch (error) {
      console.log("Fetch Food List Error:", error.message);
    }
  };

  const loadCartData = async (token) => {
    if (!token) return;
    try {
      const res = await axios.get(`${url}/api/cart/get`, {
        headers: { token }
      });
      setCartItems(res.data.cartData);
    } catch (error) {
      console.log("Cart Load Error:", error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    async function loadData() {
      await fetchFoodList();
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        setToken(storedToken);
        await loadCartData(storedToken);
      }
    }
    loadData();
  }, []);

  const addToCart = async (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1
    }));

    const storedToken = localStorage.getItem("token");

    if (storedToken) {
      try {
        await axios.post(`${url}/api/cart/add`, { itemId }, {
          headers: { token: storedToken }
        });
      } catch (error) {
        console.log("Add Cart Error:", error.message);
      }
    }
  };

  const removeFromCart = async (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: Math.max((prev[itemId] || 0) - 1, 0)
    }));

    const storedToken = localStorage.getItem("token");

    if (storedToken) {
      try {
        await axios.delete(`${url}/api/cart/remove?itemId=${itemId}`, {
          headers: { token: storedToken }
        });
      } catch (error) {
        console.log("Remove Cart Error:", error.message);
      }
    }
  };

  const getTotalCartAmount = () => {
    let total = 0;
    for (let itemId in cartItems) {
      if (cartItems[itemId] > 0) {
        const item = food_list.find(food => food._id === itemId);
        if (item) {
          total += item.price * cartItems[itemId];
        }
      }
    }
    return total;
  };

  const contextValues = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url,
    token,
    setToken,
  };

  return (
    <StoreContext.Provider value={contextValues}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
