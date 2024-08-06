const asyncHandler = require('express-async-handler');
const User = require('../schema/userSchema');
const jwt = require('jsonwebtoken');

const authorization = asyncHandler(async (req, res, next) => {
  try {
    // Check for token in authorization header
    const authHeader = req.headers.authorization;

    let token;

    if (authHeader && authHeader.startsWith('Bearer ')) {
      // Extract token from the header
      token = authHeader.split(' ')[1];
    } else {
      // No token provided in the header
      res.status(401);
      throw new Error("Not authorized, please provide token");
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
    throw new Error("Not authorized, invalid or missing token"); 
  }
});

module.exports = authorization;
