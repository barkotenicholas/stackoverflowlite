import dotenv from 'dotenv'
import jwt from "jsonwebtoken"
dotenv.config()

const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) return res.status(403).send({ message: "No token provided!" });

    const token = authHeader.split(' ')[1];

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err)  return res.status(403).send({ message: err.message});
        req.user = user;
        next();
    });

};

export default authenticateJWT