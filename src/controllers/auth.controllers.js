import { pool } from "../db.js";
import bcrypt from "bcrypt";
import { createToken } from "../libs/jwt.js";
import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config/config.js";

export const register = async (req, res) => {
  try {
    const { nombre_usuario, email_usuario, password } = req.body;
    const passswordHash = await bcrypt.hash(password, 10);

    const [existingCorreo] = await pool.query(
      `select * from Usuario where email_usuario= ?`,
      [email_usuario]
    );

    if (existingCorreo.length > 0) {
      return res.status(400).json({ message: "El correo ya existe" });
    }
    const [rows] = await pool.query(
      `insert into Usuario (nombre_usuario,email_usuario,password) values (?,?,?)`,
      [nombre_usuario, email_usuario, passswordHash]
    );
    const token = await createToken({
      id: rows.insertId,
      nombre: nombre_usuario,
    });
    console.log(token);
    res.cookie("token", token, {
      httpOnly: true,  // Solo accesible desde el backend, no desde JavaScript del frontend
      secure: true,    // Solo se envía a través de HTTPS
      sameSite: "Lax"  // O 'Strict' o 'None' dependiendo de tu situación
    });
    let response = {
      id: rows.insertId,
      nombre_usuario: nombre_usuario,
      email_usuario: email_usuario,
    };
    console.log(response);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(400).json(error);
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
      nombre: Usuario.nombre_usuario,
    });
    res.cookie("token", token, {
      httpOnly: true,  // Solo accesible desde el backend, no desde JavaScript del frontend
      secure: true,    // Solo se envía a través de HTTPS
      sameSite: "Lax"  // O 'Strict' o 'None' dependiendo de tu situación
    });

    return res
      .status(200)
      .json({ message: "Inicio de sesion exitoso", Usuario,token });
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

export const updateUser = async (req, res) => {
  const { id } = req.params;

  const { email_usuario, nombre_usuario } = req.body;
  try {
    await pool.query(
      `update Usuario set nombre_usuario=?,email_usuario=? where id_Usuario=?`,
      [nombre_usuario, email_usuario, id]
    );
    if (!id) {
      return res.status(400).json({ message: "ID de usuario es requerido" });
    }
    const [rows] = await pool.query(
      `SELECT * FROM Usuario WHERE id_Usuario = ?`,
      [id]
    );
    return res.status(200).json(rows[0]);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "error al actualizar" });
  }
};
export const verify = async (req, res) => {
  try {
    const { token } = req.cookies; // Extraer el token de las cookies

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" }); // Corrección de tipografía
    }

    jwt.verify(token, TOKEN_SECRET, async (err, user) => {
      if (err) {
        // Manejando diferentes tipos de errores de JWT
        if (err.name === "TokenExpiredError") {
          return res.status(401).json({ message: "Token Expired" });
        } else {
          return res.status(401).json({ message: "Unauthorized" });
        }
      }

      // Si el token es válido, hacer consulta a la base de datos
      const [rows] = await pool.query(
        `SELECT * FROM Usuario WHERE id_Usuario = ?`,
        [user.id]
      );

      if (rows.length === 0) {
        return res.status(404).json({ message: "User not found" }); // Controlar cuando no se encuentra el usuario
      }

      return res.status(200).json(rows[0]); // Devolver la información del usuario encontrado
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" }); // Error de servidor
  }
};

// verifico el toke de req.cookie
// si no existe el token inautrizado
// si existe el token pero es expirado verico el nombre y retorno TokenExpiredError

// busco el usurio
