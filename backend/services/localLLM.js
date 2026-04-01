async function askLocalLLM(prompt) {
  // Try Gemini first for faster response
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const systemPrompt = `You are CampusIQ AI Assistant, a friendly and knowledgeable college and career guidance expert for Indian students.

Your role:
- Help with college recommendations, career advice, admissions, scholarships
- Be conversational and engaging
- Provide accurate information about Indian education system
- Ask clarifying questions when needed
- Keep responses helpful and relevant

Guidelines:
- Be friendly and approachable
- Use simple language
- Provide specific, actionable advice
- If unsure, admit it and suggest alternatives
- Focus on education and career topics

Respond naturally to: ${prompt}`;

    const result = await model.generateContent([systemPrompt, prompt]);
    const response = await result.response;
    return response.text();
  } catch (err) {
    console.log("Gemini failed, using local LLM");
    // Fallback to local LLM with conversational prompt
    const systemPrompt = `You are CampusIQ AI Assistant, a friendly college and career guidance expert for Indian students.

Be conversational, helpful, and focus on education/career topics. Keep responses engaging and relevant.

User: ${prompt}

Assistant:`;

    const res = await fetch("http://localhost:11434/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "phi3:mini",
        prompt: systemPrompt,
        stream: false,
        options: {
          num_predict: 150,  // Allow longer responses
          temperature: 0.8   // More creative responses
        }
      })
    });

    const data = await res.json();
    return data.response;
  }
}

module.exports = { askLocalLLM };
