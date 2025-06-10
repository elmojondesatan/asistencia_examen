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

  loginBtn.addEventListener("click", (event) => {
    event.preventDefault();
    login();
  });

  registerBtn.addEventListener("click", (event) => {
    event.preventDefault();
    cargarRegistro();
  });
}

function login() {
  let email = document.getElementById("loginEmail").value;
  let password = document.getElementById("loginPassword").value;

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
