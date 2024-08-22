document.addEventListener("DOMContentLoaded", function() {
    // Manejo de navegación por categorías
    document.getElementById("autos")?.addEventListener("click", function() {
        localStorage.setItem("catID", 101);
        window.location = "products.html";
    });
    document.getElementById("juguetes")?.addEventListener("click", function() {
        localStorage.setItem("catID", 102);
        window.location = "products.html";
    });
    document.getElementById("muebles")?.addEventListener("click", function() {
        localStorage.setItem("catID", 103);
        window.location = "products.html";
    });

    // Mostrar el nombre de usuario
    const usuario = localStorage.getItem('usuario');
    const mostrarUsuario = document.getElementById('mostrarusuario');

    if (mostrarUsuario) {
        if (usuario) {
            mostrarUsuario.textContent = `¡Bienvenido, ${usuario}!`;
               }
    } else {
        window.location.href = 'login.html';
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
