const intents = require("../data/intents.json");

function ruleEngine(message) {
  const text = message.toLowerCase();

  for (let intent of intents) {
    if (intent.keywords.some(k => text.includes(k))) {
      return intent.response;
    }
  }
  return null;
}

module.exports = {
  ruleEngine
};
