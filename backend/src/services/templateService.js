const Template = require('../models/templateModel');

exports.getTemplates = async () => {
    return await Template.find({ isDeleted: false });
};
