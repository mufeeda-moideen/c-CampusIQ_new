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

// GET saved colleges
exports.getSavedColleges = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const result = await pool.query(`
      SELECT 
        c.id,
        c.name,
        c.courses,
        sc.created_at AS saved_date
      FROM saved_colleges sc
      JOIN college c ON sc.college_id = c.id
      WHERE sc.user_id = $1
      ORDER BY sc.created_at DESC
    `, [req.user.id]);

    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch saved colleges" });
  }
};


// SAVE college
exports.saveCollege = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { collegeId } = req.body;

    await pool.query(
      `INSERT INTO saved_colleges (user_id, college_id)
       VALUES ($1, $2)
       ON CONFLICT (user_id, college_id) DO NOTHING`,
      [req.user.id, collegeId]
    );

    res.json({ message: "College saved" });
  } catch (err) {
    res.status(500).json({ message: "Failed to save college" });
  }
};


// REMOVE saved college
exports.removeSavedCollege = async (req, res) => {
  try {
    const { collegeId } = req.params;
    const { id } = req.user;

    await pool.query(
      "DELETE FROM saved_colleges WHERE user_id=$1 AND college_id=$2",
      [id, collegeId]
    );

    res.json({ message: "Removed" });
  } catch (err) {
    console.error("removeSavedCollege error:", err);
    res.status(500).json({ message: "Failed to remove saved college" });
  }
};
