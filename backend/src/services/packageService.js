const Package = require("../models/packageModel");

exports.createPackage = async (packageData) => {
  const newPackage = new Package(packageData);
  return await newPackage.save();
};

exports.getPackages = async (centerId, userId) => {
  const filter = { isDeleted: false, createdBy: userId }; // Filter by userId

  if (centerId) {
    filter.center = centerId;
  }

  return await Package.find(filter).populate("center", "name centerCode");
};

exports.getPackageById = async (id, userId) => {
  const filters = {
    _id: id,
    isDeleted: false,
  };

  if (userId) {
    filters.createdBy = userId;
  }

  return await Package.findOne(filters).populate("center", "name centerCode");
};

exports.updatePackage = async (id, updateData, userId) => {
  return await Package.findOneAndUpdate(
    { _id: id, createdBy: userId }, // Ensure the package belongs to the authenticated user
    { $set: updateData },
    { new: true, runValidators: true }
  );
};

exports.deletePackage = async (id, userId) => {
  return await Package.findOneAndUpdate(
    { _id: id, createdBy: userId }, // Ensure the package belongs to the authenticated user
    { $set: { isDeleted: true } },
    { new: true }
  );
};
