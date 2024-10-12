import { pool } from "../db.js";
import bcrypt from "bcrypt";
import { createToken } from "../libs/jwt.js";

export const register = async (req, res) => {
  try {
    const { nombre_usuario, email_usuario, password } = req.body;
    const passswordHash = await bcrypt.hash(password, 10);

    const existingCorreo = async (req, res) => {
      try {
        const [rows] = await pool.query(
          `select * from Usuario where  email_usuario= ?`,
          [email_usuario]
        );
      } catch (error) {
        console.log(error);
      }
    };

    if (existingCorreo.length > 0) {
      return res.status(400).json({ message: "El correo ya existe" });
    }
    const [rows] = await pool.query(
      `insert into Usuario (nombre_usuario,email_usuario,password) values (?,?,?)`,
      [nombre_usuario, email_usuario, passswordHash]
    );
    let response = {
      id: rows.insertId,
      nombre_usuario: nombre_usuario,
      email_usuario: email_usuario,
    };
    console.log(response);
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
  }
};

export const login = async (req, res) => {
  try {
    const { email_usuario, password } = req.body;

    const [rows] = await pool.query(
      ` select * from Usuario where email_usuario=? `,
      [email_usuario]
    );

    const Usuario = rows[0];

    const match = await bcrypt.compare(password, Usuario.password);

    if (!match) {
      return res.status(400).json({ message: "Incorrect Password" });
    }

    const token = await createToken({
      id: Usuario.id_Usuario,
    });
    res.cookie("token", token);
    console.log(token);
    return res
      .status(200)
      .json({ message: "Inicio de sesion exitoso", Usuario });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "error en el server" });
  }
};

export const logout = async (req, res) => {
  res.cookie("token", "", {
    expires: new Date(0),
  });
  return res.sendStatus(200);
};

export const getUsers = async (req, res) => {
  try {
    const [rows] = await pool.query(` select * from Usuario`);
    return res.json(rows);
  } catch (error) {
    console.log(error);
  }
};
