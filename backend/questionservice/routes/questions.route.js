import { Router } from "express";
import { AddQuestion,DeleteQuesion,GetAllQuestion ,getSingleQuestion} from "../controllers/questions.controller.js";

/* Configure Route */
const router = Router()

/*Post question Route */
router.post('/', AddQuestion);

/*Get all questions Route */
router.get('/', GetAllQuestion);

/*Get Single question */
router.get('/:id',getSingleQuestion)

/*Verify Token route */
router.delete('/', DeleteQuesion);

/*Add answers */


export default router