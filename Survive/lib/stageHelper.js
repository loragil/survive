game.stageHelper = function () {
    var toStagePosition = function(e) {
        var x = e.offsetX || e.layerX,
            y = e.offsetY || e.layerY,
            stage = Q.stage(0);

        var stageX = Q.canvasToStageX(x, stage),
            stageY = Q.canvasToStageY(y, stage);

        return { x: stageX, y: stageY };
    },

    tryGetObject = function (stageX, stageY) {
        var stage = Q.stage(0);
        
        var obj = stage.locate(stageX, stageY, Q.SPRITE_EXPLORER | Q.SPRITE_BOAT);
        if (!obj) {
            obj = stage.locate(stageX, stageY, Q.SPRITE_TILE);
        }

        return obj;
    };

    return {
        tryGetObject: tryGetObject,
        toStagePosition: toStagePosition
    };
}();