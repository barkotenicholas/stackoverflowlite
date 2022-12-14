import { v4 } from 'uuid';
import dotenv from 'dotenv';
import { InsertQuestion, GetQuestions, GetSingleQuestions, EditQuestion,GetAllQuestionForSingleUser, DeleteQuestion, GetQuestionWithMostAnswers ,GetQuestionsByDate, GetTotalQuestionindb } from '../models/question.model.js';
import axios from 'axios';  

dotenv.config()
export const AddQuestion = async (req, res) => {
    console.log(req.body);
    try {
        const id = v4()

        const question = {};
        question.id = id
        question.user_id = req.user;
        question.question = req.body.question;
        question.date = req.body.date;


        const response = await InsertQuestion(question)

        if (response) return res.status(200).json({ message: 'Question added' })

    } catch (error) {

        console.log(error.message);

        return res.status(403).json({ message: error.message });
    }
}
export const EditUserQuestion = async(req,res)=>{
    try {

        const question = {};
        question.id = req.body.id
        question.user_id = req.user;
        question.question = req.body.question;
        console.log(question);
        const response = await EditQuestion(question)

        if (response) return res.status(200).json({ message: 'Question edited' })
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: error.message });

    }
}
export const GetAllQuestion = async (req, res) => {


    try {

        const info={}
        info.pageno= req.params.pageno;
        info.pagesize = req.params.pagesize;

        console.log(info);
        const result = await GetQuestions(info)

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
                    const user = await axios.get(`http://localhost:5050/auth/${user_id}`, { headers: { authorization: `Bearer ${token}` } })
                    const { firstname, lastname } = user.data
                    const date = qdate.toLocaleDateString("en-US")

                    generatedResponse.push({ id, firstname, lastname, question, date})
                } catch (error) {
                    console.log('error' + error);
                }
            }
            return generatedResponse
        }

        const fullList = await procesMultipleCandidates(result)
        if (fullList) return res.status(200).json(fullList)



    } catch (error) {
        console.log(error.message);
        return res.status(403).json({ message: error.message })
    }


}
export const getSingleQuestion = async (req, res) => {
    try {
        const question_id = req.params.id;
        const response = await GetSingleQuestions(question_id)

        if (response.length !== 0) {
            const { id, user_id, question, qdate } = response[0]
            var date = qdate.toLocaleDateString("en-US")
            const authHeader = req.headers.authorization;
            const token = authHeader.split(' ')[1];
            const user = await axios.get(`http://localhost:5050/auth/${user_id}`, { headers: { authorization: `Bearer ${token}` } })

            if (user) {
                const { firstname, lastname } = user.data
                if (response) return res.status(200).json({ id,user_id, firstname, lastname, question, date })
            }
        }
        return res.status(404).json({ message: `Question ${question_id} does not exist` })

    } catch (error) {
        console.log(error);
        return res.status(403).json({ message: error.message })
    }
}
export const DeleteSingleQuesion = async (req, res) => {
    try {


        const question_id = req.params.id;
        const id = req.user

        const response = await GetSingleQuestions(question_id)
        console.log(response);
        console.log(id);
        if(response.length !== 0){
            const result = await DeleteQuestion({ question_id, id })
            if(result)  return res.status(200).json({ message: 'question successfully deleted' })

        }
        else {
            return res.status(200).json({ message: 'question not in database' })
        }

    } catch (error) {
        return res.status(403).json({ message: error.message })

    }
}
export const GetQuestionsForSingleUser = async (req, res) => {

    try {
        const user_id = req.params.id;
        console.log(user_id);
        const result = await GetAllQuestionForSingleUser(user_id)
        return res.status(200).json(result)
    } catch (error) {
        return res.status(403).json({ message: error.message })
    }

}
export const GetQuestionsWithMostAnswers = async (req, res) => {

    try {
      
        const result = await GetQuestionWithMostAnswers()
        async function procesMultipleCandidates(data) {
            let generatedResponse = []
            for (let elem of data) {
                try {
                    const { id } = elem;
                    const votesResult = await GetSingleQuestions(id)
                    if (votesResult.length !== 0) {
                        const { id, user_id, question, qdate } = votesResult[0]
                        var date = qdate.toLocaleDateString("en-US")
                        const authHeader = req.headers.authorization;
                        const token = authHeader.split(' ')[1];
                        const user = await axios.get(`http://localhost:5050/auth/${user_id}`, { headers: { authorization: `Bearer ${token}` } })
            
                        if (user) {
                            const { firstname, lastname } = user.data
                            generatedResponse.push({ id,user_id, firstname, lastname, question, date })
                        }
                    }

                } catch (error) {
                    console.log('error' + error);
                }
            }
            return generatedResponse 
        }

        const fullList = await procesMultipleCandidates(result)
        if (fullList) return res.status(200).json(fullList)
    } catch (error) {

    }
}
export const GetQuestionsWithDate= async (req, res) => {

    try {
    
        const result = await GetQuestionsByDate()
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
                    const user = await axios.get(`http://localhost:5050/auth/${user_id}`, { headers: { authorization: `Bearer ${token}` } })
                    const { firstname, lastname } = user.data
                    const date = qdate.toLocaleDateString("en-US")

                    generatedResponse.push({ id, firstname, lastname, question, date})
                } catch (error) {
                    console.log('error' + error);
                }
            }
            return generatedResponse
        }

        const fullList = await procesMultipleCandidates(result)
        if (fullList) return res.status(200).json(fullList)



    } catch (error) {
        return res.status(500).json({ message: error.message })

    }
}
export const GetTotalQuestionin = async (req,res)=>{

    try {
        const result = await GetTotalQuestionindb()
        if (result) {
            return res.status(200).json(result[0])
        }
    } catch (error) {
        return res.status(500).json({message:error.message})
    }

}