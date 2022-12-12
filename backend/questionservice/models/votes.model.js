import  poolPromise from '../config/database.config.js';


export const Votes = async(vote)=>{
  
    const pool = await poolPromise
    const result = await pool.request()
                        .input('id',vote.id)
                        .input('answer_id',vote.answer_id)
                        .input('user_id',vote.user_id)
                        .input('like',vote.like)
                        .input('dislikes',vote.dislike)
                        .execute('spInsertUpdateVotes')    
    return result.rowsAffected                    
}
export const GetVotesPerAnswer = async(answer_id)=>{
    const pool = await poolPromise
    const result = await pool.request()
                        .input('answer_id',answer_id)
                        .execute('spGetVotes')    
    return result.recordsets[0]     
}