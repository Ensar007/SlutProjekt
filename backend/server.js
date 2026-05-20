import express from "express";
import {Client} from "pg";
import dotenv from "dotenv";
import cors from "cors"
import bcrypt from "bcrypt";
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Backend fungerar!");
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