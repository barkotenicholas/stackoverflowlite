import poolPromise from '../config/database.config.js'

export const InsertComment = async(comment)=>{
    const pool =  await poolPromise
    const response = await pool.request()
                    .input('id',comment.id)
                    .input('answer_id',comment.ansid)
                    .input('user_id',comment.uid)
                    .input('comment',comment.comment)
                    .execute('spInsertComment')

    return response.rowsAffected
}

export const GetComment = async(answer_id)=>{
    const pool = await poolPromise
    const response = await pool.request().input('answer_id',answer_id).execute('spGetComments')
    return response.recordsets[0]
}
