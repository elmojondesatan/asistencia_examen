export function agregarFormularioAlumno() {
    let container = document.createElement("div");
    container.classList.add("formulario-alumno-container");

    let title = document.createElement("h3");
    title.textContent = "Agregar Alumno";
    container.appendChild(title);

    let inputNombre = document.createElement("input");
    inputNombre.type = "text";
    inputNombre.placeholder = "Nombre del alumno";
    inputNombre.id = "nombreAlumno";
    container.appendChild(inputNombre);

    let inputClave = document.createElement("input");
    inputClave.type = "text";
    inputClave.placeholder = "Clave del alumno";
    inputClave.id = "claveAlumno";
    container.appendChild(inputClave);

    let inputFecha = document.createElement("input");
    inputFecha.type = "date";
    inputFecha.id = "fechaAlumno";
    container.appendChild(inputFecha);

    let inputCorreo = document.createElement("input");
    inputCorreo.type = "email";
    inputCorreo.placeholder = "Correo del alumno";
    inputCorreo.id = "correoAlumno";
    container.appendChild(inputCorreo);

    let btnAgregar = document.createElement("button");
    btnAgregar.textContent = "Agregar Alumno";
    btnAgregar.addEventListener("click", agregarAlumno);
    container.appendChild(btnAgregar);

    return container;
}

export function agregarAlumno() {
    let nombre = document.getElementById("nombreAlumno").value;
    let clave = document.getElementById("claveAlumno").value;
    let fecha = document.getElementById("fechaAlumno").value;
    let correo = document.getElementById("correoAlumno").value;

    if (!nombre.trim() || !clave.trim() || !fecha.trim() || !correo.trim()) {
        alert("Por favor, ingresa todos los datos.");
        return;
    }

    let listaAsistencia = document.getElementById("listaAsistencia");
    if (!listaAsistencia) {
        listaAsistencia = document.createElement("div");
        listaAsistencia.id = "listaAsistencia";
        document.querySelector("#root").appendChild(listaAsistencia);
    }

    let alumnoDiv = document.createElement("div");
    alumnoDiv.classList.add("alumno-item");

    let nombreSpan = document.createElement("span");
    nombreSpan.textContent = `Nombre: ${nombre} | Clave: ${clave} | Fecha: ${fecha} | Correo: ${correo}`;
    alumnoDiv.appendChild(nombreSpan);

    ["Ausente", "Presente", "Justificado"].forEach(estado => {
        let btn = document.createElement("button");
        btn.textContent = estado;
        btn.addEventListener("click", () => alert(`${nombre} marcado como ${estado}`));
        alumnoDiv.appendChild(btn);
    });

    listaAsistencia.appendChild(alumnoDiv);
}

export function cargarAsistencia() {
    let root = document.querySelector("#root");
    let formularioContainer = document.getElementById("formulario-container");
    if (!formularioContainer) {
        formularioContainer = document.createElement("div");
        formularioContainer.id = "formulario-container";
        root.appendChild(formularioContainer);
    }
    formularioContainer.innerHTML = ""; // Reiniciar formulario

    let listaAsistencia = document.getElementById("listaAsistencia");
    if (listaAsistencia) {
        listaAsistencia.innerHTML = ""; // Reiniciar lista de alumnos
    }

    let formulario = agregarFormularioAlumno();
    formularioContainer.appendChild(formulario);
}