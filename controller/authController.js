const sendMail = require("../helpers/mail");
const emailVerifyTemplates = require("../helpers/templates");
const { emailValidator } = require("../helpers/validators");
const userSchema = require("../modal/userSchema");


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

    if (!email) return res.status(400).send("Email is required");
    if (emailValidator(email)) res.status(400).send("Email is not valid");
    if (!password) return res.status(400).send("Password is required");

    const existingUser = await userSchema.findOne({ email });

    const passCheck = await existingUser.isPasswordValid(password);
    if (!passCheck) return res.status(400).send("Wrong password");

    res.status(200).send("login Sussessfull");

}

module.exports = { registration, verifyEmailAddress, login }