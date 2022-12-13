import { Router } from "express";
import { AddQuestion,DeleteSingleQuesion,GetAllQuestion ,getSingleQuestion ,GetQuestionsForSingleUser ,GetQuestionsWithMostAnswers } from "../controllers/questions.controller.js";
import authenticateJWT from "../middlewares/verify.middleware.js";

/* Configure Route */
const router = Router()

/*Post question Route */
router.post('/',authenticateJWT,AddQuestion);


/* Questions with most answers */
router.post('/mostanswered',GetQuestionsWithMostAnswers)

/*Get all questions Route */
router.get('/', GetAllQuestion);

/*Get Single question */
router.get('/:id',getSingleQuestion)


/* Get all questions for single user */
router.get("/user/:id",GetQuestionsForSingleUser)

/*Verify Token route */
router.delete('/', DeleteSingleQuesion);

export default router