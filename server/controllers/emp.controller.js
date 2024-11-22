const getAllEmployers = async (req, res) => {
  try {
    res.status(200).json("getAllEmployers page");
  } catch (error) {
    console.log("Error in getAllEmployers controller", error);
    res.status(400).json({ error: error.message });
  }
};

module.exports = { getAllEmployers };
