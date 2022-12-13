import { Router } from "express";
import { AddAnswer , GetAllAnswers ,MarkAnswerPreferred} from '../controllers/answers.contoller.js'
/* Configure Route */
const router = Router()

/*Post Answer Route */
router.post('/', AddAnswer);

/*Get all Answers Route */
router.get('/:id', GetAllAnswers);

router.put('/',MarkAnswerPreferred)


export default router