game.dev = function () {

    var initScene = function (stage) {
        // init stage
        var position = game.mapUtils.getTilePositionByCoords({ x: 0, y: 0 }, stage.lists.Tile);
        var position2 = game.mapUtils.getTilePositionByCoords({ x: 1, y: 1 }, stage.lists.Tile);
        var position3 = game.mapUtils.getTilePositionByCoords({ x: -1, y: -1 }, stage.lists.Tile);
        var position4 = game.mapUtils.getTilePositionByCoords({ x: 2, y: 3 }, stage.lists.Tile);
        var position5 = game.mapUtils.getTilePositionByCoords({ x: 3, y: 3 }, stage.lists.Tile);
        var exp = new Q.Explorer({ playerId: 'yoyo11', x: position.x, y: position.y });
        var exp2 = new Q.Explorer({ playerId: 'misha123', x: position2.x, y: position2.y });
        var exp3 = new Q.Explorer({ playerId: 'misha123', x: position3.x, y: position3.y });
        var boat = new Q.Boat({ playerId: 'yoyo11', x: position4.x, y: position4.y });
        var boat2 = new Q.Boat({ playerId: 'yoyo11', x: position5.x, y: position5.y });

        exp.p.coords = { x: 0, y: 0 };
        exp2.p.coords = { x: 1, y: 1 };
        exp3.p.coords = { x: -1, y: -1 };
        boat.p.coords = { x: 2, y: 3 };
        boat2.p.coords = { x: 3, y: 3 };
        stage.insert(exp);
        stage.insert(exp2);
        stage.insert(exp3);
        stage.insert(boat);
        stage.insert(boat2);
    },

    initState = function () {
        // init game state
        Q.state.p.players = [{ id: 'misha123' }, { id: 'yoyo11' }];
        Q.state.p.currentPlayerId = Q.state.p.players[1].id;
        Q.state.p.playerMovementsLeft = 3;
    };

    return {
        initScene: initScene,
        initState: initState
    };

}();
