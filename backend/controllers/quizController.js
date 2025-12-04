const pool = require("../db");
//get quiz questions and options
exports.getQuestions = async (req, res) => {
  try {
    const questions = await pool.query("SELECT * FROM quiz_questions");

    const fullQuestions = [];

    for (let q of questions.rows) {
      const options = await pool.query(
        "SELECT option_text AS text, category FROM quiz_options WHERE question_id=$1",
        [q.id]
      );

      fullQuestions.push({
        id: q.id,
        question: q.question,
        options: options.rows
      });
    }

    res.json(fullQuestions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//submit quiz answers and get recommendation
exports.submitQuiz = async (req, res) => {
  const { userId, answers } = req.body;

  try {
    const submission = await pool.query(
      "INSERT INTO quiz_submissions(user_id) VALUES($1) RETURNING id",
      [userId]
    );

    const submissionId = submission.rows[0].id;

    const categoryCount = {};

    for (let answer of answers) {
      await pool.query(
        "INSERT INTO quiz_answers(submission_id, question_id, selected_category) VALUES($1,$2,$3)",
        [submissionId, answer.questionId, answer.category]
      );

      categoryCount[answer.category] =
        (categoryCount[answer.category] || 0) + 1;
    }

    const recommendedField = Object.keys(categoryCount).reduce((a, b) =>
      categoryCount[a] > categoryCount[b] ? a : b
    );

    const results = {
      Engineering: {
        recommendedField: "Engineering",
        strengths: ["Analytical thinking", "Problem-solving", "Technical aptitude"],
        careers: ["Software Engineer", "Data Scientist", "AI Engineer"]
      },
      Medical: {
        recommendedField: "Medical Sciences",
        strengths: ["Empathy", "Scientific knowledge"],
        careers: ["Doctor", "Pharmacist"]
      },
      Arts: {
        recommendedField: "Arts & Design",
        strengths: ["Creativity", "Innovation"],
        careers: ["Designer", "Content Creator"]
      },
      Commerce: {
        recommendedField: "Commerce & Business",
        strengths: ["Leadership", "Financial intelligence"],
        careers: ["Business Analyst", "Entrepreneur"]
      }
    };

    res.json(results[recommendedField]);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

