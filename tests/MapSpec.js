describe("game.mapBuilder.createMapTiles", function () {
    var mapBuilder;

    beforeEach(function () {
        mapBuilder = game.mapBuilder;
    });

    it("should return 0 for empty map", function () {
        var tiles = mapBuilder.createMapTiles({ tiles: [] }, 100, 100);
        expect(tiles.length).toEqual(0);
    });
});

// the distance calculation doesn't skip tiles that were not drown. (on the edges)
describe("game.mapUtils.getDistance", function () {
    var mapUtils;

    beforeEach(function () {
        mapUtils = game.mapUtils;
    });

    it("should return 1 for (0, 0), (1, 0)", function () {
        var distance = mapUtils.getDistance({ x: 0, y: 0 }, { x: 0, y: 1 });
        expect(distance).toEqual(1);
    });

    it("should return 0 for (3, -2), (3, -2)", function () {
        var distance = mapUtils.getDistance({ x: 3, y: -2 }, { x: 3, y: -2 });
        expect(distance).toEqual(0);
    });

    it("should return 0 for (3, -2), (0, 0)", function () {
        var distance = mapUtils.getDistance({ x: 3, y: -2 }, { x: 3, y: -2 });
        expect(distance).toEqual(0);
    });
});