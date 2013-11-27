/*jslint indent: 4, white: true, debug: true, todo: true */
/*global $, console, alert, setTimeout */

var MG = MG || {}; //MG - i.e. "My Game" namespace

(function () {
	"use strict";

	//creature constuctor
	MG.Creature = function (creatureType, x, y){
	   //var type = creatureType;

	   this.type = function(){
           return MG.utils.getEnum(MG.statics.creature, creatureType);
	   };

       this.x = x || 0;       
       this.y = y || 0;

	   //this.type = type;
       /*return {
            type: Object.keys(MG.statics.creature)[creatureType - 1];
       }*/
	};

	// public (shared across instances)
    MG.Creature.prototype = {
        hail: function () {
            //alert("Hi there! I'm a " + this.type() + '!');
            alert("Hi there! I'm a Creature!");
        },

        move: function () {        	
			// TODO
            alert("moving");
        },

        dive: function () {
        	// TODO
            alert("diving");
        },

        draw: function(ctx) {
          // TODO
            alert("drawing");
        }
    };


    /*************** Shark ********************/
    // define the Shark class
    MG.Shark = function () {
      // Call the parent constructor
      MG.Creature.call(this);
      //MG.Creature.apply(this,[MG.statics.creature.shark]);
      //alert("boo");
    };

    // inherit Person
    MG.Shark.prototype = Object.create(MG.Creature.prototype);

    // correct the constructor pointer because it points to Creature
    MG.Shark.prototype.constructor = MG.Shark;
    MG.Shark.prototype.hail =  function () {
        alert("Hi there! I'm a Shark!");
    };

}());

