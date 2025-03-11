const nodemailer = require('nodemailer');
const Email = require('../models/emailModel');
const Visitor = require('../models/visitorModel');
const Member = require('../models/memberModel');
const Employee = require('../models/employeeModel');

exports.processEmail = async (userId, center, to, message) => {
    try {
        if (!to || to.length === 0) {
            return { status: 400, data: { message: 'No recipient categories provided' } };
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

        // Remove duplicates & filter invalid emails
        recipientEmails = [...new Set(recipientEmails)].filter(email => email && email.includes('@'));

        if (recipientEmails.length === 0) {
            return { status: 400, data: { message: 'No valid recipients found' } };
        }
        // console.log('recipientEmails', recipientEmails)
        // Setup Email Transporter
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        let successEmails = [];
        let failedEmails = [];

        // Attempt BCC Bulk Send
        try {
            await transporter.sendMail({
                from: process.env.EMAIL_USER,
                bcc: recipientEmails,
                subject: "📢 Quick Update from Advice Fit",
                text: message
            });
            successEmails = recipientEmails;
        } catch (bulkError) {
            console.error('⚠ Bulk email sending failed:', bulkError.message);


            // TO-DO for Error handling
            // for (let email of recipientEmails) {
            //     try {
            //         await transporter.sendMail({
            //             from: process.env.EMAIL_USER,
            //             to: email,
            //             subject: "📢 Quick Update from Advice Fit",
            //             text: message
            //         });
            //         successEmails.push(email);
            //     } catch (individualError) {
            //         console.error(`Failed to send email to ${email}:`, individualError.message);
            //         failedEmails.push({ email, reason: individualError.message });
            //     }
            // }
        }

        // Determine final email status
        let finalStatus = successEmails.length === recipientEmails.length
            ? 'Sent'
            : successEmails.length > 0
                ? 'Partial Success'
                : 'Failed';

        // Store email record in DB
        await new Email({
            userId,
            center,
            to,
            message,
            sentTo: successEmails,
            failedRecipients: failedEmails,
            status: finalStatus,
            sentAt: successEmails.length > 0 ? new Date() : null
        }).save();

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
        console.error(' Error processing bulk email:', error.message);
        return { status: 500, data: { message: 'Internal server error', error: error.message } };
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
