import { v4 } from 'uuid';
import dotenv from 'dotenv';
dotenv.config()
import { GetComment , InsertComment } from '../models/comment.model.js'
import axios from 'axios';

export const addComment = async(req,res)=>{
    try {
        let id = v4()
        const comment ={};
        comment.id = id;
        comment.ansid = req.body.answer_id;
        comment.uid = req.user
        comment.comment = req.body.comment;

        const result = await InsertComment(comment)
        if(result) return res.status(200).json({message:"comment added"})

    } catch (error) {
        return res.status(400).json({message:error.message})
    }
}
export const getComment = async(req,res)=>{


    try {

        const question_id = req.params.id;
        console.log("asdasd");
        const response = await GetComment(question_id)
        console.log(response);
        async function procesMultipleCandidates (data) {
            let generatedResponse = []
            for(let elem of data) {
              try {
                const {id,user_id , answer_id,comment} = elem;
                const authHeader = req.headers.authorization;
                const token = authHeader.split(' ')[1];
                console.log(token);
                const user = await axios.get(`http://localhost:5050/auth/${user_id}`, { headers: { authorization: `Bearer ${token}` } })
    
                const {firstname,lastname}  = user.data

                generatedResponse.push({id,firstname,lastname,comment,answer_id})
              } catch (error) {
                console.log('error'+ error);
              }
            }
            console.log('complete all') // gets loged first
            return generatedResponse // return without waiting for process of 
          }

        const fullList = await procesMultipleCandidates(response)  

        
        if(fullList) return res.status(200).json(fullList)

    } catch (error) {
        return res.status(400).json({message:error.message})

    }

}