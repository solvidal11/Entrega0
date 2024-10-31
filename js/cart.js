// Variables
let carrito = [];
const divisa = '$';
const DOMitems = document.querySelector('#items');
const DOMcarrito = document.querySelector('#cart-items');
const DOMtotal = document.querySelector('#total');
const DOMbotonVaciar = document.querySelector('#vaciar-carrito');

// Funciones

/**
 * Dibuja los productos guardados en el carrito.
 */
function renderizarCarrito() {
    // Limpiar el HTML del carrito
    DOMcarrito.textContent = '';
    
    // Cargar carrito desde localStorage
    const carritoGuardado = JSON.parse(localStorage.getItem('cart')) || [];

    // Si el carrito está vacío, mostrar un mensaje
    if (carritoGuardado.length === 0) {
        const alert = document.querySelector('.alert');
        alert.style.display = 'block';
        return;
    } else {
        const alert = document.querySelector('.alert');
        alert.style.display = 'none';
    }

    // Renderizar cada producto en el carrito
    carritoGuardado.forEach((item) => {
        const miNodo = document.createElement('li');
        miNodo.classList.add('list-group-item', 'text-right', 'mx-2');
        miNodo.textContent = `${item.name} - ${item.price}${divisa}`;
        
        const miBoton = document.createElement('button');
        miBoton.classList.add('btn', 'btn-danger', 'mx-5');
        miBoton.textContent = 'X';
        miBoton.dataset.item = item.id;
        miBoton.addEventListener('click', () => borrarItemCarrito(item.id));
        
        miNodo.appendChild(miBoton);
        DOMcarrito.appendChild(miNodo);
    });

    DOMtotal.textContent = calcularTotal(carritoGuardado);
}

/**
 * Borrar un producto del carrito.
 */
function borrarItemCarrito(itemId) {
    const carritoGuardado = JSON.parse(localStorage.getItem('cart')) || [];
    const nuevoCarrito = carritoGuardado.filter(item => item.id !== itemId);
    localStorage.setItem('cart', JSON.stringify(nuevoCarrito));
    renderizarCarrito();
}

/**
 * Calcular el total del carrito.
 */
function calcularTotal(carritoGuardado) {
    return carritoGuardado.reduce((total, item) => {
        return total + item.price;
    }, 0).toFixed(2);
}

/**
 * Vaciar carrito.
 */
function vaciarCarrito() {
    localStorage.setItem('cart', JSON.stringify([]));
    renderizarCarrito();
}

// Eventos
DOMbotonVaciar.addEventListener('click', vaciarCarrito);

// Inicio
renderizarCarrito();
