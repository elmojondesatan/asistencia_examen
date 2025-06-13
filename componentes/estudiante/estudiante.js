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
    inputFecha.value = new Date().toISOString().split('T')[0]; // Fecha actual por defecto
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

    // Botón para cargar alumnos existentes
    let btnCargarAlumnos = document.createElement("button");
    btnCargarAlumnos.textContent = "Cargar Alumnos";
    btnCargarAlumnos.addEventListener("click", cargarAlumnosDesdeDB);
    container.appendChild(btnCargarAlumnos);

    return container;
}

export async function cargarAlumnosDesdeDB() {
    try {
        const grado = localStorage.getItem('gradoSeleccionado');
        const seccion = localStorage.getItem('seccionSeleccionada');
        
        if (!grado || !seccion) {
            alert("Por favor selecciona un grado y sección primero");
            return;
        }

        const response = await fetch(`http://localhost:3000/alumnos?grado=${encodeURIComponent(grado)}&seccion=${encodeURIComponent(seccion)}`);
        const alumnos = await response.json();

        let listaAsistencia = document.getElementById("listaAsistencia");
        if (!listaAsistencia) {
            listaAsistencia = document.createElement("div");
            listaAsistencia.id = "listaAsistencia";
            document.querySelector("#root").appendChild(listaAsistencia);
        }
        listaAsistencia.innerHTML = "";

        alumnos.forEach(alumno => {
            agregarAlumnoALista(alumno);
        });
    } catch (error) {
        console.error("Error al cargar alumnos:", error);
        alert("Error al cargar alumnos desde la base de datos");
    }
}

function agregarAlumnoALista(alumno) {
    let listaAsistencia = document.getElementById("listaAsistencia");
    if (!listaAsistencia) {
        listaAsistencia = document.createElement("div");
        listaAsistencia.id = "listaAsistencia";
        document.querySelector("#root").appendChild(listaAsistencia);
    }

    let alumnoDiv = document.createElement("div");
    alumnoDiv.classList.add("alumno-item");
    alumnoDiv.dataset.id = alumno.id;

    let nombreSpan = document.createElement("span");
    nombreSpan.textContent = `Nombre: ${alumno.nombre} | Clave: ${alumno.clave} | Correo: ${alumno.correo}`;
    alumnoDiv.appendChild(nombreSpan);

    // Botones de estado de asistencia
    ["Ausente", "Presente", "Justificado"].forEach(estado => {
        let btn = document.createElement("button");
        btn.textContent = estado;
        btn.classList.add(`btn-${estado.toLowerCase()}`);
        btn.addEventListener("click", () => registrarAsistencia(alumno.id, estado));
        alumnoDiv.appendChild(btn);
    });

    listaAsistencia.appendChild(alumnoDiv);
}

async function registrarAsistencia(alumnoId, estado) {
    try {
        const fecha = document.getElementById("fechaAlumno").value || new Date().toISOString().split('T')[0];
        const grado = localStorage.getItem('gradoSeleccionado');
        const seccion = localStorage.getItem('seccionSeleccionada');
        
        const response = await fetch('http://localhost:3000/asistencia', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                alumno_id: alumnoId,
                estado: estado,
                fecha: fecha,
                grado: grado,
                seccion: seccion
            })
        });

        const data = await response.json();
        if (data.success) {
            alert(`Asistencia de ${data.nombre} registrada como ${estado} para el ${fecha}`);
        } else {
            alert("Error al registrar asistencia");
        }
    } catch (error) {
        console.error("Error al registrar asistencia:", error);
        alert("Error al registrar asistencia");
    }
}

export async function agregarAlumno() {
    let nombre = document.getElementById("nombreAlumno").value;
    let clave = document.getElementById("claveAlumno").value;
    let fecha = document.getElementById("fechaAlumno").value;
    let correo = document.getElementById("correoAlumno").value;
    let grado = localStorage.getItem('gradoSeleccionado');
    let seccion = localStorage.getItem('seccionSeleccionada');

    if (!nombre.trim() || !clave.trim() || !correo.trim()) {
        alert("Por favor, ingresa todos los datos.");
        return;
    }

    if (!grado || !seccion) {
        alert("Por favor selecciona un grado y sección primero");
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/alumnos', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                nombre: nombre,
                clave: clave,
                correo: correo,
                grado: grado,
                seccion: seccion
            })
        });

        const data = await response.json();
        if (data.success) {
            agregarAlumnoALista(data.alumno);
            // Limpiar campos
            document.getElementById("nombreAlumno").value = "";
            document.getElementById("claveAlumno").value = "";
            document.getElementById("correoAlumno").value = "";
        } else {
            alert(data.message || "Error al agregar alumno");
        }
    } catch (error) {
        console.error("Error al agregar alumno:", error);
        alert("Error al agregar alumno");
    }
}

export function cargarAsistencia() {
    let root = document.querySelector("#root");
    let formularioContainer = document.getElementById("formulario-container");
    if (!formularioContainer) {
        formularioContainer = document.createElement("div");
        formularioContainer.id = "formulario-container";
        root.appendChild(formularioContainer);
    }
    formularioContainer.innerHTML = "";

    let listaAsistencia = document.getElementById("listaAsistencia");
    if (listaAsistencia) {
        listaAsistencia.innerHTML = "";
    }

    let formulario = agregarFormularioAlumno();
    formularioContainer.appendChild(formulario);
}