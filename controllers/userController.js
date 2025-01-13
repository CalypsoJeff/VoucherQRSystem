const { getUserByCredentials } = require("../models/userModel");

const loginPage = async (req, res) => {
  try {
    if(req.session.user_id) {
      return res.redirect("/dashboard");
    }
    res.render("./user/login.ejs", { error: null });
  } catch (error) {
    console.error("Error rendering login page:", error);
    res.status(500).send("Internal Server Error");
  }
};

// Handle the login request
const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await getUserByCredentials(username, password); 

    if (user) {
      req.session.user_id = user.id;
      res.redirect("/dashboard");
    } else {
      res.render("./user/login.ejs", { error: "Invalid username or password" });
    }
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).send("Internal Server Error");
  }
};

const logout = (req, res) => {
  try {
    req.session.user_id = null;
    res.redirect("/login");
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  loginPage,
  login,
  logout,
};
