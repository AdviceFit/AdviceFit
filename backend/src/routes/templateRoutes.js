const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const templateConteller = require("../controllers/templateController");

const router = express.Router();

router.get(
  "/",
  authMiddleware.authenticate,
  templateConteller.getTemplates
);

module.exports = router;
