const express = require("express");
const userRoute = express.Router();
const userController = require("../controllers/userController");
const settingsController = require("../controllers/settingsController");
const dashboardController = require("../controllers/dashboardController");
const voucherController = require("../controllers/voucherController");
const {
  isAuthenticated,
  redirectIfAuthenticated,
} = require("../middleware/authMiddleware");

//Auth Routes
userRoute.get("/login", redirectIfAuthenticated, userController.loginPage);
userRoute.get("/", redirectIfAuthenticated, userController.loginPage);

userRoute.post("/login", userController.login);
userRoute.get("/logout", userController.logout);

//Dashboard Routes
userRoute.get("/dashboard", isAuthenticated, dashboardController.dashboardPage);

//Voucher Routes
userRoute.post("/generate-qr", isAuthenticated, voucherController.QRGenerate);
userRoute.get(
  "/pdf/generate/:voucherCode",
  isAuthenticated,
  voucherController.generatePDF
);

//Settings Routes
userRoute.get("/settings", isAuthenticated, settingsController.settingsPage);
userRoute.post("/settings", isAuthenticated, settingsController.saveSettings);

module.exports = userRoute;
