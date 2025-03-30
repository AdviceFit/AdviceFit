const MemberService = require("../services/memberService");
const SubscriptionService = require("../services/subscriptionsService");
const PaymentService = require("../services/paymentsService");
const nodemailer = require("nodemailer");
const Role = require("../models/rolesModel");

// Function to send email
exports.sendConfirmationEmail = async (
  memberEmail,
  memberName,
  memberPassLink
) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // Define the email options
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: memberEmail,
    subject: "Welcome to Our Service – Set Your Password",
    text: `Hi ${memberName},\n\nThank you for joining us! We are excited to have you as a member.\n\nTo complete your registration, please set your password by clicking the link below:\n\n${memberPassLink}\n\nBest Regards,\nThe Team`, // plain text body
    html: `<p>Hi ${memberName},</p><p>Thank you for joining us! We are excited to have you as a member.</p><p>To complete your registration, please set your password by clicking the link below:</p><p><a href="${memberPassLink}">Set Your Password</a></p><p>Best Regards,<br>The Team</p>`, // HTML body
  };

  try {
    // Send email
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

// Create Member
exports.createMember = async (req, res) => {
  try {
    const userId = req.user._id;
    const memberData = req.body;

    const checkMemberExistence = await MemberService.findMemberByFilter({
      email: memberData.email,
    });

    if (checkMemberExistence) {
      return res.status(400).json({ error: "Member already exists" });
    }

    const memberRole = await Role.findOne({ name: "Member" });
    if (!memberRole) {
      return res.status(400).json({ message: "Member role not found!" });
    }
    memberData.role = memberRole._id;
    // Add the createdBy field from the logged-in user's ID
    memberData.createdBy = userId;

    const newMember = await MemberService.createMember(memberData);

    const memberPassLink = `${process.env.MEMBER_PASS_SET_LINK}={newMember?._id}`;
    const updateData = { password_set_link: memberPassLink };

    await MemberService.updateMember(newMember?._id, updateData);

    if (memberData?.subscription) {
      const subscriptionData = {
        ...memberData?.subscription,
        packageId: memberData?.subscription?.package,
        memberId: newMember?._id,
        createdBy: userId,
        updatedBy: userId,
      };

      const newSubscription = await SubscriptionService.createSubscription(
        subscriptionData
      );

      const {
        offerAmount,
        paidAmount,
        paymentDate,
        paymentDueDate,
        paymentMode,
        comments,
      } = memberData?.subscription || {};

      const dueAmount = Math.max(offerAmount - paidAmount, 0);

      const paymentData = {
        offerAmount,
        paidAmount,
        dueAmount,
        paymentDate,
        paymentDueDate,
        paymentMode,
        comments,
        memberId: newMember?._id,
        subscriptionId: newSubscription?._id,
        createdBy: userId,
        updatedBy: userId,
      };

      console.log(paymentData);

      const newPayment = await PaymentService.createPayment(paymentData);
      await SubscriptionService.updateSubscription(
        userId,
        newSubscription?._id,
        { payments: [newPayment?._id] }
      );
    }
    await this.sendConfirmationEmail(
      newMember?.email,
      newMember?.name,
      memberPassLink
    );
    res
      .status(201)
      .json({ message: "Member created successfully", member: newMember });
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
      return res.status(404).json({ message: "Member not found" });
    }

    const subscription = await SubscriptionService.findSubscriptionById(id, true);

    res.status(200).json({
      ...member.toObject(), 
      subscription, 
    });
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
      return res.status(404).json({ message: "Member not found" });
    }

    // Find existing subscription details using memberId
    const existingSubscription = await SubscriptionService.findSubscriptionById(id, true);

    if (existingSubscription) {
      // Prepare subscription update data
      let subscriptionUpdateData = {
        updatedBy: req.user._id, // Assign updatedBy field
      };

      if (updateData.subscription) {
        // Update subscription fields only if they are provided in request
        const {
          package: packageId,
          promoCoupon,
          offerAmount,
          paymentDate,
          startDate,
          paidAmount,
          paymentMode,
          paymentDueDate,
          comments,
        } = updateData.subscription;

        if (packageId) subscriptionUpdateData.packageId = packageId;
        if (promoCoupon) subscriptionUpdateData.promoCoupon = promoCoupon;
        if (offerAmount !== undefined) subscriptionUpdateData.offerAmount = offerAmount;
        if (paymentDate) subscriptionUpdateData.paymentDate = paymentDate;
        if (startDate) subscriptionUpdateData.startDate = startDate;
        if (paidAmount !== undefined) subscriptionUpdateData.paidAmount = paidAmount;
        if (paymentMode) subscriptionUpdateData.paymentMode = paymentMode;
        if (paymentDueDate) subscriptionUpdateData.paymentDueDate = paymentDueDate;
        if (comments) subscriptionUpdateData.comments = comments;

        // Update Subscription details
        const updatedSubscription = await SubscriptionService.updateSubscription(
          req.user._id,
          existingSubscription._id,
          subscriptionUpdateData
        );

        if (!updatedSubscription) {
          return res.status(404).json({ message: "Subscription update failed" });
        }
      }
    }

    res.status(200).json({
      message: "Member updated successfully",
      member: updatedMember,
    });
  } catch (error) {
    console.error("Error updating member:", error);
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
      return res.status(404).json({ message: "Member not found" });
    }

    res.status(200).json({ message: "Member deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
