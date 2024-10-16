import { Router } from "express";
import { login, logout, register, verify } from "../controllers/auth.controllers.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { loginSchema, registerSchema } from "../schemas/validateSchema.js";
import { authRequiered } from "../middlewares/validateToken.js";

const router = Router();

router.post("/register", validateSchema(registerSchema), register);
router.post("/login", validateSchema(loginSchema), login);
router.post("/logout", logout);
    router.get('/verify' ,verify)


export default router;
