const conversationSchema = require("../modal/conversationSchema");
const userSchema = require("../modal/userSchema");

const createConversation = async (req, res) => {

    try {
        const { participentEmail } = req.body;

        const participentData = await userSchema.findOne({ email: participentEmail })
        if (!participentData) {
            return res.status(400).send({ error: "user not found" })
        }

        const conversation = new conversationSchema({
            creator: req.user.id,
            participent: participentData._id
        })

    } catch (error) {
        res.status(500).send("Server error")
    }
}

module.exports = { createConversation }