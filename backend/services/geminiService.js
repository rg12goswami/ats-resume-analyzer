const axios = require("axios");

const analyzeResumeWithGemini = async (
  resumeText,
  jobDescription
) => {

  try {

    const prompt = `
Analyze this resume against the given job description.

Provide:
1. ATS Score
2. Missing Keywords
3. Strengths
4. Weaknesses
5. Suggestions

Resume:
${resumeText}

Job Description:
${jobDescription}
`;

    const response = await axios.post(

      "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2",

      {
        inputs: prompt,
      },

      {
        headers: {
          Authorization: `Bearer ${process.env.HF_API_KEY}`,
        },
      }
    );

    console.log(response.data);

    return response.data[0]?.generated_text;

  } catch (error) {

    console.log("HF ERROR:");
    console.log(error.response?.data);
    console.log(error.message);

    throw error;
  }
};

module.exports = analyzeResumeWithGemini;