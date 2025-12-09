const pool = require("../db");

exports.getCounselors = async (req, res) => {
  const result = await pool.query("SELECT * FROM counselors ORDER BY id DESC");
  res.json(result.rows);
};

exports.createCounselor = async (req, res) => {
  const c = req.body;

  const result = await pool.query(
    `INSERT INTO counselors 
    (name,image,designation,specialty,expertise,education,languages,
     experience,fee,availability,rating,reviews,success_rate,total_sessions,status)
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15) RETURNING *`,
    [c.name,c.image,c.designation,c.specialty,c.expertise,c.education,c.languages,
     c.experience,c.fee,c.availability,c.rating,c.reviews,c.successRate,c.sessions,c.status]
  );

  res.json(result.rows[0]);
};

exports.updateCounselor = async (req, res) => {
  const c = req.body;

  const result = await pool.query(
    `UPDATE counselors SET
     name=$1,image=$2,designation=$3,specialty=$4,expertise=$5,education=$6,
     languages=$7,experience=$8,fee=$9,availability=$10,rating=$11,reviews=$12,
     success_rate=$13,total_sessions=$14,status=$15 WHERE id=$16 RETURNING *`,
    [c.name,c.image,c.designation,c.specialty,c.expertise,c.education,c.languages,
     c.experience,c.fee,c.availability,c.rating,c.reviews,c.successRate,c.sessions,c.status,req.params.id]
  );

  res.json(result.rows[0]);
};

exports.deleteCounselor = async (req, res) => {
  await pool.query("DELETE FROM counselors WHERE id=$1", [req.params.id]);
  res.json({ message: "Counselor deleted successfully" });
};
