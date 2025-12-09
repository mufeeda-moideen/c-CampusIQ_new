const pool = require("../db");

// ✅ LIVE SESSIONS
exports.getLiveSessions = async (req, res) => {
  const result = await pool.query(
    "SELECT * FROM career_sessions ORDER BY date ASC"
  );
  res.json(result.rows);
};

// ✅ COUNSELORS
exports.getCounselors = async (req, res) => {
  const result = await pool.query(
    "SELECT * FROM counselors WHERE status = 'active' ORDER BY id DESC"
  );
  res.json(result.rows);
};

// ✅ USER BOOKINGS
exports.getUserBookings = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "SELECT * FROM bookings WHERE id = $1",
      [id]
    );

    res.json(result.rows);
  } catch (err) {
    console.error("BOOKING API ERROR:", err.message);
    res.status(500).json({ error: "Server error in bookings API" });
  }
};


// ✅ RESOURCES
exports.getResources = async (req, res) => {
  const result = await pool.query(
    "SELECT * FROM resources WHERE status = 'active' ORDER BY id DESC"
  );

  res.json(result.rows);
};
