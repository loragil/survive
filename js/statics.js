/*jslint indent: 4, white: true, debug: true */
/*global $, console, alert, setTimeout, document */

var MG = MG || {}; //MG i.e. "My Game" namespace

(function () {
	"use strict";
		
	MG.statics = {
		//canvas: document.getElementById('hexmap'),
		//ctx: this.canvas.getContext("2d"),

		// number of instances for each entity
		components:{
			tiles: 40,
			people: 40, // 10 for each color
			seaMonsters: 5,
			sharks: 6,
			whales: 5,
			boats: 12,
			dice: 1,
			dolphins: 4,
			diveDice: 2,
			giantSquids: 0 //?
		},

		players: [],

		tile: {
			beach: 1,
			forest: 2,
			mountain: 3
		},

		creature: {
			shark: 1,
			whale: 2,
			seaMonster: 3,
			dolphin: 4,
			giantSquid: 5
		},

		//the numbers indicate MAX steps (for example the whale can move 1, 2 or 3 steps)
		movement: {
			player: 3,
			human:{
				onLand: 3,
				swimming: 1
			},
			shark: 2,
			whale: 3,
			seaMonster: 1,
			dolphin: 0, //?
			giantSquid: 0 //?
		},

		mapLayout: [
            [0,0,0,1,1,1,1,1,1,1,0,0],
            [0,3,1,1,1,1,1,1,1,1,1,0],
            [0,1,1,1,1,1,1,1,1,1,1,3],
            [0,1,1,1,2,2,2,2,1,1,1,0],
            [0,1,1,1,2,2,2,2,2,1,1,1],
            [1,1,2,2,2,2,2,2,2,2,1,1],
            [0,1,1,2,2,2,3,2,2,2,1,1],
            [1,1,2,2,2,2,2,2,2,2,1,1],
            [0,1,1,1,2,2,2,2,2,1,1,1],
            [0,1,1,1,2,2,2,2,1,1,1,0],
            [0,3,1,1,1,1,1,1,1,1,1,1],
            [0,1,1,1,1,1,1,1,1,1,3,0],
            [0,0,0,1,1,1,1,1,1,1,0,0]
        ]
	};
}());

