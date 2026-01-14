const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Use "auto" so Google selects the best model for you
const model = genAI.getGenerativeModel({ model: "auto" });

module.exports = { genAI, model };
