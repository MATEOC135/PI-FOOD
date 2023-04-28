import {FULLRECIPES, ORIGIN,ORDERBYHEALTH, ORDER, FILTER } from "./types";


export function filterCards(status) {
    return {
      type: FILTER,
      payload: status
    }
  
  }
  
  export function orderCards (status) {
    return {
      type: ORDER,
      payload: status
    }
  
  }
  export function orderByHealth (status) {
    return {
      type: ORDERBYHEALTH,
      payload: status
    }
}
export function origin (type) {
       return {
          type: ORIGIN ,
          payload: type
        }
    }

export function fullRecipes(recipes) { 

  return {
    type:FULLRECIPES,
    payload: recipes
  }


}