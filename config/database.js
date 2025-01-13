const sql = require("mssql");
require("dotenv").config();
const [serverName, instanceName] = process.env.DB_HOST.split("\\");
// Database configuration
const dbConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASS || "",
  server: serverName,
  database: process.env.DB_NAME,
  options: {
    encrypt: false,
    trustServerCertificate: true,
    instanceName: instanceName,
    enableArithAbort: true,
    connectTimeout: 30000,
  },
  port: 1433,
};
if (instanceName) {
  dbConfig.options.instanceName = instanceName;
}
console.log("DB Host:", process.env.DB_HOST);
const connectDB = async () => {
  try {
    console.log("Attempting to connect to SQL Server...");
    await sql.connect(dbConfig);
    console.log("Connected to SQL Server successfully!");
  } catch (err) {
    console.error(`Database connection failed: ${err.message}`);
    console.error("Check your SQL Server credentials and server name.");
  }
};

module.exports = { connectDB, sql };
