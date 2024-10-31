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
    const divisa = '$';
    document.getElementById('product-name').textContent = `Nombre del Producto: ${product.name}`;
    document.getElementById('product-description').textContent = `Descripción del Producto: ${product.description}`;
    document.getElementById('category-name').textContent = product.category;
    document.getElementById('sold-quantity').textContent = product.soldCount;
    document.getElementById('cost-quantity').textContent = 'Precio: ${product.cost}';

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

let selectedRating = 0; // Almacena la calificación seleccionada

// Manejo de la selección de estrellas
document.querySelectorAll('.star').forEach(star => {
    star.addEventListener('click', function() {
        selectedRating = this.getAttribute('data-score');
        highlightStars(selectedRating);
        document.getElementById('rating-value').textContent = `Calificación seleccionada: ${selectedRating}`;
    });
});

// Función para resaltar las estrellas hasta la calificación seleccionada
function highlightStars(rating) {
    document.querySelectorAll('.star').forEach(star => {
        const starScore = star.getAttribute('data-score');
        if (starScore <= rating) {
            star.querySelector('i').classList.add('selected');
        } else {
            star.querySelector('i').classList.remove('selected');
        }
    });
}

// Función para cargar los comentarios del producto (tanto desde la API como de localStorage)
function loadProductComments() {
    const selectedProductId = localStorage.getItem('selectedProductId');
    
    if (!selectedProductId) {
        console.error('No se encontró el ID del producto en localStorage');
        document.querySelector('#comments-section').innerHTML = '<p>No se encontraron comentarios para este producto.</p>';
        return;
    }

    const COMMENTS_API_URL = "https://japceibal.github.io/emercado-api/products_comments/" + selectedProductId + ".json";

    // Realiza una petición fetch para obtener los comentarios del producto
    fetch(COMMENTS_API_URL)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la respuesta de la red');
            }
            return response.json();
        })
        .then(apiComments => {
            const localComments = getLocalComments(selectedProductId);
            const allComments = [...apiComments, ...localComments];
            displayProductComments(allComments);
        })
        .catch(error => {
            console.error('Error al cargar los comentarios del producto:', error);
            document.querySelector('#comments-section').innerHTML = '<p>Error al cargar los comentarios del producto.</p>';
        });
}

// Función para mostrar los comentarios en la página
function displayProductComments(comments) {
    const commentsContainer = document.getElementById('comments-section');
    commentsContainer.innerHTML = ''; // Limpia el contenedor

    if (comments.length === 0) {
        commentsContainer.innerHTML = '<p>No hay comentarios para este producto.</p>';
        return;
    }

    comments.forEach(comment => {
        const commentElement = document.createElement('div');
        commentElement.classList.add('comment');

        commentElement.innerHTML = `
            <p><strong>Calificación:</strong> ${comment.score} / 5</p>
            <p><strong>Comentario:</strong> ${comment.description}</p>
            <p><strong>Usuario:</strong> ${comment.user}</p>
            <p><strong>Fecha:</strong> ${comment.dateTime}</p>
        `;

        commentsContainer.appendChild(commentElement);
    });
}

// Función para manejar el envío de nuevos comentarios desde el formulario
function handleCommentSubmission() {
    const selectedProductId = localStorage.getItem('selectedProductId');
    if (!selectedProductId) {
        console.error('No se encontró el ID del producto en localStorage');
        return;
    }

    const userName = document.getElementById('name').value;
    const userMessage = document.getElementById('msg').value;

    if (!userName || !userMessage || selectedRating === 0) {
        alert('Por favor completa todos los campos y selecciona una calificación');
        return;
    }

    // Crear un nuevo comentario con la calificación seleccionada
    const newComment = {
        product: selectedProductId,
        score: selectedRating,
        description: userMessage,
        user: userName,
        dateTime: new Date().toLocaleString() // Fecha y hora actuales
    };

    // Guarda el comentario en localStorage
    saveLocalComment(selectedProductId, newComment);

    // Limpia los campos del formulario
    document.getElementById('name').value = '';
    document.getElementById('msg').value = '';
    selectedRating = 0; // Reinicia la calificación
    highlightStars(0); // Reinicia el resalte de estrellas

    // Vuelve a cargar los comentarios incluyendo el nuevo
    loadProductComments();
}

// Función para obtener los comentarios almacenados en localStorage para un producto
function getLocalComments(productId) {
    const comments = JSON.parse(localStorage.getItem(`comments_${productId}`)) || [];
    return comments;
}

// Función para guardar un comentario en localStorage
function saveLocalComment(productId, comment) {
    const comments = getLocalComments(productId);
    comments.push(comment);
    localStorage.setItem(`comments_${productId}`, JSON.stringify(comments));
}

//Funcion para darle funcionalidad a los botones de noche y dia
const themeLight = document.getElementById('themeLight');
const themeDark = document.getElementById('themeDark');
    
// Función para cambiar el tema
function setTheme(theme) {
    document.body.classList.remove('light-theme', 'dark-theme');
    document.body.classList.add(theme + '-theme');
    localStorage.setItem('theme', theme);
}

// Escuchar cambios en los botones de radio
themeLight.addEventListener('change', () => setTheme('light'));
themeDark.addEventListener('change', () => setTheme('dark'));


// Asigna el evento de click al botón de enviar
document.querySelector('.btn-enviar').addEventListener('click', handleCommentSubmission);

// Carga los detalles del producto y los comentarios cuando la página está lista
document.addEventListener('DOMContentLoaded', function() {
    loadProductInfo();
    loadProductComments();
    
    // Cargar tema guardado
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    if (savedTheme === 'dark') {
        themeDark.checked = true;
    } else {
        themeLight.checked = true;
    }
});


document.addEventListener('DOMContentLoaded', async () => {
  
    // // Obtener el ID del producto desde la URL
    const productID = localStorage.getItem('selectedProductId');

    if (productID) {
        try {
            // Llama a la API para obtener los datos del producto
            const response = await fetch(`https://japceibal.github.io/emercado-api/products/${productID}.json`);
            
            if (!response.ok) throw new Error("No se pudo obtener la información del producto.");
            
            const product = await response.json();
            localStorage.setItem('costoProducto', product.cost);

            // Mostrar la información del producto en la página
            document.getElementById('product-name').textContent = product.name;
            document.getElementById('product-description').textContent = product.description;
            document.getElementById('product-category').textContent = `Categoría: ${product.category}`;
            document.getElementById('product-sold').textContent = `Cantidad Vendida: ${product.soldCount}`;
            document.getElementById('cost-quantity').textContent = `Precio: ${product.cost} ${product.currency}`;

            // Mostrar imágenes del producto
            const imagesContainer = document.getElementById('product-images-container');
            product.images.forEach(imgUrl => {
                const imgElement = document.createElement('img');
                imgElement.src = imgUrl;
                imgElement.classList.add('product-image');
                imagesContainer.appendChild(imgElement);
            });
            
            // Vincular la funcionalidad al botón "Comprar"
            document.getElementById('buyButton').addEventListener('click', () => {
                const cartItem = {
                    id: product.id,
                    name: product.name,
                    price: product.cost,
                    quantity: 1,
                    image: product.images[0],
                    currency: product.currency
                };
            
                const carritoGuardado = JSON.parse(localStorage.getItem('cart')) || [];
                
                // Verificar si el producto ya está en el carrito
                const existingItemIndex = carritoGuardado.findIndex(item => item.id === cartItem.id);
                
                if (existingItemIndex !== -1) {
                    // Si el producto ya está en el carrito, incrementar la cantidad
                    carritoGuardado[existingItemIndex].quantity += 1;
                } else {
                    // Si no, agregar el nuevo producto al carrito
                    carritoGuardado.push(cartItem);
                }
                
                localStorage.setItem('cart', JSON.stringify(carritoGuardado));
                console.log("Producto guardado en el carrito:", cartItem);
                window.location.href = 'cart.html';
            });
            

        } catch (error) {
            console.error("Error al obtener el producto:", error);
        }
    } else {
        console.error('No se encontró el ID del producto en la URL.');
    }
});
