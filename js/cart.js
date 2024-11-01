
let carrito = []; // Arreglo para guardar los productos en el carrito
const DOMitems = document.querySelector('#items');
const DOMcarrito = document.querySelector('#cart-items');
const DOMtotal = document.querySelector('#total');
const DOMbotonVaciar = document.querySelector('#vaciar-carrito');


 // Dibuja los productos guardados en el carrito.

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
        miNodo.classList.add('list-group-item', 'text-right', 'mx-1');
        
        // Crear contenido del nodo
        miNodo.innerHTML = `
            <div class="cart-product" min="0">  
                <div id="product-left-info">  
                    <li class="list-group-item">  
                        <img src="${item.image}" alt="${item.name}" style="width: 15rem; height: 15rem; margin-right: 20px;">  
                        <strong style="font-size: 1.5rem">${item.name}</strong>   
                        <span class="badge badge-primary" id="product-count-badge-${item.id}">${item.quantity}</span>  
                    </li>  
                    <p class="product-moneda">Moneda: ${item.currency}</p>   
                    <p class="product-unitprice">Costo: ${item.price}</p>  
                </div>  
    
                <div id="product-right-info">  
                    Subtotal: <span id="product-subtotal-${item.id}">${item.currency} ${(item.price * item.quantity).toFixed(2)}</span>  
                    <br/>  
                    Cantidad: <input type="number" class="input-cantidad" data-id="${item.id}" value="${item.quantity}" min="0" style="width: 50px;"/>  
                </div>  
            </div>  
        `;
        // Crear un botón para eliminar el producto del carrito
        const miBoton = document.createElement('button');
        miBoton.classList.add('btn', 'btn-danger');
        miBoton.textContent = 'Eliminar del carrito';
        miBoton.dataset.item = item.id;
        miBoton.addEventListener('click', () => borrarItemCarrito(item.id));
     
        //Anadir evento de cambio a la cantidad:
        const inputCantidad = miNodo.querySelector('.input-cantidad');
        inputCantidad.addEventListener('input', (event) => {
            const nuevaCantidad = event.target.value;
            actualizarSubtotal(item.id, item.price, nuevaCantidad);
        });

        miNodo.appendChild(miBoton);
        DOMcarrito.appendChild(miNodo);
    });
}

// Actualizar el subtotal en función de la nueva cantidad seleccionada
function actualizarSubtotal(itemId, price, quantity) {
    const subtotal = document.querySelector(`#product-subtotal-${itemId}`);
    const subtotalAct = (price * quantity).toFixed(2);

// Obtener la moneda del carrito usando el item del localStorage para el subtotal
 const carritoGuardado = JSON.parse(localStorage.getItem('cart')) || [];
 const item = carritoGuardado.find(i => i.id === itemId);

    subtotal.textContent = `${item.currency} ${subtotalAct}`;
    
// Actualizar el total
renderizarTotal();
}

// Renderizar el total
function renderizarTotal() {
    const carritoGuardado = JSON.parse(localStorage.getItem('cart')) || [];
    let total = 0;

    carritoGuardado.forEach(item => {
        const cantidad = document.querySelector(`.input-cantidad[data-id="${item.id}"]`);
        const cantidadValor = cantidad ? parseInt(cantidad.value, 10) : 0;
        total += item.price * cantidadValor;
    });

    //Asegurar que se muestre la moneda correctamente:
    const moneda = carritoGuardado[0]?.currency || '';
    DOMtotal.textContent = `${moneda} ${total.toFixed(2)}`;
}

//Borrar un producto del carrito.
function borrarItemCarrito(itemId) {
    const carritoGuardado = JSON.parse(localStorage.getItem('cart')) || []; // Cargar el carrito desde localStorage
    // Filtrar el carrito para eliminar el producto con el id especificado
    const nuevoCarrito = carritoGuardado.filter(item => item.id !== itemId);
    localStorage.setItem('cart', JSON.stringify(nuevoCarrito)); // Guardar el nuevo carrito en localStorage
    renderizarCarrito(); // Volver a renderizar el carrito
}

//Vaciar carrito.

function vaciarCarrito() {
    localStorage.setItem('cart', JSON.stringify([])); // Vaciar el carrito en localStorage
    renderizarCarrito(); // Volver a renderizar el carrito
}

// Eventos
DOMbotonVaciar.addEventListener('click', vaciarCarrito); // Añadir evento al botón de vaciar el carrito

// Inicio
renderizarCarrito();
