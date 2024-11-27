import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
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
  {path: "/:slug",
    element: <NotaView/>,
    loader:  async ({ request, params }) => {
      console.log(params.slug);
      const notasGuardadas = JSON.parse(localStorage.getItem("notas")) || [];
      const nota = notasGuardadas.find(function (e) {
        return e.titulo == params.slug;
      } ) ;
      return nota 
    },
  },
  {
    path: "/editar/:slug",
    element: <NuevaNota/>,
    loader: async ({ params }) => {
      const notasGuardadas = JSON.parse(localStorage.getItem("notas")) || [];
      const nota = notasGuardadas.find((nota) => nota.titulo === params.slug);
      return nota;
    }
  }
  
];

const router = createBrowserRouter(routes);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
