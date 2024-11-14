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
    
    // Si el carrito está vacío, mostrar un mensaje // Modificacion para Parte 4
    const alert = document.querySelector('.alert');

    if (carritoGuardado.length === 0) {
        alert.style.display = 'block';
        DOMtotal.textContent = 'UYU 0.00';
        return;
    } else {
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
     
        // Añadir evento de cambio a la cantidad // Parte 4
        const inputCantidad = miNodo.querySelector('.input-cantidad');
        inputCantidad.addEventListener('input', (event) => {
            const nuevaCantidad = event.target.value;
            actualizarSubtotal(item.id, item.price, nuevaCantidad);
        });

        miNodo.appendChild(miBoton);
        DOMcarrito.appendChild(miNodo);
    });
    renderizarTotal()
}

// Actualizar el subtotal en función de la nueva cantidad seleccionada // Parte 4
function actualizarSubtotal(itemId, price, quantity) {
    const subtotal = document.querySelector(`#product-subtotal-${itemId}`);
    const subtotalAct = (price * quantity).toFixed(2);

    // Obtener la moneda del carrito usando el item del localStorage para el subtotal // Parte 4
    const carritoGuardado = JSON.parse(localStorage.getItem('cart')) || [];
    const item = carritoGuardado.find(i => i.id === itemId);

    subtotal.textContent = `${item.currency} ${subtotalAct}`;
    
    // Actualizar el total
    renderizarTotal();
}

//Tasa de conversion USD a UYU // Parte 4
const conversionMoneda = 40; 

// Renderizar el total
function renderizarTotal() {
    const carritoGuardado = JSON.parse(localStorage.getItem('cart')) || [];
    let total = 0;

    carritoGuardado.forEach(item => {
        const cantidad = document.querySelector(`.input-cantidad[data-id="${item.id}"]`);
        const cantidadValor = cantidad ? parseInt(cantidad.value, 10) : 0;

    // Convertir a pesos UYU // Parte 4
    let precioEnUYU = item.price;
    if (item.currency === 'USD') {
    precioEnUYU *= conversionMoneda;
    }

     total += precioEnUYU * cantidadValor;
});

    DOMtotal.textContent = `UYU ${total.toFixed(2)}`;
}

// Borrar un producto del carrito.
function borrarItemCarrito(itemId) {
    const carritoGuardado = JSON.parse(localStorage.getItem('cart')) || []; // Cargar el carrito desde localStorage
    
    // Seleccionar el producto a eliminar y añadir la animación
    const productoElement = document.querySelector(`[data-id="${itemId}"]`).closest('li'); // Seleccionamos el <li> que contiene el producto

    // Agregar la animación 'backOutLeft' al producto
    productoElement.classList.add('animate__animated', 'animate__backOutLeft');
    
    // Esperar a que termine la animación antes de eliminar el producto
    setTimeout(() => {
        // Filtrar el carrito para eliminar el producto con el id especificado
        const nuevoCarrito = carritoGuardado.filter(item => item.id !== itemId);
        localStorage.setItem('cart', JSON.stringify(nuevoCarrito)); // Guardar el nuevo carrito en localStorage
        renderizarCarrito(); // Volver a renderizar el carrito
        updateCartBadge(); // Actualizar el badge
    }, 1000); // El tiempo de espera debe coincidir con la duración de la animación (ajusta según sea necesario)
}


// Vaciar carrito.
function vaciarCarrito() {
    const carritoElementos = document.querySelectorAll('#cart-items'); // Seleccionar todos los elementos del carrito

    // Agregar la animación a cada elemento
    carritoElementos.forEach((elemento) => {
        elemento.classList.add('animate__animated', 'animate__backOutDown'); // Añadir clases para la animación
    });

    // Esperar a que termine la animación antes de vaciar el carrito
    setTimeout(() => {
        localStorage.setItem('cart', JSON.stringify([])); // Vaciar el carrito en localStorage
        renderizarCarrito(); // Volver a renderizar el carrito
        updateCartBadge(); // Actualizar el badge
    }, 1000); // El tiempo de espera debe coincidir con la duración de la animación (ajusta según sea necesario)
}


// Eventos
DOMbotonVaciar.addEventListener('click', vaciarCarrito); // Añadir evento al botón de vaciar el carrito
 // Añadir evento al botón de vaciar el carrito

// Inicio
renderizarCarrito();


//entrega 7, parte 3, funcionalidad a la seccion de costos
// Elementos del DOM relacionados con los costos y el envío
const DOMshippingType = document.querySelector('#shipping-type'); 
const DOMsubtotal = document.querySelector('#subtotal'); 
const DOMshippingCost = document.querySelector('#shipping-cost'); 
const DOMtotalCost = document.querySelector('#total-cost'); 
const finalizeButton = document.querySelector('#finalize-purchase'); 
const DOMpaymentMethod = document.querySelector('#payment-method'); 
const DOMpaymentDetails = document.querySelector('#payment-details'); 

// Mostrar campos específicos según el método de pago seleccionado
document.getElementById("payment-method").addEventListener("change", function() {
    const paymentDetails = document.getElementById("payment-details");
    const creditCardFields = document.getElementById("credit-card-fields");
    const bankTransferFields = document.getElementById("bank-transfer-fields");

    // Muestra la sección de detalles de pago
    paymentDetails.style.display = "block";

    // Verifica la opción seleccionada en el método de pago y muestra los campos correspondientes
    if (this.value === "credit-card") {
        creditCardFields.style.display = "block"; // Muestra campos de tarjeta de crédito
        bankTransferFields.style.display = "none"; // Oculta campos de transferencia bancaria
    } else if (this.value === "bank-transfer") {
        creditCardFields.style.display = "none"; // Oculta campos de tarjeta de crédito
        bankTransferFields.style.display = "block"; // Muestra campos de transferencia bancaria
    } else {
        // Si no se selecciona ninguna opción, oculta toda la sección de detalles de pago
        paymentDetails.style.display = "none";
    }
});

// Función para calcular el subtotal de los productos en el carrito
function calculateSubtotal() {
    const carritoGuardado = JSON.parse(localStorage.getItem('cart')) || []; // Obtiene el carrito del localStorage o inicializa un array vacío

    // Recorre cada producto del carrito y calcula el subtotal basado en su cantidad y precio
    return carritoGuardado.reduce((sum, item) => {
        const cantidad = parseInt(document.querySelector(`.input-cantidad[data-id="${item.id}"]`).value, 10); // Obtiene la cantidad ingresada por el usuario
        let price = item.price * cantidad; // Calcula el precio total para la cantidad dada

        // Si el precio está en dólares, convierte a la moneda local
        if (item.currency === 'USD') {
            price *= conversionMoneda; 
        }
        return sum + price; 
    }, 0);
}

// Función para calcular el total incluyendo el costo de envío
function calculateTotal() {
    const subtotal = calculateSubtotal(); // Calcula el subtotal de los productos en el carrito
    const shippingCost = subtotal * parseFloat(DOMshippingType.value); // Calcula el costo de envío según el tipo seleccionado
    const total = subtotal + shippingCost; // Calcula el total sumando el subtotal y el costo de envío

    // Actualiza los valores en el HTML para mostrar el subtotal, el costo de envío y el total
    DOMsubtotal.textContent = subtotal.toFixed(2); 
    DOMshippingCost.textContent = shippingCost.toFixed(2); 
    DOMtotalCost.textContent = total.toFixed(2); 
}

// Cambios en el tipo de envío y recalcula el total cuando cambia
DOMshippingType.addEventListener('change', calculateTotal);

// Cambios en las cantidades de productos en el carrito y recalcula el total cuando cambian
document.querySelectorAll('.input-cantidad').forEach(input => {
    input.addEventListener('input', calculateTotal);
});

// Llamada inicial a calculateTotal() para calcular los costos en el momento de carga de la página
calculateTotal();
