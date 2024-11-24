import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AuthOnly from "./components/AuthOnly";
import EmployeeForm from "./pages/EmployeeForm";
import Layout from "./components/Layout";
import DataGrid from "./components/DataGrid";

const App = () => {
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<Layout />}>
          <Route
            index
            element={
              <AuthOnly>
                <Dashboard />
              </AuthOnly>
            }
          />
          <Route
            path="emp/create"
            element={
              <AuthOnly>
                <EmployeeForm />
              </AuthOnly>
            }
          />
          <Route
            path="emp/update/:id"
            element={
              <AuthOnly>
                <EmployeeForm />
              </AuthOnly>
            }
          />
          <Route
            path="emp/list"
            element={
              <AuthOnly>
                <DataGrid />
              </AuthOnly>
            }
          />
        </Route>
      </Routes>
    </>
  );
};

export default App;
