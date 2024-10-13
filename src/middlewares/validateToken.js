import jswt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config/config.js";
export const authRequiered = async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) return res.status(401).json({ message: "no esta autorizado" });
  try {
    jswt.verify(token, TOKEN_SECRET, (err, user) => {
      if (err) return res.status(500).json({ message: "token invalido" });
      req.user = user;
      next();
    });
  } catch (error) {
    console.log(error);
  }
};

