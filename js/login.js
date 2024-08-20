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
