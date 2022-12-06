import { Router } from "express";
import { login, signup, verify ,getUser } from "../controllers/auth.controller.js";

/* Configure Route */
const router = Router()

/*Login Route */
router.post('/login', login);

/*Sign up Route */
router.post('/signup', signup);

/*Get User */
router.get('/:id',getUser)

/*Verify Token route */
router.get('/verify', verify);


export default router