import app from './config/express.config.js';
import dotenv from "dotenv";

/* Configure dotenv */
dotenv.config()

app.listen(process.env.PORT, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${process.env.PORT}`);
})