const express = require('express');
const { registration, login, verifyEmailAddress, forgatPassword, resetPassword, update } = require('../../controller/authController');
const router = express.Router();

router.post("/registration", registration);
router.post("/verifyemail", verifyEmailAddress);
router.post("/login", login);
router.post("/forgatPassword", forgatPassword);
router.post("/resetPassword/:randomstring", resetPassword)
router.post("/update", update)

module.exports = router