import { cargarLogin } from "./components/login/login.js";
import { createHeader } from "./components/header/header.js";
import { cargarNiveles } from "./components/levels/level.js";
import { cargarAsistencia } from "./components/estudiante/estudiante.js";

export function cargarDOM() {
    const root = document.getElementById("root");
    if (!root) {
        console.error("No se encontró el elemento root");
        return;
    }

    root.innerHTML = "";
    
    // Crear estructura principal
    const header = createHeader();
    const niveles = cargarNiveles();
    const asistencia = cargarAsistencia();
    
    // Agregar elementos al DOM
    root.appendChild(header);
    root.appendChild(niveles);
    root.appendChild(asistencia);
}

// Iniciar con el login al cargar la página
document.addEventListener("DOMContentLoaded", () => {
    const token = localStorage.getItem("token");
    if (token) {
        cargarDOM();
    } else {
        cargarLogin();
    }
});