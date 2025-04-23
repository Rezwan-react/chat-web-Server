const express = require("express");
const authMiddleware = require("../../middlewares/authMiddleware");
const { createConversation, conversationList } = require("../../controller/createConversation");
const { sendMessage, getMessages } = require("../../controller/messageController");
const router = express.Router();

router.post("/createconversation", authMiddleware, createConversation)
router.get("/conversationlist", authMiddleware, conversationList)

router.post("/send", authMiddleware, sendMessage)
router.get("/getMessages/:conversationid", authMiddleware, getMessages)

module.exports = router;