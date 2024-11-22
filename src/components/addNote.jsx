import React from "react";
import { useNavigate } from "react-router-dom";

function AddNote() {
  const navigate = useNavigate();

  const handleCreateNote = () => {
    navigate("/nueva-nota"); // Redirige a la ruta de creación de notas
  };

  return <button onClick={handleCreateNote}>Crear Nueva Nota</button>;
}

export default AddNote;
