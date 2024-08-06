const asyncHandler = require('express-async-handler');
const User = require('../schema/userSchema');
const jwt = require('jsonwebtoken');

const authorization = asyncHandler(async (req, res, next) => {
  try {
    // Prioritize token from cookies for compatibility
    let token = req.cookies.token;

    // If cookie token is not found, check for token in authorization header
    if (!token) {
      const bearerHeader = req.headers['authorization'];
      if (bearerHeader) {
        token = bearerHeader.split(' ')[1];
      }
    }

    if (!token) {
      res.status(401);
      throw new Error("Not authorized, please login");
    }

    // Verify Token
    const verified = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(verified.id).select("-password");

    if (!user) {
      res.status(401);
      throw new Error("User not found");
    }

    req.user = user;
    next();

  } catch (error) {
    res.status(401);
    throw new Error("Not authorized, please login"); 
  }
});

module.exports = authorization;
