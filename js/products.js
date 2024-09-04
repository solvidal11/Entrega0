document.addEventListener('DOMContentLoaded', () => {
    const productsContainer = document.getElementById('products-container');
    const PRODUCTS_API_URL = "https://japceibal.github.io/emercado-api/cats_products/101.json"; // URL del JSON de productos

    // Función para obtener productos de la API
    function fetchProducts() {
        fetch(PRODUCTS_API_URL)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                if (data && data.products) {
                    displayProducts(data.products); // Llama a la función para mostrar los productos
                } else {
                    console.error('Datos de productos no encontrados o estructura inesperada:', data);
                    productsContainer.innerHTML = '<p>No se encontraron productos.</p>';
                }
            })
            .catch(error => {
                console.error('Error al obtener productos:', error);
                productsContainer.innerHTML = '<p>Error al cargar productos. Inténtalo de nuevo más tarde.</p>';
            });
    }

    // Función para mostrar productos en el contenedor
    function displayProducts(products) {
        if (!products || !products.length) {
            productsContainer.innerHTML = '<p>No se encontraron productos.</p>';
            return;
        }

        productsContainer.innerHTML = ''; // Limpiar contenedor antes de agregar productos

        products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'col-md-4 mb-4 product'; 
            productCard.setAttribute('data-product-id', product.id);
            productCard.innerHTML = `
                <div class="card">
                    <img src="${product.image}" class="card-img-top" alt="${product.name}">
                    <div class="card-body">
                        <h5 class="card-title">${product.name}</h5>
                        <p class="card-text">${product.description}</p>
                        <p><strong>Precio:</strong> ${product.cost} ${product.currency}</p>
                        <p><strong>Vendidos:</strong> ${product.soldCount}</p>
                        <a href="#" class="btn btn-primary">Ver detalles</a>
                    </div>
                </div>
            `;
            productsContainer.appendChild(productCard);
        });
    }

    // Inicializar la carga de productos
    fetchProducts();

    // Manejar el clic en un producto
    productsContainer.addEventListener('click', (event) => {
        const target = event.target;
        if (target.closest('.btn')) {
            const productDiv = target.closest('.product');
            if (productDiv) {
                const productId = productDiv.getAttribute('data-product-id');
                localStorage.setItem('selectedProductId', productId);
                window.location.href = 'product-info.html';
            }
        }
    });
});
