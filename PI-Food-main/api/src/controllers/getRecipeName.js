require('dotenv').config();
const { Op } = require('sequelize');
const { API_KEY } = process.env;
const axios = require("axios")
const { Recipe,Diet } = require("../db.js");


console.log(API_KEY)
const getRecipeName = async (req, res) => {

    try {
        const { name } = req.query;
        const apiResponse = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`);
            const apiRecipes = apiResponse.data.results;
           

        if (name) { 
        const dbRecipes = await Recipe.findAll({
            where: { name: { [Op.iLike]: `%${name}%` } },
            include: Diet
          })
        console.log(dbRecipes)

        searchName = name.toLowerCase()
        const apiRecipesFilter =await apiRecipes.filter(recipe => {
 
            const recipeName = recipe.title?.toLowerCase();

            return recipeName.includes(searchName);
          });
         const totalRecipes = [...apiRecipesFilter, ...dbRecipes]




        if (totalRecipes.length === 0) {
            res.status(404).json({ message: `No se encontraron recetas con el nombre '${name}'` })
        } else {
            res.status(200).json(totalRecipes);
            
        }
            
        } else {
            res.status(200).json(apiRecipes)
            
        }
        

        

    
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: error.message })
    }
};

module.exports = { getRecipeName };



