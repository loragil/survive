game.stateMgr = function () {
    var selectedEntity = null,

    getSelectedEntity = function () {
        return selectedEntity;
    },
    setSelectedEntity = function (entity) {
        selectedEntity = entity;
    },

    moveToTile = function (entity, targetTile) {
        entity.p.x = targetTile.p.x;
        entity.p.y = targetTile.p.y;
        entity.p.coords.x = targetTile.p.coords.x;
        entity.p.coords.y = targetTile.p.coords.y;
    },

    setNextPlayer = function () {
        var currentPlayerId = Q.state.get('currentPlayerId'); // todo: refactor - remove dependency
        var players = Q.state.get('players');                 // todo: refactor - remove dependency

        var nextPlayerId = getNextPlayerId(currentPlayerId, players);

        Q.state.set('currentPlayerId', nextPlayerId);         // todo: refactor - remove dependency
        Q.state.set('playerMovementsLeft', 3);                // todo: refactor - remove dependency
    },

    isCurrentPlayerObject = function (obj) {
        var currentPlayer = getCurrentPlayer();
        return obj && obj.p && currentPlayer.id === obj.p.playerId;
    },

    decPlayerMovements = function (movements, entity) {
        Q.state.dec('playerMovementsLeft', movements);        // todo: refactor - remove dependency
        onPlayerMovementsDec(entity);
    },

    isCurrentPlayerTurn = function (playerId) {
        return getCurrentPlayer().id === playerId;
    },

    markTargetTiles = function (range, startHex) {
        resetAllTiles();
        var allTiles = Q("Tile").items;
        var targetTiles = game.mapUtils.getTilesInRange(allTiles, range, { coords: startHex });

        for (var i = 0; i < targetTiles.length; i++) {
            targetTiles[i].p.scale = 0.9;

            // todo: raise tileMarkedEvent
        }
    },

    resetAllTiles = function () {
        var allTiles = Q("Tile").items;
        for (var i = 0; i < allTiles.length; i++) {
            allTiles[i].p.scale = 1;
        }
    },
        
    onEndTurn = function (entity) {
        game.logger.log(entity.p.playerId + ' turn ended.');
        game.stateMgr.setNextPlayer();
        game.stateMgr.setSelectedEntity(null);
        game.stateMgr.resetAllTiles();
    },
        
    onEntitySelected = function(entity) {
        game.stateMgr.setSelectedEntity(entity);
        game.stateMgr.markTargetTiles(Q.state.get('playerMovementsLeft'), entity.p.coords);
    },

    // todo: find a better file for this function
    onObjectClicked = function (obj) {
        switch (obj.p.type) {
            case Q.SPRITE_EXPLORER:
            case Q.SPRITE_BOAT:
                if (game.stateMgr.isCurrentPlayerObject(obj)) {
                    obj.trigger("entitySelected", obj);
                }
                break;
            case Q.SPRITE_TILE:
                obj.trigger("tileSelected", obj);
                break;
            default:
                // throw?
                break;
        }
    },
        
    /************** private methods ****************/

    getNextPlayerId = function (currentPlayerId, players) {
        for (var i = 0; i < players.length; i++) {
            if (players[i].id === currentPlayerId) {
                var nextPlayerIndex = (i === players.length - 1) ? 0 : i + 1;
                return players[nextPlayerIndex].id;
            }
        }
    },

    getCurrentPlayer = function () {
        var currentPlayerId = Q.state.get('currentPlayerId'); // todo: refactor - remove dependency
        var players = Q.state.get('players');                 // todo: refactor - remove dependency
        for (var i = 0; i < players.length; i++) {
            if (players[i].id === currentPlayerId) {
                return players[i];
            }
        }
    },

    onPlayerMovementsDec = function (entity) {
        var movementsLeft = Q.state.get('playerMovementsLeft');       // todo: refactor - remove dependency

        if (movementsLeft < 1) {
            entity.trigger('endTurn', entity); // todo: consider passing as a callback
        } else {
            markTargetTiles(movementsLeft, entity.p.coords);
        }
    };

    return {
        setSelectedEntity: setSelectedEntity,
        getSelectedEntity: getSelectedEntity,
        moveToTile: moveToTile,
        isCurrentPlayerObject: isCurrentPlayerObject,
        //getCurrentPlayer: getCurrentPlayer,
        isCurrentPlayerTurn: isCurrentPlayerTurn,
        setNextPlayer: setNextPlayer,
        decPlayerMovements: decPlayerMovements,
        markTargetTiles: markTargetTiles,
        resetAllTiles: resetAllTiles,
        onEndTurn: onEndTurn,
        onEntitySelected: onEntitySelected,
        onObjectClicked: onObjectClicked
    };
}();