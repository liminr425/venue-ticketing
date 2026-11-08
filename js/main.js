let currentInspectedSeat=null;
document.addEventListener("DOMContentLoaded",function () {
    if (typeof loadCart === "function") {
        loadCart();
    }

    renderVenue();

    if (typeof setupMapControls === "function") {
        setupMapControls();
    }


    const map=document.querySelector(".map-container");
    const detailsPanel=document.getElementById("details-panel");
    const seatInfo=document.getElementById("seat-info");
    const seatPrice=document.getElementById("seat-price");
    const addToCartBtn=document.getElementById("add-to-cart");

    map.addEventListener("click", function (event){
        const clickedElement=event.target;

        if(!clickedElement.classList.contains("seat")) return;
        if(clickedElement.classList.contains("unavailable")) return;
        if(clickedElement.classList.contains("in-cart")) return;
        if(currentInspectedSeat !== null){
            currentInspectedSeat.classList.remove("inspected");
        }
        clickedElement.classList.add("inspected");
        currentInspectedSeat=clickedElement;

        const seatId = clickedElement.dataset.id;
        const seatData=SEATS.find(function(seat){
            return seat.id===seatId;
        });
        detailsPanel.classList.remove("hidden");
        seatInfo.innerHTML= "<strong>" + seatData.sectionName + "</strong><br>" +
            "Row " + seatData.row + ", Seat " + seatData.seatNumber + "<br>" +
            "Category " + seatData.category + " (" + seatData.categoryLabel + ")";

        seatPrice.textContent="$"+seatData.price;
        addToCartBtn.disabled=false;
    });
    addToCartBtn.addEventListener("click", function() {
        if (currentInspectedSeat === null) return;

        const seatId = currentInspectedSeat.dataset.id;

        const isAlreadyInCart = cart.some(function(item) { return item.id === seatId; });
        if (isAlreadyInCart) {
            alert("This seat is already in your cart!");
            return;
        }
        const seatData = SEATS.find(function(s) { return s.id === seatId; });
        cart.push(seatData);

        currentInspectedSeat.classList.remove("inspected");
        currentInspectedSeat.classList.add("in-cart");
        currentInspectedSeat.disabled = true;
        currentInspectedSeat = null;
        detailsPanel.classList.add("hidden");

        renderCart();
    });
});