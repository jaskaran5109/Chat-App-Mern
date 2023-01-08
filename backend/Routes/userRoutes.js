const express = require('express');
const { registerUser, authUser, getAllUsers } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

const router=express.Router()

router.route("/").post(registerUser).get(protect,getAllUsers);
router.post("/login",authUser);

module.exports = router;
