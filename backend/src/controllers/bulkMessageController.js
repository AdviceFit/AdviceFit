const BulkMessageService = require('../services/bulkMessageService');

exports.sendBulkMessage = async (req, res) => {
    try {
        const { center, recipients, messageType, messageCategory, message } = req.body;
        console.log("🚀 ~ exports.sendBulkMessage= ~ req.body:", req.body)

        if (!center || !recipients || recipients.length === 0 || !messageType || !messageCategory || !message) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const response = await BulkMessageService.processBulkMessage(center, recipients, messageType, messageCategory, message);

        return res.status(response.status).json(response.data);
    } catch (error) {
        console.error('Error in sendBulkMessage:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};
