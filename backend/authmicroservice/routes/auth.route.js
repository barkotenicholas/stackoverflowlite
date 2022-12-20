import { Router } from "express";
import { login, signup, verify, getUser, signOut } from "../controllers/auth.controller.js";

import authenticateJWT from "../middlewares/verifyjwt.middleware.js";


/**
 * @swagger
 * components:
 *  schemas:
 *      User:
 *          type:object
 *          required:
 *             -title
 *             - author
 *  
 * */ 

/* Configure Route */
const router = Router()

/*Login Route */
router.post('/login', login);

/*Sign up Route */
router.post('/signup', signup);


/* Login Route  */
router.post('/logout', signOut)

/*Get User */
router.get('/:id', authenticateJWT, getUser)


export default router