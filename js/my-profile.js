document.addEventListener('DOMContentLoaded', function() {
    const formularioPerfil = document.getElementById('profile-form'); 
    const inputEmail = document.getElementById('email'); 

    // Comprobar si el usuario está logueado
    const estaLogueado = localStorage.getItem('isLoggedIn'); // Comprobar el estado de inicio de sesión

    if (estaLogueado) {
        window.location.href = 'my-profile.html'; // Redirigir al login si no está logueado
    }else if (!estaLogueado){
        window.location.href = 'login.html';
    }
    
    // Cargar el email del almacenamiento local
    inputEmail.value = localStorage.getItem('userEmail') || ''; 

    formularioPerfil.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevenir el envío del formulario para validar primero

        // Validar campos obligatorios
        const nombre = document.getElementById('nombre').value; 
        const apellido = document.getElementById('apellido').value; 

        // Comprobar si los campos obligatorios están llenos
        if (!nombre || !apellido) {
            alert('Por favor, complete los campos obligatorios.'); // Alerta si falta información
            return; // Detener la ejecución si falta información
        }

        // Guardar datos en almacenamiento local
        const perfilUsuario = {
            nombre, 
            segundoNombre: document.getElementById('segundo-nombre').value, 
            apellido,
            segundoApellido: document.getElementById('segundo-apellido').value, 
            email: inputEmail.value, 
            telefono: document.getElementById('telefono').value, 
            fotoPerfil: document.getElementById('foto-perfil').files[0], 
            modoDiaNoche: document.getElementById('modo-dia-noche').checked 
        };

        // Almacenar el objeto del perfil de usuario en el almacenamiento local
        localStorage.setItem('userProfile', JSON.stringify(perfilUsuario));
        alert('Cambios guardados exitosamente.'); // Mensaje de éxito
    });
});
