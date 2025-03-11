const EmailService = require('../services/emailService');

exports.sendEmail = async (req, res) => {
    try {
        const userId = '678beef0718b36bd16f495b2'
        const { center, to, message } = req.body;
        console.log(req.body)
        if (!center || !to || to.length === 0 || !message) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const response = await EmailService.processEmail(userId, center, to, message);

        return res.status(response.status).json(response.data);
    } catch (error) {
        console.error('Error in sendEmail:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

exports.getEmails = async (req, res) => {
    try {
        const emails = await EmailService.getEmails();
        res.status(200).json({ messagesHistory:emails} );
    } catch (error) {
        res.status(500).json({ message: "Error fetching email history", error: error.message });
    }
};
