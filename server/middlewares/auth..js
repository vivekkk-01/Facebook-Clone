const jwt = require("jsonwebtoken");
const User = require("../models/User");
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0OWJlYWNkZTk0NzYyMTk0NjZkMzE3YyIsImlhdCI6MTY4ODEwNTUxOX0._oUGDW4NaDaQ374l45XPgzl5aE4Wmx7OofhgQJDXiK8
const auth = async (req, res, next) => {
  try {
    let token = req.headers.authorization;
    if (!token) return res.status(401).json("Authentication Failed!");
    token = token.split(" ")[1];
    if (!token) return res.status(401).json("Authentication Failed!");
    jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, tokenData) => {
      if (err) return res.status(401).json("Authentication Failed!");
      req.user = await User.findById(tokenData.id);
      next()
    });
  } catch (error) {
    return res
      .status(error.code || 500)
      .json(error.message || "Something went wrong, please try again!");
  }
};

module.exports = auth;
