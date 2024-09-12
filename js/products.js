document.addEventListener('DOMContentLoaded', () => {
    // Referencias a los elementos del DOM
    const productsContainer = document.getElementById('products-container');
    const searchInput = document.getElementById('search-input');

    // Obtener el ID de cada categoría desde localStorage
    const categoryId = localStorage.getItem('catID');
    
    if (!categoryId) {
        productsContainer.innerHTML = '<p>ID de categoría no válido.</p>';
        return;
    }

    // Creación de una URL utilizando categoryId
    const PRODUCTS_API_URL = `https://japceibal.github.io/emercado-api/cats_products/${categoryId}.json`;
    
    // Variable para almacenar los productos
    let products = [];

    // Función para obtener los productos desde la API
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
                    products = data.products;
                    displayProducts(products); // Muestra los productos obtenidos
                    initializeFilterAndSortControls(products); // Inicializa los controles de filtrado y ordenamiento
                } else {
                    productsContainer.innerHTML = '<p>No se encontraron productos.</p>';
                }
            })
            .catch(error => {
                console.error('Error al obtener productos:', error);
                productsContainer.innerHTML = '<p>Error al cargar productos. Inténtalo de nuevo más tarde.</p>';
            });
    }

    // Función para mostrar los productos en el contenedor
    function displayProducts(productsToDisplay) {
        if (!productsToDisplay || !productsToDisplay.length) {
            productsContainer.innerHTML = '<p>No se encontraron productos.</p>';
            return;
        }

        productsContainer.innerHTML = ''; // Limpia el contenedor antes de agregar los productos

        productsToDisplay.forEach(product => {
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
                        <a href="#" class="btn btn-secondary">Ver detalles</a>
                    </div>
                </div>
            `;
            productsContainer.appendChild(productCard);
        });
    }

    // Función para filtrar productos según el nombre
    function filterProducts(query) {
        if (!query) {
            displayProducts(products);
            return;
        }

        const filteredProducts = products.filter(product =>
            product.name.toLowerCase().includes(query.toLowerCase())
        );

        displayProducts(filteredProducts);
    }

    // Añade un evento para filtrar los productos cuando el usuario escribe en el campo de búsqueda
    searchInput.addEventListener('input', () => {
        filterProducts(searchInput.value);
    });

    // Añade un evento para redirigir al usuario a la página de detalles del producto cuando hace clic en "Ver detalles"
    productsContainer.addEventListener('click', (event) => {
        const target = event.target;
        if (target.closest('.btn')) {
            const productDiv = target.closest('.product');
            if (productDiv) {
                const productId = productDiv.getAttribute('data-product-id');
                localStorage.setItem('selectedProductId', productId); // Guarda el ID del producto en localStorage
                window.location.href = 'product-info.html'; // Redirige a la página de detalles del producto
            }
        }
    });

    function initializeFilterAndSortControls(products) {
        // Filtro de productos por rango de precio
        document.getElementById('filter-btn').addEventListener('click', () => {
            const minPrice = parseFloat(document.getElementById('min-price').value) || 0;
            const maxPrice = parseFloat(document.getElementById('max-price').value) || Infinity;
    
            const filteredProducts = products.filter(product => {
                return product.cost >= minPrice && product.cost <= maxPrice;
            });
    
            displayProducts(filteredProducts);
        });
    
        // Ordenar productos por precio ascendente
        document.getElementById('sort-price-asc').addEventListener('click', () => {
            const sortedProducts = [...products].sort((a, b) => a.cost - b.cost);
            displayProducts(sortedProducts);
        });
    
        // Ordenar productos por precio descendente
        document.getElementById('sort-price-desc').addEventListener('click', () => {
            const sortedProducts = [...products].sort((a, b) => b.cost - a.cost);
            displayProducts(sortedProducts);
        });
    
        // Ordenar productos por relevancia (vendidos) descendente
        document.getElementById('sort-relevance-desc').addEventListener('click', () => {
            const sortedProducts = [...products].sort((a, b) => b.soldCount - a.soldCount);
            displayProducts(sortedProducts);
        });
    
        // Botón para limpiar los filtros
        document.getElementById('clearRangeFilter').addEventListener('click', () => {
            // Restablece los campos de entrada a sus valores predeterminados
            document.getElementById('min-price').value = '';
            document.getElementById('max-price').value = '';
    
            // Muestra todos los productos
            displayProducts(products);
        });
    }
    
    // Llama a la función para obtener y mostrar los productos al cargar la página
    fetchProducts();
});