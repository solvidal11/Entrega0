document.addEventListener('DOMContentLoaded', () => {
    const logoutButton = document.getElementById('logout');

    logoutButton.addEventListener('click', () => {
        // Eliminar el estado de autenticación en localStorage
        localStorage.removeItem('loggedIn');
        alert('Sesión cerrada.');
        window.location.href = 'login.html'; // Redirigir a la página de inicio de sesión
    });
});
