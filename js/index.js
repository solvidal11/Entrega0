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

    document.getElementById("herramientas")?.addEventListener("click", function() {
        localStorage.setItem("catID", 104);
        window.location.href = "products.html";
    });
    document.getElementById("computadoras")?.addEventListener("click", function() {
        localStorage.setItem("catID", 105);
        window.location.href = "products.html";
    });
    document.getElementById("vestimenta")?.addEventListener("click", function() {
        localStorage.setItem("catID", 106);
        window.location.href = "products.html";
    });
    document.getElementById("electrodomesticos")?.addEventListener("click", function() {
        localStorage.setItem("catID", 107);
        window.location.href = "products.html";
    });
    document.getElementById("deporte")?.addEventListener("click", function() {
        localStorage.setItem("catID", 108);
        window.location.href = "products.html";
    });
    document.getElementById("celulares")?.addEventListener("click", function() {
        localStorage.setItem("catID", 109);
        window.location.href = "products.html";
    });
});

