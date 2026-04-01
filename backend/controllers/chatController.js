const { askLocalLLM } = require("../services/localLLM");
const { getCachedAnswer, saveCache } = require("../services/cacheService");

async function chat(req, res) {
  const { message } = req.body;

  // Skip rules entirely - go straight to AI
  // 1️⃣ Cache (FAST)
  const cached = await getCachedAnswer(message);
  if (cached) {
    return res.json({ reply: cached, source: "cache" });
  }

  // 2️⃣ AI Response (CONVERSATIONAL)
  const aiReply = await askLocalLLM(message);

  await saveCache(message, aiReply);

  res.json({ reply: aiReply, source: "ai" });
}

module.exports = {
  chat
};
