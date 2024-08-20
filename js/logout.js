document.addEventListener('DOMContentLoaded', () => {
   const btnlogout = document.getElementById('btnlogout');
   btnlogout.addEventListener('click', () =>{
     // Eliminar los datos de autenticación del localStorage
    localStorage.removeItem('authToken');
    localStorage.removeItem('usuario');

    // Redirigir al usuario a la página de inicio de sesión
    alert('Has cerrado sesión exitosamente.');
    window.location.href = 'login.html';
   });
});
