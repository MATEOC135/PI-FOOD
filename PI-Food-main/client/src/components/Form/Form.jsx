import { useEffect, useState } from "react";
import Styles from "./Form.module.css"
import axios from "axios"
import validation from "./validation";


export default function Form (){
    const [dietss, setDietss] = useState([])
   
    const [formData, setFormData] = useState({
      name: '',
      summary: '',
      healthScore: 0,
      pap: '',
      image: '',
      diets: [],
      activedb:"active",
      });
      const [errors, setErrors] = useState({
        name: '',
        summary: '',
        healthScore: 0,
        pap: '',
        image: '',
        diets: [],
        });
        console.log(errors)
        const comp ={}
     

        const handleInputChange = (e) => {
          setFormData({
            ...formData,
            [e.target.name]: e.target.value,
          });
      
          setErrors(
            validation({
              ...formData,
              [e.target.name]: e.target.value,
            })
          );
        };

   
   useEffect(()=>{
    const getData =async ()=>{
        const {data} = await axios.get(" http://localhost:3001/diet")
        try {
            if (data) {    
                setDietss(data)     
            } else {
                window.alert("Error en la peticion de dietas posiblemente el servidor no esta levantado")
            }
        } catch (error) {
            window.alert("no se pudo traer la info")

        } 
    }
    getData()
       
   },[]);
     
    const handleCheckboxChange = (e) => {
    const dietaSeleccionada = e.target.value;
    let diets = [...formData.diets];
  
    if (e.target.checked) {
      diets.push(dietaSeleccionada);
      setErrors(
        validation({
          ...formData,
          [e.target.name]:diets,
        })
      );
    } else {
      diets = diets.filter((tipo) => tipo !== dietaSeleccionada);
      setErrors(
        validation({
          ...formData,
          [e.target.name]:diets,
        })
      );
    }

  
    setFormData({ ...formData, diets });
   
  };
    

 console.log(formData)
    
  const handleSubmit = async (event) => {
    event.preventDefault(); 
    console.log(errors) 
    console.log("..........1...............")
    
    try {
      
      if (Object.keys(errors).length === 0) {
        const response = await axios.post('http://localhost:3001/recipe', formData);
        console.log(".............2............")  
        console.log(errors) 
        setFormData({
          name: '',
          summary: '',
          healthScore: 0,
          pap: '',
          image: '',
          diets: [],
          activedb:"active",
        });
        window.alert("La receta ha sido creada")
       
      } else {
        console.log(errors)
        window.alert('Faltan datos en el formulario');
       
          
      }
      console.log("..............3...........")
    } catch (error) {
      console.log(error);
      window.alert('Hubo un error al enviar la solicitud');
    }
  };
    return(
<div className={Styles.container}>
 
      <div className={Styles.div}>
        <h1>NUEVA RECETA </h1>
        <form onSubmit={handleSubmit}>
      <label>
        Nombre:
        <input name="name" placeholder="Ingresa el nombre  aquí" type="text" value={formData.name} onChange={handleInputChange}  className={errors.name && Styles.warning} />  <p className={errors.name && Styles.danger} ><br />{errors.name}</p>
      </label>
      
      
      <br />
      <label>
        Resumen del plato:
        <textarea name="summary" placeholder="Ingresa el resumen del plato aquí" value={formData.summary} onChange={handleInputChange} className={errors.summary && Styles.warning} /> <p className={errors.summary && Styles.danger} >{errors.summary}</p>
      </label>
      
      <br />
      <label>
        Nivel de comida saludable (health score): <div>{formData.healthScore}</div>
        <input  name="healthScore" type="range"  min="1.0" max="10.0"  value={formData.healthScore} onChange={handleInputChange} className={errors.healthScore && Styles.warning} /> <p className={errors.healthScore && Styles.danger} >{errors.healthScore}</p>
      </label>
      
      <br />
      <label>
        Paso a paso:
        <textarea name="pap" placeholder="Ingresa el paso a paso aqui" value={formData.pap} onChange={handleInputChange} className={errors.pap && Styles.warning}  /><p className={errors.pap && Styles.danger} >{errors.pap}</p>
      </label>
   
      <br />
      <label>
      Imagen:
        <input name="image" type="text"  placeholder="Ingresa la URL aquí" value={formData.image} onChange={handleInputChange} className={errors.image && Styles.warning}  /> <p className={errors.image && Styles.danger} >{errors.image}</p>
      </label>
      
      <br />
      <h2>Tipos de dieta</h2>
      <div className={Styles.container1} >
      
      {dietss.map((dieta) => (
        <div className={Styles.checkboxcontainer} key={dieta}>
          <label className={Styles.label1}>
            <input name="diets" type="checkbox" value={dieta} checked={formData.diets.includes(dieta)} onChange={handleCheckboxChange} />
            {dieta}
          </label>
         
        </div>
      ))}
    </div>
    <p className={errors.diets && Styles.danger} >{errors.diets}</p>
      <br />
      <button type="submit">Enviar</button>
    </form>
      </div>
    </div>)
}