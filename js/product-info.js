document.addEventListener('DOMContentLoaded', () => {
    // Obtiene el ID del producto almacenado en el localStorage
    const productId = localStorage.getItem('selectedProductId');

    // Si no hay un ID de producto, redirige al usuario a la página de productos
    if (!productId) {
        window.location.href = 'products.html';
        return;
    }

    // Función asíncrona para obtener la información del producto desde una API
    const fetchProductInfo = async (id) => {
        try {
            // Realiza la solicitud a la API para obtener los datos del producto basado en su ID
            const response = await fetch(`https://api.example.com/products/${id}`);
            
            // Si la respuesta no es exitosa, lanza un error
            if (!response.ok) {
                throw new Error('Error en la solicitud');
            }

            // Convierte la respuesta de la API en un objeto JSON con la información del producto
            const product = await response.json();

            // Si el producto fue encontrado, procede a mostrar sus datos en la página
            if (product) {
                // Actualiza el contenido del elemento HTML con el nombre del producto
                document.getElementById('product-name').textContent = product.name || 'Nombre no disponible';

                // Actualiza el contenido del elemento HTML con la descripción del producto
                document.getElementById('product-description').textContent = product.description || 'Descripción no disponible';

                // Actualiza el contenido del elemento HTML con el nombre de la categoría del producto
                document.getElementById('catName').textContent = product.catName || 'Categoría no disponible';

                // Actualiza el contenido del elemento HTML con la cantidad de unidades vendidas del producto
                document.getElementById('sold-quantity').textContent = product.soldCount || 'Cantidad no disponible';

                // Obtiene el contenedor de las imágenes del producto
                const imagesContainer = document.getElementById('image');
                imagesContainer.innerHTML = ''; // Limpia el contenido anterior del contenedor de imágenes

                // Si hay imágenes disponibles del producto, crea elementos <img> y agrégalos al contenedor
                if (product.images && product.images.length > 0) {
                    product.images.forEach(imageUrl => {
                        const img = document.createElement('img'); // Crea un nuevo elemento <img>
                        img.src = imageUrl; // Asigna la URL de la imagen
                        img.alt = 'Imagen del producto'; // Añade un texto alternativo a la imagen
                        imagesContainer.appendChild(img); // Agrega la imagen al contenedor
                    });
                } else {
                    // Si no hay imágenes, muestra un mensaje indicando la falta de imágenes
                    imagesContainer.textContent = 'No hay imágenes disponibles';
                }
            } else {
                // Si no se encuentra el producto, muestra un mensaje en la consola
                console.error('No se encontró el producto');
            }
        } catch (error) {
            // Si ocurre un error durante la solicitud, lo muestra en la consola
            console.error('Error al obtener la información del producto:', error);
        }
    };

    // Llama a la función fetchProductInfo pasando el ID del producto obtenido del localStorage
    fetchProductInfo(productId);
});
