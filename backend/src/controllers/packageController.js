const packageService = require("../services/packageService");

exports.createPackage = async (req, res) => {
  try {
    const packageData = req.body;
    packageData.createdBy = req.user._id; // Add authenticated user's ID as createdBy

    const newPackage = await packageService.createPackage(packageData);
    res.status(201).json({ success: true, package: newPackage });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getPackages = async (req, res) => {
  try {
    const { centerId } = req.query; // Optional filter by center
    const userId = req.user._id; // Get the authenticated user's ID

    // Pass userId to service to ensure only the user's packages are fetched
    const packages = await packageService.getPackages(centerId, userId);
    res.status(200).json({ success: true, packages: packages });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getPackageById = async (req, res) => {
  try {
    const { id } = req.params;

    const packageDetails = await packageService.getPackageById(
      id,
      req.user._id
    );

    if (!packageDetails) {
      return res
        .status(404)
        .json({ success: false, message: "Package not found" });
    }

    res.status(200).json({ success: true, packages: packageDetails });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updatePackage = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    console.log('updateData', updateData);
    const updatedPackage = await packageService.updatePackage(
      id,
      updateData,
      req.user._id
    );

    if (!updatedPackage) {
      return res.status(404).json({
        success: false,
        message: "Package not found or not authorized",
      });
    }

    res.status(200).json({ success: true, package: updatedPackage });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deletePackage = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedPackage = await packageService.deletePackage(id, req.user._id);

    if (!deletedPackage) {
      return res.status(404).json({
        success: false,
        message: "Package not found or not authorized",
      });
    }

    res
      .status(200)
      .json({ success: true, message: "Package deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
