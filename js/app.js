// ======================================================
// VAULT
// APP.JS
// ======================================================

// ===================== BUSCADOR =====================

const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");

if (searchBtn && searchInput) {

    searchBtn.addEventListener("click", () => {

        const texto = searchInput.value.trim();

        if (texto === "") {

            alert("Escribe el nombre de un sneaker.");

        } else {

            alert("Buscando: " + texto);

        }

    });

}

// ===================== HEADER =====================

const header = document.querySelector("header");

window.addEventListener("scroll", () => {

    if(window.scrollY > 40){

        header.classList.add("scrolled");

    }else{

        header.classList.remove("scrolled");

    }

});

// ===================== BOTONES DEL CARRITO =====================

const botones = document.querySelectorAll(".card .btn");

botones.forEach((boton)=>{

    boton.addEventListener("click",()=>{

        alert("Producto agregado al carrito.");

    });

});