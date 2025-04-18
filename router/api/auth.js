const express = require('express');
const { registration, login, verifyEmailAddress, forgatPassword, resetPassword, update } = require('../../controller/authController');
const upload = require('../../helpers/multer');
const router = express.Router();


router.post("/registration", registration);
router.post("/verifyemail", verifyEmailAddress);
router.post("/login", login);
router.post("/forgatPassword", forgatPassword);
router.post("/resetPassword/:randomstring", resetPassword)
router.post("/update", upload.single('avatar'), update)




module.exports = router