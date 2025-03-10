const Email = require('../models/emailModel');
const Visitor = require('../models/visitorModel');
const Member = require('../models/memberModel');
const Employee = require('../models/employeeModel');
const nodemailer = require('nodemailer');

exports.processEmail = async (userId, center, to, message) => {
    try {
        if (!to || to.length === 0) {
            return { status: 400, data: { message: 'No recipients provided' } };
        }

        let recipientEmails = [];

        // Fetch recipients based on selected categories
        if (to.includes("Visitor")) {
            const visitors = await Visitor.find({ visiting_center: center, isDeleted: false }, 'email');
            recipientEmails.push(...visitors.map(v => v.email));
        }

        if (to.includes('Members')) {
            const members = await Member.find({ center, isDeleted: false }, 'email');
            recipientEmails.push(...members.map(m => m.email));
        }

        if (to.includes('Employees')) {
            const employees = await Employee.find({ center, isDeleted: false }, 'email');
            recipientEmails.push(...employees.map(e => e.email));
        }

        if (recipientEmails.length === 0) {
            return { status: 400, data: { message: 'No recipients found' } };
        }

        const transporter = nodemailer.createTransport({
            service: 'gmail', 
            auth: {
                user: process.env.EMAIL_USER, 
                pass: process.env.EMAIL_PASS  
            }
        });

        let successEmails = [];
        let failedEmails = [];

        // Send emails one by one
        for (const email of recipientEmails) {
            try {
                const mailOptions = {
                    from: process.env.EMAIL_USER,
                    to: email,
                    subject: "📢 Quick Update from Advice Fit",
                    text: message
                };

                let sendResult = await transporter.sendMail(mailOptions);
                
                if (sendResult.accepted.includes(email)) {
                    successEmails.push(email);
                } else {
                    failedEmails.push({ email, reason: "Undeliverable" });
                }
            } catch (error) {
                console.error(`Failed to send email to ${email}:`, error.message);
                failedEmails.push({ email, reason: error.message });
            }
        }

        // Determine final status
        let finalStatus = successEmails.length === recipientEmails.length
            ? 'Sent'
            : successEmails.length > 0
            ? 'Partial Success'
            : 'Failed';

        // Store email in DB
        let emailRecord = new Email({
            userId,
            center,
            to,
            message,
            sentTo: successEmails,
            failedRecipients: failedEmails,
            status: finalStatus,
            sentAt: successEmails.length > 0 ? new Date() : null
        });

        await emailRecord.save();

        return {
            status: 200,
            data: {
                message: 'Email processing completed',
                totalRecipients: recipientEmails.length,
                sent: successEmails.length,
                failed: failedEmails.length
            }
        };
    } catch (error) {
        console.error('Error processing bulk email:', error);
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
