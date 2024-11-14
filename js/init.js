const CATEGORIES_URL = "https://japceibal.github.io/emercado-api/cats/cat.json";
const PUBLISH_PRODUCT_URL = "https://japceibal.github.io/emercado-api/sell/publish.json";
const PRODUCTS_URL = "https://japceibal.github.io/emercado-api/cats_products/";
const PRODUCT_INFO_URL = "https://japceibal.github.io/emercado-api/products/";
const PRODUCT_INFO_COMMENTS_URL = "https://japceibal.github.io/emercado-api/products_comments/";
const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/";
const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json";
const EXT_TYPE = ".json";

let showSpinner = function() {
    document.getElementById("spinner-wrapper").style.display = "block";
};

let hideSpinner = function() {
    document.getElementById("spinner-wrapper").style.display = "none";
};

let getJSONData = function(url) {
    let result = {};
    showSpinner();
    return fetch(url)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw Error(response.statusText);
            }
        })
        .then(function(response) {
            result.status = 'ok';
            result.data = response;
            hideSpinner();
            return result;
        })
        .catch(function(error) {
            result.status = 'error';
            result.data = error;
            hideSpinner();
            return result;
        });
};


// El desafiate lo puse aquí, ya que init.js se muestra en muchísimos de los HTML
// Función para actualizar el badge del carrito
function updateCartBadge() {
    let carritoGuardado = JSON.parse(localStorage.getItem('cart')) || [];
    let totalQuantity = carritoGuardado.reduce((total, item) => total + item.quantity, 0);

    const badgeElement = document.getElementById('cart-badge'); 
    if (totalQuantity > 0) {
        badgeElement.textContent = totalQuantity;
        badgeElement.classList.remove('d-none');
    } else {
        badgeElement.textContent = '';
        badgeElement.classList.add('d-none');
    }
}

// Llama a esta función al cargar la página
document.addEventListener('DOMContentLoaded', updateCartBadge);
