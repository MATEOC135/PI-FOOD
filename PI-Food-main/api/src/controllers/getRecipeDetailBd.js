const { Recipe,Diet } = require("../db.js");


const getRecipeDetailbd = async (req, res) => {
    const { id } = req.params;
    console.log("estamos en back")
    console.log(id)
    try {
        if (id) {
            const dbRecipe = await Recipe.findByPk(id, { include: Diet });
            if (!dbRecipe) {
                return res.status(404).json({ error: "La receta no existe" });
            } else {
                return res.status(200).json(dbRecipe)
            }
        }else{
            return res.status(400).json({ error: "Falta proporcionar el ID de la receta" });
        }
    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
}







module.exports = { getRecipeDetailbd };