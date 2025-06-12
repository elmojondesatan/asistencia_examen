import { cargarDOM } from "../../index.js";

export function cargarLogin() {
    let root = document.querySelector("#root");
    root.replaceChildren();

    let loginContainer = document.createElement("div");
    loginContainer.classList.add("login-container");

    let formBox = document.createElement("div");
    formBox.classList.add("form-box");
    formBox.id = "loginBox";

    let title = document.createElement("h2");
    title.textContent = "Iniciar Sesión";

    let emailInput = document.createElement("input");
    emailInput.type = "email";
    emailInput.id = "loginEmail";
    emailInput.placeholder = "Correo electrónico";
    emailInput.required = true;

    let passwordInput = document.createElement("input");
    passwordInput.type = "password";
    passwordInput.id = "loginPassword";
    passwordInput.placeholder = "Contraseña";
    passwordInput.required = true;

    let loginBtn = document.createElement("button");
    loginBtn.id = "loginBtn";
    loginBtn.textContent = "Ingresar";

    let registerBtn = document.createElement("button");
    registerBtn.id = "registerBtn";
    registerBtn.textContent = "Registrarse";

    let forgotPasswordBtn = document.createElement("button");
    forgotPasswordBtn.id = "forgotPasswordBtn";
    forgotPasswordBtn.textContent = "¿Olvidaste tu contraseña?";
    forgotPasswordBtn.style.background = "none";
    forgotPasswordBtn.style.color = "blue";
    forgotPasswordBtn.style.border = "none";
    forgotPasswordBtn.style.cursor = "pointer";

    let errorMsg = document.createElement("p");
    errorMsg.id = "loginError";
    errorMsg.style.color = "red";
    errorMsg.style.display = "none";

    formBox.append(title, emailInput, passwordInput, loginBtn, registerBtn, forgotPasswordBtn, errorMsg);
    loginContainer.appendChild(formBox);
    root.appendChild(loginContainer);

    loginBtn.addEventListener("click", login);
    registerBtn.addEventListener("click", cargarRegistro);
    forgotPasswordBtn.addEventListener("click", cargarRecuperarClave);
}

function cargarRegistro() {
    let root = document.querySelector("#root");
    root.replaceChildren();

    let registerContainer = document.createElement("div");
    registerContainer.classList.add("login-container");

    let formBox = document.createElement("div");
    formBox.classList.add("form-box");
    formBox.id = "registerBox";

    let title = document.createElement("h2");
    title.textContent = "Crear Cuenta";

    let usernameInput = document.createElement("input");
    usernameInput.type = "text";
    usernameInput.id = "registerUsername";
    usernameInput.placeholder = "Nombre de usuario";
    usernameInput.required = true;

    let nameInput = document.createElement("input");
    nameInput.type = "text";
    nameInput.id = "registerName";
    nameInput.placeholder = "Nombre completo";
    nameInput.required = true;

    let phoneInput = document.createElement("input");
    phoneInput.type = "tel";
    phoneInput.id = "registerPhone";
    phoneInput.placeholder = "Número de teléfono";
    phoneInput.required = true;

    let emailInput = document.createElement("input");
    emailInput.type = "email";
    emailInput.id = "registerEmail";
    emailInput.placeholder = "Correo electrónico";
    emailInput.required = true;

    let passwordInput = document.createElement("input");
    passwordInput.type = "password";
    passwordInput.id = "registerPassword";
    passwordInput.placeholder = "Contraseña";
    passwordInput.required = true;

    let registerSubmit = document.createElement("button");
    registerSubmit.id = "registerSubmit";
    registerSubmit.textContent = "Registrarse";

    let backToLogin = document.createElement("button");
    backToLogin.id = "backToLogin";
    backToLogin.textContent = "Volver al Login";

    let successMsg = document.createElement("p");
    successMsg.id = "registerSuccess";
    successMsg.style.color = "green";
    successMsg.style.display = "none";

    formBox.append(title, usernameInput, nameInput, phoneInput, emailInput, passwordInput, registerSubmit, backToLogin, successMsg);
    registerContainer.appendChild(formBox);
    root.appendChild(registerContainer);

    registerSubmit.addEventListener("click", registrar);
    backToLogin.addEventListener("click", cargarLogin);
}

function registrar() {
    const username = document.getElementById("registerUsername").value.trim();
    const name = document.getElementById("registerName").value.trim();
    const phone = document.getElementById("registerPhone").value.trim();
    const email = document.getElementById("registerEmail").value.trim();
    const password = document.getElementById("registerPassword").value.trim();
    const successMsg = document.getElementById("registerSuccess");
    const registerBtn = document.getElementById("registerSubmit");

    if (!username || !name || !phone || !email || !password) {
        successMsg.textContent = "Por favor complete todos los campos";
        successMsg.style.color = "red";
        successMsg.style.display = "block";
        return;
    }

    registerBtn.disabled = true;
    registerBtn.textContent = "Registrando...";

    const userData = {
        usuario: username,
        nombre: name,
        correo: email,
        telefono: phone,
        clave: password
    };

    fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Error HTTP! estado: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        if (data.message === 'Profesor registrado exitosamente') {
            successMsg.textContent = "Cuenta creada exitosamente";
            successMsg.style.color = "green";
            successMsg.style.display = "block";
            setTimeout(cargarLogin, 2000);
        } else {
            successMsg.textContent = data.message || 'Error al registrar';
            successMsg.style.color = "red";
            successMsg.style.display = "block";
        }
    })
    .catch(error => {
        console.error('Error:', error);
        successMsg.textContent = "Error de conexión con el servidor";
        successMsg.style.color = "red";
        successMsg.style.display = "block";
    })
    .finally(() => {
        registerBtn.disabled = false;
        registerBtn.textContent = "Registrarse";
    });
}

function login() {
    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value.trim();
    const errorMsg = document.getElementById("loginError");
    const loginBtn = document.getElementById("loginBtn");

    if (!email || !password) {
        errorMsg.textContent = "Por favor complete todos los campos";
        errorMsg.style.display = "block";
        return;
    }

    loginBtn.disabled = true;
    loginBtn.textContent = "Cargando...";

    const loginData = {
        correo: email,
        clave: password
    };

    fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Error HTTP! estado: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        if (data.message === 'Login exitoso') {
            cargarDOM();
        } else {
            errorMsg.textContent = data.message || "Credenciales incorrectas";
            errorMsg.style.display = "block";
        }
    })
    .catch(error => {
        console.error('Error:', error);
        errorMsg.textContent = "Error de conexión con el servidor";
        errorMsg.style.display = "block";
    })
    .finally(() => {
        loginBtn.disabled = false;
        loginBtn.textContent = "Ingresar";
    });
}

