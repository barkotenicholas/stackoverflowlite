import { Router } from "express";
import { downVote, upVote } from "../controllers/vote.controller.js";
import authenticateJWT from "../middlewares/verify.middleware.js";
/* Configure Route */
const router = Router()

/*Post vote Route */
router.post('/up', authenticateJWT, upVote);
router.post('/down', authenticateJWT, downVote);
export default router