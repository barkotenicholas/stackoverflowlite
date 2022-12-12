import { Router } from "express";
import { addVote } from "../controllers/vote.controller.js";
/* Configure Route */
const router = Router()

/*Post vote Route */
router.post('/', addVote);

export default router