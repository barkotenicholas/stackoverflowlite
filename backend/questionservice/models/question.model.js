import poolPromise from '../config/database.config.js'

export const InsertQuestion = async(question)=>{
    const pool = await poolPromise
    const result = await pool.request()
                    .input('id',question.id)
                    .input('user_id',question.user_id)
                    .input('question',question.question)
                    .input('qdate',question.date)
                    .execute('spInsertQuestion')
    return result.rowsAffected
}
export const GetQuestions = async()=>{
  const pool = await poolPromise;
  const result = await pool.request().execute("spSelectQuestion");
  return result.recordsets[0]
}

export const DeleteQuestion = async(question)=>{
    const pool = await poolPromise
    const result = await pool.request()
                    .input('id',question.id)
                    .input('user_id',question.user_id)
                    .input('question',question.question)
                    .input('qdate',question.date)
                    .execute('spInsertQuestion')
    return result.rowsAffected;
}