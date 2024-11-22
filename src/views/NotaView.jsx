import React from "react";
import { useNavigate } from "react-router-dom";
import "./notas.css";

function NotaView({ notas }) {
  const navigate = useNavigate();
  // Define la función para volver al home
  const volver = () => {
    navigate("/"); // Redirige a la ruta "/"
  };

  return (
    <div className="NotasView">
      <h2>{notas.titulo}</h2>
      <p>{notas.contenido}</p>
      <button onClick={volver}> Volver al Home </button>
    </div>
  );
}

export default NotaView;
