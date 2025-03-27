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
    
    let errorMsg = document.createElement("p");
    errorMsg.id = "loginError";
    errorMsg.textContent = "Correo o contraseña incorrectos";
    errorMsg.style.color = "red";
    errorMsg.style.display = "none";
  
    formBox.append(title, emailInput, passwordInput, loginBtn, registerBtn, errorMsg);
    loginContainer.appendChild(formBox);
    root.appendChild(loginContainer);
  
    loginBtn.addEventListener("click", login);
    registerBtn.addEventListener("click", cargarRegistro);
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

    // Crear objeto con los datos del formulario
    const userData = {
        usuario: username,
        nombre: name,
        correo: email,
        telefono: phone,
        clave: password // Asegúrate de que la clave esté incluida
    };

    // Enviar los datos al backend para registrarlos en la base de datos
    fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData) // Cambié esta línea para enviar el objeto completo
    })
    .then(response => response.json())
    .then(data => {
        if (data.message === 'Profesor registrado exitosamente') {
            document.getElementById("registerSuccess").style.display = "block";
            setTimeout(cargarLogin, 2000); // Redirige al login después de 2 segundos
        } else {
            alert('Error al registrar el profesor');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Hubo un problema con el registro');
    });
}
  // Función de login
// Función de login



function login() {
    let email = document.getElementById("loginEmail").value;
    let password = document.getElementById("loginPassword").value;

    // Datos que se enviarán al servidor
    const loginData = {
        correo: email,
        clave: password
    };

    // Enviar datos al backend para hacer login
    fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.message === 'Login exitoso') {
            // Redirigir o cargar la página principal
            let root = document.querySelector("#root");
            root.replaceChildren();  // Limpia el contenido del #root
            cargarDOM();  // Llama a cargarDOM para renderizar el contenido
        } else {
            document.getElementById("loginError").style.display = "block";
        }
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById("loginError").style.display = "block";
    });
}

  