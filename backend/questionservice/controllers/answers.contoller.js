import { v4 } from 'uuid';
import dotenv from 'dotenv';
import axios from 'axios';
import { InsertAnswers, GetAnswers } from '../models/answers.model.js'
import { GetVotesPerAnswer } from '../models/votes.model.js';
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
        async function procesMultipleCandidates(data) {
            let generatedResponse = []
            for (let elem of data) {
                try {
                    const { id, user_id, question_id, answer, upvote, downvote } = elem;
                 

                    const votesResult = await GetVotesPerAnswer(id)
                    const {TotalLikes,TotalDislikes} = votesResult[0]
                    console.log(TotalDislikes);
                    const user = await axios.get(`http://localhost:5050/auth/${user_id}`)
                    const { firstname, lastname } = user.data

                    generatedResponse.push({ id, firstname, lastname, answer, question_id, TotalLikes, TotalDislikes })
                } catch (error) {
                    console.log('error' + error);
                }
            }
            console.log('complete all') // gets loged first
            return generatedResponse // return without waiting for process of 
        }

        const fullList = await procesMultipleCandidates(result)
        if (fullList) return res.status(200).json(fullList)


    } catch (error) {
        return res.status(403).json({ message: error.message })
    }


}