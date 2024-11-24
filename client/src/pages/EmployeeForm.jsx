import { useEffect, useState } from "react";
import { useEmployee } from "../context/EmployeeContext";
import { useParams } from "react-router-dom";
import Spinner from "../components/Spinner";

const EmployeeForm = () => {
  const { id } = useParams();
  const {
    createEmployee,
    updateEmployee,
    getEmployee,
    selectedEmployee,
    loading,
  } = useEmployee();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    gender: "",
    designation: "",
    course: "",
    image: null,
  });

  useEffect(() => {
    if (id) {
      (async () => {
        await getEmployee(id);
      })();
    }
  }, [id]);

  useEffect(() => {
    if (id && selectedEmployee) {
      setFormData({
        name: selectedEmployee.f_name || "",
        email: selectedEmployee.f_email || "",
        mobile: selectedEmployee.f_mobile || "",
        gender: selectedEmployee.f_gender || "",
        designation: selectedEmployee.f_designation || "",
        course: selectedEmployee.f_course || "",
        image: null,
      });
    }
  }, [id, selectedEmployee]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      image: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("mobile", formData.mobile);
    data.append("gender", formData.gender);
    data.append("designation", formData.designation);
    data.append("course", formData.course);
    if (formData.image) {
      data.append("image", formData.image);
    }

    try {
      if (id) {
        await updateEmployee(id, data);
        console.log("Employee updated successfully");
      } else {
        await createEmployee(data);
        console.log("Employee created successfully");
      }
    } catch (error) {
      console.error("Error creating/updating employee:", error);
    }
  };

  if (loading) return <Spinner />;

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg">
      <form onSubmit={handleSubmit}>
        {["name", "email", "mobile"].map((field) => (
          <div className="mb-4" key={field}>
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor={field}
            >
              {field.charAt(0).toUpperCase() + field.slice(1)}
            </label>
            <input
              id={field}
              type={field === "email" ? "email" : "text"}
              value={formData[field]}
              onChange={handleChange}
              placeholder={`Enter ${field}`}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
        ))}

        {/* Gender Select */}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="gender"
          >
            Gender
          </label>
          <select
            id="gender"
            value={formData.gender}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Designation Dropdown */}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="designation"
          >
            Designation
          </label>
          <select
            id="designation"
            value={formData.designation}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="">Select Designation</option>
            <option value="Developer">Developer</option>
            <option value="Manager">Manager</option>
            <option value="Designer">Designer</option>
          </select>
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="course"
          >
            Courses
          </label>
          <select
            id="course"
            name="course"
            value={formData.course}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="">Select Course</option>
            <option value="MCA">MCA</option>
            <option value="BCA">BCA</option>
            <option value="MBA">MBA</option>
          </select>
        </div>

        {/* Profile Image */}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="image"
          >
            Profile Image
          </label>
          <input
            id="image"
            type="file"
            onChange={handleFileChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          {id ? "Update" : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default EmployeeForm;
