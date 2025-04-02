const bcrypt = require("bcryptjs");
const mysql = require("mysql2/promise");
const dotenv = require("dotenv");

dotenv.config();

// Create DB connection
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

async function hashPasswords() {
  try {
    // Fetch all users
    const [users] = await db.query("SELECT customer_id, password FROM Customer");

    for (let user of users) {
      const hashedPassword = await bcrypt.hash(user.password, 10); // Hash password
      await db.query("UPDATE Customer SET password = ? WHERE customer_id = ?", [hashedPassword, user.customer_id]);
      console.log(`Updated password for user ID: ${user.customer_id}`);
    }

    console.log("All passwords updated successfully!");
  } catch (error) {
    console.error("Error updating passwords:", error.message);
  } finally {
    process.exit();
  }
}

hashPasswords();
