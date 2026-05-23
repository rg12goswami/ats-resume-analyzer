import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const steps = [
  "Parsing Resume...",
  "Extracting Skills...",
  "Matching Keywords...",
  "Analyzing ATS Compatibility...",
  "Generating Suggestions...",
];

const AnalysisLoader = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    if (currentStep < steps.length - 1) {
      const timer = setTimeout(() => {
        setCurrentStep((prev) => prev + 1);
      }, 1500);

      return () => clearTimeout(timer);
    } else {
      const done = setTimeout(() => {
        onComplete();
      }, 1500);

      return () => clearTimeout(done);
    }
  }, [currentStep, onComplete]);

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white px-4">
      
      <div className="w-full max-w-xl">

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-slate-900 border border-gray-800 rounded-3xl p-10"
        >

          <h1 className="text-3xl font-bold mb-8 text-center">
            AI Resume Analysis
          </h1>

          {/* Progress bar */}
          <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden mb-8">
            
            <motion.div
              className="h-full bg-blue-500"
              initial={{ width: 0 }}
              animate={{
                width: `${((currentStep + 1) / steps.length) * 100}%`,
              }}
              transition={{ duration: 0.5 }}
            />

          </div>

          {/* Steps */}
          <div className="space-y-4">

            {steps.map((step, index) => (
              <div
                key={index}
                className={`
                  p-4 rounded-xl border transition-all duration-300
                  ${
                    index <= currentStep
                      ? "border-blue-500 bg-slate-800"
                      : "border-gray-700 bg-slate-900"
                  }
                `}
              >
                <div className="flex items-center justify-between">

                  <p>{step}</p>

                  {index < currentStep && (
                    <span className="text-green-400">
                      ✓
                    </span>
                  )}

                  {index === currentStep && (
                    <motion.div
                      className="w-3 h-3 bg-blue-500 rounded-full"
                      animate={{
                        scale: [1, 1.5, 1],
                      }}
                      transition={{
                        repeat: Infinity,
                        duration: 1,
                      }}
                    />
                  )}

                </div>
              </div>
            ))}

          </div>

        </motion.div>

      </div>

    </div>
  );
};

export default AnalysisLoader;