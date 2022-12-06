import { Router } from "express";
import { AddAnswer , GetAllAnswers } from '../controllers/answers.contoller.js'
/* Configure Route */
const router = Router()

/*Post Answer Route */
router.post('/', AddAnswer);

/*Get all Answers Route */
router.get('/:id', GetAllAnswers);




export default router