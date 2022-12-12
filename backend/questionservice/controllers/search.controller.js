import { searchQuery } from "../models/search.model.js";

export const SearchQuestion = async (req, res) => {

    try {
        const { question } = req.query
        console.log(question);
        const result = await searchQuery(question)
        console.log(result);
        return res.status(200).json(result)
    } catch (error) {

    }
}