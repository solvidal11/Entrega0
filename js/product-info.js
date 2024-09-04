document.addEventListener('DOMContentLoaded', () => {
    const productId = localStorage.getItem('selectedProductId');

    if (!productId) {
        window.location.href = 'products.html';
        return;
    }

    const fetchProductInfo = async (id) => {
        try {
            const response = await fetch(`https://api.example.com/products/${id}`);
            if (!response.ok) {
                throw new Error('Error en la solicitud');
            }
            const product = await response.json();

            document.getElementById('product-name').textContent = product.name;
            document.getElementById('product-description').textContent = product.description;
            document.getElementById('category-name').textContent = product.category;
            document.getElementById('sold-quantity').textContent = product.sold;

            const imagesContainer = document.getElementById('product-images-container');
            imagesContainer.innerHTML = '';

            product.images.forEach(imageUrl => {
                const img = document.createElement('img');
                img.src = imageUrl;
                img.alt = 'Imagen del producto';
                imagesContainer.appendChild(img);
            });
        } catch (error) {
            console.error('Error al obtener la información del producto:', error);
        }
    };

    fetchProductInfo(productId);
});
