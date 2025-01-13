const { sql } = require("../config/database");

const getUserByCredentials = async (username, password) => {
  try {
    const pool = await sql.connect(); 
    const result = await pool
      .request()
      .input("username", sql.VarChar, username)
      .input("password", sql.VarChar, password)
      .query(`
        SELECT * FROM [User] WHERE username = @username AND password = @password
      `);
    return result.recordset[0]; 
  } catch (error) {
    throw new Error(`Error fetching user: ${error.message}`);
  }
};

module.exports = {
  getUserByCredentials,
};
