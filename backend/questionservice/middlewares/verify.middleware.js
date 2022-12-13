import axios from 'axios';
import dotenv from 'dotenv'
dotenv.config()

const authenticateJWT = async(req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(403).send({ message: "No token provided!" });

    const token = authHeader.split(' ')[1];
    const verifyResult = await axios.get(`http://localhost:5050/verify`,{headers:{authorization:`Bearer ${token}`}})
    if(verifyResult.data.valid){
        req.user = verifyResult.data.user;
        next()
    }

};

export default authenticateJWT