const pool = require("../db");

async function getCachedAnswer(question) {
  const res = await pool.query(
    "SELECT answer FROM chat_cache WHERE question = $1",
    [question]
  );
  return res.rows[0]?.answer || null;
}

async function saveCache(question, answer) {
  try {
    await pool.query(
      "INSERT INTO chat_cache(question, answer) VALUES($1,$2)",
      [question, answer]
    );
  } catch (err) {
    // ignore duplicates
  }
}

module.exports = {
  getCachedAnswer,
  saveCache
};
