// LOGIN
function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const savedUser = localStorage.getItem("username");
    const savedPass = localStorage.getItem("password");

    if (username === savedUser && password === savedPass) {
        localStorage.setItem("login", "true");
        window.location.href = "./beranda/home.html";
    } else {
        alert("Login gagal!");
    }
}

// REGISTER
function register() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    localStorage.setItem("username", username);
    localStorage.setItem("password", password);

    alert("Register berhasil!");
    window.location.href = "login.html";
}

// LOGOUT
function logout() {
    localStorage.setItem("login", "false");
    window.location.href = "./main/login.html";
}