document.addEventListener("DOMContentLoaded", function(){
    document.getElementById("autos").addEventListener("click", function() {
        localStorage.setItem("catID", 101);
        window.location = "products.html"
    });
    document.getElementById("juguetes").addEventListener("click", function() {
        localStorage.setItem("catID", 102);
        window.location = "products.html"
    });
    document.getElementById("muebles").addEventListener("click", function() {
        localStorage.setItem("catID", 103);
        window.location = "products.html"
    });
});


// Validación de token en la página principal
document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('authToken');
    const usernameDisplay = document.getElementById('usernameDisplay'); // Elemento donde mostrar el nombre de usuario

    if (!token) {
        window.location.href = 'login.html'; // Redirige al login si no hay token
    } else {
        // Mostrar el nombre de usuario
        const username = localStorage.getItem('username');
        if (usernameDisplay) {
            usernameDisplay.textContent = `Bienvenido, ${username}`;
        }
    }
});
