export function createHeader() {
    const header = document.createElement("header");
    header.className = "app-header";

    const logo = document.createElement("div");
    logo.className = "logo";
    logo.textContent = "Sistema de Asistencia";

    const nav = document.createElement("nav");

    const menuItems = [
        { text: "Inicio", id: "home-btn" },
        { text: "Asistencia", id: "asistencia-btn" },
        { text: "Reportes", id: "reportes-btn" }
    ];

    menuItems.forEach(item => {
        const button = document.createElement("button");
        button.className = "nav-btn";
        button.id = item.id;
        button.textContent = item.text;
        nav.appendChild(button);
    });

    const logoutBtn = document.createElement("button");
    logoutBtn.id = "logout-btn";
    logoutBtn.className = "btn-secondary";
    logoutBtn.textContent = "Cerrar Sesión";
    logoutBtn.addEventListener("click", logout);

    header.appendChild(logo);
    header.appendChild(nav);
    header.appendChild(logoutBtn);

    return header;
}

function logout() {
    localStorage.removeItem("token");
    window.location.reload();
}