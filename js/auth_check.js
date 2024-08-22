document.addEventListener('DOMContentLoaded', () => {
    const currentPage = window.location.pathname.split('/').pop();

    // Verifica si estamos en la página de inicio de sesión
    if (currentPage !== 'login.html') {
        const user = localStorage.getItem('usuario');

        // Redirige a login.html si no hay usuario en localStorage
        if (!user) {
            window.location.href = 'login.html';
        }
    }
});
