import { useEffect } from "react";
import Card from "./card/card";
import Styles from "./Homecards.module.css"
import axios from "axios"
import { Link } from "react-router-dom";
import {  connect,useDispatch } from "react-redux";
import { orderCards,filterCards,orderByHealth, origin, fullRecipes } from "../../Redux/actions/actions";
import { useState } from "react";




export  function HomeCards(props) {
  const dispatch = useDispatch()
  /* const [recipes,setRecipes]=useState(props.allRecipes) */
  console.log( "aaaaaaaaaaaaaaaaaaaaaaaaaaaappppppppppppppppppppppp" +props.allRecipes)
  const [recipesLocal, setRecipesLocal] = useState([]);
  useEffect(()=>{
    setRecipesLocal(props.allRecipes)
  },[props.allRecipes])

  
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(9); 
  const totalPages = Math.ceil(recipesLocal / itemsPerPage);

  const [diets, setDiets] = useState([]);

  useEffect(()=>{
    async function datainfo(){
        try { 
            const {data} = await axios.get(`http://localhost:3001/diet`)
            if (data) {
              setDiets(data) 
            } else {
                window.alert("no hay diets: probelmas en el componente cards")
                
            }
        } catch (error) {
            window.alert(error)    
        }     
  }
    datainfo()
    
},[])
  


  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  const indexOfLastItem = currentPage * itemsPerPage;
 const indexOfFirstItem = indexOfLastItem - itemsPerPage;

 const currentRecipes = recipesLocal.slice(indexOfFirstItem, indexOfLastItem);
 const handlePageChange = (pageNumber) => {
  setCurrentPage(pageNumber);
};

  return(
    
    <div className={Styles.cardsfondo}>

      <select className={Styles.myselect} onChange={(e) => dispatch(orderCards(e.target.value))}>
        {["Ascendente", "Descendente"].map((e, i) => (
          <option value={e} key={i}>
            {e}
          </option>
        ))}
      </select>
      <select className={Styles.myselect} onChange={(e) => dispatch(filterCards(e.target.value))}>
        {diets.map((e, i) => (
          <option value={e} key={i}>
            {e}
          </option>
        ))}
        
      </select>

      <select className={Styles.myselect} onChange={(e) => dispatch(orderByHealth(e.target.value))}>
        {["healthscore -", "healthscore +"].map((e, i) => (
          <option value={e} key={i}>
            {e}
          </option>
        ))}
        
      </select>

      <select className={Styles.myselect} onChange={(e) => dispatch(origin(e.target.value))}>
        {["Created", "Api"].map((e, i) => (
          <option value={e} key={i}>
            {e}
          </option>
        ))}
        
      </select>

      <button className={Styles.mybutton} onClick={()=>props.onSearch("")} >RESET</button>




      
      
    <div className={Styles.cardsContainer}>  {currentRecipes.map((recipe) => (
      recipe.name? <Link to={`/detailbd/${recipe.id}`} key={recipe.id} >
        <Card key={recipe.id}
      title={recipe.name}
      image={recipe.image} 
      diets={recipe.diets.map((diet) => diet.name)}
      /> </Link>:<Link to={`/detail/${recipe.id}`} key={recipe.id} >
      <Card key={recipe.id}
    title={recipe.title}
    image={recipe.image} 
    diets={recipe.diets}
    /> </Link>
    


    ))}</div>
  
  
    <br />
    <div>  <ul className={Styles.ulpg} >
      {pages.map((page) => (
        <li className={Styles.lipg} key={page} >
          <button className={Styles.buttonpg} onClick={() => handlePageChange(page)}>{page}</button>
        </li>
      ))}
    </ul></div>
    
  


 
  </div>

  

  )
};





export function mapStateToProps(state) {
  return {
    allRecipes: state.allRecipes,
  };
}

export default connect(mapStateToProps, null)(HomeCards);
