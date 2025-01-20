const centerService = require('../services/centerService');

exports.createCenter = async (req, res) => {
    try {
        const centerData = { ...req.body, createdBy: req.user._id }; // Attach the logged-in user's ID
        const center = await centerService.createCenter(centerData);
        res.status(201).json({ success: true, data: center });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

exports.getAllCenters = async (req, res) => {
    try {
        const centers = await centerService.getAllCenters();
        res.status(200).json({ success: true, data: centers });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

exports.getCenterById = async (req, res) => {
    try {
        const center = await centerService.getCenterById(req.params.id);
        if (!center) {
            return res.status(404).json({ success: false, message: 'Center not found' });
        }
        res.status(200).json({ success: true, data: center });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

exports.updateCenter = async (req, res) => {
    try {
        const updatedCenter = await centerService.updateCenter(req.params.id, req.body);
        if (!updatedCenter) {
            return res.status(404).json({ success: false, message: 'Center not found' });
        }
        res.status(200).json({ success: true, data: updatedCenter });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

exports.deleteCenter = async (req, res) => {
    try {
        const deletedCenter = await centerService.deleteCenter(req.params.id);
        if (!deletedCenter) {
            return res.status(404).json({ success: false, message: 'Center not found' });
        }
        res.status(200).json({ success: true, message: 'Center deleted successfully' });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

exports.getCentersByUser = async (req, res) => {
    try {
        const centers = await centerService.getCentersByUser(req.user._id); // Use the logged-in user's ID
        console.log("🚀 ~ exports.getCentersByUser= ~ centers:", centers)
        res.status(200).json({ success: true, data: centers });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};
