const Email = require('../models/emailModel');

exports.processEmail = async (userId, center, to, message) => {
    try {
        if (!to || to.length === 0) {
            return { status: 400, data: { message: 'No recipients provided' } };
        }

        // Store email request in the database
        let email = new Email({
            userId,
            center,
            to,
            message,
            status: 'Pending'
        });

        await email.save();

        // Simulate email sending (you can integrate an email service like Nodemailer or SendGrid here)
        let sendResult = true; // Simulated result

        // Update email status
        email.status = sendResult ? 'Sent' : 'Failed';
        email.sentAt = sendResult ? new Date() : null;
        await email.save();

        return { status: 200, data: { message: 'Email processed successfully', email } };
    } catch (error) {
        console.error('Error processing email:', error);
        return { status: 500, data: { message: 'Internal server error' } };
    }
};

exports.getEmails = async () => {
    return await Email.find()
        .sort({ createdAt: -1 })
        .populate({
            path: "center",
            select: "name _id"
        })
        .populate({
            path: "userId",
            select: "name _id email"
        });
};
