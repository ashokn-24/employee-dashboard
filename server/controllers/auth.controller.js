const login = async (req, res) => {
  try {
    res.status(200).json("login page");
  } catch (error) {
    console.log("Error in login controller", error);
    res.status(400).json({ error: error.message });
  }
};

const signup = async (req, res) => {
  try {
    res.status(200).json("signup page");
  } catch (error) {
    console.log("Error in signup controller", error);
    res.status(400).json({ error: error.message });
  }
};

module.exports = { login, signup };
