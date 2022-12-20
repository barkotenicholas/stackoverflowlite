import { Login, AddUser, GetUser, AddSelectUser } from '../model/User.model.js';
import { v4 } from 'uuid';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
dotenv.config()


export const signup = async (req, res) => {
    try {

        const { firstname, lastname, email, password } = req.body;

        const emailResult = await Login(email);
        if (emailResult) return res.status(401).json({ message: "user Already exist in system" })

        const id = v4()
        const hashedpwd = await bcrypt.hash(password, 9);
        const User = {
            id: id,
            firstname: firstname,
            lastname: lastname,
            email: email,
            password: hashedpwd
        }
        const response = await AddUser(User)
        if (response) return res.status(200).json({ message: "user created successfully" })

    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}
export const login = async (req, res) => {

    try {

        const { email, password } = req.body;
        const result = await Login(email);
        if (!result) return res.status(403).json({ message: `wrong credentials` });
        const checkpwd = await bcrypt.compare(password, result.password)
        if (!checkpwd) return res.status(403).json({ message: 'wrong credentials' });
        const { id, firstname, lastname } = result;
        const token = jwt.sign(
            {
                id,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: 86400
            }
        )
        return res.status(200).json({
            auth: true,
            id: id,
            message: 'log in success',
            firstname: firstname,
            lastname: lastname,
            email: email,
            token: token
        })

    } catch (error) {
        return res.status(500).json({ message: error.message })
    }


}
export const verify = async (req, res, next) => {
    try {
        console.log("verifyyy");
        const authHeader = req.headers.authorization;
        if (!authHeader) return res.status(403).send({ message: "No token provided!" });

        const token = authHeader.split(' ')[1];

        let user =jwt.verify(token, process.env.JWT_SECRET);

        if(user) return res.status(200).json({valid:true,user:user.id})

    } catch (error) {

    }
}
export const getUser = async (req, res) => {
    try {

        const id = req.params.id;
        const result = await GetUser(id);
        if (!result) return res.status(403).json({ message: `user not found` });
        const { firstname, lastname, email } = result;

        return res.status(200).json({
            firstname: firstname,
            lastname: lastname,
            email: email,
        })

    } catch (error) {
        return res.status(500).json({ message: error.message })
    }

}
export const signOut = async (req, res) => {
    const authHeader = req.headers["authorization"];
    console.log(authHeader);
    jwt.sign(authHeader, "", { expiresIn: 1 }, (logout, err) => {
        if (logout) {
            res.send({ msg: "You have been Logged Out" });
        } else {
            res.send({ msg: "Error" });
        }
    });
}