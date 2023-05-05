require('dotenv').config();
const { Op } = require('sequelize');
const { API_KEY } = process.env;
const axios = require("axios")
const { Recipe,Diet } = require("../db.js");


console.log(API_KEY)
const getRecipeName = async (req, res) => {

    try {
        console.log("AQUI VA")
        const { name } = req.query;
        const apiResponse = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`);
            const apiRecipes = apiResponse.data.results;

           

        if (name) { 
        const dbRecipes = await Recipe.findAll({
            where: { name: { [Op.iLike]: `%${name}%` } },
            include: Diet
          })
        console.log(dbRecipes)

        let searchName = name.toLowerCase()
        const apiRecipesFilter =await apiRecipes.filter(recipe => {
 
            const recipeName = recipe.title?.toLowerCase();

            return recipeName.includes(searchName);
          });
         const totalRecipes = [...apiRecipesFilter, ...dbRecipes]
         console.log(totalRecipes, "este es el total")
         console.log(totalRecipes.length, "este es el total contado")
         console.log(apiRecipesFilter.length)
         console.log(totalRecipes.length         )

        if (!totalRecipes.length > 0  ) {
            res.status(400).json({ message: "No se encontraron recetas con este nombre" }); 
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



