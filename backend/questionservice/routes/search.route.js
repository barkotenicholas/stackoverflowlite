import { Router } from "express";
import { SearchQuestion } from "../controllers/search.controller.js";
/* Configure Route */
const router = Router()

/*Post vote Route */
router.get('/', SearchQuestion);

export default router