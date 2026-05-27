const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// ================= REGISTER =================

const customerRegister = async (req, res) => {

  try {

    const {name, email, password,} = req.body;

    // CHECK EMAIL
    db.query("SELECT * FROM customers WHERE email = ?", [email],async (err, result) => {

        if (err) {

          console.log(err);
          return res.status(500).json({
            success: false,
            message: "Database Error",
          });

        }

        // EMAIL EXISTS
        if (result.length > 0) {
          return res.status(400).json({
            success: false,
            message: "Email already registered",
          });
        }

        // HASH PASSWORD
        const hashedPassword =
          await bcrypt.hash(password, 10);

        // TOKEN
        const verificationToken =
          Math.random()
            .toString(36)
            .substring(2);

        // INSERT CUSTOMER
        db.query(`INSERT INTO customers (name, email, password, verification_token)VALUES (?, ?, ?, ?)`,
          [ name,
            email,
            hashedPassword,
            verificationToken,
          ],

          (err, insertResult) => {

            if (err) {

              console.log(err);

              return res.status(500).json({

                success: false,
                message: "Registration Failed",
              });
            }

            // JWT
            const token = jwt.sign(

              {
                id: insertResult.insertId,
                email,
              },

              process.env.CUSTOMER_JWT_SECRET,

              {
                expiresIn: "7d",
              }
            );

            // SUCCESS
            res.status(201).json({

              success: true,
              message:"Registration Successful",
              token,
              customer: {
                id:insertResult.insertId,
                name,
                email,},
            });
          }
        );
      }
    );

  } catch (err) {

    console.log(err);
    res.status(500).json({
      success: false,
      message:"Registration Failed",
    });
  }
};


// ================= LOGIN =================

const customerLogin = async (req, res) => {
  try {
    const {email,password} = req.body;
    // CHECK EMAIL
    db.query(
      "SELECT * FROM customers WHERE email = ?",[email],
      async (err, customers) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            success: false,
            message: "Database Error",
          });
        }

        // CUSTOMER NOT FOUND
        if (customers.length === 0) {

          return res.status(401).json({
            success: false,
            message:"Invalid Email or Password",
          });
        }

        const customer = customers[0];
        // CHECK PASSWORD
        const isMatch =
          await bcrypt.compare(
            password,
            customer.password
          );

        // WRONG PASSWORD
        if (!isMatch) {

          return res.status(401).json({
            success: false,
            message:"Invalid Email or Password",
          });
        }

        // CREATE TOKEN
        const token = jwt.sign(
          {
            id: customer.id,
            email: customer.email,
          },
          process.env.CUSTOMER_JWT_SECRET,
          {
            expiresIn: "7d",
          }
        );

        // SUCCESS
        res.json({
          success: true,
          message:"Login Successful",
          token,
          customer: {
            id: customer.id,
            name: customer.name,
            email: customer.email,
          },
        });
      }
    );

  } catch (err) {

    console.log(err);
    res.status(500).json({
      success: false,
      message:"Login Failed",
    });
  }
};

module.exports = {
  customerRegister,
  customerLogin,
};