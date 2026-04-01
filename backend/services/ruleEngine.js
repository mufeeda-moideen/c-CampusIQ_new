const intents = require("../data/intents.json");

function ruleEngine(message) {
  const text = message.toLowerCase();

  // Find the most specific match
  let bestMatch = null;
  let bestScore = 0;

  for (let intent of intents) {
    for (let keyword of intent.keywords) {
      if (text.includes(keyword)) {
        // Score based on keyword length and position
        const score = keyword.length + (text.indexOf(keyword) === 0 ? 10 : 0);
        if (score > bestScore) {
          bestScore = score;
          bestMatch = intent;
        }
      }
    }
  }

  return bestMatch ? bestMatch.response : null;
}

module.exports = {
  ruleEngine
};
