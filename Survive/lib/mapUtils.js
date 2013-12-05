game.mapUtils = function () {

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
            var distance = getDistance(entity.p.coords, tile.p.coords);
            var isValidDistance = entity.p.movements >= distance && movementsLeft >= distance;

            // todo: refactor
            var isValidTile = (tile.p.sheet !== '') &&
                            ((entity.p.type === Q.SPRITE_EXPLORER && tile.p.sheet.substring(0, 3) !== 'sea') ||
                            (entity.p.type === Q.SPRITE_BOAT && tile.p.sheet.substring(0, 3) === 'sea'));

            if (entity.p.type === Q.SPRITE_BOAT) {
                return isValidDistance && isValidTile && !tileContainsBoat(tile.p.coords);
            }
            
            return isValidDistance && isValidTile;
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

        getTilesInRange = function (tiles, range, startHex) {
            var result = [],
                currentTile,
                distance;

            for (var i = 0; i < tiles.length; i++) {
                currentTile = tiles[i];
                distance = getDistance(startHex.coords, currentTile.p.coords);
                if (distance > 0 && distance <= range) {
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