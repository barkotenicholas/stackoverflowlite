import {v4} from 'uuid';
import { Votes } from '../models/votes.model.js';

export const upVote =async(req,res)=>{
    
    const vote ={}
    vote.id = v4()
    vote.answer_id =req.body.answer_id,
    vote.user_id = req.user;
    vote.like = 1;
    vote.dislike = 0;
    console.log("upvote ");
    console.log(vote.user_id);
    console.log(vote.answer_id);
    const result = await Votes(vote)

    console.log(result);

    if(result) return res.status(200).json({message:'updated successfully'})

}

export const downVote = async(req,res)=>{
    const vote ={}
    vote.id = v4()
    vote.answer_id =req.body.answer_id,
    vote.user_id = req.user;
    vote.like = 0;
    vote.dislike = 1;
    console.log("downvote");
    const result = await Votes(vote)

    if(result) return res.status(200).json({message:'updated successfully'})
}