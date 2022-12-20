import { searchQuery } from "../models/search.model.js";

export const SearchQuestion = async (req, res) => {

    try {
        const { question } = req.query
        const result = await searchQuery(question)
        return res.status(200).json(result)
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}