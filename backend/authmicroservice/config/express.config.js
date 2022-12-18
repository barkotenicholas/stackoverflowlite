import Express from "express";
import dotenv from "dotenv";
import cors from 'cors';
import auth from '../routes/auth.route.js'; 
import verify from '../routes/verify.route.js';
import swaggerUi from 'swagger-ui-express';
import jsonDoc from 'swagger-jsdoc';
import swaggerJSDoc from "swagger-jsdoc";
/* Configure dotenv */
dotenv.config()

/* Configure Express */
const app = Express()

/* Configure BodyParser to express */
app.use(Express.json())

/* Configure options for json doc */
const options ={
    definition:{
        openapi:'3.0.0',
        info :{
            title:"User API",
            version:"1.0.0",
            description:"Users login API"
        },
        servers:[
            {
                url:"http://localhost:5050"
            }
        ],
       
    },
    apis:[
        '../routes/*.js'
    ]
}

const specs = swaggerJSDoc(options)

/* Configure cors */
app.use(cors())

/* Add routes */
app.use('/auth',auth)

/* Verify route */
app.use('/verify',verify)

/* API docs */
app.use('/api-docs',swaggerUi.serve,swaggerUi.setup(specs))
export default app