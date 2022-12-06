import Express from "express";
import dotenv from "dotenv";
import cors from 'cors';
import questionRoute from '../routes/questions.route.js';
import answersRoute from '../routes/answers.route.js';
import commentRoute from '../routes/comment.route.js';
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


  
/* Question routes */
app.use('/question',questionRoute)

/* Answers routes*/
app.use('/answers',answersRoute)

/* Question route0 */

app.use('/comment',commentRoute)
export default app