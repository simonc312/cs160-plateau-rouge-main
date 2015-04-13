// KPR Script file
//@module
//@line 17 "/Users/akhilnambiar/Downloads/KPR-examples-master/analog-drawing-toy/simulator/potentiometers.xml"
/* KPS2JS GENERATED FILE; DO NOT EDIT! */
//@line 19
var PinsSimulators = require('PinsSimulators');
//@line 21
var configure = exports.configure = function(configuration) {
	this.pinsSimulator = shell.delegate("addSimulatorPart", {
			header : { 
				label : "Potentiometers", 
				name : "Analog Inputs", 
				iconVariant : PinsSimulators.SENSOR_MODULE 
			},
			axes : [
				new PinsSimulators.AnalogInputAxisDescription(
					{
						valueLabel : "X Position",
						valueID : "xPos",
						defaultControl : PinsSimulators.SLIDER,
						speed : 0.3
					}
				),
				new PinsSimulators.AnalogInputAxisDescription(
					{
						valueLabel : "Y Position",
						valueID : "yPos",
						defaultControl : PinsSimulators.SLIDER,
						speed : 0.25
					}
				),
			]
		});
}
//@line 49
var close = exports.close = function() {
	shell.delegate("removeSimulatorPart", this.pinsSimulator);
}
//@line 53
var read = exports.read = function() {
	return this.pinsSimulator.delegate("getValue");
}
//@line 58
exports.pins = {
			xPos: { type: "A2D" },
			yPos: { type: "A2D" }
		};