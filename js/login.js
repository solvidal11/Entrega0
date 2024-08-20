document.addEventListener('DOMContentLoaded', () => {
    const usuarioInput = document.getElementById('usuario');
    const contraseñaInput = document.getElementById('contraseña');
    const inicioButton = document.getElementById('inicio');

    inicioButton.addEventListener('click', () => {
        const usuario = usuarioInput.value.trim();
        const contraseña = contraseñaInput.value.trim();

        if (usuario && contraseña) {
            // Simulación de autenticación: acepta cualquier combinación de datos
            localStorage.setItem('authToken', 'simulated-token');
            localStorage.setItem('usuario', usuario); // Guardar el nombre de usuario
            alert('Inicio de sesión exitoso.');
            window.location.href = 'index.html'; // Redirige a la portada
        } else {
            alert('Por favor, ingrese usuario y contraseña.');
        }
    });
});
