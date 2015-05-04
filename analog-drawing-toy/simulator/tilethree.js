var PinsSimulators = require('PinsSimulators');

exports.configure = function(configuration) {
	this.pinsSimulator = shell.delegate("addSimulatorPart", {
			header : { 
				label : "Smart Tag Three", 
				name : "State and Location Sensor", 
				iconVariant : PinsSimulators.SENSOR_BUTTON 
			},
			axes : [
				new PinsSimulators.AnalogInputAxisDescription(
					{
						valueLabel : "X",
						valueID : "x",
						defaultControl : PinsSimulators.SLIDER,
						speed : 0
					}
				),
				new PinsSimulators.AnalogInputAxisDescription(
					{
						valueLabel : "Y",
						valueID : "y",
						defaultControl : PinsSimulators.SLIDER,
						speed : 0.05
					}
				),
				new PinsSimulators.AnalogInputAxisDescription(
					{
						valueLabel : "Active",
						valueID : "a",
						dataType: "boolean",
						defaultControl : PinsSimulators.BUTTON,
						speed : 0.05
					}
				),
				new PinsSimulators.AnalogInputAxisDescription(
					{
						valueLabel : "Scanned",
						valueID : "s",
						dataType: "boolean",
						defaultControl : PinsSimulators.BUTTON,
						speed : 0.05
					}
				),
				new PinsSimulators.AnalogInputAxisDescription(
					{
						valueLabel : "Stolen",
						valueID : "t",
						dataType: "boolean",
						defaultControl : PinsSimulators.BUTTON,
						speed : 0.05
					}
				),
			]
		});
}

exports.close = function() {
	shell.delegate("removeSimulatorPart", this.pinsSimulator);
}

exports.read = function() {
	return this.pinsSimulator.delegate("getValue");
}

exports.pins = {   
	x: { type: "A2D" },
    y: { type: "A2D" },
    a: { type: "Digital" },
    s: { type: "Digital" },
    t: { type: "Digital" },
};