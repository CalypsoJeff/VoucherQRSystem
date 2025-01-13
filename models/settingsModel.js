const { sql, db } = require("../config/database");

// Fetch the latest settings
const getLatestSettings = async () => {
  try {
    const pool = await sql.connect(db);
    const result = await pool
      .request()
      .query("SELECT TOP 1 * FROM Settings ORDER BY Id DESC");
    return result.recordset[0];
  } catch (error) {
    throw new Error(`Error fetching settings: ${error.message}`);
  }
};

// Save or update settings
const saveOrUpdateSettings = async (settingsData) => {
  try {
    const {
      Title,
      MaxExpiryDays,
      VoucherWidth,
      VoucherHeight,
      TitleFontSize,
      NormalFontSize,
    } = settingsData;
    const pool = await sql.connect(db);
    await pool
      .request()
      .input("Title", sql.VarChar, Title)
      .input("MaxExpiryDays", sql.Int, MaxExpiryDays)
      .input("VoucherWidth", sql.Int, VoucherWidth)
      .input("VoucherHeight", sql.Int, VoucherHeight)
      .input("TitleFontSize", sql.Int, TitleFontSize)
      .input("NormalFontSize", sql.Int, NormalFontSize).query(`
        IF EXISTS (SELECT * FROM Settings)
          UPDATE Settings
          SET Title = @Title, MaxExpiryDays = @MaxExpiryDays, VoucherWidth = @VoucherWidth,
              VoucherHeight = @VoucherHeight, TitleFontSize = @TitleFontSize, NormalFontSize = @NormalFontSize
        ELSE
          INSERT INTO Settings (Title, MaxExpiryDays, VoucherWidth, VoucherHeight, TitleFontSize, NormalFontSize)
          VALUES (@Title, @MaxExpiryDays, @VoucherWidth, @VoucherHeight, @TitleFontSize, @NormalFontSize)
      `);
  } catch (error) {
    throw new Error(`Error saving settings: ${error.message}`);
  }
};

module.exports = {
  getLatestSettings,
  saveOrUpdateSettings,
};
