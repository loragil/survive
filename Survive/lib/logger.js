game.logger = function () {

    var log = function (msg, type) {
        if(type === 'log' || type === 'info' || type === 'warn'){
            console[type](msg);
        }
        else{
            console.log(msg);
        }
    };

    return {
        log: log
    };
}();