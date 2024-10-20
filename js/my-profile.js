document.addEventListener('DOMContentLoaded', function() {
    const formularioPerfil = document.getElementById('profile-form');
    const inputEmail = document.getElementById('email');

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


// Evento para previsualizar la imagen seleccionada
document.getElementById('imagenPerfil').addEventListener('change', function(event) {
    const reader = new FileReader();
    reader.onload = function() {
        const imageBase64 = reader.result; // La imagen convertida a base64
        document.getElementById('vistaPerfil').src = imageBase64; // Previsualización
        document.getElementById('vistaPerfil').style.display = 'block'; // Mostrar la imagen
    };
    reader.readAsDataURL(event.target.files[0]); // Leer la imagen
});

// Evento para guardar la imagen en localStorage
document.getElementById('guardarImagen').addEventListener('click', function() {
    const imageBase64 = document.getElementById('vistaPerfil').src;
    if (imageBase64) {
        localStorage.setItem('imagenPerfil', imageBase64); // Guardar en localStorage
        alert('Imagen guardada correctamente');
    } else {
        alert('Por favor selecciona una imagen.');
    }
});

// Obtener la imagen de localStorage al cargar la página
window.onload = function() {
    const imagenPerfil = localStorage.getItem('imagenPerfil');
    if (imagenPerfil) {
        document.getElementById('vistaPerfil').src = imagenPerfil;
        document.getElementById('vistaPerfil').style.display = 'block'; // Mostrar si ya está guardada
    } else {
        document.getElementById('vistaPerfil').alt = 'No has subido una foto de perfil aún';
    }
};
