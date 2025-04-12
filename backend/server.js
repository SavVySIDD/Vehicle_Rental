const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const db = require("./config/db");
const bcrypt = require("bcryptjs");


dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

const PORT = process.env.PORT || 5000;

// Test database connection (Removed callback-based connection check)
(async () => {
    try {
        await db.query("SELECT 1");
        console.log("Connected to MySQL database");
    } catch (err) {
        console.error("Database connection failed:", err.message);
    }
})();

// Basic Route
app.get("/", async (req, res) => {
    try {
        const [results] = await db.query("SELECT * FROM Customer");
        res.json(results);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post("/signup", async (req, res) => {
  const { FirstName, LastName, Email, PhoneNumber, Address, DateOfBirth, Password } = req.body;

  if (!FirstName || !LastName || !Email || !PhoneNumber || !Address || !DateOfBirth || !Password) {
    return res.status(400).json({ error: "All fields are required" });
  }
  if(Password.length <10){
    return res.status(400).json({error: "Password should be minimum 10 characters."});
  }
  try {
    // Check if email or phone number already exists
    const [existingUser] = await db.query(
      "SELECT * FROM Customer WHERE Email = ? OR PhoneNumber = ?",
      [Email, PhoneNumber]
    );

    if (existingUser.length > 0) {
      return res.status(400).json({ error: "Email or Phone number already registered" });
    }

    // Hash password before saving
    const hashedPassword = await bcrypt.hash(Password, 10);

    // Insert new user
    await db.query(
      "INSERT INTO Customer (FirstName, LastName, Email, PhoneNumber, Address, DateOfBirth, Password) VALUES (?, ?, ?, ?, ?, ?, ?)", 
      [FirstName, LastName, Email, PhoneNumber, Address, DateOfBirth, hashedPassword]
    );

    res.status(201).json({ message: "Signup successful!" });

  } catch (error) {
    console.error("Signup Error:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});


app.post("/login", async (req, res) => {
  const { PhoneNumber, password } = req.body;
  console.log(req.body);
  console.log("PhoneNumber:", PhoneNumber);
  console.log("Password:", password);
  if (!PhoneNumber || !password) {
      return res.status(400).json({ error: "Phone number & Password are required" });
  }

  try {
      // Fetch user by phone number
      const [user] = await db.query("SELECT * FROM Customer WHERE PhoneNumber = ?", [PhoneNumber]);
  
      if (user.length === 0) {
        return res.status(401).json({ error: "Phone number not registered" });
      }
  
      // Verify password
      console.log("Real pass is:", user[0].Password);
      const isMatch = await bcrypt.compare(password, user[0].Password);
      console.log(isMatch);
      if (!isMatch) {
        return res.status(401).json({ error: "Incorrect password" });
      }
  
      res.json({ message: "Login successful!", user: user[0] });
  
    } catch (error) {
      console.error("Login Error:", error.message);
      res.status(500).json({ error: "Internal server error" });
    }
});

app.post("/admin/login", async (req, res) => {
  const { PhoneNumber, password } = req.body;

  console.log(req.body);
  console.log("PhoneNumber:", PhoneNumber);
  console.log("Password:", password);

  if (!PhoneNumber || !password) {
    return res.status(400).json({ error: "Phone number & Password are required" });
  }

  try {
    // Fetch user by phone number
    const [user] = await db.query("SELECT * FROM Admin WHERE PhoneNumber = ?", [PhoneNumber]);

    if (user.length === 0) {
      return res.status(401).json({ error: "Phone number not registered" });
    }

    // Directly compare passwords (no encryption)
    console.log("Real pass is:", user[0].Password);
    if (password !== user[0].Password) {
      return res.status(401).json({ error: "Incorrect password" });
    }

    res.json({ message: "Login successful!", user: user[0] });
    console.log("login succesfull");

  } catch (error) {
    console.error("Login Error:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});


app.get("/branches", async (req, res) => {
  try {
    const [rows] = await db.execute("SELECT BranchID, BranchName FROM Branch");
    res.json(rows);
  } catch (error) {
    console.error("Error fetching branches:", error);
    res.status(500).json({ error: "Database error" });
  }
});

app.get("/vehicles", async (req, res) => {
  const { branch } = req.query;
  let query = "SELECT * FROM Vehicle NATURAL JOIN Branch";
  let params = [];

  if (branch) {
    query += " WHERE BranchID = ?";
    params.push(branch);
  }

  try {
    const [rows] = await db.execute(query, params);
    res.json(rows);
  } catch (error) {
    console.error("Error fetching vehicles:", error);
    res.status(500).json({ error: "Database error" });
  }
});

// Endpoint to add a review
app.post("/reviews/add", async (req, res) => {
  const { CustomerID, VehicleID, ReviewText, Rating } = req.body;
  const ReviewDate = new Date().toISOString().split("T")[0];

  if (!CustomerID || !VehicleID || !Rating) {
    return res.status(400).json({ message: "CustomerID, VehicleID, and Rating are required." });
  }

  const query = `INSERT INTO review (CustomerID, VehicleID, ReviewText, Rating, ReviewDate) VALUES (?, ?, ?, ?, ?)`;

  try {
    await db.query(query, [CustomerID, VehicleID, ReviewText, Rating, ReviewDate]);
    res.json({ message: "Review added successfully!" });
  } catch (err) {
    console.error("Error adding review:", err);
    res.status(500).json({ message: "Error adding review" });
  }
});



// Endpoint to get all reviews
app.get("/reviews", async (req, res) => {
  const query = `SELECT r.ReviewText, r.Rating, r.ReviewDate, 
                        c.FirstName, c.LastName, v.Model 
                 FROM Review r
                 JOIN Customer c ON r.CustomerID = c.CustomerID
                 JOIN Vehicle v ON r.VehicleID = v.VehicleID
                 ORDER BY r.ReviewDate DESC`;

  try {
    const [results] = await db.query(query); // Use async/await
    res.json(results);
  } catch (err) {
    console.error("Error fetching reviews:", err);
    res.status(500).json({ message: "Error fetching reviews" });
  }
});


app.get("/rentals/:CustomerID", async (req, res) => {
    const customerId = req.params.CustomerID;
    const query = `SELECT Rental.RentalID, Vehicle.Model, Rental.RentalDate, Rental.TotalCost, Branch.BranchName
                   FROM Rental
                   JOIN Vehicle ON Rental.VehicleID = Vehicle.VehicleID
                   JOIN Branch ON Vehicle.BranchID = Branch.BranchID
                   WHERE Rental.CustomerID = ?
                   ORDER BY Rental.RentalDate DESC`;
    try {
        const [results] = await db.query(query, [customerId]);
        res.json(results);
    } catch (err) {
        console.error("Error fetching rental history:", err);
        res.status(500).json({ error: "Database query failed" });
    }
});

app.post("/rent", async (req, res) => {
    const { CustomerID, VehicleID } = req.body;

    console.log("Received rent request:", req.body);

    try {
        console.log(`Checking if vehicle ${VehicleID} is already rented...`);
        const [rows] = await db.query("SELECT * FROM Rental WHERE VehicleID = ?", [VehicleID]);

        if (rows.length > 0) {
            console.log(`Vehicle with id ${VehicleID} is already rented !!`);
            return res.status(409).json({ message: "Vehicle is already rented." });
        }
        const [totalCostResult] = await db.query("SELECT PricePerDay FROM Vehicle WHERE Vehicle.VehicleID = ?", [VehicleID]);

        if (totalCostResult.length === 0) {
            throw new Error("Vehicle not found");
        }

        // Extracting the PricePerDay value
        const TotalCost = totalCostResult[0].PricePerDay;
        console.log("Fetched TotalCost:", TotalCost);

        const [insertResult] = await db.execute(
            "INSERT INTO Rental (CustomerID, VehicleID, RentalDate, TotalCost) VALUES (?, ?, CURDATE(), ?)",
            [CustomerID, VehicleID, TotalCost]
        );

        //SEtting isRented = True;
        await db.execute("UPDATE Vehicle SET is_rented = TRUE WHERE VehicleID = ?", [VehicleID]);

        console.log("Inserted Rental ID:", insertResult.insertId);
        res.status(200).json({ message: "Vehicle rented successfully!", rental_id: insertResult.insertId });
    } catch (error) {
        console.error("Error executing query:", error.sqlMessage || error.message);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
});


app.post("/return", async (req, res) => {
  const { RentalID } = req.body;

  try {
    // First: call the stored procedure
    await db.query("CALL ReturnVehicle(?, @message)", [RentalID]);

    // Second: get the OUT message
    const [result] = await db.query("SELECT @message AS message");

    const message = result[0]?.message;

    if (message === "Vehicle removed from rental successfully.") {
      return res.status(200).json({ message });
    } else if (message === "Rental not found.") {
      return res.status(404).json({ message });
    } else {
      return res.status(500).json({ message: "Unexpected response from procedure." });
    }

  } catch (error) {
    console.error("Return error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get all currently rented vehicles
app.get("/vehicles/rented", async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT * 
      FROM vehicle 
      WHERE VehicleID IN (
        SELECT VehicleID 
        FROM rental 
        WHERE ReturnDate IS NULL
      )
    `);
    res.json(rows);
  } catch (error) {
    console.error("Error fetching rented vehicles:", error);
    res.status(500).json({ message: "Error fetching rented vehicles" });
  }
});






// Start Server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
