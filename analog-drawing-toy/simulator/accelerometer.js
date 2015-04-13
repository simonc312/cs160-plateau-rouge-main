// KPR Script file
//@module
//@line 17 "/Users/akhilnambiar/Downloads/KPR-examples-master/analog-drawing-toy/simulator/accelerometer.xml"
/* KPS2JS GENERATED FILE; DO NOT EDIT! */
//@line 19
var PinsSimulators = require('PinsSimulators');
//@line 21
var configure = exports.configure = function(configuration) {
	this.pinsSimulator = shell.delegate("addSimulatorPart", {
			header : { 
				label : "Tile Hub", 
				name : "3 Analog Inputs", 
				iconVariant : PinsSimulators.SENSOR_MODULE 
			},
			axes : [
				new PinsSimulators.AnalogInputAxisDescription(
					{
						valueLabel : "Tile 1: X",
						valueID : "x1",
						defaultControl : PinsSimulators.SLIDER,
						speed : 0
					}
				),
				new PinsSimulators.AnalogInputAxisDescription(
					{
						valueLabel : "Tile 1: Y",
						valueID : "y1",
						defaultControl : PinsSimulators.SLIDER,
						speed : 0.05
					}
				),
				new PinsSimulators.AnalogInputAxisDescription(
					{
						valueLabel : "Tile 1: Active",
						valueID : "a1",
						dataType: "boolean",
						defaultControl : PinsSimulators.BUTTON,
						speed : 0.05
					}
				),
				new PinsSimulators.AnalogInputAxisDescription(
					{
						valueLabel : "Tile 1: Scanned",
						valueID : "s1",
						dataType: "boolean",
						defaultControl : PinsSimulators.BUTTON,
						speed : 0.05
					}
				),
				new PinsSimulators.AnalogInputAxisDescription(
					{
						valueLabel : "Tile 1: Stolen",
						valueID : "t1",
						dataType: "boolean",
						defaultControl : PinsSimulators.BUTTON,
						speed : 0.05
					}
				),
				new PinsSimulators.AnalogInputAxisDescription(
					{
						valueLabel : "Tile 2: X",
						valueID : "x2",
						defaultControl : PinsSimulators.SLIDER,
						speed : 0
					}
				),
				new PinsSimulators.AnalogInputAxisDescription(
					{
						valueLabel : "Tile 2: Y",
						valueID : "y2",
						defaultControl : PinsSimulators.SLIDER,
						speed : 0.05
					}
				),
				new PinsSimulators.AnalogInputAxisDescription(
					{
						valueLabel : "Tile 2: Active",
						valueID : "a2",
						dataType: "boolean",
						defaultControl : PinsSimulators.BUTTON,
						speed : 0.05
					}
				),
				new PinsSimulators.AnalogInputAxisDescription(
					{
						valueLabel : "Tile 2: Scanned",
						valueID : "s2",
						dataType: "boolean",
						defaultControl : PinsSimulators.BUTTON,
						speed : 0.05
					}
				),
				new PinsSimulators.AnalogInputAxisDescription(
					{
						valueLabel : "Tile 2: Stolen",
						valueID : "t2",
						dataType: "boolean",
						defaultControl : PinsSimulators.BUTTON,
						speed : 0.05
					}
				),
				new PinsSimulators.AnalogInputAxisDescription(
					{
						valueLabel : "Tile 3: X",
						valueID : "x3",
						defaultControl : PinsSimulators.SLIDER,
						speed : 0
					}
				),
				new PinsSimulators.AnalogInputAxisDescription(
					{
						valueLabel : "Tile 3: Y",
						valueID : "y3",
						defaultControl : PinsSimulators.SLIDER,
						speed : 0.05
					}
				),
				new PinsSimulators.AnalogInputAxisDescription(
					{
						valueLabel : "Tile 3: Active",
						valueID : "a3",
						dataType: "boolean",
						defaultControl : PinsSimulators.BUTTON,
						speed : 0.05
					}
				),
				new PinsSimulators.AnalogInputAxisDescription(
					{
						valueLabel : "Tile 3: Scanned",
						valueID : "s3",
						dataType: "boolean",
						defaultControl : PinsSimulators.BUTTON,
						speed : 0.05
					}
				),
				new PinsSimulators.AnalogInputAxisDescription(
					{
						valueLabel : "Tile 3: Stolen",
						valueID : "t3",
						dataType: "boolean",
						defaultControl : PinsSimulators.BUTTON,
						speed : 0.05
					}
				),
				new PinsSimulators.AnalogInputAxisDescription(
					{
						valueLabel : "Tile 4: X",
						valueID : "x4",
						defaultControl : PinsSimulators.SLIDER,
						speed : 0
					}
				),
				new PinsSimulators.AnalogInputAxisDescription(
					{
						valueLabel : "Tile 4: Y",
						valueID : "y4",
						defaultControl : PinsSimulators.SLIDER,
						speed : 0.05
					}
				),
				new PinsSimulators.AnalogInputAxisDescription(
					{
						valueLabel : "Tile 4: Active",
						valueID : "a4",
						dataType: "boolean",
						defaultControl : PinsSimulators.BUTTON,
						speed : 0.05
					}
				),
				new PinsSimulators.AnalogInputAxisDescription(
					{
						valueLabel : "Tile 4: Scanned",
						valueID : "s4",
						dataType: "boolean",
						defaultControl : PinsSimulators.BUTTON,
						speed : 0.05
					}
				),
				new PinsSimulators.AnalogInputAxisDescription(
					{
						valueLabel : "Tile 4: Stolen",
						valueID : "t4",
						dataType: "boolean",
						defaultControl : PinsSimulators.BUTTON,
						speed : 0.05
					}
				),
			]
		});


		
}
//@line 54
var close = exports.close = function() {
	shell.delegate("removeSimulatorPart", this.pinsSimulator);
}
//@line 58
var read = exports.read = function() {
	return this.pinsSimulator.delegate("getValue");
}
//@line 63
exports.pins = {
			x: { type: "A2D" },
			y: { type: "A2D" },
			z: { type: "A2D" },
			
			x1: { type: "A2D" },
			y1: { type: "A2D" },
			a1: { type: "Digital" },
			s1: { type: "Digital" },
			t1: { type: "Digital" },
			
			x2: { type: "A2D" },
			y2: { type: "A2D" },
			a2: { type: "Digital" },
			s2: { type: "Digital" },
			t2: { type: "Digital" },
			
			x3: { type: "A2D" },
			y3: { type: "A2D" },
			a3: { type: "Digital" },
			s3: { type: "Digital" },
			t3: { type: "Digital" },
			
			x4: { type: "A2D" },
			y4: { type: "A2D" },
			a4: { type: "Digital" },
			s4: { type: "Digital" },
			t4: { type: "Digital" }
			
		};