export function createHeader() {
    const header = document.createElement("header");
    header.classList.add("main-header");

    // Crear el contenedor del contenido
    const container = document.createElement("div");
    container.classList.add("header-container");

    // Crear el título
    const title = document.createElement("h1");
    title.textContent = "Asistencia";

    // Crear la imagen
    const img = document.createElement("img");
    img.src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRq-IciWxLW5lsM2Oco4VluWyfOBSmgukVu6w&s"; // Asegúrate de cambiar la ruta según tu proyecto
    img.alt = "Logo";
    img.classList.add("header-logo");

    // Agregar los elementos al contenedor
    container.appendChild(title);
    container.appendChild(img);

    // Agregar el contenedor al header
    header.appendChild(container);

    return header;
}
