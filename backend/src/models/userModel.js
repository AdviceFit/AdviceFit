const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
  gym_name: {
    type: String,
    required: true,
  },
  gym_owner_name: {
    type: String,
    required: true,
  },
  number: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  role: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Role",
    required: true,
  },
  describe: {
    type: String,
    required: false,
  },
  country: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  pincode: {
    type: Number,
    required: true,
  },
  refreshTokens: [
    {
      token: {
        type: String,
        required: true,
      },
      expires: {
        type: Date,
        required: true,
      },
    },
  ],
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

userSchema.methods.generateTokens = async function (role , refresh) {
  const accessToken = jwt.sign(
    { id: this._id, email: this.email, role, expires: "5h" },
    process.env.JWT_SECRET,
    { expiresIn: "5h" }
  );

  if (refresh) {
    return { accessToken };
  }

  const refreshToken = crypto.randomBytes(64).toString("hex");
  const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days
  return { accessToken, refreshToken, expires };
};

module.exports = mongoose.model("User", userSchema);
