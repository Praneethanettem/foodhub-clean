const express = require("express");

const cors = require("cors");

const mysql = require("mysql2");
const bcrypt = require("bcrypt");
const app = express();


// MIDDLEWARE

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));


// MYSQL CONNECTION
require("dotenv").config();
const mysql = require("mysql2");

const db = mysql.createConnection({
  host: process.env.MYSQLHOST,
  user: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQLDATABASE,
  port: Number(process.env.MYSQLPORT)
});

db.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("MySQL Connected ✅");
  }
});

// TEST ROUTE

app.get("/", (req,res)=>{

  res.send("Backend Running 🔥");

});


// ================= SIGNUP API =================
// ================= SIGNUP API =================
app.post("/signup", (req,res)=>{

  const { name, email, password } = req.body;

  const checkSql =
  "SELECT * FROM users WHERE email=?";

  db.query(

    checkSql,

    [email],

    (checkErr,checkResult)=>{

      if(checkErr){

        console.log(checkErr);

        res.send("Database Error");

      }

      else{

        if(checkResult.length > 0){

          res.send("User Already Exists");

        }

        else{

          bcrypt.hash(password,10,(hashErr,hashedPassword)=>{

            if(hashErr){

              console.log(hashErr);

              res.send("Hash Error");

            }

            else{

              const insertSql =
              "INSERT INTO users (name,email,password) VALUES (?,?,?)";

              db.query(

                insertSql,

                [name,email,hashedPassword],

                (insertErr,insertResult)=>{

                  if(insertErr){

                    console.log(insertErr);

                    res.send("Signup Failed");

                  }

                  else{

                    res.send("Signup Successful");

                  }

                }

              );

            }

          });

        }

      }

    }

  );

});
// ================= LOGIN API =================
// ================= LOGIN API =================
app.post("/login", (req,res)=>{

  const { email, password } = req.body;

  const sql =
  "SELECT * FROM users WHERE email=?";

  db.query(

    sql,

    [email],

    (err,result)=>{

      if(err){

        console.log(err);

        res.send("Login Failed");

      }

      else{

        if(result.length > 0){

          const storedPassword =
          result[0].password;

          // OLD NORMAL PASSWORD USERS

          if(storedPassword === password){

            res.send("Login Successful");

          }

          // NEW HASHED PASSWORD USERS

          else{

            bcrypt.compare(

              password,

              storedPassword,

              (compareErr,compareResult)=>{

                if(compareResult){

                  res.send("Login Successful");

                }

                else{

                  res.send("Invalid Credentials");

                }

              }

            );

          }

        }

        else{

          res.send("Invalid Credentials");

        }

      }

    }

  );

});
// ================= USERS API =================

app.get("/users", (req,res)=>{

  const sql =
  "SELECT id,name,email FROM users";

  db.query(

    sql,

    (err,result)=>{

      if(err){

        console.log(err);

        res.send([]);

      }

      else{

        res.send(result);

      }

    }

  );

});


// ================= PLACE ORDER API =================

app.post("/placeorder", (req,res)=>{

  const {

    customer,

    item,

    amount,

    payment,

    status

  } = req.body;


  const sql =
  "INSERT INTO orders (customer,item,amount,payment,status) VALUES (?,?,?,?,?)";


  db.query(

    sql,

    [

      customer,

      item,

      amount,

      payment,

      status

    ],

    (err,result)=>{

      if(err){

        console.log(err);

        res.send("Order Failed");

      }

      else{

        res.send("Order Placed");

      }

    }

  );

});


// ================= GET ORDERS API =================

app.get("/orders", (req,res)=>{

  const sql =
  "SELECT * FROM orders";

  db.query(

    sql,

    (err,result)=>{

      if(err){

        console.log(err);

        res.send([]);

      }

      else{

        res.send(result);

      }

    }

  );

});
// ================= DELETE USER API =================
// DELETE USER API

app.get("/deleteuser/:id", (req,res)=>{

  const sql =
  "DELETE FROM users WHERE id=?";

  db.query(

    sql,

    [req.params.id],

    (err,result)=>{

      if(err){

        console.log(err);

        res.send("Delete Failed");

      }

      else{

        res.send("User Deleted");

      }

    }

  );

});
// ================= PROFILE API =================

app.get("/profile/:email", (req,res)=>{

  const sql =
  "SELECT * FROM users WHERE email=?";

  db.query(

    sql,

    [req.params.email],

    (err,result)=>{

      if(err){

        console.log(err);

        res.send({});

      }

      else{

        res.send(result[0]);

      }

    }

  );

});

app.put("/updateprofile",(req,res)=>{

  const { oldEmail,name,email } = req.body;

  const sql =
  "UPDATE users SET name=?, email=? WHERE email=?";

  db.query(

    sql,

    [name,email,oldEmail],

    (err,result)=>{

      if(err){

        console.log(err);

        res.send("Update Failed");

      }

      else{

        res.send("Profile Updated");

      }

    }

  );

});
// ================= USER ORDERS API =================

app.get("/userorders/:email",(req,res)=>{

  const sql =
  "SELECT * FROM orders WHERE customer=? ORDER BY id DESC";

  db.query(

    sql,

    [req.params.email],

    (err,result)=>{

      if(err){

        console.log(err);

        res.send([]);

      }

      else{

        res.send(result);

      }

    }

  );

});

// CONTACT API

app.post("/contact", (req,res)=>{

  const { name, email, message } = req.body;

  const sql =
  "INSERT INTO contact(name,email,message) VALUES(?,?,?)";

  db.query(

    sql,

    [name,email,message],

    (err,result)=>{

      if(err){

        console.log(err);

        res.send("Query Failed");

      }

      else{

        res.send("Query Submitted Successfully");

      }

    }

  );

});
// CONTACT API

app.post("/contact", (req,res)=>{

  const { name, email, message } = req.body;

  const sql =
  "INSERT INTO contact(name,email,message) VALUES(?,?,?)";

  db.query(

    sql,

    [name,email,message],

    (err,result)=>{

      if(err){

        console.log(err);

        res.send("Query Failed");

      }

      else{

        res.send("Query Submitted Successfully");

      }

    }

  );

});
// ADD FOOD API
// ADD FOOD API

app.post("/addfood", (req,res)=>{

  console.log(req.body);

  const {

    name,

    price,

    image,

    category

  } = req.body;

  const sql =
  "INSERT INTO foods(name,price,image,category) VALUES(?,?,?,?)";

  db.query(

    sql,

    [

      name,

      price,

      image,

      category

    ],

    (err,result)=>{

      if(err){

        console.log(err);

        res.send("Food Add Failed");

      }

      else{

        res.send("Food Added Successfully");

      }

    }

  );

});
// GET FOODS API

app.get("/foods", (req,res)=>{

  const sql =
  "SELECT * FROM foods";

  db.query(

    sql,

    (err,result)=>{

      if(err){

        console.log(err);

        res.send([]);

      }

      else{

        res.send(result);

      }

    }

  );

});
// ================= SERVER =================

app.listen(7000, ()=>{

  console.log("Server Running On Port 7000 🚀");

});