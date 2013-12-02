game.mapBuilder = function () {

    var createMapTiles = function (map, width, height) {
        var radius = height / 2,
            tiles = [];

        // todo: refactor
        var islandTiles = getRandomIslandTiles();

        for (var i = 0; i < map.tiles.length; i++) {
            for (var j = 0; j < map.tiles[i].length; j++) {

                var tile = map.tiles[i][j];

                tile.x = j * width + ((i % 2) * width / 2); // offset for even rows
                tile.y = i * (0.75 * height);

                tile = setMapOffset(tile, radius, radius);
                tile = setTilePoints(tile, radius);

                if (isMainIslandTile(tile)) {
                    tile.sheet = islandTiles.pop();
                }

                tiles.push(tile);
            }
        }

        return tiles;
    },

        isMainIslandTile = function (tile) {
            return tile.tileType !== undefined && tile.tileType === "mainIsland";
        },

        getRandomIslandTiles = function () {
            var islands = game.config.islandTileTypes;
            var tiles = [];

            for (var i = 0; i < 16; i++) {
                var beach = islands[Math.random() > 0.5 ? 0 : 1];
                var forest = islands[Math.random() > 0.5 ? 2 : 3];
                tiles.push(beach);
                tiles.push(forest);
                if (i % 2 === 0) {
                    var mountain = islands[Math.random() > 0.5 ? 4 : 5];
                    tiles.push(mountain);
                }
            }
            // todo: refactor
            return shuffle(tiles);
        },

        // + Jonas Raoni Soares Silva
        // @ http://jsfromhell.com/array/shuffle [v1.0]
        shuffle = function (o) {
            for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
            return o;
        },

        setMapOffset = function (tile, offsetX, offsetY) {
            tile.x += offsetX;
            tile.y += offsetY;
            return tile;
        },

        setTilePoints = function (tile, radius) {
            tile.points = [];
            for (var i = 0; i < 6; i++) {
                var angle = 2 * Math.PI / 6 * (i + 0.5),
                    x = Math.cos(angle) * radius,
                    y = Math.sin(angle) * radius;

                tile.points.push([Math.round(x), Math.round(y)]);
            }

            return tile;
        };

    return {
        createMapTiles: createMapTiles
    };
}();