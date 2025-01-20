const Center = require('../models/centerModel');

exports.createCenter = async (centerData) => {
    return await Center.create(centerData);
};

exports.getAllCenters = async () => {
    return await Center.find({ isDeleted: false }).populate('createdBy', 'name email');
};

exports.getCenterById = async (id) => {
    return await Center.findOne({ _id: id, isDeleted: false }).populate('createdBy', 'name email');
};

exports.updateCenter = async (id, updateData) => {
    return await Center.findOneAndUpdate({ _id: id, isDeleted: false }, updateData, {
        new: true,
        runValidators: true,
    });
};

exports.deleteCenter = async (id) => {
    const center = await Center.findOne({ _id: id, isDeleted: false });
    if (!center) return null;
    center.isDeleted = true;
    return await center.save();
};

exports.getCentersByUser = async (userId) => {
    return await Center.find({ createdBy: userId, isDeleted: false }).populate('createdBy', 'name email');
};
