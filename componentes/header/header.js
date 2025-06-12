export function createHeader(isLoggedIn = false) {
    const header = document.createElement("header");
    header.classList.add("main-header");

    const container = document.createElement("div");
    container.classList.add("header-container");

    const title = document.createElement("h1");
    title.textContent = "Asistencia";

    const img = document.createElement("img");
    img.src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRq-IciWxLW5lsM2Oco4VluWyfOBSmgukVu6w&s";
    img.alt = "Logo";
    img.classList.add("header-logo");

    // Agregar botón de logout si está logueado
    if (isLoggedIn) {
        const logoutBtn = document.createElement("button");
        logoutBtn.textContent = "Cerrar Sesión";
        logoutBtn.classList.add("logout-btn");
        logoutBtn.addEventListener("click", () => {
            // Aquí deberías limpiar cualquier dato de sesión y redirigir al login
            localStorage.removeItem("authToken"); // Ejemplo si usas token
            window.location.reload(); // O redirigir a la página de login
        });
        container.appendChild(logoutBtn);
    }

    container.appendChild(title);
    container.appendChild(img);
    header.appendChild(container);

    return header;
}