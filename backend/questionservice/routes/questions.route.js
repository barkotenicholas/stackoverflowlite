import { Router } from "express";
import { AddQuestion,DeleteQuesion,GetAllQuestion } from "../controllers/questions.controller.js";

/* Configure Route */
const router = Router()

/*Login Route */
router.post('/', AddQuestion);

/*Sign up Route */
router.get('/', GetAllQuestion);

/*Verify Token route */
router.delete('/', DeleteQuesion);


export default router