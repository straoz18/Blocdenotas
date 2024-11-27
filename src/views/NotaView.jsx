import React from "react";
import { useNavigate , useLoaderData } from "react-router-dom"  ;
import "./notas.css";

function NotaView( ) 

{
 const nota = useLoaderData();
 const navigate = useNavigate();
  // Define la función para volver al home
  const volver = () => {
    navigate("/"); // Redirige a la ruta "/"
  };

  return (
    <div className="NotasView">
      <h2>{nota.titulo}</h2>
      <div dangerouslySetInnerHTML={{
        __html:nota.contenido
      }}>

      </div>
      <button onClick={volver}> Volver al Home </button>
    </div>
  ); 

}

export default NotaView;
