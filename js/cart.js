let carrito = [];

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

function actualizarCarrito() {
    const totalCount = carrito.reduce((acc, item) => acc + item.quantity, 0);
    const totalCost = carrito.reduce((acc, item) => acc + (item.cost * item.quantity), 0); // Cambiado a item.cost

    const carritoBadge = document.getElementById('carrito-badge');
    const costoTotalElemento = document.getElementById('costo-total');

    if (carritoBadge) {
        carritoBadge.textContent = totalCount;
    }
    if (costoTotalElemento) {
        const currency = carrito.length > 0 ? carrito[0].currency : ''; // Obtener la moneda del primer producto
        costoTotalElemento.textContent = `Costo Total: ${currency}${totalCost.toFixed(2)}`; // Incluyo la moneda, ya que no la tenía incluída.
    }
}

function guardarCarrito() {
    localStorage.setItem('carrito', JSON.stringify(carrito)); // Guardar en localStorage
}

function cargarCarrito() {
    const carritoAlmacenado = localStorage.getItem('carrito');
    if (carritoAlmacenado) {
        carrito = JSON.parse(carritoAlmacenado);
        actualizarCarrito();
    }
}

// Cargar carrito al iniciar la página
window.onload = cargarCarrito;



     //AÑADIR A CART.HTML AL TENER LA PARTE DEL CARRITO HECHA
//<nav>
//<a href="cart.html">Mi carrito <span id="carrito-badge">0</span></a>
//</nav>
//<div id="costo-total">Costo Total: $0.00</div>
 