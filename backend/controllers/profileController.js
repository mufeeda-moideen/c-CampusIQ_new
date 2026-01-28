const pool = require("../db");

//get user profile
exports.getProfile = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT fullname, email, phone, dob, location, category
       FROM users
       WHERE id = $1`,
      [req.user.id]
    );

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch profile" });
  }
};

//update user profile
exports.updateProfile = async (req, res) => {
  const { phone, dob, location, category } = req.body;

  try {
    await pool.query(
  `UPDATE users
   SET phone = $1,
       dob = $2,
       location = $3,
       category = $4,
       is_profile_complete = true
   WHERE id = $5`,
  [phone, dob, location, category, req.user.id]
);


    res.json({ message: "Profile updated successfully" });
  } catch (err) {
    res.status(500).json({ message: "Profile update failed" });
  }
};


