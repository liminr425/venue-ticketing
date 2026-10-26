function renderVenue() {
    const mapArea = document.getElementById("map-area");
    mapArea.innerHTML = "";

    const map = document.createElement("div");
    map.className = "map-container";
    map.style.width = VENUE.canvas.width + "px";
    map.style.height = VENUE.canvas.height + "px";

    const stage = document.createElement("div");
    stage.className = "stage";
    stage.textContent = VENUE.stage.label;
    stage.style.left = VENUE.stage.x + "px";
    stage.style.top = VENUE.stage.y + "px";
    stage.style.width = VENUE.stage.width + "px";
    stage.style.height = VENUE.stage.height + "px";
    map.appendChild(stage);

    const catwalk = document.createElement("div");
    catwalk.className = "catwalk";
    catwalk.style.left = VENUE.catwalk.x + "px";
    catwalk.style.top = VENUE.catwalk.y + "px";
    catwalk.style.width = VENUE.catwalk.width + "px";
    catwalk.style.height=VENUE.catwalk.height+"px";
    map.appendChild(catwalk);

    for (let i=0;i < SEATS.length;i++){
        const seatData=SEATS[i];
        const seatBtn = document.createElement("button");
        seatBtn.className="seat cat-" + seatData.category;

        if(!seatData.available){
            seatBtn.classList.add("unavailable");
            seatBtn.disabled =true;
        }
        seatBtn.style.left=seatData.x+"px";
        seatBtn.style.top=seatData.y+"px";
        seatBtn.style.width=VENUE.seat.size+"px";
        seatBtn.style.height=VENUE.seat.size+"px";

        seatBtn.dataset.id=seatData.id;
        seatBtn.title=seatData.sectionName+", Row"+seatData.row+", Seat"+seatData.seatNumber;
        map.appendChild(seatBtn);
    }
    mapArea.appendChild(map);
}