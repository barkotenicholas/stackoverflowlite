import { Router } from "express";
import { addComment, getComment } from "../controllers/comment.controller.js";

/* Configure Route */
const router = Router()

/*Post comment Route */
router.post('/', addComment);


/*Get comments for single questionn */
router.get('/:id',getComment    )



export default router