import styles from "./initialPage.module.css";
import { Link } from "react-router-dom";
export default function initialPage() {
  return (
    <div className={styles.foodcontainer}>
      <div className={styles.fooditem}>
        <div>
          <img 
            src="https://c.files.bbci.co.uk/DBBF/production/_105055265_bandejapaisa.jpg"
            alt="Nombre de tu comida"
          />
          <Link to="/home">
            <button>
              <h2>ENTRAR</h2>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

/* navigate("/home"); */
