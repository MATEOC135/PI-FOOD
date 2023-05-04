import { Route, Routes, useLocation } from "react-router-dom";
import InitP from "./components/InitialPage/initialPage"
import Cards from "./components/cards/HomeCards";
import Nav from "./components/nav/nav.jsx"
import About from "./components/nav/about/about.jsx"
import axios from "axios"
import Detail from "./components/Detail/Detail";
import Form from "./components/Form/Form.jsx"
import Detailbd from "./components/Detail/Detaildb"
import { useDispatch } from "react-redux";
import { fullRecipes } from "./Redux/actions/actions";
import { useEffect } from "react";


export default function App() {
  const location = useLocation();
  const dispatch =useDispatch()
  const onSearch = async function (recipeName) {
    try {
      const { data } = await axios.get(`http://localhost:3001/recipe?name=${recipeName}`); 
      if (data.message) {
        window.alert(data.message);
      }
      dispatch(fullRecipes(data))
     
    } catch (error) {
      window.alert(error)

    }
  };
    useEffect(()=>{
      onSearch("")
   
},[])

  return (
    <div>
      {location.pathname !== "/" && <Nav onSearch={onSearch} />}
      <Routes>
        <Route exact path="/" element={<InitP />} />
        <Route path="/home" element={<Cards onSearch={onSearch}  />} />
        <Route path="/about" element={<About />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/form" element={<Form/>} />
        <Route path="/detailbd/:id" element={<Detailbd />} />
      </Routes>
    </div>

  )
}