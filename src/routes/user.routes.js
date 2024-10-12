import {Router} from "express";
import { getUsers } from "../controllers/auth.controllers.js";

const router=Router()

router.get('/users',getUsers)


export default router;