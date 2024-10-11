import { createPool } from "mysql2/promise";
import { DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USER } from "./Config.js";

export const pool = createPool({
  user: DB_USER,
  host: DB_HOST,
  database: DB_NAME,
  password: DB_PASSWORD,
  port: DB_PORT,
});
