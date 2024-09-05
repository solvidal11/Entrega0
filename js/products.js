document.addEventListener('DOMContentLoaded', () => {
    const productsContainer = document.getElementById('products-container');   
    const searchInput = document.getElementById('search-input');
    // Obtener el ID de cada categoría desde localStorage (muestra en letra de entrega)
    const categoryId = localStorage.getItem('catID');
    
    // Verificar si ese valor de categoryId existe y si un número válido (van desde 101 a 109)
    if (!categoryId) {
        productsContainer.innerHTML = '<p>ID de categoría no válido.</p>';
        return;
    }

    // Creacion de una URL utilizando categoryId, y no las urls de cada categoria por separado (repeticion de codigo)
    const URL = `https://japceibal.github.io/emercado-api/cats_products/${categoryId}.json`;
    const PRODUCTS_API_URL = "https://japceibal.github.io/emercado-api/cats_products/101.json"; // URL del JSON de productos


    let products = [];

    function fetchProducts() {
        fetch(URL)
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
                    displayProducts(products); // Llama a la función para mostrar los productos
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

    function displayProducts(productsToDisplay) {
        if (!productsToDisplay || !productsToDisplay.length) {
            productsContainer.innerHTML = '<p>No se encontraron productos.</p>';
            return;
        }

        productsContainer.innerHTML = ''; // Limpiar contenedor antes de agregar productos

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

    // Inicializar la carga de productos correspondiente a cada categoria
    function filterProducts(query) {
        if (!query) {
            displayProducts(products);
            return;
        }

        const filteredProducts = products.filter(product =>
            product.name.toLowerCase().includes(query.toLowerCase()) ||
            product.description.toLowerCase().includes(query.toLowerCase())
        );

        displayProducts(filteredProducts);
    }

    searchInput.addEventListener('input', () => {
        filterProducts(searchInput.value);
    });

    fetchProducts();

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
})
