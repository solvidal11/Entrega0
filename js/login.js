document.addEventListener('DOMContentLoaded', () => {
    const usuarioInput = document.getElementById('usuario');
    const contraseñaInput = document.getElementById('contraseña');
    const inicioButton = document.getElementById('inicio');

    if (usuarioInput && contraseñaInput && inicioButton) {
        inicioButton.addEventListener('click', () => {
            const usuario = usuarioInput.value.trim();
            const contraseña = contraseñaInput.value.trim();

            if (usuario && contraseña) {
                try {
                    // Simulación de autenticación
                    localStorage.setItem('authToken', 'simulated-token');
                    localStorage.setItem('usuario', usuario);

                    alert('Inicio de sesión exitoso.');
                    window.location.href = 'index.html'; // Redirige a la portada
                } catch (error) {
                    console.error('Error al iniciar sesión:', error);
                    alert('Hubo un problema al iniciar sesión. Por favor, intente de nuevo.');
                }
            } else {
                alert('Por favor, ingrese usuario y contraseña.');
            }
        });
    } else {
        console.error('No se encontraron los elementos del formulario.');
    }
});

function checkUser() {
    // Verifica si estamos en la página de inicio de sesión
    const currentPage = window.location.pathname.split('/').pop();
    
    if (currentPage !== 'login.html') {
        // Verifica si hay un usuario en localStorage
        const user = localStorage.getItem('usuario');

        // Si no hay usuario, redirige a login.html
        if (!user) {
            window.location.href = 'login.html';
        }
    }
}

// Llama a la función para verificar al cargar la página
checkUser();