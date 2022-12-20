import { Router } from "express";
import { AddAnswer , GetAllAnswers ,MarkAnswerPreferred} from '../controllers/answers.contoller.js'
import authenticateJWT from "../middlewares/verify.middleware.js";
/* Configure Route */
const router = Router()

/*Post Answer Route */
router.post('/',authenticateJWT ,AddAnswer);

/*Get all Answers Route */
router.get('/:id', GetAllAnswers);

router.put('/',authenticateJWT,MarkAnswerPreferred)


export default router