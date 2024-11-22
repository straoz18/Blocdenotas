import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import notas from "./data/notas";
import NotaView from "./views/notaView";
import NuevaNota from "./views/NuevaNota";

const routes = [
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/nueva-nota",
    element: <NuevaNota />,
  },
];

notas.forEach((notas) => {
  routes.push({
    path: notas.titulo,
    element: <NotaView notas={notas} />,
  });
});

const router = createBrowserRouter(routes);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
