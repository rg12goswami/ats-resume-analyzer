import { useLocation } from "react-router-dom";
const techKeywords = [
  "React",
  "Node.js",
  "MongoDB",
  "JavaScript",
  "TypeScript",
  "Express",
  "AWS",
  "Docker",
  "Kubernetes",
  "Python",
  "Java",
  "SQL",
  "Git",
  "REST API",
];
const Results = () => {
 const location = useLocation();

const { analysis, fileName } =
  location.state || {};
const matchedKeywords = techKeywords.filter((keyword) =>
  jobDescription?.toLowerCase().includes(keyword.toLowerCase())
);

const missingKeywords = techKeywords.filter(
  (keyword) => !matchedKeywords.includes(keyword)
);

 

  const suggestions = [
    "Add more cloud-related keywords",
    "Include measurable achievements",
    "Improve resume summary section",
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white px-6 py-10">

      <div className="max-w-6xl mx-auto">

        {/* Heading */}
        <div className="mb-10">

          <h1 className="text-5xl font-bold mb-3">
            ATS Analysis Results
          </h1>

          <p className="text-gray-400">
            AI-powered resume evaluation
          </p>

        </div>
        <p className="text-gray-500 mt-2">
  Resume: {fileName}
</p>

        {/* ATS Score */}
        <div className="bg-slate-900 border border-gray-800 rounded-3xl p-8 mb-10">

          <h2 className="text-2xl font-semibold mb-6">
            ATS Score
          </h2>

          <div className="flex items-center gap-8">

            <div className="w-40 h-40 rounded-full border-[10px] border-blue-500 flex items-center justify-center">
              
              <span className="text-4xl font-bold">
                82
              </span>

            </div>

            <div>

              <p className="text-xl mb-2">
                Great Resume Match 🚀
              </p>

              <p className="text-gray-400">
                Your resume is optimized for most ATS systems.
              </p>

            </div>

          </div>

        </div>

        {/* Keywords */}
        <div className="grid md:grid-cols-2 gap-6 mb-10">

          {/* Matched */}
          <div className="bg-slate-900 border border-gray-800 rounded-3xl p-6">

            <h2 className="text-2xl font-semibold mb-5">
              Matched Keywords
            </h2>

            <div className="flex flex-wrap gap-3">

              {matchedKeywords.map((keyword, index) => (
                <span
                  key={index}
                  className="bg-green-500/20 text-green-400 px-4 py-2 rounded-full"
                >
                  {keyword}
                </span>
              ))}

            </div>

          </div>

          {/* Missing */}
          <div className="bg-slate-900 border border-gray-800 rounded-3xl p-6">

            <h2 className="text-2xl font-semibold mb-5">
              Missing Keywords
            </h2>

            <div className="flex flex-wrap gap-3">

              {missingKeywords.map((keyword, index) => (
                <span
                  key={index}
                  className="bg-red-500/20 text-red-400 px-4 py-2 rounded-full"
                >
                  {keyword}
                </span>
              ))}

            </div>

          </div>

        </div>

        {/* Suggestions */}
        <div className="bg-slate-900 border border-gray-800 rounded-3xl p-8">

          <h2 className="text-2xl font-semibold mb-6">
            AI Suggestions
          </h2>

          <div className="space-y-4">

            {suggestions.map((suggestion, index) => (
              <div
                key={index}
                className="bg-slate-800 rounded-2xl p-5 border border-gray-700"
              >
                {suggestion}
              </div>
            ))}

          </div>
          <div className="bg-slate-900 border border-gray-800 rounded-3xl p-8 mt-10">

  <h2 className="text-2xl font-semibold mb-6">
    AI Analysis
  </h2>

  <pre className="whitespace-pre-wrap text-gray-300">
    {analysis}
  </pre>

</div>

        </div>

      </div>

    </div>
  );
};

export default Results;