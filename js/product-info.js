// Carga el producto seleccionado desde localStorage
function loadProductInfo() {
    const selectedProductId = localStorage.getItem('selectedProductId');
    
    if (!selectedProductId) {
        console.error('No se encontró el ID del producto en localStorage');
        document.querySelector('.product-info').innerHTML = '<p>No se encontró el producto.</p>';
        return;
    }

    // URL de la API que contiene los productos
    const PRODUCTS_API_URL = "https://japceibal.github.io/emercado-api/products/" + selectedProductId + ".json";

    // Realiza una petición fetch para obtener los detalles del producto
    fetch(PRODUCTS_API_URL)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la respuesta de la red');
            }
            return response.json();
        })
        .then(data => {
            // Muestra la información del producto y productos relacionados
            displayProductInfo(data);
        })
        .catch(error => {
            console.error('Error al cargar los detalles del producto:', error);
            document.querySelector('.product-info').innerHTML = '<p>Error al cargar los detalles del producto.</p>';
        });
}

// Muestra la información del producto en la página
function displayProductInfo(product) {
    document.getElementById('product-name').textContent = `Nombre del Producto: ${product.name}`;
    document.getElementById('product-description').textContent = `Descripción del Producto: ${product.description}`;
    document.getElementById('category-name').textContent = product.category;
    document.getElementById('sold-quantity').textContent = product.soldCount;

    const imagesContainer = document.getElementById('product-images-container');
    imagesContainer.innerHTML = '';  

    product.images.forEach(imageUrl => {
        const imgElement = document.createElement('img');
        imgElement.src = imageUrl;  
        imgElement.className = 'product-image';  
        imgElement.alt = product.name;  
        imagesContainer.appendChild(imgElement);  
    });

    // Ahora llama a la función para mostrar productos relacionados
    displayRelatedProducts(product.relatedProducts);
}

// Función para mostrar los productos relacionados
function displayRelatedProducts(relatedProducts) {
    const relatedContainer = document.getElementById('related-products-list');
    relatedContainer.innerHTML = '';  

    if (!relatedProducts || relatedProducts.length === 0) {
        relatedContainer.innerHTML = '<p>No hay productos relacionados.</p>';
        return;
    }

    relatedProducts.forEach(product => {
        const productElement = document.createElement('div');
        productElement.className = 'related-product';
        productElement.setAttribute('data-id', product.id);

        const imgElement = document.createElement('img');
        imgElement.src = product.image;
        imgElement.className = 'related-product-image';
        imgElement.alt = product.name;

        const nameElement = document.createElement('p');
        nameElement.textContent = product.name;

        productElement.appendChild(imgElement);
        productElement.appendChild(nameElement);
        
        productElement.addEventListener('click', function() {
            localStorage.setItem('selectedProductId', product.id);  
            loadProductInfo();  
        });

        relatedContainer.appendChild(productElement);  
    });
}

// Llama a la función de carga de producto cuando la página esté lista
document.addEventListener('DOMContentLoaded', loadProductInfo);
