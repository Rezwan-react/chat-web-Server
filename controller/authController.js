const { emailValidator } = require("../helpers/validators");
const userSchema = require("../modal/userSchema");


// ================ registration part start
const registration = async (req, res) => {
    const { fullName, email, password, avatar } = req.body;

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

    

    res.status(201).send("Rgistration successful")
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

module.exports = { registration, login }