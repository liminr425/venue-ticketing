let cart=[];

function renderCart(){
    const cartItemDiv = document.getElementById("cart-items");
    const cartTotalSpan = document.getElementById("cart-total");

    cartItemDiv.innerHTML = "";
    let total = 0;

    if(cart.length === 0){
        cartItemDiv.innerHTML = "<p style='color: #647295; font-size: 0.9rem;'>Your cart is empty.</p>";
    }else{
        cart.forEach(function(seat) {
            total += seat.price;

            const itemDiv = document.createElement("div");
            itemDiv.className = "cart-item";
            itemDiv.innerHTML = `<div class= "cart-item-info">
                               <strong>${seat.sectionName}</strong>
                               Row${seat.row}, Seat${seat.seatNumber} ($${seat.price})
                               </div>
                               <button class="remove-btn" onclick="removeFromCart('${seat.id}')">✕</button>`;
            cartItemDiv.appendChild(itemDiv);
        });
    }
    cartTotalSpan.textContent ="$"+total;
}
function removeFromCart(seatId){
    cart=cart.filter(function(seat){
        return seat.id !== seatId;
    });
    const seatElement = document.querySelector(`.seat[data-id="${seatId}"]`);
    if (seatElement){
        seatElement.classList.remove("in-cart");
        seatElement.disabled=false;
    }
    renderCart();
}