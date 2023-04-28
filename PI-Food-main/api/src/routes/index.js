const { Router } = require('express');
const { getRecipeDetail } = require("../controllers/getRecipeDetail");
const { postRecipe } = require('../controllers/postRecipe');
const { getRecipeName } = require('../controllers/getRecipeName');
const { getDiets } = require('../controllers/getDiets');
const { getRecipeDetailbd } =require("../controllers/getRecipeDetailBd")
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();
console.log("aqui es index") 

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter); 
router.get("/recipe-bd/:id", getRecipeDetailbd) 
router.get("/recipe/:id", getRecipeDetail)   
router.post("/recipe", postRecipe)
router.get("/diet", getDiets)
router.get("/recipe", getRecipeName)



module.exports = router;
