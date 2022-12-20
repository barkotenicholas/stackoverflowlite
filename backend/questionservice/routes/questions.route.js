import { Router } from "express";
import { 
    AddQuestion,
    DeleteSingleQuesion,
    GetAllQuestion ,
    getSingleQuestion ,
    GetQuestionsForSingleUser,
    GetQuestionsWithMostAnswers,
    GetQuestionsWithDate,
    GetTotalQuestionin } from "../controllers/questions.controller.js";
import authenticateJWT from "../middlewares/verify.middleware.js";

/* Configure Route */
const router = Router()

/*Post question Route */
router.post('/',authenticateJWT,AddQuestion);

/*Get all questions Route */
router.get('/:pageno/:pagesize', authenticateJWT,GetAllQuestion);
    
/* Questions with most answers */
router.get('/mostanswered',authenticateJWT,GetQuestionsWithMostAnswers)

/* Get total questtions */
router.get('/getTotalQuestions',authenticateJWT,GetTotalQuestionin)

/* Get question by date */
router.get('/bydate',authenticateJWT,GetQuestionsWithDate)

/*Get Single question */
router.get('/:id',getSingleQuestion)

/* Get all questions for single user */
router.get("/profile/user/:id",authenticateJWT,GetQuestionsForSingleUser)

/*Verify Token route */
router.delete('/:id',authenticateJWT, DeleteSingleQuesion);

export default router