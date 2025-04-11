const express = require('express');
const { registration, login, verifyEmailAddress, forgatPassword } = require('../../controller/authController');
const router = express.Router();

router.post("/registration", registration);
router.post("/verifyemail", verifyEmailAddress);
router.post("/login", login);
router.post("/forgatPassword", forgatPassword);



module.exports = router