/*jslint indent: 4, white: true, debug: true, node: true */
/*global $, class, console, alert, setTimeout */

"use strict";

var MG = MG || {};

class HexTile {
    constructor (ctx, color, pos, size, scale) {
        this.color = color;
        this.ctx = ctx;
        this.x = pos[0];
        this.y = pos[1];
        this.z = pos[2] || 0; // scale
        this.width = size.width;
        this.height = size.height;
    };

    draw (x, y) {
        var width  = this.width  + (this.width  * this.z), // scaled width
            height = this.height + (this.height * this.z), // scaled height
            cx,
            cy,
            ctx = this.ctx;

        if (x == null || y == null) {
            x = this.x;
            y = this.y; 
        }

        cx  = x * (width + dist) - y * (width + dist) / 2;
        cy  = y * (3/4 * height + dist);

        ctx.fillStyle = this.color;
        ctx.beginPath ();
        ctx.moveTo (cx, cy - height/2);
        ctx.lineTo (cx + width/2, cy - height/4);
        ctx.lineTo (cx + width/2, cy + height/4);
        ctx.lineTo (cx, cy + height/2);
        ctx.lineTo (cx - width/2, cy + height/4);
        ctx.lineTo (cx - width/2, cy - height/4);
        ctx.lineTo (cx, cy - height/2);  
        ctx.fill ();        
    };
};

//let dog = new Animal('Snoopie');
//dog.hail();

var hexes = [
new HexTile(ctx, "rgb(0, 0, 255)", [1, 1], size),
new HexTile(ctx, "rgb(0, 0, 225)", [3, 1], size),
new HexTile(ctx, "rgb(0, 0, 195)", [4, 1], size),
new HexTile(ctx, "rgb(0, 0, 165)", [6, 1], size),
new HexTile(ctx, "rgb(0, 225, 0)", [3, 2], size),
new HexTile(ctx, "rgb(0, 225, 0)", [4, 2], size),
new HexTile(ctx, "rgb(0, 195, 0)", [5, 2], size)
];

function draw() {
    for (var i = hexes.length; i--;) {
        hexes[i].draw();
    }
}


draw();