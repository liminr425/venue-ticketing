const PRICE_CATEGORIES ={
    A:{label: "Gold circle", price:180},
    B:{label: "Floor A", price:120},
    C:{label: "Tier", price:85},
    D:{label: "Floor B", price:55}
};

const VENUE={
    name: "Idols Venue",
    eventTitle: "World Tour - Live concert",
    canvas: {width: 1500, height:1320},

    stage:{x:400, y:40, width:700, height:180, label:"STAGE"},
    catwalk:{x:655, y:220, width:220, height:300},
    seat:{size:24, gapX:6, gapY:12},

    sections:[
        {id:"stand-left", name:"Left Tier", category:"C", rows:12, seatsPerRow:5, origin:{x:110, y:260}, rowStart:1},
        {id:"gold-left", name:"Gold Circle L", category:"A", rows:8, seatsPerRow:5, origin:{x:440, y:260}, rowStart:1},
        {id:"gold-right", name:"Gold Circle R", category:"A", rows:8, seatsPerRow:5, origin:{x:940, y:260}, rowStart:1},
        {id:"stand-right", name:"Right Tier", category:"C", rows:12, seatsPerRow:5, origin:{x:1290, y:260}, rowStart:1},
        {id:"floor-a", name:"Floor A", category:"B", rows:5, seatsPerRow:24, origin:{x:380, y:620}, rowStart:1},
        {id:"floor-b", name:"Floor B", category:"D", rows:10, seatsPerRow:24, origin:{x:380, y:850}, rowStart:6},
    ],

    unavailableSeats:[
        "gold-left-1-2",  "gold-left-3-4",  "gold-left-6-3", "gold-right-2-1", "gold-right-5-5", "gold-right-8-2",
        "stand-left-2-3", "stand-left-7-1", "stand-left-11-4", "stand-right-3-2","stand-right-9-5", "floor-a-1-4",
        "floor-a-3-18",   "floor-a-5-11", "floor-b-2-7", "floor-b-6-20", "floor-b-9-3"
    ]
};

function buildSeats(venue){
    const seats = [];
    const {size, gapX, gapY} = venue.seat;

    venue.sections.forEach(section=>{
        const category = PRICE_CATEGORIES[section.category];

        for( let r = 1; r <= section.rows; r++){
            for(let n = 1; n<= section.seatsPerRow; n++){
                const id=`${section.id}-${r}-${n}`;

                seats.push({
                    id, sectionId: section.id,
                    sectionName: section.name,
                    row: section.rowStart + r -1,
                    seatNumber: n,
                    category: section.category,
                    categoryLabel: category.label,
                    price: category.price,

                    x: section.origin.x + (n-1) * (size+gapX),
                    y: section.origin.y +(r-1) * (size+gapY),
                    available: !venue.unavailableSeats.includes(id)
                });
            }
        }
    });
    return seats;
}