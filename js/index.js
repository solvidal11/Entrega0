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
    const welcomeMessage = document.getElementById('welcomeMessage');
    const logoutButton = document.getElementById('logout');

    // Verificar si el usuario está autenticado
    const authToken = localStorage.getItem('authToken');
    const username = localStorage.getItem('username');

    if (!authToken || !username) {
        window.location.href = 'login.html'; // Redirige al login si no está autenticado
    } else {
        welcomeMessage.textContent = `¡Hola, ${username}!`;
    }

    logoutButton.addEventListener('click', () => {
        // Eliminar los datos de autenticación del localStorage
        localStorage.removeItem('authToken');
        localStorage.removeItem('username');

        // Redirigir al usuario a la página de inicio de sesión
        alert('Has cerrado sesión exitosamente.');
        window.location.href = 'login.html';
    });
});