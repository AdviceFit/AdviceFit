const VisitorService = require('../services/visitorService');

// Create Visitor
exports.createVisitor = async (req, res) => {
    try {
        const visitorData = req.body;
        visitorData.createdBy = req.user._id; // Assign logged-in user

        const newVisitor = await VisitorService.createVisitor(visitorData);

        res.status(201).json({ message: 'Visitor created successfully', visitor: newVisitor });
    } catch (error) {
        if (error.code === 11000) {
            res.status(400).json({ message: 'Duplicate key error', details: error.keyValue });
        } else {
            res.status(500).json({ message: error.message });
        }
    }
};

// Get All Visitors
exports.getAllVisitors = async (req, res) => {
    try {
        const visitors = await VisitorService.findAllVisitors();

        res.status(200).json({ visitors });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get All Visitors By User
exports.getVisitorsByUser = async (req, res) => {
    try {
        const userId = req.user._id; // Get the logged-in user's ID
        const visitors = await VisitorService.findVisitorsByUser(userId);

        res.status(200).json({ visitors });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get Visitor By ID
exports.getVisitorById = async (req, res) => {
    try {
        const { id } = req.params;

        const visitor = await VisitorService.findVisitorById(id);

        if (!visitor) {
            return res.status(404).json({ message: 'Visitor not found' });
        }

        res.status(200).json({ visitor });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update Visitor
exports.updateVisitor = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;
        updateData.updatedBy = req.user._id; // Assign logged-in user

        const updatedVisitor = await VisitorService.updateVisitor(id, updateData);

        if (!updatedVisitor) {
            return res.status(404).json({ message: 'Visitor not found' });
        }

        res.status(200).json({ message: 'Visitor updated successfully', visitor: updatedVisitor });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete Visitor
exports.deleteVisitor = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedVisitor = await VisitorService.updateVisitor(id, {
            isDeleted: true,
            updatedBy: req.user._id,
        });

        if (!deletedVisitor) {
            return res.status(404).json({ message: 'Visitor not found' });
        }

        res.status(200).json({ message: 'Visitor deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
