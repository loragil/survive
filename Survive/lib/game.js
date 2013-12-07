
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
        this.on("entitySelected", this, game.stateMgr.onEntitySelected);
        this.on("endTurn", this, game.stateMgr.onEndTurn);
    },
    
    createBoat: function (p) {
        p = p || {};
        p.sheet = "boat";
        p.sprite = "boat";
        p.type = Q.SPRITE_BOAT;
        p.movements = 3;
        return p;
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
            if (entity && game.mapUtils.isValidMovement(entity, tile, movementsLeft)) {
                game.logger.log("[ " + tile.p.coords.x + ", " + tile.p.coords.y + "]");

                game.stateMgr.moveToTile(entity, tile);
                game.stateMgr.decPlayerMovements(1, entity);
            }
        },

        step: function (dt) {
            // example of using a flag on update.
            if (this.p.over) {
                this.p.over = false;
            }
        }
    });

    Q.Sprite.extend("Explorer", {
        init: function (p) {
            p = this.createExplorer(p);
            this._super(p);
            this.on("entitySelected", this, game.stateMgr.onEntitySelected);
            this.on("endTurn", this, game.stateMgr.onEndTurn);
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
        // todo: should be tested with more than one player clicking at the same time.
        //var currentPlayerId = Q.state.get('currentPlayerId');
        //if (!game.stateMgr.isCurrentPlayerTurn(currentPlayerId)) {
        //    return;
        //}
        
        var pos = game.stageHelper.toStagePosition(e);
        var obj = game.stageHelper.tryGetObject(pos.x, pos.y);
        
        if (!obj) {
            return;
        }

        game.stateMgr.onObjectClicked(obj);

    });
});
