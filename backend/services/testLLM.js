const { askLocalLLM } = require("./localLLM");

(async () => {
  try {
    const response = await askLocalLLM("Explain AI in one sentence");
    console.log("LLM Response:");
    console.log(response);
  } catch (err) {
    console.error("Error calling LLM:", err);
  }
})();