import { Router } from "express";
import { SearchQuestion } from "../controllers/search.controller.js";
import authenticateJWT from "../middlewares/verify.middleware.js";
/* Configure Route */
const router = Router()

/*Post vote Route */
router.get('/',authenticateJWT ,SearchQuestion);

export default router