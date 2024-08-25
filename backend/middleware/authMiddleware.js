const asyncHandler = require('express-async-handler');
const User = require('../schema/userSchema');
const jwt = require('jsonwebtoken');

const authorization = asyncHandler(async (req, res, next) => {
    try {
        const token = req.cookies.token;
        console.log(token);
        if (!token) {
            res.status(401);
            throw new Error("Not authorized, please login")
        }

        // Verify Token
        const verified = jwt.verify(token, process.env.JWT_SECRET);

        console.log(verified);

        const user = await User.findById(verified.id).select("-password");

        console.log(user);

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
