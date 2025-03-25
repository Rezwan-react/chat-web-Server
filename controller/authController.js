const userSchema = require("../modal/userSchema");

const registration = (req, res) => {
    const { fullName, email, password, avatar } = req.body;

    const user = new userSchema({
        fullName,
        email,
        password,
        avatar
    });
    user.save();
    res.status(201).send("Rgistration successful")
}



module.exports = { registration }