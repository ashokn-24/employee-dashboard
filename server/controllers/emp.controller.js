const Auth = require("../models/auth.model");
const Employee = require("../models/employee.model");
const getImageUrl = require("../utils/getImageUrl");
const getNextSequenceValue = require("../utils/getNextSeqValue");

const getAllEmployees = async (req, res) => {
  try {
    const { sortBy, search } = req.query;

    const query = {};
    if (search) {
      query.f_name = { $regex: search, $options: "i" };
    }

    let employees = await Employee.find(query);

    if (sortBy) {
      if (sortBy === "name") {
        employees.sort((a, b) => a.f_name.localeCompare(b.f_name));
      } else if (sortBy === "email") {
        employees.sort((a, b) => a.f_email.localeCompare(b.f_email));
      } else if (sortBy === "id") {
        employees.sort((a, b) => a.f_id - b.f_id);
      } else if (sortBy === "date") {
        employees.sort(
          (a, b) => new Date(b?.createdAt || 0) - new Date(a?.createdAt || 0)
        );
      }
    }

    if (!employees.length) {
      return res.status(404).json({ message: "No employees found" });
    }

    res.status(200).json({ employees });
  } catch (error) {
    console.error("Error in getAllEmployees controller:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getEmployeeById = async (req, res) => {
  try {
    const { id } = req.params;

    const employee = await Employee.findById(id);

    if (!employee) {
      return res.status(400).json({ error: "User not found" });
    }

    res.status(200).json({ employee: employee });
  } catch (error) {
    console.log("Error in getEmployeeById controller", error);
    res.status(400).json({ error: error.message });
  }
};

const createEmployer = async (req, res) => {
  try {
    const { name, email, mobile, gender, designation, course } = req.body;

    if (!name || !email || !mobile || !gender || !designation || !course) {
      return res.status(400).json({ error: "All fields are required" });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    const existingEmail = await Employee.findOne({ f_email: email });
    if (existingEmail) {
      return res.status(400).json({ error: "Email already exists" });
    }

    if (!/^\d{10}$/.test(mobile)) {
      return res
        .status(400)
        .json({ error: "Invalid mobile number. Must be 10 digits" });
    }

    let imageURL = "";
    if (req.file) {
      if (!/\.(jpg|jpeg|png)$/i.test(req.file.originalname)) {
        return res
          .status(400)
          .json({ error: "Only .jpg, .jpeg, and .png files are allowed" });
      }
      imageURL = getImageUrl(req.file.filename);
    }

    const userId = await getNextSequenceValue("userId");

    const newEmp = new Employee({
      f_id: userId,
      f_name: name,
      f_email: email,
      f_mobile: mobile,
      f_gender: gender,
      f_course: course,
      f_designation: designation,
      f_image: imageURL,
    });

    await newEmp.save();

    res.status(201).json({
      message: "Employee created successfully",
      employee: newEmp,
    });
  } catch (error) {
    console.error("Error in createEmployer controller:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const updateEmployer = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, mobile, gender, designation, course } = req.body;

    if (
      !name &&
      !email &&
      !mobile &&
      !gender &&
      !designation &&
      !course &&
      !req.file
    ) {
      return res.status(400).json({ error: "No data provided to update" });
    }

    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    if (email) {
      const existingEmail = await Employee.findOne({
        f_email: email,
        _id: { $ne: id },
      });

      if (existingEmail) {
        return res.status(400).json({ error: "Email already exists" });
      }
    }

    if (mobile && !/^\d{10}$/.test(mobile)) {
      return res
        .status(400)
        .json({ error: "Invalid mobile number. Must be 10 digits" });
    }

    let imageURL = null;
    if (req.file) {
      if (!/\.(jpg|jpeg|png)$/i.test(req.file.originalname)) {
        return res
          .status(400)
          .json({ error: "Only .jpg, .jpeg, and .png files are allowed" });
      }
      imageURL = getImageUrl(req.file.filename);
    }

    const updateData = {};
    if (name) updateData.f_name = name;
    if (email) updateData.f_email = email;
    if (mobile) updateData.f_mobile = mobile;
    if (gender) updateData.f_gender = gender;
    if (designation) updateData.f_designation = designation;
    if (course) updateData.f_course = course;
    if (imageURL) updateData.f_image = imageURL;

    const updatedEmp = await Employee.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedEmp) {
      return res.status(404).json({ error: "Employee not found" });
    }

    res.status(200).json({
      message: "Employee updated successfully",
      employee: updatedEmp,
    });
  } catch (error) {
    console.error("Error in updateEmployer controller:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;

    const employee = await Employee.findByIdAndDelete(id);
    if (!employee) {
      return res.status(404).json({ error: "Employee not found" });
    }

    res.status(200).json({
      message: "Employee deleted successfully",
    });
  } catch (error) {
    console.error("Error in deleteEmployee controller", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  getAllEmployees,
  deleteEmployee,
  createEmployer,
  updateEmployer,
  getEmployeeById,
};
