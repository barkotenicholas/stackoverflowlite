import { Router } from "express";
import { AddQuestion,DeleteSingleQuesion,GetAllQuestion ,getSingleQuestion ,GetQuestionsForSingleUser ,GetQuestionsWithMostAnswers ,GetQuestionsWithDate } from "../controllers/questions.controller.js";
import authenticateJWT from "../middlewares/verify.middleware.js";

/* Configure Route */
const router = Router()

/*Post question Route */
router.post('/',authenticateJWT,AddQuestion);

    
/* Questions with most answers */
router.get('/mostanswered',authenticateJWT,GetQuestionsWithMostAnswers)

/*Get all questions Route */
router.get('/', GetAllQuestion);

/* Get question by date */
router.get('/bydate',authenticateJWT,GetQuestionsWithDate)

/*Get Single question */
router.get('/:id',getSingleQuestion)


/* Get all questions for single user */
router.get("/user/:id",GetQuestionsForSingleUser)



/*Verify Token route */
router.delete('/:id',authenticateJWT, DeleteSingleQuesion);

export default router