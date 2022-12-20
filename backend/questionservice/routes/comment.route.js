import { Router } from "express";
import { addComment, getComment } from "../controllers/comment.controller.js";
import authenticateJWT from "../middlewares/verify.middleware.js";

/* Configure Route */
const router = Router()

/*Post comment Route */
router.post('/',authenticateJWT, addComment);


/*Get comments for single questionn */
router.get('/:id',authenticateJWT,getComment)



export default router