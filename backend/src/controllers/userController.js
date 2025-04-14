const UserService = require("../services/userService");
const MemberService = require("../services/memberService");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Role = require("../models/rolesModel");
const Right = require("../models/rightModel");
const LoginHistory = require("../models/loginHistory");

// Signup Controller
exports.signup = async (req, res) => {
  try {
    const { email, password, ...rest } = req.body;

    // Check if the email already exists
    const existingUser = await UserService.findUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    const adminRole = await Role.findOne({ name: "Admin" });
    if (!adminRole) {
      return res.status(400).json({ message: "Admin role not found!" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = await UserService.createUser({
      email,
      password: hashedPassword,
      role: adminRole._id,
      ...rest,
    });

    res
      .status(201)
      .json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Login Controller
exports.login = async (req, res) => {
  try {
    const { email, password, role } = req.body;    
    let user;
    
    if (role === "Admin") {
      user = await UserService.findUserByEmail(email);
      if (!user) {
        return res.status(404).json({ message: "Admin not found" });
      }
    } else if (role === "Member") {
      user = await UserService.findMemberByEmail(email);
      if (!user) {
        return res.status(404).json({ message: "Member not found" });
      }
    } else {
      return res.status(400).json({ message: "Invalid role provided" });
    }

    // Check if the password is correct
    const isPasswordValid = bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate a Tokens
    const  { accessToken  } = await user.generateTokens(role);
    // user.refreshTokens.push({ token: refreshToken, expires });
    // await user.save();

    // Add login history
    const loginHistory = new LoginHistory({ userId: user._id , createdAt: new Date() });
    await loginHistory.addLoginHistory();

    res.cookie("authToken", accessToken, {
      httpOnly: true,
      // maxAge: 86400000,
      sameSite: "lax",
      path: "/",
    });
    
    res.status(200).json({ message: "Login successful" , token : accessToken });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.logout = async (_req, res) => {
  try {    
    res.setHeader('Set-Cookie', [`authToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; Secure; SameSite=Strict`]);
    res.status(200).json({ message: 'Logout Successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Me Route
exports.getMe = async (req, res) => {
  try {
    // Send user data from req using middleware
    
    res.status(200).json({ user: req?.user || "" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Validate Member link
exports.validateMemberLink = async (req, res) => {
  try {
    const { id } = req.params;

    const member = await MemberService.findMemberById(id);

    if (!member || member.is_password_set) {
      return res.status(400).json({
        isMemberPassLinkValid: false,
        message:
          "Link is invalid or password is already set. Please contact the administrator for more queries.",
      });
    }

    return res.status(200).json({
      isMemberPassLinkValid: true,
      message: "Link is valid.",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Set Member Password
exports.setMemberPassword = async (req, res) => {
  try {
    const { id } = req.params;

    const { password } = req.body;

    if (!password) {
      return res.status(400).json({ message: "Password is required." });
    }

    const member = await MemberService.findMemberById(id);

    if (!member) {
      return res.status(400).json({ message: "member not found" });
    }

    if (member.is_password_set) {
      return res
        .status(400)
        .json({ message: "Password is already set for this member." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const updateData = {
      password: hashedPassword,
      is_password_set: true,
    };
    const updatedMember = await MemberService.updateMember(id, updateData);

    return res.status(200).json({
      member: updatedMember,
      message: "Password has been successfully set.",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get All Roles
exports.getAllRoles = async (req, res) => {
  try {
    const roles = await Role.find(); // Populate associated rights
    res.status(200).json(roles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get All Rights
exports.getAllRights = async (req, res) => {
  try {
    const rights = await Right.find(); // Fetch all rights
    res.status(200).json(rights);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getLoginHistory = async (req, res) => {
  try {
      const history = await UserService.getHistory();
      res.status(201).json({ success: true, history });
  } catch (error) {
      res.status(400).json({ success: false, message: error.message });
  }
};
