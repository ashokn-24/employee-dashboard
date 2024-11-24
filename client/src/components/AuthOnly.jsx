/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import Spinner from "./Spinner";
import { toast } from "react-hot-toast";

const AuthOnly = ({ children }) => {
  const { loading, user } = useUser();

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner />
      </div>
    );
  }

  if (!user) {
    toast.error("You must be logged in to access this page.", {
      id: "auth-toast",
    });

    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};

export default AuthOnly;
