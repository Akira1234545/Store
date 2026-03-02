document.addEventListener("DOMContentLoaded", function() {
    const sign_in_btn = document.querySelector("#sign-in-btn");
    const sign_up_btn = document.querySelector("#sign-up-btn");
    const container = document.querySelector(".container");

    // Datos estáticos solicitados
    const VALID_USER = "Admin"; 
    const VALID_PASS = "Admin1234";
    let intentosRestantes = 3;

    // Animación de paneles
    sign_up_btn.addEventListener("click", () => container.classList.add("sign-up-mode"));
    sign_in_btn.addEventListener("click", () => container.classList.remove("sign-up-mode"));

    // Lógica del ojito (Ver contraseña)
    const togglePassword = document.querySelector("#togglePassword");
    const passwordInput = document.querySelector("#login-password");

    togglePassword.addEventListener("click", function () {
        const type = passwordInput.getAttribute("type") === "password" ? "text" : "password";
        passwordInput.setAttribute("type", type);
        this.classList.toggle("fa-eye-slash");
    });

    // Login con validación e intentos
    document.getElementById("loginForm").addEventListener("submit", function(e){
        e.preventDefault();
        
        if (intentosRestantes <= 0) {
            alert("Acceso bloqueado: Has agotado tus intentos.");
            return;
        }

        const user = document.getElementById("login-username").value.trim();
        const pass = passwordInput.value.trim();

        if(user === VALID_USER && pass === VALID_PASS) {
            alert("✓ Bienvenido, has iniciado sesión");
            // Redirección SIN LocalStorage (pasando por URL)
            window.location.href = "bienvenido.html?user=" + user;
        } else {
            intentosRestantes--;
            if (intentosRestantes > 0) {
                alert(`Usuario no registrado en la Base de Datos. Intentos restantes: ${intentosRestantes}`);
            } else {
                alert("Has agotado tus 3 intentos.");
                this.querySelector('input[type="submit"]').disabled = true;
            }
        }
    });

    // Registro (Solo validación de coincidencia)
    document.getElementById("registerForm").addEventListener("submit", function(e){
        e.preventDefault();
        const pass = document.getElementById("register-password").value;
        const confirm = document.getElementById("confirm-password").value;

        if(pass !== confirm) {
            alert("Las contraseñas no coinciden");
            return;
        }
        alert("Usuario registrado correctamente (Simulado). Ahora inicia sesión.");
        this.reset();
        container.classList.remove("sign-up-mode");
    });
});