import { v4 } from 'uuid';
import dotenv from 'dotenv';
import { InsertQuestion ,GetQuestions } from '../models/question.model.js';
dotenv.config()
export const AddQuestion = async (req, res) => {

    try {

        const id = v4()
        
        const question ={};
        question.id = id;
        question.user_id = req.body.user_id;
        question.question = req.body.question;
        question.date = req.body.date;

       const response = await InsertQuestion(question)

       if(response) return res.status(200).json({message:'Question added'})

    } catch (error) {
        return res.status(403).json({message:error.message})
    }
}
export const GetAllQuestion = async (req, res) => {

    try {
        console.log("feth");
      const result = await GetQuestions()
      if(result) return res.status(200).json(result)

    } catch (error) {
        return res.status(403).json({ message: error.message })
    }


}
export const DeleteQuesion = async (req, res) => {

}