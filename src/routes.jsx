// Import necessary components and functions from react-router-dom.

import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
} from "react-router-dom";
import { Layout } from "./pages/Layout";
import { Home } from "./pages/Home";
import { Single } from "./pages/Single";
import { Demo } from "./pages/Demo";

export const router = createBrowserRouter(
    createRoutesFromElements(
      // Root Route: All navigation will start from here.
      <Route path="/" element={<Layout />} errorElement={<h1>Not found!</h1>} >

        {/* Página principal - Lista de contactos */}
        <Route path= "/" element={<Home />} />
        
        {/* Formulario para agregar contacto */}
        <Route path="/add-contact" element={<Demo />} />
        
        {/* Formulario para editar contacto */}
        <Route path="/edit-contact/:contactId" element={ <Single />} />
        
        {/* Ruta original de demo (mantenemos por compatibilidad) */}
        <Route path="/demo" element={<Demo />} />
      </Route>
    )
);