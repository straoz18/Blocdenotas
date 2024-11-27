import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import App from '../App';
import NotaView from '../views/NotaView';
import NuevaNota from '../views/NuevaNota';

const RouterConfig = () => {
  const [notas, setNotas] = useState([]);

  useEffect(() => {
    const obtenerNotas = () => {
      const notasGuardadas = JSON.parse(localStorage.getItem('notas')) || [];
      setNotas(notasGuardadas);
      console.log('Notas cargadas:', notasGuardadas);
    };

    window.addEventListener('storage', obtenerNotas);
    obtenerNotas();

    return () => {
      window.removeEventListener('storage', obtenerNotas);
    };
  }, []);

  useEffect(() => {
    console.log('Rutas actuales:', notas.map(nota => `/nota/${nota.titulo}`));
  }, [notas]);

  return (
    <Routes>
      <Route path="/" element={<App notas={notas} />} />
      <Route path="/nueva-nota" element={<NuevaNota />} />
      {notas.map((nota) => (
        <Route
          key={nota.id}
          path={`/nota/${nota.titulo}`}
          element={<NotaView nota={nota} />}
        />
      ))}
      <Route path="*" element={<div>Página no encontrada</div>} />
    </Routes>
  );
};

export default RouterConfig; 