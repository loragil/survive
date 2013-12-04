
window.addEventListener('load', function (ee) {

    var Q = window.Q = Quintus().include("Sprites, Scenes, Input, Touch, Anim");

    Q.SPRITE_EXPLORER = 1024;
    Q.SPRITE_TILE = 2048;
    Q.SPRITE_BOAT = 4096;

    // render the sprites' collision meshes
    //Q.debug = true;
    //Q.debugFill = true;

    Q.setup({ width: game.config.canvas.width, height: game.config.canvas.height })
     .touch(Q.SPRITE_ALL);

 Q.Sprite.extend("Boat", {
    init: function (p) {
        p = this.createBoat(p);
        this._super(p);
        this.on("boatSelected", this, "onBoatSelected");
        this.on("endTurn", this, "onEndTurn");
    },
    createBoat: function (p) {
        p = p || {};
        p.sheet = "boat";
        p.sprite = "boat";
        p.type = Q.SPRITE_BOAT;
        p.movements = 3;
        return p;
    },

    onBoatSelected: function (boat) {
        game.stateMgr.setSelectedEntity(boat);
        game.stateMgr.markTargetTiles(Q.state.get('playerMovementsLeft'), boat.p.coords);
    },

    onEndTurn: function (boat) {
        game.logger.log(boat.p.playerId + ' turn ended.');
        game.stateMgr.setNextPlayer();
        game.stateMgr.setSelectedEntity(null);
        game.stateMgr.resetAllTiles();
    }
 });

    Q.Sprite.extend("Tile", {
        init: function (p) {
            p = this.createTile(p);
            this._super(p);
            this.on("tileSelected", this, "onTileSelected");
        },

        createTile: function (p) {
            p = p || {};
            p.sprite = "tile";
            p.type = Q.SPRITE_TILE;
            return p;
        },

        onTileSelected: function (tile) {
            // todo: refactor!
            var entity = game.stateMgr.getSelectedEntity();
            var movementsLeft = Q.state.get('playerMovementsLeft');
            if (entity && game.mapUtils.isValidMovement(entity, tile.p.coords, movementsLeft)) {
                game.logger.log("[ " + tile.p.coords.x + ", " + tile.p.coords.y + "]");

                var distance = game.mapUtils.getDistance(entity.p.coords, tile.p.coords);
                game.stateMgr.moveToTile(entity, tile);
                game.stateMgr.decPlayerMovements(distance, entity);
            }
        },

        step: function (dt) {
            if (this.p.over) {
                this.p.over = false;

                if (this.p.coords) {
                    game.logger.log("[ " + this.p.coords.x + ", " + this.p.coords.y + "]");
                }
            }
        }
    });

    Q.Sprite.extend("Explorer", {
        init: function (p) {
            p = this.createExplorer(p);
            this._super(p);
            this.on("explorerSelected", this, "onExplorerSelected");
            this.on("endTurn", this, "onEndTurn");
            this.add("animation");
            var animation = this.getAnimation(p);
            this.play(animation);
            //this.play("default");
        },

        createExplorer: function (p) {
            p = p || {};
            p.sprite = "explorer";
            p.sheet = "explorer";
            p.type = Q.SPRITE_EXPLORER;
            p.movements = 3;
            return p;
        },

        getAnimation: function (p) {
            var animation = p.playerId === 'misha123' ? 'default' : 'red';
            return animation;
        },

        onExplorerSelected: function (explorer) {
            game.stateMgr.setSelectedEntity(explorer);
            game.stateMgr.markTargetTiles(Q.state.get('playerMovementsLeft'), explorer.p.coords);
        },

        onEndTurn: function (explorer) {
            game.logger.log(explorer.p.playerId + ' turn ended.');
            game.stateMgr.setNextPlayer();
            game.stateMgr.setSelectedEntity(null);
            game.stateMgr.resetAllTiles();
        },

        step: function (dt) {
        }
    });

    Q.scene("start", new Q.Scene(function (stage) {
        // todo: refactor the scene
        var map = Q.asset("map.json"),
            tilesInfo = game.mapBuilder.createMapTiles(map, game.config.tile.width, game.config.tile.height),
            bg = new Q.Sprite({ asset: 'waterBG.png', x: Q.el.width / 2, y: Q.el.height / 2, type: Q.SPRITE_NONE });

        stage.insert(bg);

        for (var i = 0; i < tilesInfo.length; i++) {
            var tile = new Q.Tile(tilesInfo[i]);
            if (tile.p.sheet) {
                stage.insert(tile);
            }
        }

        game.dev.initScene(stage);
        game.dev.initState();
    }));

    Q.load(["tiles.json", "tileset.png", "map.json", "explorer.png", "explorer.json", "waterBG.png", "boat.png", "boat.json"], function () {
        Q.compileSheets("tileset.png", "tiles.json");
        Q.compileSheets("explorer.png", "explorer.json");
        Q.compileSheets("boat.png", "boat.json");
        Q.animations("explorer", {
            default: { frames: [1], rate: 1 / 1 },
            red: { frames: [0], rate: 1 / 1 },
            player3: { frames: [2], rate: 1 / 1 }
        });
        Q.stageScene("start");
    });

    Q.el.addEventListener('click', function (e) {

        // - should be tested with more than one player clicking at the same time.

        //var currentPlayerId = Q.state.get('currentPlayerId');
        //if (!game.stateMgr.isCurrentPlayerTurn(currentPlayerId)) {
        //    return;
        //}

        // todo: extract to function. 'toStagePosition(e)' -> returns coords
        var x = e.offsetX || e.layerX,
            y = e.offsetY || e.layerY,
            stage = Q.stage(0);

        var stageX = Q.canvasToStageX(x, stage),
            stageY = Q.canvasToStageY(y, stage);


        // todo: extract to function.
        var obj = stage.locate(stageX, stageY, Q.SPRITE_EXPLORER);
        if (obj && game.stateMgr.isCurrentPlayerObj(obj)) {
            obj.trigger("explorerSelected", obj);
        }
        else {
            obj = stage.locate(stageX, stageY, Q.SPRITE_BOAT);
            if (obj && game.stateMgr.isCurrentPlayerObj(obj)) {
                obj.trigger("boatSelected", obj);
            }
            else {
                obj = stage.locate(stageX, stageY, Q.SPRITE_TILE);
                if (obj) {
                    obj.trigger("tileSelected", obj);
                }
            }
        }
    });
});
