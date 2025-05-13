const conversationSchema = require("../modal/conversationSchema");
const messageSchema = require("../modal/messageSchema");

const sendMessage = async (req, res) => {
    try {

        const { reciverId, content, conversationId } = req.body;
        if (!reciverId) {
            return res.status(400).send({ error: " reciverId required" })
        }
        if (!content) {
            return res.status(400).send({ error: " content required" })
        }
        if (!conversationId) {
            return res.status(400).send({ error: " conversationId required" })
        }

        const existingConversation = await conversationSchema.findOne({ _id: conversationId })
        if (!existingConversation) {
            return res.status(400).send({ error: "no conversation found" })
        }

        const message = new messageSchema({
            sender: req.user.id,
            reciver: reciverId,
            content,
            conversation: existingConversation._id
        })

        message.save()

        await conversationSchema.findByIdAndUpdate(existingConversation._id, { lastMessage: message })

        global.io.emit("new_message", { message, conversationId: conversationId })

        res.status(200).send({ message, conversationId: conversationId })
    } catch (error) {
        res.status(500).send({ error: "Server error!" })
    }
}

const getMessages = async (req, res) => {

    try {
        const { conversationid } = req.params;

        const messages = await messageSchema.find({ conversation: conversationid })

        res.status(200).send(messages)

    } catch (error) {
        res.status(500).send("Server error!")
    }
}

module.exports = { sendMessage, getMessages }