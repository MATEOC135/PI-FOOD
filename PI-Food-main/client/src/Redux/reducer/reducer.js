
import {FULLRECIPES, ORIGIN,ORDERBYHEALTH, ORDER, FILTER } from "../actions/types";

const initialState= {
    allRecipes:[],
    setRecipes:[],
    filtered:[]

}


function rootReducer (state =initialState,{type,payload}){

  switch (type) {
        case FULLRECIPES:
            return   {
                allRecipes:[...payload],
                filtered:[...payload],
                setRecipes:[...payload]
              };
          case ORDER:
        let orderCards;
        if(payload === "Ascendente"){
          orderCards =state.allRecipes.sort((a, b) => a.title.localeCompare(b.title))
        }else{
          orderCards= state.allRecipes.sort((a, b) => b.title.localeCompare(a.title))
       
        }return {
            ...state,
           allRecipes: [...orderCards]
          };
      
        case FILTER:
             let filter =state.filtered.filter((item) => item.diets.includes(payload))
            return  {
                ...state,
                allRecipes: [...filter]
              };
        case ORDERBYHEALTH:
            let orderByhealth;
            if(payload === "healthscore -"){
                orderByhealth =state.allRecipes.sort((a, b) => a.healthScore - b.healthScore);
            }else if(payload !== "healthscore -"){
                orderByhealth= state.allRecipes.sort((a, b) => b.healthScore - a.healthScore);
           
            }
            return {
                ...state,
               allRecipes:[...orderByhealth]
              };
        case ORIGIN:
            let nameObjects;
            if (payload === "Created") {
                nameObjects = state.filtered.filter(obj => obj.hasOwnProperty("name"));
                
            } else if (payload === "Api") {
                nameObjects = state.filtered.filter(obj => obj.hasOwnProperty("title"));
                
            }
            return{
                ...state,
                allRecipes: [...nameObjects]
             
              };



  
    default:
        return state;
  }
    
  
}

export default rootReducer;