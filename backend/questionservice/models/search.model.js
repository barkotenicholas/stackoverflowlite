import poolPromise from "../config/database.config.js";

export const searchQuery = async(question)=>{
    const pool = await poolPromise
    const request = await pool.request().input('question',question).execute('spSelectSearch')

    return request.recordsets[0]
}