const express = require('express');
const { registration, login, verifyEmailAddress, forgatPassword, resetPassword } = require('../../controller/authController');
const router = express.Router();

router.post("/registration", registration);
router.post("/verifyemail", verifyEmailAddress);
router.post("/login", login);
router.post("/forgatPassword", forgatPassword);

//http://localhost:8000/resetPassword/Qh1ufTS0qvfcAtWBMpgyj2Sxskvc1P?email=mdrazwanislam8@gmail.com

router.post("/resetPassword/:randomstring", resetPassword)

module.exports = router