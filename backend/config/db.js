const mysql = require("mysql2/promise");
const dotenv = require("dotenv");

dotenv.config(); //Load environment variables form .evn

const db = mysql.createPool({ // ✅ Use connection pool for better performance
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  multipleStatements: true,
  waitForConnections: true,
  connectionLimit: 10, // Limits the number of connections in the pool
  queueLimit: 0
});


module.exports = db;