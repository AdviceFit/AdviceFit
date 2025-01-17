const MemberService = require('../services/memberService');

// Create Member
exports.createMember = async (req, res) => {
    try {
        const memberData = req.body;

        // Add the createdBy field from the logged-in user's ID
        memberData.createdBy = req.user._id;

        const newMember = await MemberService.createMember(memberData);

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
        console.log("Fetching members for user:", userId);

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
