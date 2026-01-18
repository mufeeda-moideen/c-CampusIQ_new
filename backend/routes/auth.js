const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const pool = require("../db");

const router = express.Router();

// --- SIGNUP ---
router.post("/signup", async (req, res) => {
  const { fullname, email, password } = req.body;
  console.log("Request body:", req.body);

  if (!fullname || !email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    // Check if user already exists
    const userExists = await pool.query("SELECT * FROM users WHERE email=$1", [email]);
    if (userExists.rows.length > 0) {
      return res.status(400).json({ error: "Email already registered" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user
    const result = await pool.query(
      `INSERT INTO users (fullname, email, password, is_profile_complete)
       VALUES ($1, $2, $3, false)
       RETURNING id, fullname, email, is_profile_complete`,
      [fullname, email, hashedPassword]
    );

    const newUser = result.rows[0];

    // ✅ Generate JWT immediately
    const token = jwt.sign(
      { id: newUser.id, email: newUser.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" } // optional: longer expiry than login
    );

    // ✅ Return token + user
    res.status(201).json({
      message: "User registered successfully",
      token,
      user: newUser
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
});

// --- LOGIN (no changes needed) ---
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    // Check if user exists
    const user = await pool.query(
      "SELECT id, fullname, email, password, is_profile_complete FROM users WHERE email=$1",
      [email]
    );

    if (user.rows.length === 0) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    const dbUser = user.rows[0];

    // Compare password
    const isMatch = await bcrypt.compare(password, dbUser.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    // Generate JWT
    const token = jwt.sign(
      { id: dbUser.id, email: dbUser.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      message: "Login successful",
      token,
      user: {
        id: dbUser.id,
        fullname: dbUser.fullname,
        email: dbUser.email,
        is_profile_complete: dbUser.is_profile_complete
      }
    });

  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
