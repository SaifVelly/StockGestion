const asyncHandler = require('express-async-handler');
const User = require('../schema/userSchema');
const jwt = require('jsonwebtoken');

const authorization = asyncHandler(async (req, res, next) => {
  try {
    // Extract token from headers
    const authHeader = req.headers.authorization;
    const customHeader = req.headers['x-custom-token'];

    let token;

    // Prioritize JWT token from Authorization header
    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.split(' ')[1];
    } else if (customHeader) { // Check for custom token if no JWT found
      token = customHeader;
    } else {
      res.status(401);
      throw new Error('No token provided');
    }

    // Verify token based on its type
    let verified;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      verified = jwt.verify(token, process.env.JWT_SECRET);
    } else {
      // Replace with your custom token verification logic
      verified = verifyCustomToken(token);
    }

    // Extract user information from verified token (assuming verified contains user ID)
    const userId = verified.id;

    // Find user in database
    const user = await User.findById(userId).select('-password');

    if (!user) {
      res.status(401);
      throw new Error('User not found');
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401);
    throw new Error('Not authorized, invalid or missing token');
  }
});

module.exports = authorization;
