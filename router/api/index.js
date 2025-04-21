const express = require('express')
const router = express.Router();
const authRouter = require("./auth")
const chat = require("./chat")

router.use("/auth", authRouter)
router.use("/chat", chat)



module.exports = router