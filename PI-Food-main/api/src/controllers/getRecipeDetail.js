require('dotenv').config();
const { API_KEY } = process.env;
const axios = require("axios")

console.log(API_KEY)
const getRecipeDetail = async (req, res) => {
    const { id } = req.params;
    console.log(id)
    try {
        if (id) {
            const { data } = await axios.get(`https://api.spoonacular.com/recipes/${id}/information?includeNutrition=false&apiKey=${API_KEY}`)
            console.log(API_KEY)
            console.log(data)
            console.log(API_KEY)
   
           


            res.status(200).json(data)

        }


    } catch (error) {
        res.status(400).json({ error: error.message })

    }
}







module.exports = { getRecipeDetail };