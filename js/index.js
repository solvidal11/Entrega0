document.addEventListener("DOMContentLoaded", function() {
    // Manejo de navegación por categorías
    document.getElementById("autos")?.addEventListener("click", function() {
        localStorage.setItem("catID", 101);
        window.location.href = "products.html";
    });
    
    document.getElementById("juguetes")?.addEventListener("click", function() {
        localStorage.setItem("catID", 102);
        window.location.href = "products.html";
    });
    
    document.getElementById("muebles")?.addEventListener("click", function() {
        localStorage.setItem("catID", 103);
        window.location.href = "products.html";
    });
});
