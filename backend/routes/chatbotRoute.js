const express = require("express");
const pool = require("../db.js"); 
const { model } = require("../gemini.js");

const router = express.Router();

router.post("/", async (req, res) => {
  const { userId, question } = req.body;
    console.log(req.body);
  try {
    // Fetch colleges
    const colleges = await pool.query("SELECT * FROM college");

    // Optional: fetch chat history
    const chatHistory = await pool.query(
      "SELECT * FROM chats WHERE user_id = $1 ORDER BY created_at ASC",
      [userId]
    );

    const actualData = {
      colleges: colleges.rows,
      chatHistory: chatHistory.rows
    };

    // Construct prompt for Gemini
    const prompt = `
      You are a College Recommendation Assistant.
      Answer ONLY using the real data below. Never make up colleges or cutoffs.

      === REAL DATA ===
      ${JSON.stringify(actualData, null, 2)}

      === USER QUESTION ===
      ${question}
    `;

    const result = await model.generateContent(prompt);
    const botReply = result.response.text();

    // Save chat
    await pool.query(
      "INSERT INTO chats (user_id, user_message, bot_reply) VALUES ($1, $2, $3)",
      [userId, question, botReply]
    );

    res.json({ answer: botReply });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Chatbot failed" });
  }
});

module.exports = router;
