

      //**Simulamos una solicitud de inicio de sesión, 
      //**Guardar la sesión en localStorage cuando el usuario se "autentica correctamente".
      //**Verificar el estado de la sesión en cada página que requiera autenticación y redirigir al login.html si no se está autenticado.
      //**Creamos un archivo logout.js con la función para cerrar sesión, el cual nos redirige también a login.html de ser necesario.  


      document.addEventListener('DOMContentLoaded', () => {
        const usuarioInput = document.getElementById('usuario');
        const contraseñaInput = document.getElementById('contraseña');
        const inicioButton = document.getElementById('inicio');
    
        inicioButton.addEventListener('click', () => {
            const usuario = usuarioInput.value.trim();
            const contraseña = contraseñaInput.value.trim();
    
            // Simulación de autenticación
            if (usuario === 'usuario' && contraseña === 'contraseña') {
                localStorage.setItem('authToken', 'simulated-token');
                localStorage.setItem('username', usuario); // Guardar el nombre de usuario
                alert('Inicio de sesión exitoso.');
                window.location.href = 'index.html'; // Redirige a la portada
            } else {
                alert('Usuario o contraseña incorrectos.');
            }
        });
    });
    