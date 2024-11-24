/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from "react";
import api, { clearAuthHeader, setAuthHeader } from "../utils/axiosConfig";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem("token") || "");

  useEffect(() => {
    if (token) {
      setAuthHeader(token);
      localStorage.setItem("token", token);
    } else {
      clearAuthHeader();
      localStorage.removeItem("token");
    }

    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [token, user]);

  const loginUser = async (payload) => {
    setLoading(true);
    try {
      const res = await api.post("/auth/login", payload);
      if (res.status === 201) {
        setUser(res.data.user);
        setToken(res.data.accessToken);
        toast.success("Login successfully");
        navigate("/");
      }
    } catch (error) {
      toast.error("Error logging in. Please try again.");
      console.error("Error logging in:", error);
    } finally {
      setLoading(false);
    }
  };

  const signupUser = async (payload) => {
    setLoading(true);
    try {
      const res = await api.post("/auth/signup", payload);
      if (res.status === 201) {
        setUser(res.data.user);
        setToken(res.data.accessToken);
        toast.success("Signed in successfully");

        navigate("/");
      }
    } catch (error) {
      toast.error("Error signing up. Please try again.");
      console.error("Error signing up:", error);
    } finally {
      setLoading(false);
    }
  };

  const logoutUser = async () => {
    setLoading(true);
    try {
      const res = await api.post("/auth/logout");
      if (res.status === 200) {
        setUser(null);
        setToken("");
        toast.success("Logout successfully");

        navigate("/login");
      }
    } catch (error) {
      toast.error("Error logging out. Please try again.");
      console.error("Error logging out:", error);
    } finally {
      setUser(null);
      setToken("");
      setLoading(false);
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        token,
        loading,
        loginUser,
        signupUser,
        logoutUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
