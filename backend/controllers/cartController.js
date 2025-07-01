const userModel = require('../models/userModel');

const addToCart = async (req, res) => {
  try {
    const userId = req.userId;
    const { itemId } = req.body;

    const userData = await userModel.findById(userId);
    const cartData = userData.cartData || {};

    if (!cartData[itemId]) {
      cartData[itemId] = 1;
    } else {
      cartData[itemId] += 1;
    }

    await userModel.findByIdAndUpdate(userId, { cartData });
    res.status(200).json({ message: 'Item added to cart' });
  } catch (error) {
    console.log("Add to cart error:", error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getCart = async (req, res) => {
  try {
    const userId = req.userId;
    const userData = await userModel.findById(userId);
    const cartData = userData.cartData || {};
    res.status(200).json({ cartData });
  } catch (error) {
    console.log("Get cart error:", error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const removeFromCart = async (req, res) => {
  try {
    const userId = req.userId;
    const { itemId } = req.query;

    const userData = await userModel.findById(userId);
    const cartData = userData.cartData || {};

    if (cartData[itemId]) {
      cartData[itemId] -= 1;
      if (cartData[itemId] <= 0) {
        delete cartData[itemId];
      }
    }

    await userModel.findByIdAndUpdate(userId, { cartData });
    res.status(200).json({ message: 'Item removed from cart' });
  } catch (error) {
    console.log("Remove from cart error:", error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { addToCart, getCart, removeFromCart };
