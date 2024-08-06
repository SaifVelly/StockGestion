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
      // Log the specific error (no token provided)
      console.error('No token provided in either Authorization or X-Custom-Token header');
      res.status(401);
      throw new Error('Authorization required'); // More specific error message
    }

    // Verify token based on its type
    let verified;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      try {
        verified = jwt.verify(token, process.env.JWT_SECRET);
      } catch (err) {
        // Log JWT verification error
        console.error('Invalid JWT token:', err.message);
        res.status(401);
        throw new Error('Invalid JWT token'); // More specific error message
      }
    } else {
      // Replace with your custom token verification logic
      try {
        verified = verifyCustomToken(token);
      } catch (err) {
        // Log custom token verification error
        console.error('Invalid custom token:', err.message);
        res.status(401);
        throw new Error('Invalid custom token'); // More specific error message
      }
    }

    // Extract user information from verified token (assuming verified contains user ID)
    const userId = verified.id;

    // Find user in database
    const user = await User.findById(userId).select('-password');

    if (!user) {
      console.error('User with ID', userId, 'not found');
      res.status(401);
      throw new Error('User not found');
    }

    req.user = user;
    next();
  } catch (error) {
    // Handle unexpected errors
    console.error('Authorization error:', error.message);
    res.status(401); // Maintain 401 for unauthorized access
    throw error; // Rethrow the error to propagate to error handling middleware
  }
});

module.exports = authorization;
