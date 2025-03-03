const BulkMessage = require('../models/bulkMessageModel');
const Visitor = require('../models/visitorModel');
const Member = require('../models/memberModel');
const Employee = require('../models/employeeModel');
// const sendSMS = require('./smsService');
// const sendWhatsApp = require('./whatsappService');

exports.processBulkMessage = async (center, recipients, messageType, messageCategory, message,userId) => {
    try {
        let recipientList = [];
        // Fetch recipients based on selected categories
        if (recipients.includes("visitors")) {
            const visitors = await Visitor.find({ visiting_center: center, isDeleted: false }, 'name mobile');
            recipientList.push(...visitors.map(v => ({ name: v.name, phone: v.mobile })));
        }

        if (recipients.includes('members')) {
            let members = await Member.find({ center, isDeleted: false }, 'name mobile');
            recipientList.push(...members.map(v => ({ name: v.name, phone: v.mobile })));

        }

        if (recipients.includes('employees')) {
            let employees = await Employee.find({ center, isDeleted: false }, 'name mobile');
            recipientList.push(...employees.map(v => ({ name: v.name, phone: v.mobile })));

        }
        if (recipientList.length === 0) {
            return { status: 400, data: { message: 'No recipients found' } };
        }


        // Store bulk message request
        let bulkMessage = new BulkMessage({
            userId,
            center,
            recipients,
            messageType,
            messageCategory,
            message,
            totalRecipients: recipientList.length,
            status: 'Pending'
        });

        await bulkMessage.save();

        // // Send messages
        // let sendResult;
        // if (messageType === 'SMS') {
        //     sendResult = await sendSMS(recipientList, message);
        // } else if (messageType === 'WhatsApp') {
        //     sendResult = await sendWhatsApp(recipientList, message);
        // }

        // // Update message status
        // bulkMessage.status = sendResult.success ? 'Sent' : 'Failed';
        // bulkMessage.sentAt = sendResult.success ? new Date() : null;
        // await bulkMessage.save();

        return { status: 200, data: { message: 'Messages processed successfully', bulkMessage } };
    } catch (error) {
        console.error('Error processing bulk message:', error);
        return { status: 500, data: { message: 'Internal server error' } };
    }
};



exports.getBulkMessages =async () => {
    return await BulkMessage.find().sort({ createdAt: -1 }); 
  };
