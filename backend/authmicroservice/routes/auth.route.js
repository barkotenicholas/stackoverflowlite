import { Router } from "express";
import { login, signup, verify ,getUser ,SignUpTest,signOut } from "../controllers/auth.controller.js";

/* Configure Route */
const router = Router()

/*Login Route */
router.post('/login', login);

/*Sign up Route */
router.post('/signup', signup);


/* Login Route  */
router.post('/logout',signOut)

/*Get User */
router.get('/:id',getUser)

/*Verify Token route */
router.get('/verify', verify);

/* Login Test route */
router.post('/test',SignUpTest)

/* Sign up route */
router.post('/testLogin',)
export default router