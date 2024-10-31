let carrito = [];

// Añadir producto al carrito
function añadirAlCarrito(producto) {
    const productoExistente = carrito.find(item => item.id === producto.id);
    if (productoExistente) {
        productoExistente.quantity += 1; // Incrementar cantidad
    } else {
        carrito.push({ ...producto, quantity: 1 }); // Añadir nuevo producto
    }
    actualizarCarrito();
    guardarCarrito();
}

// Actualizar carrito y el badge
function actualizarCarrito() {
    const totalCount = carrito.reduce((acc, item) => acc + item.quantity, 0);
    const totalCost = carrito.reduce((acc, item) => acc + (item.cost * item.quantity), 0);
    const carritoBadge = document.getElementById('carrito-badge');
    const costoTotalElemento = document.getElementById('costo-total');

    if (carritoBadge) {
        carritoBadge.textContent = totalCount;
    }
    if (costoTotalElemento) {
        const currency = carrito.length > 0 ? carrito[0].currency : '';
        costoTotalElemento.textContent = `Costo Total: ${currency}${totalCost.toFixed(2)}`;
    }
}

// Guardar carrito en localStorage
function guardarCarrito() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

// Cargar carrito desde localStorage
function cargarCarrito() {
    const carritoAlmacenado = localStorage.getItem('carrito');
    if (carritoAlmacenado) {
        carrito = JSON.parse(carritoAlmacenado);
        actualizarCarrito();
        renderizarCarrito(); // Renderiza el carrito al cargar
    }
}

// Renderizar productos en el carrito
function renderizarCarrito() {
    const carritoContainer = document.getElementById('cart-items');
    carritoContainer.innerHTML = ''; 

    carrito.forEach(item => {
        const itemElemento = document.createElement('li');
        itemElemento.textContent = `${item.name} - ${item.cost} ${item.currency} (Cantidad: ${item.quantity})`;
        carritoContainer.appendChild(itemElemento);
    });

    actualizarCarrito(); // Actualiza badge y costo total
}

// Cargar carrito al iniciar la página
window.onload = cargarCarrito;


     //AÑADIR A CART.HTML AL TENER LA PARTE DEL CARRITO HECHA
//<nav>
//<a href="cart.html">Mi carrito <span id="carrito-badge">0</span></a>
//</nav>
//<div id="costo-total">Costo Total: $0.00</div>
 