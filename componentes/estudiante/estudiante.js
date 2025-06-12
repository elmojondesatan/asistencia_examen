export function agregarFormularioAlumno() {
    const container = document.createElement("div");
    container.classList.add("formulario-alumno-container");

    const title = document.createElement("h3");
    title.textContent = "Agregar Alumno";
    container.appendChild(title);

    const campos = [
        { type: "text", placeholder: "Nombre del alumno", id: "nombreAlumno" },
        { type: "text", placeholder: "Clave del alumno", id: "claveAlumno" },
        { type: "date", placeholder: "", id: "fechaAlumno" },
        { type: "email", placeholder: "Correo del alumno", id: "correoAlumno" }
    ];

    campos.forEach(({ type, placeholder, id }) => {
        const input = document.createElement("input");
        input.type = type;
        input.placeholder = placeholder;
        input.id = id;
        container.appendChild(input);
    });

    const btnAgregar = document.createElement("button");
    btnAgregar.textContent = "Agregar Alumno";
    btnAgregar.addEventListener("click", agregarAlumno);
    container.appendChild(btnAgregar);

    return container;
}

// Agrega un alumno a la lista de asistencia
export function agregarAlumno() {
    const nombre = document.getElementById("nombreAlumno").value.trim();
    const clave = document.getElementById("claveAlumno").value.trim();
    const fecha = document.getElementById("fechaAlumno").value;
    const correo = document.getElementById("correoAlumno").value.trim();

    if (!nombre || !clave || !fecha || !correo) {
        alert("Por favor, ingresa todos los datos.");
        return;
    }

    let listaAsistencia = document.getElementById("listaAsistencia");
    if (!listaAsistencia) {
        listaAsistencia = document.createElement("div");
        listaAsistencia.id = "listaAsistencia";
        document.querySelector("#root").appendChild(listaAsistencia);
    }

    const alumnoDiv = document.createElement("div");
    alumnoDiv.classList.add("alumno-item");

    const info = document.createElement("span");
    info.textContent = `Nombre: ${nombre} | Clave: ${clave} | Fecha: ${fecha} | Correo: ${correo}`;
    alumnoDiv.appendChild(info);

    const estados = ["Ausente", "Presente", "Justificado"];
    estados.forEach(estado => {
        const btn = document.createElement("button");
        btn.textContent = estado;
        btn.className = `btn-${estado.toLowerCase()}`;
        btn.addEventListener("click", () => alert(`${nombre} marcado como ${estado}`));
        alumnoDiv.appendChild(btn);
    });

    listaAsistencia.appendChild(alumnoDiv);
}

// Inicializa la interfaz de asistencia
export function cargarAsistencia() {
    const root = document.querySelector("#root");
    root.innerHTML = ""; // Limpiar todo el contenido

    // Verificar autenticación (opcional)
    if (!localStorage.getItem("authToken")) {
        console.error("Usuario no autenticado");
        // Aquí podrías redirigir al login si lo prefieres
        // cargarLogin();
        // return;
    }

    // Crear y agregar header
    const header = createHeader(true); // true indica que el usuario está logueado
    root.appendChild(header);

    // Resto del código existente...
    let formularioContainer = document.createElement("div");
    formularioContainer.id = "formulario-container";
    root.appendChild(formularioContainer);

    formularioContainer.appendChild(agregarFormularioAlumno());
}