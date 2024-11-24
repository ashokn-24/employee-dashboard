import { Link } from "react-router-dom";
import { useUser } from "../context/UserContext";

const Dashboard = () => {
  const { user } = useUser();

  return (
    <div className="flex flex-col items-center justify-center">
      <div>
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Welcome, {user || "User"}!
        </h1>
      </div>
      <div className="flex  flex-col gap-4 space-x-4">
        <Link to={"/emp/create"}>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md shadow hover:bg-blue-700 hover:scale-105 transition-all duration-500">
            Create a new employee
          </button>
        </Link>
        <Link to={"/emp/list"}>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md shadow hover:bg-blue-700 hover:scale-105 transition-all duration-500">
            View Employee List
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
