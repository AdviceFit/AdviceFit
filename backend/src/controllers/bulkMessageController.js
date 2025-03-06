const BulkMessageService = require('../services/bulkMessageService');

exports.sendBulkMessage = async (req, res) => {
    try {
        const userId = req.user._id;
        const { center, recipients, messageType, messageCategory, message } = req.body;
        if (!center || !recipients || recipients.length === 0 || !messageType || !messageCategory || !message) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const response = await BulkMessageService.processBulkMessage(center, recipients, messageType, messageCategory, message, userId);

        return res.status(response.status).json(response.data);
    } catch (error) {
        console.error('Error in sendBulkMessage:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }

}

    
exports.getBulkMessages =  async (req, res) => {
    try {
      const getAllMessages = await BulkMessageService.getBulkMessages();
      res.status(200).json({messages:getAllMessages});
    } catch (error) {
      res.status(500).json({ message: "Error fetching bulk message history", error: error.message });
    }
  };
