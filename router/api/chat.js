const express = require("express");
// const authMiddleware = require("../../middlewares/authMiddleware");
const { createConversation } = require("../../controller/createConversation");
const router = express.Router();

router.post("/createconversation",  createConversation)

module.exports = router;