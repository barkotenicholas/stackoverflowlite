import { v4 } from 'uuid';
import dotenv from 'dotenv';
import { InsertQuestion, GetQuestions, GetSingleQuestions, GetAllQuestionForSingleUser, DeleteQuestion, GetQuestionWithMostAnswers } from '../models/question.model.js';
import axios from 'axios';
dotenv.config()
export const AddQuestion = async (req, res) => {

    try {
        const id = v4()

        const question = {};
        question.id = id
        question.user_id =req.user;
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
        console.log(result);
        if (result.length === 0) {
            return res.status(403).json({ message: `no questions asked on platform` })
        }
        async function procesMultipleCandidates(data) {
            let generatedResponse = []
            for (let elem of data) {
                try {
                    const authHeader = req.headers.authorization;
                    const token = authHeader.split(' ')[1];

                    const { id, user_id, question, qdate } = elem;
                    const user = await axios.get(`http://localhost:5050/auth/${user_id}`,{headers:{authorization:`Bearer ${token}`}})
                    const { firstname, lastname } = user.data
                    const date = qdate.toLocaleDateString("en-US")

                    generatedResponse.push({ id, firstname, lastname, question, date })
                } catch (error) {
                    console.log('error' + error);
                }
            }
            return generatedResponse
        }

        const fullList = await procesMultipleCandidates(result)
        if (fullList) return res.status(200).json(fullList)



    } catch (error) {
        return res.status(403).json({ message: error.message })
    }


}
export const getSingleQuestion = async (req, res) => {
    try {
        const question_id = req.params.id;
        const response = await GetSingleQuestions(question_id)
        if (response) {
            return res.status(404).json({ message: `Question ${question_id} does not exist` })
        }
        const { id, user_id, question, qdate } = response[0]
        var date = qdate.toLocaleDateString("en-US")

        const user = await axios.get(`http://localhost:5050/auth/${user_id}`)
        if (user) {
            const { firstname, lastname } = user.data
            if (response) return res.status(200).json({ id, firstname, lastname, question, date })
        }

    } catch (error) {
        return res.status(403).json({ message: error.message })
    }
}
export const DeleteSingleQuesion = async (req, res) => {
    try {

        const question_id = req.body.question_id;
        const id = req.body.user_id;
        console.log(id);
        const result = await DeleteQuestion({ question_id, id })
        console.log(result[0]);
        if (result[0]) {
            return res.status(200).json({ message: 'question successfully deleted' })
        } else {
            return res.status(200).json({ message: 'question not deleted' })
        }

    } catch (error) {
        return res.status(403).json({ message: error.message })

    }
}
export const GetQuestionsForSingleUser = async (req, res) => {

    try {
        const user_id = req.params.id;
        const result = await GetAllQuestionForSingleUser(user_id)
        return res.status(200).json(result)
    } catch (error) {
        return res.status(403).json({ message: error.message })
    }

}
export const GetQuestionsWithMostAnswers = async (req, res) => {

    try {
        const range = req.body.range;
        const result = await GetQuestionWithMostAnswers(range)
        if (result) return res.status(200).json(result)
    } catch (error) {

    }
}
