import { cargarLogin } from "./componentes/login/login.js";
import { createHeader } from "./componentes/header/header.js";
import { cargarNiveles } from "./componentes/levels/level.js";
import { cargarAsistencia } from "./componentes/estudiante/estudiante.js";

let seleccion = {
    nivel: null,
    grado: null,
    seccion: null
};

export function cargarDOM() {
    const root = document.getElementById("root");
    if (!root) {
        console.error("No se encontró el elemento root");
        return;
    }

    root.innerHTML = "";

    const header = createHeader();
    const niveles = cargarNiveles((nivel, grado, seccion) => {
        seleccion = { nivel, grado, seccion };
        cargarAsistenciaConDatos(seleccion);
    });
    
    root.appendChild(header);
    root.appendChild(niveles);

    if (seleccion.nivel && seleccion.grado && seleccion.seccion) {
        cargarAsistenciaConDatos(seleccion);
    }
}

function cargarAsistenciaConDatos({ nivel, grado, seccion }) {
    // Remueve la asistencia antigua si existe
    const oldAsistencia = document.querySelector(".asistencia-container");
    if (oldAsistencia) oldAsistencia.remove();

    const asistencia = cargarAsistencia(nivel, grado, seccion);
    document.getElementById("root").appendChild(asistencia);
}

document.addEventListener("DOMContentLoaded", () => {
    const token = localStorage.getItem("token");
    if (token) {
        cargarDOM();
    } else {
        cargarLogin();
    }
});
