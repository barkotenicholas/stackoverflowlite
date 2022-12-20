import Express from "express";
import dotenv from "dotenv";
import cors from 'cors';
import questionRoute from '../routes/questions.route.js';
import answersRoute from '../routes/answers.route.js';
import commentRoute from '../routes/comment.route.js';
import votesRoute from '../routes/votes.route.js';
import searchRoute from '../routes/search.route.js';
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

/* Votes Route*/
app.use('/votes',votesRoute)

/*Comment route */
app.use('/comment',commentRoute)

/* Search Route */
app.use('/search',searchRoute)
export default app