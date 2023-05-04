import { useEffect, useState } from "react"
import Styles from "../cards/card/card.module.css"
import { useParams } from "react-router-dom"
import axios from "axios"

export default function Detail(){
    const {id} = useParams()
    const [character,setCharacter] = useState({})
    console.log(id)


    useEffect(()=>{
        async function datainfo(){
            try { 
                const {data} = await axios.get(`http://localhost:3001/recipe/${id}`)
                if (data) {

                 
                    setCharacter(data)
                    
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
          <img src={character.image} alt={character.title} />
        </div>
        <div className={Styles.content}>
          <h2 className={Styles.title}> Nombre: {character.title}</h2>
          <div className={Styles.details}>
            <p>Summary: </p> <p className={Styles.summary} dangerouslySetInnerHTML={{__html: character.summary}}></p>
            <p className={Styles.healthScore}>Health Score: {character.healthScore}</p>
            <p>Instrucciones: </p> <p className={Styles.instructions} dangerouslySetInnerHTML={{__html: character.instructions}}></p>
            <p className={Styles.diets}> Dietas:   
              {character.diets}
            </p>
          </div>
        </div>
      </div>
    )
}