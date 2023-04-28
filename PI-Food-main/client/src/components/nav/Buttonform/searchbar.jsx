import styles from "./searchbar.module.css"
import { Link } from "react-router-dom";


export default function buttonForm() {

  return (<div>
    <Link to="/form"><button  className={styles.button}>AGREGAR RECETA</button></Link>
    
    </div>);
}
