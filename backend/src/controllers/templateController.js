const templateService = require("../services/templateService");

exports.getTemplates = async (req, res) => {
  try {
    const templates = await templateService.getTemplates();
    res.status(200).json({ success: true, templates });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};