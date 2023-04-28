import Styles from "./card.module.css"

export default function Card(props){


    return (
        <div className={Styles.card}>
        <div className={Styles.image}>
          <img src={props.image} alt={props.title} />
        </div>
        <div className={Styles.content}>
          <h2 className={Styles.title}>{props.title}</h2>
          <div className={Styles.details}>
            <p className={Styles.diets}>{props.diets.join(', ')}</p>
          </div>
        </div>
      </div>

    )
}


