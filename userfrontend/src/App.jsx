import React, { useState, useContext, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Cart from './screens/Cart/Cart';
import Home from './screens/Home/Home';
import PlaceOrder from './screens/PlaceOrder/PlaceOrder';
import LoginPopup from './components/LoginPopup/LoginPopup';
import { ToastContainer } from 'react-toastify';
import { StoreContext } from './context/StoreContext'; 
import Verify from './screens/Verify/Verify';
import MyOrders from './screens/MyOrders/MyOrders';
const App = () => {
  const { token } = useContext(StoreContext);
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    if (!token) {
      setShowLogin(true); 
    } else {
      setShowLogin(false); 
    }
  }, [token]);

  return (
    <>
      <ToastContainer />
      {showLogin && <LoginPopup setShowLogin={setShowLogin} />}
      <div className="app">
        <Navbar showLogin={showLogin} setShowLogin={setShowLogin} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<PlaceOrder />} />
          <Route path='verify' element={<Verify />}></Route>
          <Route path='/myorders' element={<MyOrders />}></Route>
          
          

        </Routes>
      </div>
    </>
  );
};

export default App;
