require('dotenv').config();
const { API_KEY } = process.env;
const axios = require("axios")
const { Diet } = require("../db.js")

console.log(API_KEY)
const getDiets = async (req, res) => {

    const diet = await Diet.findAll();
    try {
        if (diet.length === 0) {

            const response = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?number=100&addRecipeInformation=true&apiKey=${API_KEY}`);
            const dietApi = response.data.results; // esta es la info

            const dietsAire= dietApi.map(obj => Object.keys(obj).slice(0, 5))
            const arrayOfDietsAire = [...new Set( dietsAire.flat())];
            
            console.log(arrayOfDietsAire)
  
            const dietInArray = dietApi.map(e => e.diets)//aqui entramos a la prop diets de cada array y extraemos las dietas, hayq ue tener en cuenta que es un array de arrays
            const arrayAllDiets =  [...dietInArray,arrayOfDietsAire]


            const arrayOfDiets = [...new Set( arrayAllDiets.flat())]; // aqui aplana todos los anteriores arrays y setea para que no existan repedtidos quedando un solo array
            const objsDiets = arrayOfDiets.map(diet1 => ({ name: diet1 }))//aqui creamos un array de objetos a pushear en DIets
            Diet.bulkCreate(objsDiets) // aqui crea las filas

            



            const dietsCreated = await Diet.findAll()
            
            const dietsMap = dietsCreated.map(e => e.name)

            res.status(200).json(dietsMap)

        } else {

            console.log("entro al elseeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee")


            const dietName = diet.map(e => e.name)
            res.status(200).json(dietName)

        }




    } catch (error) {
        res.status(400).json({ error: error.message })

    }
}







module.exports = { getDiets };