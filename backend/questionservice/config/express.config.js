import Express from "express";
import dotenv from "dotenv";
import cors from 'cors';
import questionRoute from '../routes/questions.route.js';
/* Configure dotenv */
dotenv.config()

/* Configure Express */
const app = Express()

/* Configure BodyParser to express */
app.use(Express.json())


app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
  });

/* Configure cors */
app.use(cors())


  
/* Add routes */
app.use('/question',questionRoute)

export default app