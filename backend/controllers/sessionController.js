const pool = require("../db");

exports.getSessions = async (req, res) => {
  const result = await pool.query("SELECT * FROM career_sessions ORDER BY id DESC");
  res.json(result.rows);
};

exports.createSession = async (req, res) => {
  const { title, counselor, specialty, topics, date, time, duration, status, participants, rating, thumbnail } = req.body;

  const result = await pool.query(
    `INSERT INTO career_sessions 
    (title, counselor, specialty, topics, date, time, duration, status, participants, rating, thumbnail)
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) RETURNING *`,
    [title, counselor, specialty, topics, date, time, duration, status, participants, rating, thumbnail]
  );

  res.json(result.rows[0]);
};

exports.updateSession = async (req, res) => {
  const id = req.params.id;
  const data = req.body;

  const result = await pool.query(
    `UPDATE career_sessions SET
      title=$1,counselor=$2,specialty=$3,topics=$4,date=$5,
      time=$6,duration=$7,status=$8,participants=$9,rating=$10,thumbnail=$11
     WHERE id=$12 RETURNING *`,
    [data.title, data.counselor, data.specialty, data.topics, data.date, data.time,
     data.duration, data.status, data.participants, data.rating, data.thumbnail, id]
  );

  res.json(result.rows[0]);
};

exports.deleteSession = async (req, res) => {
  await pool.query("DELETE FROM career_sessions WHERE id=$1", [req.params.id]);
  res.json({ message: "Session deleted successfully" });
};
