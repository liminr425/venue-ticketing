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
    on("pan-up", function () { mapY -= PAN_STEP; updateMapTransform(); });
    on("pan-down", function () { mapY += PAN_STEP; updateMapTransform(); });
    on("pan-left", function () { mapX -= PAN_STEP; updateMapTransform(); });
    on("pan-right", function () { mapX += PAN_STEP; updateMapTransform(); });
    on("reset-view", function () {
        mapZoom = 1;
        mapX = 0;
        mapY = 0;
        updateMapTransform();
    });

    setupMouseControls();
}

function setupMouseControls() {
    const area = document.getElementById("map-area");
    if (!area) return;

    area.addEventListener("wheel", function (event) {
        const map = document.querySelector(".map-container");
        if (!map) return;
        event.preventDefault();

        const areaRect = area.getBoundingClientRect();
        const ox = event.clientX - areaRect.left - map.offsetLeft;
        const oy = event.clientY - areaRect.top - map.offsetTop;

        const mapPointX = (ox - mapX) / mapZoom;
        const mapPointY = (oy - mapY) / mapZoom;

        const factor = event.deltaY < 0 ? 1.1 : 1 / 1.1;
        const newZoom = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, mapZoom * factor));

        mapX = ox - mapPointX * newZoom;
        mapY = oy - mapPointY * newZoom;
        mapZoom = newZoom;

        updateMapTransform();
    }, { passive: false });

    let pointerDown = false;
    let isDragging = false;
    let startX = 0;
    let startY = 0;
    let startMapX = 0;
    let startMapY = 0;
    const DRAG_THRESHOLD = 5;

    area.addEventListener("pointerdown", function (event) {
        if (event.button !== 0) return;
        pointerDown = true;
        isDragging = false;
        startX = event.clientX;
        startY = event.clientY;
        startMapX = mapX;
        startMapY = mapY;
    });

    area.addEventListener("pointermove", function (event) {
        if (!pointerDown) return;
        const dx = event.clientX - startX;
        const dy = event.clientY - startY;

        if (!isDragging && Math.hypot(dx, dy) > DRAG_THRESHOLD) {
            isDragging = true;
            area.classList.add("dragging");
            area.setPointerCapture(event.pointerId);
        }
        if (isDragging) {
            mapX = startMapX + dx;
            mapY = startMapY + dy;
            updateMapTransform();
        }
    });

    function endDrag(event) {
        if (!pointerDown) return;
        pointerDown = false;
        area.classList.remove("dragging");
        if (area.hasPointerCapture(event.pointerId)) {
            area.releasePointerCapture(event.pointerId);
        }
    }

    area.addEventListener("pointerup", endDrag);
    area.addEventListener("pointercancel", endDrag);

    area.addEventListener("click", function (event) {
        if (isDragging) {
            event.stopPropagation();
            isDragging = false;
        }
    }, true);
}