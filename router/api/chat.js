const express = require("express");
const authMiddleware = require("../../middlewares/authMiddleware");
const { createConversation, conversationList } = require("../../controller/createConversation");
const router = express.Router();

router.post("/createconversation", authMiddleware, createConversation)
router.post("/conversationlist", authMiddleware, conversationList)

module.exports = router;