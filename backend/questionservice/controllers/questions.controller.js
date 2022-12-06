import { v4 } from 'uuid';
import dotenv from 'dotenv';
import { InsertQuestion, GetQuestions, GetSingleQuestions } from '../models/question.model.js';
import axios from 'axios';
dotenv.config()
export const AddQuestion = async (req, res) => {

    try {

        const id = v4()

        const question = {};
        question.id = id;
        question.user_id = req.body.user_id;
        question.question = req.body.question;
        question.date = req.body.date;

        const response = await InsertQuestion(question)

        if (response) return res.status(200).json({ message: 'Question added' })

    } catch (error) {
        return res.status(403).json({ message: error.message });
    }
}
export const GetAllQuestion = async (req, res) => {

    try {
        const result = await GetQuestions()
        if (result) return res.status(200).json(result)

    } catch (error) {
        return res.status(403).json({ message: error.message })
    }


}
export const getSingleQuestion = async (req, res) => {
    try {
        const question_id = req.params.id;
        const response = await GetSingleQuestions(question_id)
        const { id , user_id , question ,qdate } = response[0]
        const user = await axios.get(`http://localhost:5050/auth/${user_id}`)
        if(user){
            const {firstname,lastname}  = user.data
            if (response) return res.status(200).json({id,firstname,lastname,question,qdate})
        }

    } catch (error) {
        return res.status(403).json({ message: error.message })
    }
}
export const DeleteQuesion = async (req, res) => {

}