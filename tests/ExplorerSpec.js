describe("explorer tests", function () {
    describe("movement tests I", function () {
        var startHex,
            tiles,
            tilesInRange;

        beforeEach(function () {
            startHex = { "coords": { "x": 0, "y": 0 } };
        });

        it("should return number of hexas within 1 steps range (in this case 1)", function () {
            tiles = [{ "p": { "coords": { "x": 0, "y": 1 } } }],
            tilesInRange = game.mapUtils.getTilesInRange(tiles, 1, startHex);

            expect(tilesInRange.length).toEqual(1);
        });

        it("should return number of hexas within 3 steps range (in this case 3)", function () {
            tiles = [{ "p": { "coords": { "x": 6, "y": 1 } } },
                    { "p": { "coords": { "x": 1, "y": 1 } } },
                    { "p": { "coords": { "x": -1, "y": 1 } } },
                    { "p": { "coords": { "x": 1, "y": 0 } } },
                    { "p": { "coords": { "x": 0, "y": 5 } } }];
            tilesInRange = game.mapUtils.getTilesInRange(tiles, 3, startHex);

            expect(tilesInRange.length).toEqual(3);
        });
    });
    
    xdescribe("movement tests II", function () {
        var explorer;

        beforeEach(function () {
            explorer = {  };
        });

        it("should return... ", function () {
            
            expect().toEqual();
        });
    });
});