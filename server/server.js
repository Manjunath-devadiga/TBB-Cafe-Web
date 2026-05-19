const express = require("express");
const path = require("path");
const nodemailer = require("nodemailer");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());
require("dotenv").config();

const adminRoutes = require("./routes/adminRoutes");

app.use("/admin", adminRoutes);

// protected route (basic)
app.get("/admin/dashboard", (req, res) => {
  const token = req.headers.authorization;

  if (token === "simple-admin-token") {
    return res.json({ message: "Welcome Admin ✅" });
  }

  res.status(401).json({ message: "Unauthorized ❌" });
});


// MySQL connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err);
  } else {
    console.log("Connected to MySQL");
  }
});

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});
// API to insert reservation
app.post("/reserve", async (req, res) => {
  const { name, email, date, time, guests } = req.body;

  const sql =
    "INSERT INTO reservations (name, email, date, time, guests) VALUES (?, ?, ?, ?, ?)";

  db.query(sql, [name, email, date, time, guests], async (err, result) => {

    try {
      const info = await transporter.sendMail({
        from: "kchoudhary2103@gmail.com",
        to: email,
        subject: "Table Reservation Confirmed 🍽️",
        html: ` <h2>Reservation Confirmed 🎉</h2>
          <p>Hi ${name},</p>
          <p>Your table has been booked successfully.</p>
          <ul>
            <li>Date: ${date}</li>
            <li>Time: ${time}</li>
            <li>Guests: ${guests}</li>
          </ul>`
      });

      console.log("✅ Email sent:", info.response);

      return res.json({
        success: true,
        message: "Reservation successful & email sent"
      });

    } catch (error) {
      console.error("❌ Email error:", error);
    }

    if (err) {
      if (err.code === "ER_DUP_ENTRY") {
        return res.json({
          success: false,
          message: "You have already booked for this date & time"
        });
      }
      return res.json({
        success: false,
        message: "Database error"
      });
    }


    return res.json({
      success: true,
      message: "Reservation saved but email failed"
    });

  });
});


// Order Insertion
app.post("/order", (req, res) => {

  const { name, address, items, total } = req.body;

  // STEP 1 -> Insert into orders table
  const orderSql = `
    INSERT INTO orders (customer_name, address, total_price)
    VALUES (?, ?, ?)
  `;

  db.query(orderSql, [name, address, total], (err, orderResult) => {

    if (err) {
      console.log(err);
      return res.status(500).send("Order Error");
    }

    // newly created order id
    const orderId = orderResult.insertId;

    // STEP 2 -> insert order items
    const itemValues = items.map((item) => [
      orderId,
      item.name,
      item.quantity || 1,
    ]);

    const itemSql = `
      INSERT INTO order_items
      (order_id, item, quantity)
      VALUES ?
    `;

    db.query(itemSql, [itemValues], (err, result) => {

      if (err) {
        console.log(err);
        return res.status(500).send("Items Error");
      }

      res.json({
        success: true,
        message: "Order placed successfully"
      });

    });

  });

});

app.get("/api/menu", (req, res) => {
  db.query("SELECT * FROM menu", (err, result) => {
    if (err) return res.status(500).send(err);
    res.json(result);
  });
});

app.post("/api/menu", (req, res) => {
  let { name, price, category, type, discount, image } = req.body;


  if (!name || !price || !type || !image) {
    return res.status(400).send("Name, price, type and image are required");
  }

  const allowedTypes = [
    "Veg",
    "Non-Veg",
    "Beverages",
    "Drinks",
    "Desserts",
    "Add-Ons",
    "Roti",
  ];

  if (!allowedTypes.includes(type)) {
    return res.status(400).send("Invalid type");
  }

  if (type === "Veg" || type === "Non-Veg") {
    if (!category) {
      return res
        .status(400)
        .send("Category required for Veg / Non-Veg");
    }
  } else {
    category = null;
  }
  discount = discount || 0;

  const sql =
    "INSERT INTO menu (name, price, category, type, discount, image) VALUES (?, ?, ?, ?, ?, ?)";

  db.query(sql, [name, price, category, type, discount, image], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }

    res.json({
      message: "Item added successfully",
      id: result.insertId,
    });
  });
});

app.put("/api/menu/:id", (req, res) => {
  const { id } = req.params;
  const { name, price, category, type, discount, image } = req.body;

  const sql =
    "UPDATE menu SET name=?, price=?, category=?, type=?, discount=?, image=? WHERE id=?";

  db.query(
    sql,
    [name, price, category, type, discount, image, id],
    (err, result) => {
      if (err) return res.status(500).send(err);
      res.send("Item updated successfully");
    }
  );
});


app.delete("/api/menu/:id", (req, res) => {
  const { id } = req.params;

  db.query("DELETE FROM menu WHERE id=?", [id], (err, result) => {
    if (err) return res.status(500).send(err);
    res.send("Item deleted successfully");
  });
});

app.post("/api/enquiry", (req, res) => {
  const {
    name,
    email,
    phone,
    purpose,
    guests,
    date,
    time,
    message,
  } = req.body;

  const sql = `
    INSERT INTO enquiries
    (name, email, phone, purpose, guests, date, time, message)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [name, email, phone, purpose, guests, date, time, message],
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send("Database Error");
      } else {
        res.status(200).send("Enquiry Saved");
      }
    }
  );
});

app.get("/api/dashboard/stats", async (req, res) => {

  const stats = {};

  db.query(
    "SELECT COUNT(*) AS totalOrders FROM orders",
    (err, orderResult) => {

      if (err) {
        return res.status(500).send(err);
      }

      stats.totalOrders = orderResult[0].totalOrders;

      db.query(
        "SELECT COUNT(DISTINCT customer_name) AS customers FROM orders",
        (err, customerResult) => {

          if (err) {
            return res.status(500).send(err);
          }

          stats.customers = customerResult[0].customers;

          db.query(
            "SELECT SUM(total_price) AS sales FROM orders",
            (err, salesResult) => {

              if (err) {
                return res.status(500).send(err);
              }
              stats.sales = salesResult[0].sales || 0;

              res.json(stats);
            }
          );
        }
      );
    }
  );
});

app.get("/api/dashboard/orders", (req, res) => {

  const sql = `
    SELECT 
      orders.customer_name,
      orders.total_price,
      order_items.item,
      order_items.quantity
    FROM orders
    JOIN order_items
      ON orders.id = order_items.order_id
    ORDER BY orders.id DESC
    LIMIT 5
  `;

  db.query(sql, (err, result) => {

    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }

    res.json(result);

  });

});

app.get("/api/dashboard/trending", (req, res) => {

  const sql = `
    SELECT 
      item,
      SUM(quantity) AS totalSales
    FROM order_items
    GROUP BY item
    ORDER BY totalSales DESC
    LIMIT 4
  `;

  db.query(sql, (err, result) => {

    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }

    res.json(result);

  });

});

// Serve Vite build
app.use(express.static(path.join(__dirname, "dist")));

app.use((req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});
app.listen(5000, () => {
  console.log("Running on http://localhost:5000");
});

