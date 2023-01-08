const express = require("express");
const { sendMessage, fetchAllMessage } = require("../controllers/messageController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/").post(protect, sendMessage);
router.route("/:chatId").get(protect, fetchAllMessage);

module.exports = router;
