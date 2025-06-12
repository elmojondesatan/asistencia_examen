export function cargarAsistencia() {
    const container = document.createElement("div");
    container.className = "asistencia-container";

    const title = document.createElement("h2");
    title.textContent = "Registro de Asistencia";

    const table = document.createElement("table");
    table.className = "asistencia-table";

    // Crear encabezados de tabla
    const thead = document.createElement("thead");
    const headerRow = document.createElement("tr");
    
    const headers = ["No.", "Nombre del Estudiante", "Asistencia", "Retardo", "Falta", "Justificación"];
    headers.forEach(headerText => {
        const th = document.createElement("th");
        th.textContent = headerText;
        headerRow.appendChild(th);
    });

    thead.appendChild(headerRow);
    table.appendChild(thead);

    // Crear cuerpo de tabla (datos de ejemplo)
    const tbody = document.createElement("tbody");
    const estudiantes = [
        { id: 1, nombre: "Juan Pérez" },
        { id: 2, nombre: "María García" },
        { id: 3, nombre: "Carlos López" }
    ];

    estudiantes.forEach(estudiante => {
        const row = document.createElement("tr");
        
        // Número y nombre
        const cellId = document.createElement("td");
        cellId.textContent = estudiante.id;
        
        const cellNombre = document.createElement("td");
        cellNombre.textContent = estudiante.nombre;

        // Opciones de asistencia
        const cellAsistencia = document.createElement("td");
        const radioAsistencia = document.createElement("input");
        radioAsistencia.type = "radio";
        radioAsistencia.name = `asistencia-${estudiante.id}`;
        radioAsistencia.value = "asistencia";
        cellAsistencia.appendChild(radioAsistencia);

        const cellRetardo = document.createElement("td");
        const radioRetardo = document.createElement("input");
        radioRetardo.type = "radio";
        radioRetardo.name = `asistencia-${estudiante.id}`;
        radioRetardo.value = "retardo";
        cellRetardo.appendChild(radioRetardo);

        const cellFalta = document.createElement("td");
        const radioFalta = document.createElement("input");
        radioFalta.type = "radio";
        radioFalta.name = `asistencia-${estudiante.id}`;
        radioFalta.value = "falta";
        cellFalta.appendChild(radioFalta);

        // Justificación
        const cellJustificacion = document.createElement("td");
        const inputJustificacion = document.createElement("input");
        inputJustificacion.type = "text";
        inputJustificacion.placeholder = "Motivo (si aplica)";
        cellJustificacion.appendChild(inputJustificacion);

        // Agregar celdas a la fila
        row.append(cellId, cellNombre, cellAsistencia, cellRetardo, cellFalta, cellJustificacion);
        tbody.appendChild(row);
    });

    table.appendChild(tbody);

    // Botón para guardar
    const saveBtn = document.createElement("button");
    saveBtn.className = "btn-primary";
    saveBtn.textContent = "Guardar Asistencia";
    saveBtn.addEventListener("click", guardarAsistencia);

    container.appendChild(title);
    container.appendChild(table);
    container.appendChild(saveBtn);

    return container;
}

function guardarAsistencia() {
    // Implementación para guardar la asistencia
    alert("Asistencia guardada correctamente");
}