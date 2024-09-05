// Carga el producto seleccionado desde localStorage
function loadProductInfo() {
    const selectedProductId = localStorage.getItem('selectedProductId');
    
    if (!selectedProductId) {
        console.error('No se encontró el ID del producto en localStorage');
        document.querySelector('.product-info').innerHTML = '<p>No se encontró el producto.</p>';
        return;
    }

    // URL de la API que contiene los productos. Ajusta esta URL según el ID seleccionado.
    const PRODUCTS_API_URL = "https://japceibal.github.io/emercado-api/products/" + selectedProductId + ".json";

    // Realiza una petición fetch para obtener los detalles del producto
    fetch(PRODUCTS_API_URL)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la respuesta de la red');
            }
            // Convierte la respuesta en JSON
            return response.json();
        })
        .then(data => {
            // Muestra la información del producto en la página
            displayProductInfo(data);
        })
        .catch(error => {
            console.error('Error al cargar los detalles del producto:', error);
            // Muestra un mensaje de error si falla la carga de los detalles
            document.querySelector('.product-info').innerHTML = '<p>Error al cargar los detalles del producto.</p>';
        });
}

// Muestra la información del producto en la página
function displayProductInfo(product) {
    // Asigna el nombre del producto al elemento correspondiente
    document.getElementById('product-name').textContent = `Nombre del Producto: ${product.name}`;
    
    // Asigna la descripción del producto al elemento correspondiente
    document.getElementById('product-description').textContent = `Descripción del Producto: ${product.description}`;
    
    // Asigna la categoría del producto al elemento correspondiente
    document.getElementById('category-name').textContent = product.category;
    
    // Asigna la cantidad vendida al elemento correspondiente
    document.getElementById('sold-quantity').textContent = product.soldCount;

    // Muestra las imágenes del producto
    const imagesContainer = document.getElementById('product-images-container');
    // Limpia el contenedor de imágenes antes de agregar nuevas
    imagesContainer.innerHTML = '';  

    // Recorre cada imagen del producto y la agrega al contenedor
    product.images.forEach(imageUrl => {
        const imgElement = document.createElement('img');
        imgElement.src = imageUrl;  // Asigna la URL de la imagen
        imgElement.className = 'product-image';  // Añade la clase CSS para estilo
        imgElement.alt = product.name;  // Asigna el nombre del producto como texto alternativo
        imagesContainer.appendChild(imgElement);  // Añade la imagen al contenedor
    });
}

// Llama a la función de carga de producto cuando la página esté lista
document.addEventListener('DOMContentLoaded', loadProductInfo);
