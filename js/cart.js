// ==========================================
// VAULT
// CART.JS
// ==========================================

const cartOverlay = document.getElementById("cartOverlay");
const closeCart = document.getElementById("closeCart");
const cartIcon = document.querySelector(".bi-bag");

const cartItems = document.querySelector(".cart-items");
const cartTotal = document.getElementById("cartTotal");

let cart = [];

// ================= ABRIR =================

cartIcon.addEventListener("click",()=>{

    cartOverlay.classList.add("active");

});

// ================= CERRAR =================

closeCart.addEventListener("click",()=>{

    cartOverlay.classList.remove("active");

});

cartOverlay.addEventListener("click",(e)=>{

    if(e.target===cartOverlay){

        cartOverlay.classList.remove("active");

    }

});

// ================= BOTONES =================

document.querySelectorAll(".add-cart").forEach(button=>{

    button.addEventListener("click",()=>{

        const nombre=button.dataset.name;

        const precio=Number(button.dataset.price);

        const producto=cart.find(item=>item.name===nombre);

        if(producto){

            producto.quantity++;

        }else{

            cart.push({

                name:nombre,

                price:precio,

                quantity:1

            });

        }

        updateCart();

    });

});

// ================= ACTUALIZAR =================

function updateCart(){

    cartItems.innerHTML="";

    let total=0;

    if(cart.length===0){

        cartItems.innerHTML="<p class='empty-cart'>Tu carrito está vacío.</p>";

    }

    cart.forEach((item,index)=>{

        total+=item.price*item.quantity;

        cartItems.innerHTML+=`

        <div class="cart-product">

            <h4>${item.name}</h4>

            <p>$${item.price}</p>

            <div class="cart-controls">

                <button onclick="decrease(${index})">-</button>

                <span>${item.quantity}</span>

                <button onclick="increase(${index})">+</button>

                <button onclick="removeItem(${index})">

                    🗑

                </button>

            </div>

        </div>

        `;

    });

    cartTotal.textContent="$"+total;

}

// ================= AUMENTAR =================

function increase(index){

    cart[index].quantity++;

    updateCart();

}

// ================= DISMINUIR =================

function decrease(index){

    cart[index].quantity--;

    if(cart[index].quantity<=0){

        cart.splice(index,1);

    }

    updateCart();

}

// ================= ELIMINAR =================

function removeItem(index){

    cart.splice(index,1);

    updateCart();

}