/*jslint indent: 4, white: true, debug: true */
/*global $, console, alert, setTimeout */

var MG = MG || {}; //MG - i.e. "My Game" namespace

(function () {
	"use strict";

	MG.utils = {
		getEnum: function (enumType, val) {
			return Object.keys(enumType)[val - 1];
		}
	};
}());

