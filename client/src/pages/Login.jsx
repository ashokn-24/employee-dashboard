import { useState } from "react";
import { Link } from "react-router-dom";
import { useUser } from "../context/UserContext";

const Login = () => {
  const { loginUser } = useUser();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
    loginUser(formData);
  };

  return (
    <div className="bg-cover-signup bg-cover bg-center h-screen flex items-center justify-center font-sans">
      <div className="absolute inset-0 bg-black opacity-60"></div>
      <div className="relative z-10 text-white">
        <form
          className="p-6 backdrop-blur-[15px] bg-white  bg-opacity-10 text-sm rounded shadow-md w-80 max-w-sm"
          onSubmit={handleSubmit}
        >
          <h2 className="text-2xl mb-4 text-center font-bold">Login</h2>
          <div className="mb-4">
            <label
              className="block text-white font-semibold mb-2"
              htmlFor="username"
            >
              Username
            </label>
            <input
              className="w-full p-2 text-black rounded-xl"
              type="text"
              id="username"
              name="username"
              placeholder="Enter username"
              value={formData.username}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-white font-semibold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="w-full p-2 text-black rounded-xl"
              type="password"
              placeholder="Enter your password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <button
            className="w-full bg-blue-500 text-white p-2 rounded-lg hover:scale-105 transition-all duration-300 hover:bg-blue-600"
            type="submit"
          >
            Login
          </button>
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-300">
              Don`t have an account?{" "}
              <Link href="/login" className="text-blue-400 hover:underline">
                Sign Up
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
