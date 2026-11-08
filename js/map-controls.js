let mapZoom = 1;
let mapX = 0;
let mapY = 0;

const MIN_ZOOM = 0.5;
const MAX_ZOOM = 2;
const ZOOM_STEP = 0.2;
const PAN_STEP = 50;

function updateMapTransform() {
    const map = document.querySelector(".map-container");
    if (!map) return;
    map.style.transformOrigin = "top left";
    map.style.transform = `translate(${mapX}px, ${mapY}px) scale(${mapZoom})`;
}

function setupMapControls() {
    function on(id, handler) {
        const el = document.getElementById(id);
        if (el) el.addEventListener("click", handler);
        else console.warn("Missing button: #" + id);
    }

    on("zoom-in", function () {
        mapZoom = Math.min(MAX_ZOOM, Math.round((mapZoom + ZOOM_STEP) * 10) / 10);
        updateMapTransform();
    });
    on("zoom-out", function () {
        mapZoom = Math.max(MIN_ZOOM, Math.round((mapZoom - ZOOM_STEP) * 10) / 10);
        updateMapTransform();
    });
    on("pan-up",    function () { mapY -= PAN_STEP; updateMapTransform(); });
    on("pan-down",  function () { mapY += PAN_STEP; updateMapTransform(); });
    on("pan-left",  function () { mapX -= PAN_STEP; updateMapTransform(); });
    on("pan-right", function () { mapX += PAN_STEP; updateMapTransform(); });
    on("reset-view", function () {
        mapZoom = 1; mapX = 0; mapY = 0;
        updateMapTransform();
    });
}