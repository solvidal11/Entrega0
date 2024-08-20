document.addEventListener('DOMContentLoaded', () => {
    const productsContainer = document.getElementById('products-container');
    const Autos = "https://japceibal.github.io/emercado-api/cats_products/101.json"; // json de cat autos

    // Función para obtener datos JSON
    async function getJSONData(url) {
        try {
            const response = await fetch(url);
            const data = await response.json();
            return { status: 'ok', data };
        } catch (error) {
            console.error('Error al obtener datos JSON:', error);
            return { status: 'error', data: null };
        }
    }

    // Función para obtener y mostrar productos de la categoría 101
    async function fetchProducts() {
        const productsResult = await getJSONData(Autos); // Usa la función para obtener datos JSON
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
