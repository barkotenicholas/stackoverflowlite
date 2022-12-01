import Express from "express";
import dotenv from "dotenv";
import cors from 'cors';
import auth from '../routes/auth.route.js'; 
/* Configure dotenv */
dotenv.config()

/* Configure Express */
const app = Express()

/* Configure BodyParser to express */
app.use(Express.json())


/* Configure cors */
app.use(cors())

/* Add routes */

app.use('/auth',auth)

export default app