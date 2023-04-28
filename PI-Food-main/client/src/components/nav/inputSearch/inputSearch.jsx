import { useState } from "react";
import Styles from "./inputSearch.module.css"

export default function InputSearch(props){
    const [recipeName, setRecipeName] = useState("");

    const handleSearch = (e) => {
        let { value } = e.target;
        setRecipeName(value);
      }; 

    return (
        <div>
             <input placeholder="Busqueda de receta" className={Styles.input} type="search" onChange={handleSearch} />
      <button className={Styles.button} onClick={() => props.onSearch(recipeName)} >
        Agregar
      </button>
        </div>
    )
}
