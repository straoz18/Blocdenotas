import "./Card.css";
import { Link } from "react-router-dom";

function Card({
  title = "Titulo de Nota",
  description = "Descripción aqui",
  fecha = "20/10/23",
  prioridad = "Alta",
  estado = " ",
}) {
  // Función para limpiar el HTML y limitar caracteres
  const limpiarYLimitarTexto = (texto) => {
    // Crear un elemento temporal para decodificar el HTML
    const temp = document.createElement('div');
    temp.innerHTML = texto;
    // Obtener el texto sin HTML
    const textoLimpio = temp.textContent || temp.innerText;
    // Retornar los primeros 20 caracteres
    return textoLimpio.substring(0, 20) + (textoLimpio.length > 20 ? '...' : '');
  };

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
      <p className="estado">Estado: {estado} </p>
      <Link to={title}>
        <h2>{title}</h2>
      </Link>
      <p>{limpiarYLimitarTexto(description)}</p>

      <div className="containerInCard">
        <p className="fecha columna">Fecha: {fecha}</p>
        <p className="prioridad columna">Prioridad: {prioridad}</p>
      </div>
      <div className="button-container">
        <button 
          onClick={() => window.location.href = `/editar/${title}`} 
          className="edit-button"
        >
          Modificar nota
        </button>
        <button 
          onClick={handleDelete} 
          className="delete-button"
        >
          Eliminar nota
        </button>
      </div>
    </div>
  );
}

export default Card;
