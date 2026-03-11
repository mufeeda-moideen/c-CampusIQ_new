const express = require("express");
const pool = require("../db");
const router = express.Router();
const adminAuth = require("../middleware/adminAuth");


// ---------------------------------------------
// GET ALL COLLEGES
// ---------------------------------------------
router.get("/colleges", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM college ORDER BY name");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});


// ---------------------------------------------
// ADD NEW COLLEGE
// ---------------------------------------------
router.post("/colleges", adminAuth, async (req, res) => {

  const {
    name,
    location,
    courses,
    cutoff_rank,
    fee,
    hostel_available,
    teaching_style,
    placement_rate,
    college_type,
    campus_type
  } = req.body;

  try {

    const result = await pool.query(
      `INSERT INTO college
      (name, location, courses, cutoff_rank, fee, hostel_available, teaching_style, placement_rate, college_type, campus_type)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
      RETURNING *`,
      [
        name,
        location,
        courses,
        cutoff_rank,
        fee,
        hostel_available,
        teaching_style,
        placement_rate,
        college_type,
        campus_type
      ]
    );

    res.json(result.rows[0]);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});


// ---------------------------------------------
// SMART RECOMMENDATION SYSTEM
// Priority: Location > Course > Rank
// ---------------------------------------------
router.post("/recommendations", async (req, res) => {

  const {
    rank,
    location,
    course,
    budget,
    campusType,
    collegeType
  } = req.body;

  try {

    // --------------------------------
    // Fetch all colleges
    // --------------------------------
    const result = await pool.query("SELECT * FROM college");
    let colleges = result.rows;


    // --------------------------------
    // FIT SCORE FUNCTION
    // --------------------------------
    function calculateFitScore(college) {

      let score = 0;

      // 1️⃣ LOCATION PRIORITY (50%)
      if (location && college.location) {
        if (
          college.location.toLowerCase().includes(location.toLowerCase())
        ) {
          score += 50;
        }
      }

      // 2️⃣ COURSE MATCH (30%)
      if (course && college.courses) {
        if (
          college.courses.toLowerCase().includes(course.toLowerCase())
        ) {
          score += 30;
        }
      }

      // 3️⃣ RANK COMPATIBILITY (20%)
      if (rank && college.cutoff_rank) {

        if (rank <= college.cutoff_rank) {
          score += 20;
        } else {

          const diff = rank - college.cutoff_rank;
          score += Math.max(0, 20 - diff / 100);
        }
      }


      // 4️⃣ BUDGET BONUS
      if (budget) {

        if (budget === "low" && college.fee <= 50000) score += 5;

        if (budget === "mid" && college.fee <= 150000) score += 5;

        if (budget === "high") score += 5;
      }


      // 5️⃣ CAMPUS TYPE BONUS
      if (campusType && college.campus_type === campusType) {
        score += 5;
      }


      // 6️⃣ COLLEGE TYPE BONUS
      if (collegeType && college.college_type === collegeType) {
        score += 5;
      }


      // 7️⃣ EXTRAS
      if (college.hostel_available) score += 2;

      if (college.teaching_style === "modern") score += 2;


      return Math.round(score);
    }


    // --------------------------------
    // Apply score
    // --------------------------------
    colleges = colleges.map(college => ({
      ...college,
      fit_score: calculateFitScore(college)
    }));


    // --------------------------------
    // Sort by score
    // --------------------------------
    colleges.sort((a, b) => b.fit_score - a.fit_score);


    // --------------------------------
    // Return Top 10
    // --------------------------------
    colleges = colleges.slice(0, 10);


    res.json(colleges);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});


// ---------------------------------------------
// DELETE COLLEGE
// ---------------------------------------------
router.delete("/colleges/:id", adminAuth, async (req, res) => {

  const { id } = req.params;

  try {

    const result = await pool.query(
      "DELETE FROM college WHERE id = $1 RETURNING *",
      [id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "College not found" });
    }

    res.json({ message: "College deleted successfully" });

  } catch (err) {

    console.error(err);
    res.status(500).json({ error: "Server error" });

  }
});

module.exports = router;