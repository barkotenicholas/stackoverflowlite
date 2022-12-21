import { searchQuery } from "../models/search.model.js";
import axios from "axios";
export const SearchQuestion = async (req, res) => {

    try {
        const { question } = req.query
        const result = await searchQuery(question)

        
        async function procesMultipleCandidates(data) {
            let generatedResponse = []
            for (let elem of data) {
                try {

                    const authHeader = req.headers.authorization;
                    const token = authHeader.split(' ')[1];
                    const { id, user_id, question, qdate } = elem;
                    const user = await axios.get(`http://localhost:5050/auth/${user_id}`, { headers: { authorization: `Bearer ${token}` } })
                    const { firstname, lastname } = user.data
                    const date = qdate.toLocaleDateString("en-US")

                    generatedResponse.push({ id, firstname, lastname, question, date})
                } catch (error) {
                    console.log('error' + error);
                }
            }
            return generatedResponse
        }

        const fullList = await procesMultipleCandidates(result)
        if (fullList) return res.status(200).json(fullList)

    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}