const MemberService = require('../services/memberService');
const nodemailer = require('nodemailer');

// Function to send email
exports.sendConfirmationEmail = async (memberEmail, memberName, memberPassLink) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        }
    });

    // Define the email options
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: memberEmail,
        subject: 'Welcome to Our Service – Set Your Password',
        text: `Hi ${memberName},\n\nThank you for joining us! We are excited to have you as a member.\n\nTo complete your registration, please set your password by clicking the link below:\n\n${memberPassLink}\n\nBest Regards,\nThe Team`, // plain text body
        html: `<p>Hi ${memberName},</p><p>Thank you for joining us! We are excited to have you as a member.</p><p>To complete your registration, please set your password by clicking the link below:</p><p><a href="${memberPassLink}">Set Your Password</a></p><p>Best Regards,<br>The Team</p>` // HTML body
    };

    try {
        // Send email
        await transporter.sendMail(mailOptions);
        console.log('Confirmation email sent to ' + memberEmail);
    } catch (error) {
        console.error('Error sending email:', error);
    }
}

// Create Member
exports.createMember = async (req, res) => {
    try {
        const memberData = req.body;

        // Add the createdBy field from the logged-in user's ID
        memberData.createdBy = req.user._id;

        const newMember = await MemberService.createMember(memberData);

        const memberPassLink = `${process.env.MEMBER_PASS_SET_LINK}={newMember?._id}`;
        const updateData = { password_set_link: memberPassLink };

        await MemberService.updateMember(newMember?._id, updateData);

        await sendConfirmationEmail(newMember?.email, newMember?.name, memberPassLink);
        res.status(201).json({ message: 'Member created successfully', member: newMember });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get All Members
exports.getAllMembers = async (req, res) => {
    try {
        const members = await MemberService.findAllMembers();
        res.status(200).json({ members });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all members created by the logged-in user
exports.getMembersByUser = async (req, res) => {
    try {
        const userId = req.user._id; // Get the logged-in user's ID from req.user
        // console.log("Fetching members for user:", userId);

        // Fetch members associated with this user
        const members = await MemberService.findMembersByUser(userId);

        res.status(200).json({ members });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get Member By ID
exports.getMemberById = async (req, res) => {
    try {
        const { id } = req.params;

        const member = await MemberService.findMemberById(id);

        if (!member) {
            return res.status(404).json({ message: 'Member not found' });
        }

        res.status(200).json({ member });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update Member
exports.updateMember = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        // Add the updatedBy field from the logged-in user's ID
        updateData.updatedBy = req.user._id;

        const updatedMember = await MemberService.updateMember(id, updateData);

        if (!updatedMember) {
            return res.status(404).json({ message: 'Member not found' });
        }

        res.status(200).json({ message: 'Member updated successfully', member: updatedMember });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete Member
exports.deleteMember = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedMember = await MemberService.updateMember(id, {
            isDeleted: true,
            deletedBy: req.user._id,
        });

        if (!deletedMember) {
            return res.status(404).json({ message: 'Member not found' });
        }

        res.status(200).json({ message: 'Member deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
