import { cargarAsistencia } from "../estudiante/estudiante.js";

export function cargarNiveles() {
    const container = document.createElement("div");
    container.className = "niveles-container";

    const niveles = {
        "Preprimaria": ["Párvulos 1", "Párvulos 2", "Párvulos 3"],
        "Primaria": ["Primero", "Segundo", "Tercero", "Cuarto", "Quinto", "Sexto"],
        "Básicos": ["Primero Básico", "Segundo Básico", "Tercero Básico"],
        "Bachillerato": ["Cuarto Bachillerato", "Quinto Bachillerato"]
    };

    // Crear select de niveles
    const nivelSelect = document.createElement("select");
    nivelSelect.id = "nivel-select";
    nivelSelect.innerHTML = "<option value=''>Seleccione un nivel</option>";

    Object.keys(niveles).forEach(nivel => {
        const option = document.createElement("option");
        option.value = nivel;
        option.textContent = nivel;
        nivelSelect.appendChild(option);
    });

    // Crear select de grados
    const gradoSelect = document.createElement("select");
    gradoSelect.id = "grado-select";
    gradoSelect.disabled = true;
    gradoSelect.innerHTML = "<option value=''>Seleccione un grado</option>";

    // Crear select de secciones
    const seccionSelect = document.createElement("select");
    seccionSelect.id = "seccion-select";
    seccionSelect.disabled = true;
    seccionSelect.innerHTML = "<option value=''>Seleccione una sección</option>";

    // Evento para cargar grados cuando se selecciona un nivel
    nivelSelect.addEventListener("change", (e) => {
        gradoSelect.innerHTML = "<option value=''>Seleccione un grado</option>";
        seccionSelect.innerHTML = "<option value=''>Seleccione una sección</option>";
        seccionSelect.disabled = true;

        if (e.target.value) {
            niveles[e.target.value].forEach(grado => {
                const option = document.createElement("option");
                option.value = grado;
                option.textContent = grado;
                gradoSelect.appendChild(option);
            });
            gradoSelect.disabled = false;
        } else {
            gradoSelect.disabled = true;
        }
    });

    // Evento para cargar secciones cuando se selecciona un grado
    gradoSelect.addEventListener("change", (e) => {
        seccionSelect.innerHTML = "<option value=''>Seleccione una sección</option>";

        if (e.target.value) {
            const secciones = ["A", "B", "C"];
            secciones.forEach(seccion => {
                const option = document.createElement("option");
                option.value = seccion;
                option.textContent = `Sección ${seccion}`;
                seccionSelect.appendChild(option);
            });
            seccionSelect.disabled = false;
        } else {
            seccionSelect.disabled = true;
        }
    });

    // Botón para confirmar selección
    const confirmBtn = document.createElement("button");
    confirmBtn.id = "confirmar-seleccion";
    confirmBtn.className = "btn-primary";
    confirmBtn.textContent = "Confirmar Selección";
    confirmBtn.disabled = true;

    // Habilitar botón cuando se selecciona una sección
    seccionSelect.addEventListener("change", (e) => {
        confirmBtn.disabled = !e.target.value;
    });

    // Evento para manejar la selección final
    confirmBtn.addEventListener("click", () => {
        const nivel = nivelSelect.value;
        const grado = gradoSelect.value;
        const seccion = seccionSelect.value;

        if (nivel && grado && seccion) {
            // Aquí puedes cargar la asistencia para la sección seleccionada
            console.log(`Seleccionado: ${nivel} - ${grado} - ${seccion}`);
            // cargarAsistencia(nivel, grado, seccion);
        }
    });

    container.appendChild(nivelSelect);
    container.appendChild(gradoSelect);
    container.appendChild(seccionSelect);
    container.appendChild(confirmBtn);

    return container;
}