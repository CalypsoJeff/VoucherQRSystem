const { sql, db } = require("../config/database");

// Get paginated vouchers
const getPaginatedVouchers = async (page, limit) => {
  try {
    const offset = (page - 1) * limit;
    const pool = await sql.connect(db);

    const result = await pool.request().query(`
      SELECT COUNT(*) AS Total FROM Vouchers;
      SELECT VoucherCode, GeneratedDate, ExpiryDate 
      FROM Vouchers
      ORDER BY GeneratedDate DESC
      OFFSET ${offset} ROWS FETCH NEXT ${limit} ROWS ONLY;
    `);

    const totalVouchers = result.recordsets[0][0].Total;
    const vouchers = result.recordsets[1]; 

    return { totalVouchers, vouchers };
  } catch (error) {
    throw new Error(`Error fetching vouchers: ${error.message}`);
  }
};

// Insert new voucher
const insertVoucher = async (voucherData) => {
  try {
    const {
      VoucherCode,
      GeneratedDate,
      ExpiryDate,
      Title,
      VoucherWidth,
      VoucherHeight,
      TitleFontSize,
      NormalFontSize,
      MaxExpiryDays,
    } = voucherData;

    const pool = await sql.connect(db);
    await pool
      .request()
      .input("VoucherCode", sql.VarChar, VoucherCode)
      .input("GeneratedDate", sql.DateTime, GeneratedDate)
      .input("ExpiryDate", sql.DateTime, ExpiryDate)
      .input("Title", sql.VarChar, Title)
      .input("VoucherWidth", sql.Int, VoucherWidth)
      .input("VoucherHeight", sql.Int, VoucherHeight)
      .input("TitleFontSize", sql.Int, TitleFontSize)
      .input("NormalFontSize", sql.Int, NormalFontSize)
      .input("MaxExpiryDays", sql.Int, MaxExpiryDays).query(`
        INSERT INTO Vouchers (VoucherCode, GeneratedDate, ExpiryDate, Title, VoucherWidth, VoucherHeight, TitleFontSize, NormalFontSize, MaxExpiryDays)
        VALUES (@VoucherCode, @GeneratedDate, @ExpiryDate, @Title, @VoucherWidth, @VoucherHeight, @TitleFontSize, @NormalFontSize, @MaxExpiryDays)
      `);
  } catch (error) {
    throw new Error(`Error inserting voucher: ${error.message}`);
  }
};

// Get voucher by code
const getVoucherByCode = async (voucherCode) => {
  try {
    const pool = await sql.connect(db);
    const result = await pool
      .request()
      .input("VoucherCode", sql.VarChar, voucherCode).query(`
        SELECT VoucherCode, GeneratedDate, ExpiryDate, Title, VoucherWidth, VoucherHeight, TitleFontSize, NormalFontSize
        FROM Vouchers
        WHERE VoucherCode = @VoucherCode
      `);
    return result.recordset[0];
  } catch (error) {
    throw new Error(`Error fetching voucher: ${error.message}`);
  }
};

module.exports = { getPaginatedVouchers, insertVoucher, getVoucherByCode };
