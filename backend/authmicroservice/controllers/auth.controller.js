import { Login, AddUser, GetUser, AddSelectUser } from '../model/User.model.js';
import { v4 } from 'uuid';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
dotenv.config()

export const SignUpTest = async (req, res) => {
    try {
        const { firstname, lastname, email, password } = req.body;
        const id = v4()
        const hashedpwd = await bcrypt.hash(password, 9);
        const firstResult = await AddSelectUser({ id, firstname, lastname, email, hashedpwd });

        if (Object.keys(firstResult).length === 0) {
            return res.status(200).json({ message: "user created successfully" })
        } else {
            return res.status(401).json({ message: "user Already exist in system" })
        }

    } catch (error) {
        return res.status(403).json({ message: error.message })
    }
}
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
        return res.status(403).json({ message: error.message })
    }
}
export const login = async (req, res) => {

    try {

        const { email, password } = req.body;
        const result = await Login(email);
        if (!result) return res.status(403).json({ message: `user not found` });
        const checkpwd = await bcrypt.compare(password, result.password)
        if (!checkpwd) return res.status(403).json({ message: 'wrong password' });
        const { id, firstname, lastname } = result;
        const token = jwt.sign(
            {
                id,
                firstname,
                lastname,
                email
            },
            process.env.JWT_SECRET,
            {
                expiresIn: '5s'
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
        return res.status(403).json({ message: error.message })
    }


}
export const verify = async (req, res) => {

}
export const getUser = async (req, res) => {
    try {

        const id = req.params.id;
        console.log(id);
        const result = await GetUser(id);
        if (!result) return res.status(403).json({ message: `user not found` });
        const { firstname, lastname, email } = result;

        return res.status(200).json({
            firstname: firstname,
            lastname: lastname,
            email: email,
        })

    } catch (error) {
        return res.status(403).json({ message: error.message })
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