import { cargarLogin } from "./componentes/login/login.js";
import { createHeader } from "./componentes/header/header.js";
import { cargarLeves } from "./componentes/levels/level.js";
import { cargarAsistencia } from "./componentes/estudiante/estudiante.js";

export function cargarDOM() {
    let DOM = document.querySelector("#root");
    DOM.innerHTML = "";  // Limpia cualquier contenido previo
    DOM.appendChild(createHeader()); 
    DOM.appendChild(cargarLeves());
    DOM.appendChild(cargarAsistencia());
}


cargarLogin();