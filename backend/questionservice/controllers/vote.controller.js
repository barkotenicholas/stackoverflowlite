import {v4} from 'uuid';
import { Votes } from '../models/votes.model.js';

export const addVote =async(req,res)=>{
    
    const vote ={}
    vote.id = v4()
    vote.answer_id =req.body.answer_id,
    vote.user_id = req.body.user_id,
    vote.like = req.body.like,
    vote.dislike = req.body.dislike

    const result = Votes(vote)

    if(result) return res.status(200).json({message:'updated successfully'})

}