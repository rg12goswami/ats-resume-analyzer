import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center px-8 py-5 border-b border-gray-800">
      
      <h1 className="text-2xl font-bold text-blue-500">
        ATS Analyzer
      </h1>

      <div className="flex gap-6">
        <Link to="/">Home</Link>
        <Link to="/upload">Upload</Link>
      </div>

    </nav>
  );
};

export default Navbar;