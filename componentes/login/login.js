import { cargarDOM } from "../../index.js";

export function cargarLogin() {
<<<<<<< HEAD
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

  let errorMsg = document.createElement("p");
  errorMsg.id = "loginError";
  errorMsg.textContent = "Correo o contraseña incorrectos";
  errorMsg.style.color = "red";
  errorMsg.style.display = "none";

  formBox.append(title, emailInput, passwordInput, loginBtn, registerBtn, errorMsg);
  loginContainer.appendChild(formBox);
  root.appendChild(loginContainer);

  loginBtn.addEventListener("click", (event) => {
    event.preventDefault();
    login();
  });

  registerBtn.addEventListener("click", (event) => {
    event.preventDefault();
    cargarRegistro();
  });
=======
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
    errorMsg.textContent = "Correo o contraseña incorrectos";
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
    successMsg.textContent = "Cuenta creada exitosamente";
    successMsg.style.color = "green";
    successMsg.style.display = "none";

    formBox.append(title, usernameInput, nameInput, phoneInput, emailInput, passwordInput, registerSubmit, backToLogin, successMsg);
    registerContainer.appendChild(formBox);
    root.appendChild(registerContainer);

    registerSubmit.addEventListener("click", registrar);
    backToLogin.addEventListener("click", cargarLogin);
}

function registrar() {
    let username = document.getElementById("registerUsername").value;
    let name = document.getElementById("registerName").value;
    let phone = document.getElementById("registerPhone").value;
    let email = document.getElementById("registerEmail").value;
    let password = document.getElementById("registerPassword").value;

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
    .then(response => response.json())
    .then(data => {
        if (data.message === 'Profesor registrado exitosamente') {
            document.getElementById("registerSuccess").style.display = "block";
            setTimeout(cargarLogin, 2000);
        } else {
            alert('Error al registrar el profesor');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Hubo un problema con el registro');
    });
>>>>>>> 13ef2752675ea684f7b68dfa765f6a18276638b9
}

function login() {
  let email = document.getElementById("loginEmail").value;
  let password = document.getElementById("loginPassword").value;

<<<<<<< HEAD
  const loginData = { correo: email, clave: password };

  fetch('http://localhost:3000/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(loginData)
  })
  .then(response => {
    if (!response.ok) throw new Error("Error en el login");
    return response.json();
  })
  .then(data => {
    if (data.message === 'Login exitoso') {
      let root = document.querySelector("#root");
      root.replaceChildren();
      cargarDOM();
    } else {
      document.getElementById("loginError").style.display = "block";
    }
  })
  .catch(error => {
    console.error('Error:', error);
    document.getElementById("loginError").style.display = "block";
  });
}
=======
    const loginData = {
        correo: email,
        clave: password
    };

    fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.message === 'Login exitoso') {
            let root = document.querySelector("#root");
            root.replaceChildren();
            cargarDOM();
        } else {
            document.getElementById("loginError").style.display = "block";
        }
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById("loginError").style.display = "block";
    });
}

// === Recuperar Contraseña ===

function cargarRecuperarClave() {
    let root = document.querySelector("#root");
    root.replaceChildren();

    let recuperarContainer = document.createElement("div");
    recuperarContainer.classList.add("login-container");

    let formBox = document.createElement("div");
    formBox.classList.add("form-box");
    formBox.id = "recoverBox";

    let title = document.createElement("h2");
    title.textContent = "Recuperar Contraseña";

    let emailInput = document.createElement("input");
    emailInput.type = "email";
    emailInput.id = "recoverEmail";
    emailInput.placeholder = "Correo registrado";
    emailInput.required = true;

    let sendBtn = document.createElement("button");
    sendBtn.textContent = "Enviar nueva contraseña";

    let backBtn = document.createElement("button");
    backBtn.textContent = "Volver al Login";

    let message = document.createElement("p");
    message.id = "recoverMessage";
    message.style.display = "none";

    formBox.append(title, emailInput, sendBtn, backBtn, message);
    recuperarContainer.appendChild(formBox);
    root.appendChild(recuperarContainer);

    sendBtn.addEventListener("click", enviarRecuperacion);
    backBtn.addEventListener("click", cargarLogin);
}

function enviarRecuperacion() {
    const correo = document.getElementById("recoverEmail").value;

    fetch("http://localhost:3000/recuperar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ correo })
    })
    .then(res => res.json())
    .then(data => {
        let msg = document.getElementById("recoverMessage");
        if (data.message === "Correo enviado") {
            msg.style.display = "block";
            msg.style.color = "green";
            msg.textContent = "Se envió una nueva contraseña a tu correo.";
        } else {
            msg.style.display = "block";
            msg.style.color = "red";
            msg.textContent = "No se encontró ese correo.";
        }
    })
    .catch(err => {
        console.error(err);
        let msg = document.getElementById("recoverMessage");
        msg.style.display = "block";
        msg.style.color = "red";
        msg.textContent = "Error al enviar la recuperación.";
    });
}
>>>>>>> 13ef2752675ea684f7b68dfa765f6a18276638b9
