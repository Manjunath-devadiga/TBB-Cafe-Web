require("dotenv").config();
const express = require("express");
const db = require("./config/db")
const path = require("path");
const nodemailer = require("nodemailer");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());


const adminRoutes = require("./routes/adminRoutes");
const customerRoutes = require("./routes/customerRoutes");

app.use("/admin", adminRoutes);
app.use("/api/customers", customerRoutes);

// protected route (basic)
app.get("/admin/dashboard", (req, res) => {
  const token = req.headers.authorization;

  if (token === "simple-admin-token") {
    return res.json({ message: "Welcome Admin ✅" });
  }

  res.status(401).json({ message: "Unauthorized ❌" });
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
app.post("/reserve", (req, res) => {

  const { customerId, name, email, date, time, guests, tableNo } = req.body;

  const sql = `
    INSERT INTO reservations
    (customer_id, name, email, date, time, guests, table_no, status)
    VALUES (?, ?, ?, ?, ?, ?, ?, 'Pending')
  `;

  db.query(
    sql,
    [customerId, name, email, date, time, guests, tableNo],
    (err, result) => {

      if (err) {

        if (err.code === "ER_DUP_ENTRY") {
          return res.json({
            success: false,
            message: "Slot already booked"
          });
        }

        return res.json({
          success: false,
          message: "Database error"
        });
      }

      return res.json({
        success: true,
        message: "Reservation request sent to admin"
      });
    }
  );
});

// Order Insertion
app.post("/order", (req, res) => {

  const { customerId, name, phoneNo, address, items, total } = req.body;
  const orderSql = `
    INSERT INTO orders (customer_id, customer_name,phone_no, address, total_price, status)
    VALUES (?, ?, ?, ?,'Pending')
  `;

  db.query(orderSql, [customerId, name, phoneNo, address, total], (err, orderResult) => {

    if (err) {
      console.log(err);
      return res.status(500).send("Order Error");
    }
    const orderId = orderResult.insertId;
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

app.post("/api/feedback", (req, res) => {
  const { name, email, rating, message } = req.body;

  const sql =
    "INSERT INTO feedback (name, email, rating, message) VALUES (?, ?, ?, ?)";

  db.query(sql, [name, email, rating, message], (err, result) => {
    if (err) return res.status(500).send(err);

    res.status(200).json({ message: "Feedback saved successfully" });
  });
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
    orders.id,
    orders.customer_name,
    orders.total_price,
    GROUP_CONCAT(order_items.item SEPARATOR ', ') AS items,
    GROUP_CONCAT(order_items.quantity SEPARATOR ', ') AS quantities
    FROM orders JOIN order_items
    ON orders.id = order_items.order_id
    GROUP BY orders.id
    ORDER BY orders.id DESC
    LIMIT 5;
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

app.get("/api/reservations", (req, res) => {

  const sql = `
    SELECT * FROM reservations
    ORDER BY created_at DESC
  `;

  db.query(sql, (err, result) => {

    if (err) {
      return res.json({
        success: false
      });
    }

    res.json({
      success: true,
      reservations: result
    });

  });

});

app.put("/api/reservations/confirm/:id", (req, res) => {

  const { id } = req.params;
  const getSql = `
    SELECT * FROM reservations
    WHERE id = ?
  `;
  db.query(getSql, [id], async (err, result) => {

    if (err || result.length === 0) {
      return res.json({
        success: false,
        message: "Reservation not found"
      });
    }
    const reservation = result[0];
    const updateSql = `
      UPDATE reservations
      SET status = 'Confirmed'
      WHERE id = ?
    `;
    db.query(updateSql, [id], async (err2) => {

      if (err2) {
        return res.json({
          success: false,
          message: "Status update failed"
        });
      }
      // send confirmation email
      try {
        await transporter.sendMail({
          from: "kchoudhary2103@gmail.com",
          to: reservation.email,
          subject: "Table Reservation Confirmed 🍽️",
          html: `
            <h2>Reservation Confirmed 🎉</h2>
            <p>Hello ${reservation.name},</p>
            <p>Your reservation has been confirmed.</p>
            <ul>
              <li>Date: ${reservation.date}</li>
              <li>Time: ${reservation.time}</li>
              <li>Guests: ${reservation.guests}</li>
            </ul>
            <p>We look forward to serving you ❤️</p>
          `});

        return res.json({
          success: true,
          message: "Reservation confirmed & email sent"
        });

      } catch (emailErr) {
        return res.json({
          success: true,
          message: "Confirmed but email failed"
        });
      }
    });
  });
});

app.put("/api/reservations/cancel/:id", (req, res) => {

  const { id } = req.params;
  const sql = `
    UPDATE reservations
    SET status = 'Cancelled'
    WHERE id = ?
  `;
  db.query(sql, [id], (err) => {

    if (err) {
      return res.json({
        success: false
      });
    }
    res.json({
      success: true,
      message: "Reservation cancelled"
    });
  });
});


app.get("/api/orders", (req, res) => {

  const sql = `
    SELECT 
      orders.id,
      orders.customer_name,
      orders.address,
      orders.total_price,
      orders.status,
      orders.created_at,
      GROUP_CONCAT(order_items.item SEPARATOR ', ') AS items,
      GROUP_CONCAT(order_items.quantity SEPARATOR ', ') AS quantities
    FROM orders JOIN order_items
    ON orders.id = order_items.order_id
    GROUP BY orders.id
    ORDER BY orders.id DESC
  `;

  db.query(sql, (err, result) => {

    if (err) {
      return res.status(500).json(err);
    }

    res.json(result);
  });
});

app.put("/api/orders/:id", async (req, res) => {
  const { status } = req.body;

  try {
    const sql =
      "UPDATE orders SET status=? WHERE id=?";

    db.query(
      sql,
      [status, req.params.id],
      (err, result) => {
        if (err) {
          return res.status(500).json(err);
        }

        res.json({
          message: "Order status updated",
        });
      }
    );
  } catch (err) {
    res.status(500).json(err);
  }
});

app.get("/api/orders/:customerId", (req, res) => {

  const customerId = req.params.customerId;

  const sql = `
    SELECT 
  orders.id,
  orders.customer_name,
  orders.address,
  orders.total_price,
  orders.status,
  orders.created_at,
  GROUP_CONCAT(order_items.item) AS items,
  GROUP_CONCAT(order_items.quantity) AS quantities 
  FROM orders
  JOIN order_items
  ON orders.id = order_items.order_id
  WHERE orders.customer_id = ?
  GROUP BY orders.id
  ORDER BY orders.id DESC
  `;

  db.query(sql, [customerId], (err, result) => {

    if (err) {
      return res.status(500).json(err);
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


