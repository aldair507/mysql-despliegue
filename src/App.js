import express from "express";
import { pool } from "./db.js";
import { PORT } from "./Config.js";
const App = express();

App.listen(PORT, () => {
  console.log("server on port",PORT);
});

App.get("/ping", async (req, res) => {
  try {
    const [result] = await pool.query(`select "hello word" as query`);
    console.log(result[0]);
    res.json({ result });
  } catch (error) {
    console.log(error);
  }
});

App.get("/create", async (req, res) => {
  try {
    const [query] = await pool.query(
      `insert into user( name) values ("aldair")`
    );
    return res.json(query);
  } catch (error) {
    console.log(error);
  }
});
App.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query(` select * from user`);
    return res.json(rows);
  } catch (error) {
    console.log(error);
  }
});
