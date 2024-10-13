import { pool } from "../db.js";

export const createTask = async (req, res) => {
  const { id } = req.user; // El id del usuario autenticado (según JWT)

  const { Titulo_nota, Descripcion_nota } = req.body;

  // Verificación de datos
  if (!Titulo_nota || !Descripcion_nota) {
    return res.status(400).json({ message: "Faltan datos obligatorios." });
  }

  try {
    // Inserción de la nueva nota en la base de datos
    const [result] = await pool.query(
      `INSERT INTO Notas (Titulo_nota, Descripcion_nota, id_Usuario) VALUES (?, ?, ?)`,
      [Titulo_nota, Descripcion_nota, id]
    );

    // Verificar si la inserción fue exitosa
    if (result.affectedRows === 1) {
      return res.status(201).json({
        message: "Nota creada exitosamente",
        notaId: result.insertId, // Retorna el ID de la nueva nota creada
      });
    } else {
      return res.status(500).json({ message: "Error al crear la nota." });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error en el servidor." });
  }
};

export const getTask = async (req, res) => {
  const { id } = req.user;

  try {
    const [rows] = await pool.query(`select * from Notas where id_Usuario=?`, [
      id,
    ]);
    return res.json(rows);
  } catch (error) {
    res.status(500).json({ message: "error al recuperar notas" });
  }
};

export const getTaskId = async (req, res) => {
  const idTask = req.params.id;

  const idUsuario = req.user.id;

  try {
    const [rows] = await pool.query(
      `select * from Notas where id_Notas=? and id_Usuario=?`,
      [idTask, idUsuario]
    );
    if (rows.length === 0) {
      return res.status(404).json({ message: "Nota no encontrada" });
    }
    return res.json(rows);
  } catch (error) {
    res.status(500).json({ message: "error al recuperar notas" });
  }
};
