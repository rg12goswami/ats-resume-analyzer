const Home = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-5xl font-bold mb-4">
          ATS Resume Analyzer
        </h1>

        <p className="text-gray-400 mb-6">
          Optimize your resume for ATS systems
        </p>

        <button className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl font-semibold">
          Upload Resume
        </button>
      </div>
    </div>
  )
}

export default Home