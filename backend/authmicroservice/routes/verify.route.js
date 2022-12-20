
import { Router } from "express";
import { verify  } from "../controllers/auth.controller.js";

const router = Router()
router.get('/', verify);

export default router