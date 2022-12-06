import { v4 } from 'uuid';
import dotenv from 'dotenv';
import { InsertAnswers, GetAnswers } from '../models/answers.model.js'
dotenv.config()
export const AddAnswer = async (req, res) => {

    try {
        const id = v4()
        const answer = {};
        answer.id = id;
        answer.questionid = req.body.questionid;
        answer.user_id = req.body.uid;
        answer.answer = req.body.answer;
        answer.upvote = req.body.upvote;
        answer.downvote = req.body.downvote;

        const result = await InsertAnswers(answer)

        if (result) {
            return res.status(200).json({ message: "question answer added" })
        }

    } catch (error) {
        return res.status(403).json({ message: error.message });
    }
}
export const GetAllAnswers = async (req, res) => {

    try {

        const question_id = req.params.id;


        const result = await GetAnswers(question_id)
        if (result) {
            return res.status(200).json(result)
        }


    } catch (error) {
        return res.status(403).json({ message: error.message })
    }


}