import express from "express";
import {Client} from "pg";
import dotenv from "dotenv";
import cors from "cors"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

//import login from "login.js"


dotenv.config();


const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Backend fungerar!");
  });
  app.post("/login", async (req, res) => {
    const { email, password } = req.body;
  
    

    try {
  
      // Hitta användaren via email
      const result = await db.query(
        "SELECT * FROM accounts WHERE email = $1",
        [email]
      );
  
      // Om ingen användare finns
      if (result.rows.length === 0) {
        return res.status(401).json({
          message: "Fel email eller lösenord",
        });
      }
  
      const user = result.rows[0];
  
      // Jämför lösenord
      const passwordMatch = await bcrypt.compare(
        password,
        user.password
      );

      console.log(email);
        console.log(password);
        console.log(user.password);

      console.log(passwordMatch);
  
      // Om lösenordet är fel
      if (!passwordMatch) {
        return res.status(401).json({
          message: "Fel email eller lösenord",
        });
      }
  
      // Skapa token
      const token = jwt.sign(
        {
          id: user.id,
          email: user.email,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "7d",
        }
      );
  
      // Skicka token till frontend
      res.json({
        message: "Inloggad",
        token,
      });
  
    } catch (err) {
      console.error(err);
  
      res.status(500).json({
        message: "Något gick fel",
      });
    }
  });
  app.post("/signup", async (req, res) => {
    const { firstName, lastName, email, password } = req.body;
  console.log("hej")
    try {

      const encpass = await bcrypt.hash(password, 10);
      console.log(encpass);

      const result = await db.query(
        "INSERT INTO accounts (firstName, lastName, email, password) VALUES ($1, $2, $3, $4) RETURNING *",
        [firstName, lastName, email, encpass]
      );
  
      res.status(201).json({
        message: "Användare skapad",
        user: result.rows[0],
      });
      //res.redirect("");
    } catch (err) {
      console.error(err);
      res.status(500).json({
        message: "Något gick fel",
      });
    }
  });

  const db = new Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
  });


  db.connect();

app.listen(3010, () => {
  console.log("Server is running");
});

