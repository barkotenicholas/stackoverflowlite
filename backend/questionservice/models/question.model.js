import poolPromise from '../config/database.config.js'

export const InsertQuestion = async (question) => {
  const pool = await poolPromise
  const result = await pool.request()
    .input('id', question.id)
    .input('user_id', question.user_id)
    .input('question', question.question)
    .input('qdate', question.date)
    .execute('spInsertQuestion')
  return result.rowsAffected
}
export const GetQuestions = async () => {
  const pool = await poolPromise;
  const result = await pool.request().execute("spSelectQuestion");
  return result.recordsets[0]
}
export const GetSingleQuestions = async (id) => {
  const pool = await poolPromise;
  const result = await pool.request().input('id', id).execute("spGetSingleProcedure");
  return result.recordsets[0]
}
export const DeleteQuestion = async (user) => {
  const pool = await poolPromise
  const result = await pool.request()
    .input('question_id', user.question_id)
    .input('user_id',user.id)
    .execute('spDeleteQuestion')
  return result.rowsAffected;
}
export const GetAllQuestionForSingleUser = async (id) => {
  const pool = await poolPromise;
  const result = await pool.request().input('user_id', id).execute("spSelectSingleUserQuestions");
  return result.recordsets[0]
}
export const GetQuestionWithMostAnswers = async (range) => {
  const pool = await poolPromise;
  const result = await pool.request().input('scope', range).execute("spGetMostAnsweredQuestion");
  return result.recordsets[0]
}
export const GetQuestionsByDate = async()=>{
  const pool = await poolPromise;
  const result = await pool.request().execute("spGetQuestionsByDate");
  return result.recordsets[0]
}