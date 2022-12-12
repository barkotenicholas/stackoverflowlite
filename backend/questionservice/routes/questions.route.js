import { Router } from "express";
import { AddQuestion,DeleteSingleQuesion,GetAllQuestion ,getSingleQuestion ,GetQuestionsForSingleUser} from "../controllers/questions.controller.js";

/* Configure Route */
const router = Router()

/*Post question Route */
router.post('/', AddQuestion);

/*Get all questions Route */
router.get('/', GetAllQuestion);

/*Get Single question */
router.get('/:id',getSingleQuestion)


/* Get all questions for single user */
router.get("/user/:id",GetQuestionsForSingleUser)


/*Verify Token route */
router.delete('/', DeleteSingleQuesion);

export default router