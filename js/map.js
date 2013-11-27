/*globals document*/
(function () {
    "use strict";

    var canvas = document.getElementById('hexmap'),
        hexHeight,
        hexRadius,
        hexRectangleHeight,
        hexRectangleWidth,
        hexagonAngle = 0.523598776, // 30 degrees in radians
        sideLength = 30,
        boardWidth = 12,
        boardHeight = 13,

        /*an array descibing the tiles (initial state):
            * 0 => tile not on map
            * 1 => sea
            * 2 => island
            * 3 => sea monster
        */
        mapTiles = [
            [0,0,0,1,1,1,1,1,1,1,0,0],
            [0,3,1,1,1,1,1,1,1,1,1,0],
            [0,1,1,1,1,1,1,1,1,1,1,3],
            [0,1,1,1,2,2,2,2,1,1,1,0],
            [0,1,1,1,2,2,2,2,2,1,1,1],
            [1,1,2,2,2,2,2,2,2,2,1,1],
            [0,1,1,2,2,2,3,2,2,2,1,1],
            [1,1,2,2,2,2,2,2,2,2,1,1],
            [0,1,1,1,2,2,2,2,2,1,1,1],
            [0,1,1,1,2,2,2,2,1,1,1,0],
            [0,3,1,1,1,1,1,1,1,1,1,1],
            [0,1,1,1,1,1,1,1,1,1,3,0],
            [0,0,0,1,1,1,1,1,1,1,0,0],
        ];

    hexHeight = Math.sin(hexagonAngle) * sideLength;
    hexRadius = Math.cos(hexagonAngle) * sideLength;
    hexRectangleHeight = sideLength + 2 * hexHeight;
    hexRectangleWidth = 2 * hexRadius;

    if (canvas.getContext){
        var ctx = canvas.getContext('2d');

        ctx.fillStyle = "#000";

        drawBoard(ctx, boardWidth, boardHeight);

        canvas.addEventListener("mousemove", function(eventInfo) {
            var x,
                y,
                hexX,
                hexY,
                screenX,
                screenY,
                rect;

            rect = canvas.getBoundingClientRect();

            x = eventInfo.clientX - rect.left;
            y = eventInfo.clientY - rect.top;

            hexY = Math.floor(y / (hexHeight + sideLength));
            hexX = Math.floor((x - (hexY % 2) * hexRadius) / hexRectangleWidth);

            screenX = hexX * hexRectangleWidth + ((hexY % 2) * hexRadius);
            screenY = hexY * (hexHeight + sideLength);

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            drawBoard(ctx, boardWidth, boardHeight);

            // Check if the mouse's coords are on the board
            if(hexX >= 0 && hexX < boardWidth) {
                if(hexY >= 0 && hexY < boardHeight) {
                    ctx.fillStyle = "#000";
                    drawHexagon(ctx, screenX, screenY, true,"","");
                }
            }
        });
    }

    function drawBoard(canvasContext, width, height) {
        var i,
            j;

        for(i = 0; i < width; ++i) {
            for(j = 0; j < height; ++j) {
                if(mapTiles[j][i] === 0){
                    //hex tile not on map. do not draw
                    continue;
                }                

                drawHexagon(
                    ctx, 
                    i * hexRectangleWidth + ((j % 2) * hexRadius), 
                    j * (sideLength + hexHeight), 
                    false,
                    i,
                    j,
                    mapTiles[j][i]
                );
            }
        }
    }

    function drawHexagon(canvasContext, x, y, fill, row, column, tileType) {           
        var fill = fill || false,
            isSpecialTile = /2|3/.test(tileType) || false;// i.e. NOT (just plain) sea tile

        //default tile style
        ctx.lineWidth = 1; 
        ctx.strokeStyle = "#CCC"; 

        if(isSpecialTile){    
            ctx.lineWidth = 3;

            switch(tileType){
                case 2://island tile                
                    break;
                case 3://sea monster
                    ctx.strokeStyle = "#ff0000";                    
                    break;
            }        
        }
        
        canvasContext.beginPath();
        canvasContext.moveTo(x + hexRadius, y);
        canvasContext.lineTo(x + hexRectangleWidth, y + hexHeight);
        canvasContext.lineTo(x + hexRectangleWidth, y + hexHeight + sideLength);
        canvasContext.lineTo(x + hexRadius, y + hexRectangleHeight);
        canvasContext.lineTo(x, y + sideLength + hexHeight);
        canvasContext.lineTo(x, y + hexHeight);
        canvasContext.textAlign = "center";
        canvasContext.textBaseline = "middle";
        canvasContext.fillText("(" + (column+1) + "," + (row+1) + ")", 
                             x + hexRadius, y + sideLength );
        canvasContext.closePath();

        if(fill) {
            canvasContext.fill();
        } else {
            canvasContext.stroke();
        }
    }

})();