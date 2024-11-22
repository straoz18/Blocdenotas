import "./Card.css";
import { Link } from "react-router-dom";

function Card({
  title = "Titulo de Nota",
  description = "Descripción aqui",
  fecha = "20/10/23",
  prioridad = "Alta",
}) {
  const handleDelete = () => {
    // Obtener las notas del localStorage
    const notasGuardadas = JSON.parse(localStorage.getItem("notas")) || [];
    
    // Filtrar las notas para eliminar la que coincide con el título
    const notasFiltradas = notasGuardadas.filter(nota => nota.titulo !== title);
    
    // Guardar las notas actualizadas en el localStorage
    localStorage.setItem("notas", JSON.stringify(notasFiltradas));
    
    // Recargar la página para ver los cambios
    window.location.reload();
  };

  return (
    <div className="Card">
      <p className="estado">Estado:</p>
      <Link to={title}>
        {" "}
        <h2>{title}</h2>{" "}
      </Link>
      <p>{description}</p>

      <div className="containerInCard">
        <p className="fecha columna">Fecha: {fecha}</p>
        <p className="prioridad columna">Prioridad: {prioridad}</p>
      </div>
      <button onClick={handleDelete} className="delete-button">
        Eliminar nota
      </button>
    </div>
  );
}

export default Card;
