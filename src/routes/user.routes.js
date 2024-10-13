import {Router} from "express";
import { getUsers, updateUser } from "../controllers/auth.controllers.js";
import { authRequiered } from "../middlewares/validateToken.js";

const router=Router()

router.get('/users',authRequiered, getUsers)
router.put('/edit-user/:id',authRequiered,updateUser)


export default router;