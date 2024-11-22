import React, { useState, useEffect } from "react";
import "./App.css";
import Card from "./components/Card";
import AddNote from "./components/AddNote";

function App() {
  const [notas, setNotas] = useState([]);

  // Leer las notas desde localStorage al montar el componente
  useEffect(() => {
    const storedNotas = JSON.parse(localStorage.getItem("notas")) || [];
    setNotas(storedNotas);
  }, []);

  // Crear una lista de notas en el DOM
  const notasList = notas.map((v, index) => {
    return (
      <Card
        key={index}
        title={v.titulo}
        description={v.contenido}
        fecha={v.fecha}
        prioridad={v.estado}
      />
    );
  });

  return (
    <div className="App">
      <h1>Mis Notas</h1>
      <div className="container">{notasList}</div>
      <AddNote setNotas={setNotas} />
    </div>
  );
}

export default App;
