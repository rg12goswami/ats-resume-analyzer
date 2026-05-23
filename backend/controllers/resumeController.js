const fs = require("fs");
const pdfParse = require("pdf-parse/lib/pdf-parse");
const analyzeResumeWithGemini = require("../services/geminiService");

const uploadResume = async (req, res) => {
  console.log("Route hit");

  try {

    const filePath = req.file.path;

    const jobDescription = req.body.jobDescription;

    const dataBuffer = fs.readFileSync(filePath);

    const pdfData = await pdfParse(dataBuffer);

    const aiAnalysis = await analyzeResumeWithGemini(
  pdfData.text,
  jobDescription
);

    res.json({
      success: true,
      analysis: aiAnalysis,
    });

  } catch (error) {

    console.log(error.message);
console.log(error);

    res.status(500).json({
      success: false,
      message: "Resume analysis failed",
    });

  }

};

module.exports = {
  uploadResume,
};