import express from "express";
import {Client} from "pg";

const app = express();

app.get("/", (req, res) => {
    res.send("Backend fungerar!");
  });

  const db = new Client({
    user: "postgres",
    host: "localhost",
    database: "MatLeverans",
    password: 'Bugatti88.',
    port: 3000,
  });
  db.connect();

app.listen(3010, () => {
  console.log("Server is running");
});