import poolPromise from '../config/database.config.js'

export const InsertAnswers = async(answer)=>{
    const pool = await poolPromise
    const result = await pool.request()
                    .input('id',answer.id)
                    .input('question_id',answer.questionid)
                    .input('user_id',answer.user_id)
                    .input('answer',answer.answer)
                    .input('upvote',answer.upvote)
                    .input('downvote',answer.downvote)
                    .execute('spInsertAnswer')
    return result.rowsAffected
}
export const GetAnswers = async(q_id)=>{
  const pool = await poolPromise;
  const result = await pool.request().input("question_id",q_id).execute("spGetAllAnswers");
  return result.recordsets[0]
}