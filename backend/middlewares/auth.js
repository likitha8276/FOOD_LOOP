const jwt = require('jsonwebtoken');

const authMiddleware = async (req, res, next) => {
  const token = req.headers.token;

  if (!token) {
    return res.status(401).json({ message: 'Token missing' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_TOKEN_SECRET);
    req.userId = decoded.id;
    next();
  } catch (error) {
    console.log('Auth Middleware Error:', error.message);
    return res.status(401).json({ message: 'Token is invalid' });
  }
};

module.exports = authMiddleware;
