const {
  getLatestSettings,
  saveOrUpdateSettings,
} = require("../models/settingsModel");

const settingsPage = async (req, res) => {
  try {
    const settings = await getLatestSettings();
    if (!settings) {
      return res.render("./user/settings", {
        settings: {
          Title: "",
          MaxExpiryDays: 7,
          VoucherWidth: 100,
          VoucherHeight: 100,
          TitleFontSize: 24,
          NormalFontSize: 16,
        },
        success: false,
        error: "No settings found. Please save settings.",
      });
    }
    res.render("./user/settings", { settings, success: false, error: null });
  } catch (error) {
    console.error("Error rendering settings page:", error);
    res.status(500).render("./user/settings", {
      settings: {
        Title: "",
        MaxExpiryDays: 7,
        VoucherWidth: 100,
        VoucherHeight: 100,
        TitleFontSize: 24,
        NormalFontSize: 16,
      },
      success: false,
      error: "Failed to load settings.",
    });
  }
};

// Save or update settings
const saveSettings = async (req, res) => {
  try {
    await saveOrUpdateSettings(req.body);
    res.redirect("/settings?success=true");
  } catch (error) {
    console.error("Error saving settings:", error);
    res.status(500).render("./user/settings", {
      settings: req.body,
      success: false,
      error: "Failed to save settings.",
    });
  }
};

module.exports = {
  settingsPage,
  saveSettings,
};
