/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from "react";
import api from "../utils/axiosConfig";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const EmployeeContext = createContext();

export const EmployeeProvider = ({ children }) => {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [loading, setLoading] = useState(false);

  const getAllEmployees = async (queryParams = "") => {
    setLoading(true);
    try {
      const res = await api.get(`/employee/get-all${queryParams}`);
      setEmployees(res.data.employees);
    } catch (error) {
      toast.error("Failed to fetch employees. Please try again.");
      console.error("Error fetching all employees:", error);
    } finally {
      setLoading(false);
    }
  };

  const getEmployee = async (id) => {
    setLoading(true);
    try {
      const res = await api.get(`/employee/get/${id}`);
      console.log("response", res.data);
      setSelectedEmployee(res.data.employee);
    } catch (error) {
      toast.error("Failed to fetch employee details.");
      console.error("Error fetching employee:", error);
    } finally {
      setLoading(false);
    }
  };

  const createEmployee = async (payload) => {
    setLoading(true);
    try {
      const res = await api.post("/employee/create", payload);
      setEmployees((prev) => [...prev, res.data.employee]);
      toast.success("Employee created successfully!");
      navigate("/emp/list");
    } catch (error) {
      toast.error("Error creating employee. Please try again.");
      console.error("Error creating employee:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateEmployee = async (id, payload) => {
    setLoading(true);
    try {
      const res = await api.put(`/employee/update/${id}`, payload);
      setEmployees((prev) =>
        prev.map((emp) => (emp.id === id ? res.data.employee : emp))
      );
      toast.success("Employee updated successfully!");
      navigate("/emp/list");
    } catch (error) {
      toast.error("Error updating employee.");
      console.error("Error updating employee:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteEmployee = async (id) => {
    setLoading(true);
    try {
      await api.delete(`/employee/delete/${id}`);
      setEmployees((prev) => prev.filter((emp) => emp.id !== id));
      toast.success("Employee deleted successfully!");
    } catch (error) {
      toast.error("Error deleting employee.");
      console.error("Error deleting employee:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <EmployeeContext.Provider
      value={{
        employees,
        selectedEmployee,
        loading,
        getAllEmployees,
        getEmployee,
        createEmployee,
        updateEmployee,
        deleteEmployee,
      }}
    >
      {children}
    </EmployeeContext.Provider>
  );
};

export const useEmployee = () => useContext(EmployeeContext);
