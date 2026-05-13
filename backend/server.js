import express from "express";
import {Client} from "pg";
import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Backend fungerar!");
  });

  app.post("/signup", async (req, res) => {
    const { username, email, password } = req.body;
  
    try {
      const result = await db.query(
        "INSERT INTO accounts (username, email, password) VALUES ($1, $2, $3) RETURNING *",
        [username, email, password]
      );
  
      res.status(201).json({
        message: "Användare skapad",
        user: result.rows[0],
      });
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