const express = require('express');
const { registration, login, verifyEmailAddress, forgatPassword, resetPassword, update } = require('../../controller/authController');
const router = express.Router();

const multer = require('multer')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + "profile"
        cb(null, file.fieldname + '-' + uniqueSuffix)
    }
})

const upload = multer({ storage: storage })

router.post("/registration", registration);
router.post("/verifyemail", verifyEmailAddress);
router.post("/login", login);
router.post("/forgatPassword", forgatPassword);
router.post("/resetPassword/:randomstring", resetPassword)
router.post("/update", upload.single('avatar'), update)




module.exports = router