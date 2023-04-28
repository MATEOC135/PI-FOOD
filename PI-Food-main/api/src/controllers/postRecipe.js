const { Recipe, Diet } = require("../db.js")
const { Op } = require('sequelize');



const postRecipe = async (req, res) => {
    const { name, image, summary, healthScore, pap, diets} = req.body;
 
  
    console.log(name, image, summary, healthScore, pap, diets)
   

    try {
        console.log("entra al try")


        console.log(name, image, summary, healthScore, pap, diets  )
        if (!name || !image || !summary || !healthScore || !pap || !diets){
            return res.status(400).json({ message: 'faltan datos ' });
          }
        console.log(diets.length)
        const [resp, created] = await Recipe.findOrCreate({ where: { name, image, summary, healthScore, pap,} })
        console.log(diets.length)
        console.log(diets)
        console.log(diets.length)

        if (diets && diets.length) {
            const dietObjects = await Diet.findAll({ where: { name: diets  } });
            console.log(dietObjects )
            await resp.setDiets(dietObjects)
        }
        res.status(200).json(resp);





    } catch (error) {
        res.status(400).json({ error: error.message })

    }

}


module.exports = { postRecipe };
