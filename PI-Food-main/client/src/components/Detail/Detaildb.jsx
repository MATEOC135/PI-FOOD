import { useEffect, useState } from "react"
import Styles from "../cards/card/card.module.css"
import { useParams } from "react-router-dom"
import axios from "axios"

export default function Detaildb(){
    const {id} = useParams()
    const [character,setCharacter] = useState({})
    const [dietNames, setDietNames] = useState([])
    console.log(id)
    
   
    


    useEffect(()=>{async function datainfo(){
            try { 
                const {data} = await axios.get(`http://localhost:3001/recipe-bd/${id}`)
                console.log(data)
                if (data) {
                    setCharacter(data)
                    setDietNames(data.diets.map(diet => diet.name))  
                } else {
                    window.alert("no hay detalles para esta receta")    
                }
            } catch (error) {
                window.alert(error)   
            }      
      }
        datainfo()  
       
    },[id])
   
 
    return(
        <div className={Styles.card}>
        <div className={Styles.image}>
          <img src={character.image} alt={character.name} />
        </div>
        <div className={Styles.content}>
          <h2 className={Styles.title}>Nombre: {character.name}</h2>
          <div className={Styles.details}>
            <p className={Styles.summary}>Resumen: {character.summary}</p>
            <p className={Styles.healthScore}>Health Score: {character.healthScore}</p>
            <p className={Styles.instructions}>Paso a paso:  {character.pap}</p>
           <p className={Styles.diets}> Dietas: 
              {dietNames.join(", ")}
            </p>
          </div>
        </div>
      </div>
    )
}