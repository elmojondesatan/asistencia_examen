import { cargarAsistencia } from "../estudiante/estudiante.js";

export function cargarLeves() {
    const root = document.getElementById("root");

    let prevContainer = document.querySelector(".leves-container");
    if (prevContainer) {
        prevContainer.remove();
    }

    const levesContainer = document.createElement("div");
    levesContainer.classList.add("leves-container");

    const contenedor = document.createElement("div");
    contenedor.id = "niveles-container";
    const gradosContainer = document.createElement("div");
    gradosContainer.id = "grados-container";
    const seccionesContainer = document.createElement("div");
    seccionesContainer.id = "secciones-container";
    
    levesContainer.appendChild(contenedor);
    levesContainer.appendChild(gradosContainer);
    levesContainer.appendChild(seccionesContainer);
    root.appendChild(levesContainer);

    const niveles = {
        "Preprimaria": ["Párvulos 1", "Párvulos 2", "Párvulos 3"],
        "Primaria": ["Primaria 1", "Primaria 2", "Primaria 3", "Primaria 4", "Primaria 5", "Primaria 6"],
        "Básicos": ["Básico 1", "Básico 2", "Básico 3"],
        "Bachillerato": ["Computación", "Diseño Gráfico", "Biología", "Magisterio"]
    };

    function marcarSeleccion(boton, contenedor) {
        contenedor.querySelectorAll("button").forEach(b => b.classList.remove("selected"));
        boton.classList.add("selected");
    }

    Object.keys(niveles).forEach(nivel => {
        const boton = document.createElement("button");
        boton.textContent = nivel;
        boton.classList.add("nivel-btn");
        boton.setAttribute("role", "button");
        boton.setAttribute("aria-label", `Seleccionar nivel ${nivel}`);
        boton.addEventListener("click", (e) => {
            mostrarGrados(nivel);
            marcarSeleccion(e.target, contenedor);
        });
        contenedor.appendChild(boton);
    });

    function mostrarGrados(nivel) {
        gradosContainer.innerHTML = "";
        seccionesContainer.innerHTML = "";
        niveles[nivel].forEach(grado => {
            const boton = document.createElement("button");
            boton.textContent = grado;
            boton.classList.add("grado-btn");
            boton.setAttribute("role", "button");
            boton.setAttribute("aria-label", `Seleccionar grado ${grado}`);
            boton.addEventListener("click", (e) => {
                mostrarSecciones(grado, nivel);
                marcarSeleccion(e.target, gradosContainer);
            });
            gradosContainer.appendChild(boton);
        });
    }

    function mostrarSecciones(grado, nivel) {
        seccionesContainer.innerHTML = "";
        let secciones = nivel === "Bachillerato" ? ["4to Bachillerato", "5to Bachillerato"] : ["Sección A", "Sección B"];
        
        secciones.forEach(seccion => {
            const boton = document.createElement("button");
            boton.textContent = seccion;
            boton.classList.add("seccion-btn");
            boton.setAttribute("role", "button");
            boton.setAttribute("aria-label", `Seleccionar sección ${seccion}`);
            boton.addEventListener("click", (e) => {
                seleccionarSeccion(grado, seccion);
                marcarSeleccion(e.target, seccionesContainer);
            });
            seccionesContainer.appendChild(boton);
        });
    }

    function seleccionarSeccion(grado, seccion) {
        mostrarMensajeSeleccion(`${grado} - ${seccion}`);
        mostrarFormularioAlumnos();
    }

    function mostrarMensajeSeleccion(texto) {
        let mensajeExistente = document.querySelector(".mensaje-seleccion");
        if (mensajeExistente) mensajeExistente.remove();

        const mensaje = document.createElement("p");
        mensaje.textContent = `Seleccionaste: ${texto}`;
        mensaje.classList.add("mensaje-seleccion");
        seccionesContainer.appendChild(mensaje);
    }

    function mostrarFormularioAlumnos() {
        let root = document.querySelector("#root");
        if (!root) {
            console.error("No se encontró el elemento #root");
            return;
        }

        cargarAsistencia();
    }
}
