import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { FiUploadCloud, FiFileText } from "react-icons/fi";
import AnalysisLoader from "../components/AnalysisLoader";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ResumePreview from "../components/ResumePreview";

const Upload = () => {
  
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
const [analysisComplete, setAnalysisComplete] = useState(false);
const [jobDescription, setJobDescription] = useState("");



  const onDrop = useCallback((acceptedFiles) => {
    const uploadedFile = acceptedFiles[0];

    if (uploadedFile) {
      setFile(uploadedFile);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        [".docx"],
    },
    multiple: false,
  });
  
const analyzeResume = async () => {
   console.log("Analyze function running");
  try {
       console.log("Before axios");
    setLoading(true);

    const formData = new FormData();

    formData.append("resume", file);

    formData.append(
      "jobDescription",
      jobDescription
    );

    const response = await axios.post(
      "http://localhost:5000/api/resume/upload",

      formData,

      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    navigate("/results", {
      state: {
        analysis: response.data.analysis,
        fileName: file.name,
      },
    });
      console.log("after axios");

  } catch (error) {

    console.log(error);

    alert("Resume analysis failed");

  } finally {

    setLoading(false);
  }
};

  return (
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-4">
      
      <div className="w-full max-w-2xl">

        <h1 className="text-4xl font-bold text-center mb-3">
          Upload Resume
        </h1>

        <p className="text-gray-400 text-center mb-10">
          Upload your resume for ATS analysis
        </p>

        {/* Dropzone */}
        <div
          {...getRootProps()}
          className={`
            border-2 border-dashed rounded-3xl p-12
            text-center cursor-pointer transition-all duration-300
            ${
              isDragActive
                ? "border-blue-500 bg-slate-900"
                : "border-gray-700 hover:border-blue-500"
            }
          `}
        >
          <input {...getInputProps()} />

          <FiUploadCloud className="text-6xl mx-auto mb-5 text-blue-500" />

          {isDragActive ? (
            <p className="text-xl">Drop the resume here...</p>
          ) : (
            <>
              <p className="text-xl font-semibold mb-2">
                Drag & Drop Resume
              </p>

              <p className="text-gray-400">
                or click to browse files
              </p>

              <p className="text-sm text-gray-500 mt-4">
                Supports PDF & DOCX
              </p>
            </>
          )}
        </div>
        <div className="mt-8">

  <label className="block mb-3 text-lg font-semibold">
    Paste Job Description
  </label>

  <textarea
    rows="8"
    value={jobDescription}
    onChange={(e) => setJobDescription(e.target.value)}
    placeholder="Paste the job description here..."
    className="
      w-full bg-slate-900 border border-gray-700
      rounded-2xl p-5 outline-none
      focus:border-blue-500
      text-gray-300
    "
  />

</div>
  
 {/* File Preview */}
        {file && (
          <div className="mt-8 bg-slate-900 border border-gray-800 rounded-2xl p-5 flex items-center gap-4">
            
            <FiFileText className="text-4xl text-blue-500" />

            <div>
              <h2 className="font-semibold text-lg">
                {file.name}
              </h2>

              <p className="text-gray-400 text-sm">
                {(file.size / 1024).toFixed(2)} KB
              </p>
            </div>

          </div>
        )}
        {file && file.type === "application/pdf" && (
  <ResumePreview file={file} />
)}
{file && (
  <button
   onClick={analyzeResume}
    disabled={!jobDescription}
    className="
      w-full mt-6 py-4 rounded-2xl
      font-semibold text-lg transition-all
      bg-blue-600 hover:bg-blue-700
      disabled:bg-gray-700 disabled:cursor-not-allowed
    "
  >
   {loading ? "Analyzing..." : "Analyze Resume"}
  </button>
)}

      </div>

    </div>
  );
};

export default Upload;