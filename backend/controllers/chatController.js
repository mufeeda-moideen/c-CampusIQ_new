const { ruleEngine } = require("../services/ruleEngine");
const { askLocalLLM } = require("../services/localLLM");
const { getCachedAnswer, saveCache } = require("../services/cacheService");

async function chat(req, res) {
  const { message } = req.body;

  // 1️⃣ Rule-based (FREE)
  const ruleReply = ruleEngine(message);
  if (ruleReply) {
    return res.json({ reply: ruleReply, source: "rule" });
  }

  // 2️⃣ Cache (FREE)
  const cached = await getCachedAnswer(message);
  if (cached) {
    return res.json({ reply: cached, source: "cache" });
  }

  // 3️⃣ Local AI (FREE)
  const aiReply = await askLocalLLM(message);

  await saveCache(message, aiReply);

  res.json({ reply: aiReply, source: "local-llm" });
}

module.exports = {
  chat
};
