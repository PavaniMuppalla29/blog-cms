const express = require("express");
const router = express.Router();
const { getUserById, getAllUsers } = require("../controllers/userController");

// GET /api/users/:id
router.get("/:id", getUserById);
router.get("/", getAllUsers);
module.exports = router;
