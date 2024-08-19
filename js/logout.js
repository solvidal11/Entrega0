// logout.js
document.addEventListener('DOMContentLoaded', () => {
    // Eliminar los datos de autenticación del localStorage
    localStorage.removeItem('authToken');
    localStorage.removeItem('username');

    // Redirigir al usuario a la página de inicio de sesión
    window.location.href = 'login.html';
});
