const { messageSchema } = require('../../models/nishu/messageModel')

exports.createMessage = async (req, res) => {
    console.log(req.body)
    try {

        const { name, phone, email, subject, message } = req.body;

        const newLead = new messageSchema({ name, phone, email, subject, message, });

        await newLead.save();
        res.status(201).json({ success: true, msg: 'message sent successfully!' });
    } catch (error) {
        res.status(500).json({ success: false, msg: 'Server error', error });
    }

}

exports.getMessage = async (req, res) => {
    try {
        const messages = await messageSchema.find();
        res.status(200).send({ success: true, msg: messages });
    } catch (error) {
        res.status(500).send({ success: false, msg: 'Server error', error });
    }
}

exports.deleteMessage = async (req, res) => {
    try {
        const message = await messageSchema.findByIdAndDelete(req.params.id);
        if (!message) return res.status(404).send({ success: false, msg: 'Message not found' });
        res.status(200).send({ success: true, msg: 'Message deleted successfully!' });
    } catch (error) {
        res.status(500).send({ success: false, msg: 'Server error', error });
    }
}
