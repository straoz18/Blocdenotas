import React, { useState, useEffect } from "react";
import { useLoaderData, useParams, useNavigate } from 'react-router-dom';
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Estilos de React Quill
import "./nuevaNota.css";

function NuevaNota() {
  const [titulo, setTitulo] = useState("");
  const [contenido, setContenido] = useState(""); // Cambiará con ReactQuill
  const [estado, setEstado] = useState("Estado");
  const [prioridad, setPrioridad] = useState("Prioridad");
  const navigate = useNavigate();
  const { slug } = useParams();
  const notaExistente = useLoaderData();

  // Usar los datos de la nota existente si estamos en modo edición
  useEffect(() => {
    if (notaExistente) {
      setTitulo(notaExistente.titulo);
      setContenido(notaExistente.contenido);
      setEstado(notaExistente.estado);
      setPrioridad(notaExistente.prioridad);
    }
  }, [notaExistente]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const nuevaNota = {
      titulo,
      contenido,
      estado,
      prioridad,
      fecha: new Date().toLocaleDateString(),
    };

    const notasGuardadas = JSON.parse(localStorage.getItem("notas")) || [];

    if (slug) {
      // Modo edición: actualizar nota existente
      const index = notasGuardadas.findIndex((nota) => nota.titulo === slug);
      if (index !== -1) {
        notasGuardadas[index] = nuevaNota;
      }
    } else {
      // Modo creación: agregar nueva nota
      notasGuardadas.push(nuevaNota);
    }

    localStorage.setItem("notas", JSON.stringify(notasGuardadas));
    navigate("/");
  };

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }], // Tamaño de encabezados
      [{ font: [] }], // Tipos de fuente
      [{ color: [] }, { background: [] }], // Colores de texto y fondo
      ["bold", "italic", "underline", "strike"], // Formato de texto
      [{ align: [] }], // Alineación
      [{ list: "ordered" }, { list: "bullet" }], // Listas ordenadas y con viñetas
      ["link", "image"], // Enlaces e imágenes
      ["clean"], // Eliminar formato
    ],
  };

  return (
    <div className="nuevanotavista ">
      <div className="opciones ">
      <h2>{slug ? "Editar Nota" : "Nueva Nota"}</h2>
      <button onClick={() => navigate("/")} className="volver"> Volver al Home </button>
      </div>
      <form className="formnuevanota" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Título"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
        />

        <div className="opciones">
          <select
            className="option2"
            value={estado}
            onChange={(e) => setEstado(e.target.value)}
          >
            <option value="Estado"> Estado</option>
            <option value="En progreso">En progreso</option>
            <option value="Listo">Listo</option>
            <option value="Esperando">Esperando</option>
          </select>

          <select
            className="option2"
            value={prioridad}
            onChange={(e) => setPrioridad(e.target.value)}
          >
            <option value="Prioridad">Prioridad</option>
            <option value="Alta">Alta</option>
            <option value="Media">Media</option>
            <option value="Baja">Baja</option>
          </select>
        </div>

        {/* Editor de texto enriquecido */}
        <ReactQuill
          theme="snow"
          value={contenido}
          modules={modules}
          onChange={setContenido} // Se actualiza directamente
          placeholder="Escribe el contenido aquí..."
        />

        <button type="submit">Guardar Nota</button>
      </form>
    </div>
  );
}

export default NuevaNota;
