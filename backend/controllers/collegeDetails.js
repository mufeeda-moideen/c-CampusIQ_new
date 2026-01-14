const pool = require('../db');

const getCollegeById = async (req, res) => {
  try {
    const { id } = req.params;

    const { rows } = await pool.query(
      "SELECT * FROM college WHERE id = $1",
      [id]
    );

    if (!rows.length) {
      return res.status(404).json({ message: "College not found" });
    }

    const c = rows[0];

    const response = {
      id: c.id,
      name: c.name,
      location: c.location,
      courses: c.courses,
      cutoff_rank: c.cutoff_rank,
      fee: c.fee,
      hostel_available: c.hostel_available,
      teaching_style: c.teaching_style,
      placement_rate: c.placement_rate,
      college_type: c.college_type,
      campus_type: c.campus_type,
      distance_km: c.distance_km || 25,

      fit_score: Math.round(c.ai_fit_score || 85),

      review_score: 4.4,
      review_count: 1500,

      value_ratio: Math.min(
        10,
        Math.round((c.placement_rate / c.fee) * 1000)
      ),

      website: `https://www.google.com/search?q=${encodeURIComponent(c.name)}`,

      reason:
        c.cutoff_rank <= 2000
          ? "Your rank comfortably meets the cutoff criteria."
          : "Your rank is close to cutoff; apply strategically.",

      ai_suggestion:
        "This college aligns well with your academic performance and placement expectations.",

      badges: [
        { text: "Recommended", color: "purple", icon: "Target" },
        { text: "Good Placement", color: "green", icon: "TrendingDown" }
      ],

      trend: {
        change: -3,
        text: "Cutoff slightly reduced this year",
        color: "green",
        icon: "TrendingDown"
      },

      risk: {
        level: c.cutoff_rank <= 2000 ? "Safe" : "Moderate",
        color: c.cutoff_rank <= 2000 ? "green" : "yellow"
      }
    };

    res.json(response);
  } catch (error) {
    console.error("College fetch error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getCollegeById };
