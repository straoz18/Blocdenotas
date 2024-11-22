import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function NuevaNota() {
  const [titulo, setTitulo] = useState("");
  const [contenido, setContenido] = useState("");
  const [estado, setEstado] = useState("En progreso");
  const [prioridad, setPrioridad] = useState("Alta");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const nuevaNota = {
      titulo,
      contenido,
      estado,
      prioridad,
      fecha: new Date().toLocaleDateString(),
    };

    // Obtener las notas del localStorage (o un array vacío si no existen)
    const notasGuardadas = JSON.parse(localStorage.getItem("notas")) || [];

    // Agregar la nueva nota a las notas guardadas
    notasGuardadas.push(nuevaNota);

    // Guardar las notas de vuelta en el localStorage
    localStorage.setItem("notas", JSON.stringify(notasGuardadas));

    navigate("/"); // Redirigir a la página principal
  };

  return (
    <div>
      <h2>Crear Nueva Nota</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Título"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
        />
        <textarea
          placeholder="Contenido"
          value={contenido}
          onChange={(e) => setContenido(e.target.value)}
        />
        <select value={estado} onChange={(e) => setEstado(e.target.value)}>
          <option value="En progreso">En progreso</option>
          <option value="Listo">Listo</option>
          <option value="Esperando">Esperando</option>
        </select>
        <select
          value={prioridad}
          onChange={(e) => setPrioridad(e.target.value)}
        >
          <option value="Alta">Alta</option>
          <option value="Media">Media</option>
          <option value="Baja">Baja</option>
        </select>
        <button type="submit">Guardar Nota</button>
      </form>
    </div>
  );
}

export default NuevaNota;
