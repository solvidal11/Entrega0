document.addEventListener("DOMContentLoaded", function() {
    // Mostrar el nombre de usuario
    const usuario = localStorage.getItem('usuario');
    const mostrarUsuario = document.getElementById('mostrarusuario');

    if (mostrarUsuario) {
        if (usuario) {
            mostrarUsuario.textContent = `¡Bienvenido, ${usuario}!`;
        } else {
            // Si no hay usuario, redirige a la página de inicio de sesión
            window.location.href = 'login.html';
        }
    }

    // Manejo del cierre de sesión
    const btnLogout = document.getElementById('btnlogout');
    if (btnLogout) {
        btnLogout.addEventListener('click', (event) => {
            event.preventDefault();
            // Eliminar los datos de autenticación del localStorage
            localStorage.removeItem('authToken');
            localStorage.removeItem('usuario');

            // Redirigir al usuario a la página de inicio de sesión
            alert('Has cerrado sesión exitosamente.');
            window.location.href = 'login.html';
        });
    } else {
        console.error('Elemento con ID "btnlogout" no encontrado.');
    }
});
