document.addEventListener('DOMContentLoaded', () => {
    const productsContainer = document.getElementById('products-container');
    const PRODUCTS_URL = "https://japceibal.github.io/emercado-api/cats_products/";
    const CATEGORIES_URL = "https://japceibal.github.io/emercado-api/cats/cat.json";

    // Función para obtener y mostrar productos de la categoría 101
    async function fetchProducts() {
        const apiUrl = `${PRODUCTS_URL}101.json`; // URL para productos de la categoría 101
        const productsResult = await getJSONData(apiUrl); // Usa la función para obtener datos JSON
        if (productsResult.status === 'ok') {
            renderProducts(productsResult.data.products); // Muestra los productos
        } else {
            console.error('Error al cargar productos:', productsResult.data);
        }
    }

    // Renderizar productos
    function renderProducts(products) {
        productsContainer.innerHTML = ''; // Limpiar contenedor
        products.forEach(product => {
            console.log(product); // Inspeccionar los datos
            
            // Ajustar las propiedades según la estructura de datos
            const productCard = document.createElement('div');
            productCard.className = 'product-card col-md-4';
            productCard.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h2>${product.name}</h2>
                <p><strong>Precio:</strong> $${product.cost}</p>
                <p><strong>Descripción:</strong> ${product.description || 'No disponible'}</p>
                <p><strong>Cantidad Vendidos:</strong> ${product.soldCount || 'No disponible'}</p>
            `;
            productsContainer.appendChild(productCard);
        });
    }

    // Inicializar carga de productos
    fetchProducts();
});
