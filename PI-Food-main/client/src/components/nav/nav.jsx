import { Link } from "react-router-dom";
import styles from "./Nav.module.css";
import foodfoto from "../img/api.JPG";
import ButtonForm from "./Buttonform/searchbar";
import InputSearch from "./inputSearch/inputSearch";
export default function Nav(props) {
  return (
    <div className={styles.navbar}>
      <img
        src={foodfoto}
        alt="no se encontró la foto"
        width="28%"
        style={{ borderRadius: "20px", border: "3px solid black" }}
      />
      <Link className={styles.link} to="/home">home</Link>
      <Link className={styles.link} to="/about">INFO: Creador del proyecto</Link><br />
      <ButtonForm />
      <InputSearch onSearch ={props.onSearch} />
    </div>
  );
}
