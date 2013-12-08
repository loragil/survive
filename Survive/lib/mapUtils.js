game.mapUtils = function () {

    // todo: change to getAerialDistance
    var getDistance = function (from, to) {
        var dx = to.x - from.x,
            dy = to.y - from.y;

        return signEquals(dx, dy) ?
            Math.abs(dx + dy) :
            Math.max(Math.abs(dx), Math.abs(dy));
    },

        signEquals = function (num1, num2) {
            return (num1 > 0 && num2 > 0) || (num1 < 0 && num2 < 0);
        },

        // todo: should be tested
        getTilePositionByCoords = function (coords, tiles) {
            for (var i = 0; i < tiles.length; i++) {
                var tileProperties = tiles[i].p;
                if (tileProperties.coords.x === coords.x && tileProperties.coords.y === coords.y) {
                    return { x: tileProperties.x, y: tileProperties.y };
                }
            }
        },

        getTileByCoords = function (coords, tiles) {
            for (var i = 0; i < tiles.length; i++) {
                var tile = tiles[i];
                if (tile.p.coords.x === coords.x && tile.p.coords.y === coords.y) {
                    return tile;
                }
            }
        },

        isValidMovement = function (entity, tile, movementsLeft) {
            var isValidDistance = validateDistance(entity, tile, movementsLeft);

            if (entity.p.type === Q.SPRITE_BOAT) {
                return isValidDistance && validateBoatMove(entity, tile);
            }
            
            if (entity.p.type === Q.SPRITE_EXPLORER) {
                return isValidDistance && validateExplorerMove(entity, tile);
            }
            
            return false;
        },
        
        validateBoatMove = function (entity, tile) {
            var isValidTile = entity.p.type === Q.SPRITE_BOAT &&
                            tile.p.sheet && tile.p.sheet.substring(0, 3) === 'sea';
            
            return isValidTile && !tileContainsBoat(tile.p.coords);
        },
        
        validateExplorerMove = function (explorer, tile) {
            var isValidTile = explorer.p.type === Q.SPRITE_EXPLORER &&
                            tile.p.sheet
                            /*&& tile.p.sheet.substring(0, 3) !== 'sea'*/;

            // 1. if selected boat --> check boat is not full
            // 2. if selected main island --> check that explorer hasn't left main island
           
            //once left the main island - explorer can no longer return
            if (tile.p.tileType === "mainIsland" && explorer.p.hasLeftIsland) {
                return false;
            }
            if (tile.p.sheet.substring(0, 3) === 'sea' && explorer.p.hasPlayedSeaTile) {
                return false;
            }

            return isValidTile;
        },
        
        validateDistance = function (entity, tile, movementsLeft) {
            var distance = getDistance(entity.p.coords, tile.p.coords);

            return distance === 1 && movementsLeft >= distance;
        },
        
        tileContainsBoat = function (tileCoords) {
            var boats = Q("Boat").items;
            for (var i = 0; i < boats.length; i++) {
                var boatCoords = boats[i].p.coords;
                if (boatCoords.x === tileCoords.x && boatCoords.y === tileCoords.y) {
                    return true;
                }
            }
            return false;
        },
    
        getTilesInRange = function (tiles, entity) {
            var result = [],
                currentTile,
                distance;

            for (var i = 0; i < tiles.length; i++) {
                currentTile = tiles[i];
                distance = getDistance(entity.p.coords, currentTile.p.coords);
                
                var isValidTile = (currentTile.p.sheet !== '') &&
                                    (entity.p.type === Q.SPRITE_EXPLORER || (entity.p.type === Q.SPRITE_BOAT && currentTile.p.sheet.substring(0, 3) === 'sea'));


                if (distance === 1 && isValidTile) {
                    result.push(currentTile);
                }
            }

            return result;
        };

    return {
        getDistance: getDistance,
        getTilePositionByCoords: getTilePositionByCoords,
        getTileByCoords: getTileByCoords,
        getTilesInRange: getTilesInRange,
        isValidMovement: isValidMovement
    };
}();