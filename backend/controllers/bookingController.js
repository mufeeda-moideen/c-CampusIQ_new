const pool = require("../db");

exports.getBookings = async (req, res) => {
  const result = await pool.query("SELECT * FROM bookings ORDER BY id DESC");
  res.json(result.rows);
};

exports.updateBookingStatus = async (req, res) => {
  const { status } = req.body;
  const result = await pool.query(
    "UPDATE bookings SET status=$1 WHERE id=$2 RETURNING *",
    [status, req.params.id]
  );
  res.json(result.rows[0]);
};
