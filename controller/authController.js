const generateRandomString = require("../helpers/generateRandomString");
const sendMail = require("../helpers/mail");
const { emailVerifyTemplates, resetPasswordTemplates } = require("../helpers/templates");
const { emailValidator } = require("../helpers/validators");
const userSchema = require("../modal/userSchema");
const jwt = require('jsonwebtoken');

// ================ registration part start
const registration = async (req, res) => {
    const { fullName, email, password, avatar } = req.body;

    try {
        if (!fullName) return res.status(400).send("Name is required");
        if (!email) return res.status(400).send("Email is required");
        if (!password) return res.status(400).send("Password is required");
        if (emailValidator(email)) res.status(400).send("Email is not valid");

        const existingUser = await userSchema.findOne({ email });
        if (existingUser) res.status(400).send("Email already exist");

        const randomOtp = Math.floor(Math.random() * 9000);

        const user = new userSchema({
            fullName,
            email,
            password,
            avatar,
            otp: randomOtp,
            otpExpiredAt: new Date(Date.now() + 5 * 60 * 1000)
        });
        user.save();

        sendMail(email, "Verify your email", emailVerifyTemplates, randomOtp)

        res.status(201).send("Rgistration successful. Please verify your email")
    } catch (error) {
        res.status(500).send("server error")
    }
}

// ======================== verify email address part start
const verifyEmailAddress = async (req, res) => {
    const { email, otp } = req.body;

    try {
        if (!email) return res.status(400).send("Invalid  email")
        if (!otp) return res.status(400).send("Invalid otp")

        const verifiedUser = await userSchema.findOne({ email, otp, otpExpiredAt: { $gt: Date.now() } })
        if (!verifiedUser) return res.status(400).send("Invalid otp")

        verifiedUser.otp = null;
        verifiedUser.otpExpiredAt = null;
        verifiedUser.isVarified = true;
        verifiedUser.save()

        res.status(200).send("email verified successfully")
    } catch (error) {
        res.status(500).send("server error")
    }
}

// ======================== login part start
const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        if (!email) return res.status(400).send("email is required");
        if (emailValidator(email)) res.status(400).send("email is not valid");
        if (!password) return res.status(400).send("password is required");

        const existingUser = await userSchema.findOne({ email });
        if (!existingUser) return res.status(400).send("user not found");
        const passCheck = await existingUser.isPasswordValid(password);
        if (!passCheck) return res.status(400).send("wrong password");
        if (!existingUser.isVarified) return res.status(400).send("email is not varified");

        // ========================= jwt token
        const accessToken = jwt.sign({
            data: {
                email: existingUser.email,
                id: existingUser._id
            }
        }, process.env.JWT_SEC, { expiresIn: '24h' });

        const loggedUse = {
            email: existingUser.email,
            _id: existingUser._id,
            fullName: existingUser.fullName,
            avatar: existingUser.avatar,
            isVarified: existingUser.isVarified,
            createdAt: existingUser.createdAt,
            updatedAt: existingUser.updatedAt,
        }

        res.status(200).send({ massage: "login Sussessfull", user: loggedUse, accessToken });
    } catch (error) {
        res.status(500).send("server error")
    }

}

// ===================== forgat password
const forgatPassword = async (req, res) => {
    const { email } = req.body;

    try {
        if (!email) return res.status(400).send("email is required");

        const existingUser = await userSchema.findOne({ email });
        if (!existingUser) return res.status(400).send("user not found");

        const randomString = generateRandomString(30)
        existingUser.resetPasswordId = randomString;
        existingUser.resetPasswordExpiredAt = new Date(Date.now() + 10 * 60 * 1000)
        existingUser.save()

        sendMail(email, "Reset password", resetPasswordTemplates, randomString)

        res.status(201).send("check email")
    } catch (error) {
        res.status(500).send("server error")
    }
}

// ======================= Reset password
const resetPassword = async (req, res) => {
    const { newPassword } = req.body;
    const randomString = req.params.randomstring;
    const email = req.query.email;

    const existingUser = await userSchema.findOne({ email, resetPasswordId: randomString, resetPasswordExpiredAt: { $gt: Date.now() } })
    if (!existingUser) return res.status(400).send("Invalid request")
    if (!newPassword) return res.status(400).send("input your new password")
    existingUser.password = newPassword;
    existingUser.resetPasswordId = null;
    existingUser.resetPasswordExpiredAt = null;
    existingUser.save()

    res.status(200).send("reset password successfully")
}

module.exports = { registration, verifyEmailAddress, login, forgatPassword, resetPassword }