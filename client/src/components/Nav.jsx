import { Link } from "react-router-dom";
import { useUser } from "../context/UserContext";

const Nav = () => {
  const { user, logoutUser } = useUser();
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex space-x-4">
          <Link to="/" className="text-white hover:text-gray-400">
            Home
          </Link>
          <Link to="/emp/list" className="text-white hover:text-gray-400">
            Employee List
          </Link>
        </div>
        <div className="flex space-x-4 items-center">
          <span className="text-white border border-white px-5 py-1 rounded-md">
            {user}
          </span>
          <button
            onClick={logoutUser}
            className="text-white transition-all duration-300 hover:bg-red-400 rounded-lg px-3 py-2 hover:text-white"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
