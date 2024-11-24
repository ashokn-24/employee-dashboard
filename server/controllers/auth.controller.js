const Auth = require("../models/auth.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res
        .status(400)
        .json({ error: "Username and Password are required" });
    }

    const user = await Auth.findOne({ f_username: username });

    if (!user) {
      return res.status(400).send({ message: "Invalid username" });
    }

    const isPasswordTrue = await bcrypt.compare(password, user.f_password);

    if (!isPasswordTrue) {
      return res.status(400).send({ message: "Invalid password" });
    }

    const token = jwt.sign({ username }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "15m",
    });

    res
      .status(201)
      .cookie("authToken", token, {
        httpOnly: true,
        sameSite: "strict",
        maxAge: 15 * 60 * 1000,
      })
      .json({
        message: "Login successfully",
        user: user.f_username,
      });
  } catch (error) {
    console.log("Error in login controller", error);
    res.status(400).json({ error: error.message });
  }
};

const signup = async (req, res) => {
  try {
    const { username, password, confirmPassword } = req.body;

    if (!username || !password || !confirmPassword) {
      return res.status(400).json({ error: "All fields are required" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords do not match" });
    }

    const existingUser = await Auth.findOne({ f_username: username });

    if (existingUser) {
      return res.status(400).json({ error: "Username already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new Auth({
      f_username: username,
      f_password: hashedPassword,
    });

    await newUser.save();

    const token = jwt.sign({ username }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "15m",
    });

    res
      .status(201)
      .cookie("authToken", token, {
        httpOnly: true,
        sameSite: "strict",
        maxAge: 15 * 60 * 1000,
      })
      .json({
        message: "Signed up successfully",
        user: newUser.f_username,
      });
  } catch (error) {
    console.log("Error in signup controller", error);
    res.status(400).json({ error: error.message });
  }
};

const logout = async (req, res) => {
  try {
    res
      .clearCookie("authToken", {
        httpOnly: true,
        sameSite: "strict",
      })
      .status(200)
      .json({ message: "Logout successfully" });
  } catch (error) {
    console.log("Error in logout controller", error);
    res.status(400).json({ error: error.message });
  }
};

module.exports = { login, signup, logout };
