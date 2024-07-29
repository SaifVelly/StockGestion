const express = require('express');
const { registerUser, loginUser, logoutUser, getUser, loginStatus, updateUser, changePassword, forgetPassword, resetPassword } = require('../controllers/userController');
const authorization = require('../middleware/authMiddleware');
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logoutUser);
router.get("/get-user", authorization, getUser);
router.get("/logged-in", loginStatus);
router.patch("/update-user", authorization, updateUser)
router.patch("/change-password", authorization, changePassword)
router.post("/forget-password", forgetPassword);
router.put("/reset-password/:resetToken", resetPassword);

module.exports = router;