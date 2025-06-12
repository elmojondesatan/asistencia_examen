import { cargarDOM } from "../index.js";

// ---- LOGIN ----
export function cargarLogin() {
    const root = document.getElementById("root");
    root.innerHTML = "";

    const container = document.createElement("div");
    container.className = "login-container";

    const box = document.createElement("div");
    box.className = "form-box";
    box.id = "loginBox";

    const title = document.createElement("h2");
    title.textContent = "Iniciar Sesión";

    const email = document.createElement("input");
    email.type = "email";
    email.id = "loginEmail";
    email.placeholder = "Correo electrónico";
    email.required = true;

    const pass = document.createElement("input");
    pass.type = "password";
    pass.id = "loginPassword";
    pass.placeholder = "Contraseña";
    pass.required = true;

    const btnLogin = document.createElement("button");
    btnLogin.id = "loginBtn";
    btnLogin.className = "btn-primary";
    btnLogin.textContent = "Ingresar";

    const btnReg = document.createElement("button");
    btnReg.id = "registerBtn";
    btnReg.className = "btn-secondary";
    btnReg.textContent = "Registrarse";

    const btnForgot = document.createElement("button");
    btnForgot.id = "forgotPasswordBtn";
    btnForgot.className = "btn-link";
    btnForgot.textContent = "¿Olvidaste tu contraseña?";

    const error = document.createElement("p");
    error.id = "loginError";
    error.className = "error-message";
    error.textContent = "Correo o contraseña incorrectos";
    error.style.display = "none";

    box.append(title, email, pass, btnLogin, btnReg, btnForgot, error);
    container.appendChild(box);
    root.appendChild(container);

    btnLogin.addEventListener("click", login);
    btnReg.addEventListener("click", cargarRegistro);
    btnForgot.addEventListener("click", cargarRecuperarClave);
}

// ---- REGISTRO ----
function cargarRegistro() {
    const root = document.getElementById("root");
    root.innerHTML = "";

    const container = document.createElement("div");
    container.className = "login-container";

    const box = document.createElement("div");
    box.className = "form-box";
    box.id = "registerBox";

    const title = document.createElement("h2");
    title.textContent = "Crear Cuenta";

    const fields = [
        { type: "text", id: "registerUsername", placeholder: "Nombre de usuario" },
        { type: "text", id: "registerName", placeholder: "Nombre completo" },
        { type: "tel", id: "registerPhone", placeholder: "Número de teléfono" },
        { type: "email", id: "registerEmail", placeholder: "Correo electrónico" },
        { type: "password", id: "registerPassword", placeholder: "Contraseña" }
    ];

    const elements = fields.map(field => {
        const input = document.createElement("input");
        input.type = field.type;
        input.id = field.id;
        input.placeholder = field.placeholder;
        input.required = true;
        return input;
    });

    const btnSubmit = document.createElement("button");
    btnSubmit.id = "registerSubmit";
    btnSubmit.className = "btn-primary";
    btnSubmit.textContent = "Registrarse";

    const btnBack = document.createElement("button");
    btnBack.id = "backToLogin";
    btnBack.className = "btn-secondary";
    btnBack.textContent = "Volver al Login";

    const success = document.createElement("p");
    success.id = "registerSuccess";
    success.className = "success-message";
    success.textContent = "Cuenta creada exitosamente";
    success.style.display = "none";

    box.append(title, ...elements, btnSubmit, btnBack, success);
    container.appendChild(box);
    root.appendChild(container);

    btnSubmit.addEventListener("click", registrar);
    btnBack.addEventListener("click", cargarLogin);
}

// ---- RECUPERAR CONTRASEÑA ----
function cargarRecuperarClave() {
    const root = document.getElementById("root");
    root.innerHTML = "";

    const container = document.createElement("div");
    container.className = "login-container";

    const box = document.createElement("div");
    box.className = "form-box";
    box.id = "recoverBox";

    const title = document.createElement("h2");
    title.textContent = "Recuperar Contraseña";

    const correoInp = document.createElement("input");
    correoInp.type = "email";
    correoInp.id = "recoverEmail";
    correoInp.placeholder = "Correo registrado";
    correoInp.required = true;

    const btnSend = document.createElement("button");
    btnSend.id = "sendCodeBtn";
    btnSend.className = "btn-primary";
    btnSend.textContent = "Enviar código";

    const codeInp = document.createElement("input");
    codeInp.type = "text";
    codeInp.id = "recoverCode";
    codeInp.placeholder = "Código recibido";
    codeInp.style.display = "none";

    const newPassInp = document.createElement("input");
    newPassInp.type = "password";
    newPassInp.id = "newPassword";
    newPassInp.placeholder = "Nueva contraseña";
    newPassInp.style.display = "none";

    const btnConfirm = document.createElement("button");
    btnConfirm.id = "confirmNewPassBtn";
    btnConfirm.className = "btn-primary";
    btnConfirm.textContent = "Confirmar nueva contraseña";
    btnConfirm.style.display = "none";

    const msg = document.createElement("p");
    msg.id = "recoverMessage";
    msg.className = "info-message";
    msg.style.display = "none";

    const btnBack = document.createElement("button");
    btnBack.className = "btn-secondary";
    btnBack.textContent = "Volver al Login";

    box.append(title, correoInp, btnSend, codeInp, newPassInp, btnConfirm, msg, btnBack);
    container.appendChild(box);
    root.appendChild(container);

    btnBack.addEventListener("click", cargarLogin);
    btnSend.addEventListener("click", enviarCodigo);
    btnConfirm.addEventListener("click", confirmarNuevaClave);
}

// ---- FUNCIONES DE AUTENTICACIÓN ----
async function login() {
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    try {
        const response = await fetch("http://localhost:3000/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (response.ok) {
            localStorage.setItem("token", data.token);
            cargarDOM();
        } else {
            document.getElementById("loginError").textContent = data.message || "Error en el login";
            document.getElementById("loginError").style.display = "block";
        }
    } catch (error) {
        console.error("Error:", error);
        document.getElementById("loginError").textContent = "Error de conexión";
        document.getElementById("loginError").style.display = "block";
    }
}

async function registrar() {
    const usuario = document.getElementById("registerUsername").value;
    const nombre = document.getElementById("registerName").value;
    const telefono = document.getElementById("registerPhone").value;
    const correo = document.getElementById("registerEmail").value;
    const clave = document.getElementById("registerPassword").value;

    try {
        const response = await fetch("http://localhost:3000/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ usuario, nombre, telefono, correo, clave })
        });

        const data = await response.json();

        if (response.ok) {
            document.getElementById("registerSuccess").style.display = "block";
            setTimeout(cargarLogin, 2000);
        } else {
            alert(data.message || "Error al registrar");
        }
    } catch (error) {
        console.error("Error:", error);
        alert("Error de conexión al servidor");
    }
}

async function enviarCodigo() {
    const email = document.getElementById("recoverEmail").value;
    // Implementación de envío de código
}

async function confirmarNuevaClave() {
    // Implementación de confirmación de nueva clave
}