document.addEventListener('DOMContentLoaded', () => {
    const productsContainer = document.getElementById('products-container');
    
    // Obtener el ID de cada categoría desde localStorage
    const categoryId = localStorage.getItem('catID');
    
    if (!categoryId) {
        productsContainer.innerHTML = '<p>ID de categoría no válido.</p>';
        return;
    }

    // URL para obtener los productos
    const URL = `https://japceibal.github.io/emercado-api/cats_products/${categoryId}.json`;

    function fetchProducts() {
        fetch(URL)
            .then(response => response.json())
            .then(data => {
                if (data && data.products) {
                    displayProducts(data.products);  // Mostrar los productos
                    initializeFilterAndSortControls(data.products);  // Inicializar controles
                } else {
                    productsContainer.innerHTML = '<p>No se encontraron productos.</p>';
                }
            })
            .catch(error => {
                console.error('Error al obtener productos:', error);
                productsContainer.innerHTML = '<p>Error al cargar productos. Inténtalo de nuevo más tarde.</p>';
            });
    }

    function displayProducts(products) {
        if (!products || !products.length) {
            productsContainer.innerHTML = '<p>No se encontraron productos.</p>';
            return;
        }

        productsContainer.innerHTML = ''; // Limpiar contenedor antes de agregar productos

        products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            productCard.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h2>${product.name}</h2>
                <p>${product.description}</p>
                <p><strong>Precio:</strong> ${product.cost} ${product.currency}</p>
                <p><strong>Vendidos:</strong> ${product.soldCount}</p>
            `;
            productsContainer.appendChild(productCard);
        });
    }

    // Función para inicializar los controles de filtro y orden
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
    }

    // Inicializar la carga de productos
    fetchProducts();
});
