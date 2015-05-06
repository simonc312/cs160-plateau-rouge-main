exports.pins = {   
	x: { type: "A2D" },
    y: { type: "A2D" },
    a: { type: "Digital" },
    s: { type: "Digital" },
    t: { type: "Digital" },
    policelost: { type: "Digital" },
    policefound: { type: "Digital" },
};

exports.configure = function() {
    this.x.init();
    this.y.init();
    this.a.init();
    this.s.init();  
    this.t.init();
    this.policelost.init();
    this.policefound.init(); 
}

exports.read = function() {
    return { x: this.x.read(), y: this.y.read(), a: this.a.read(), s: this.s.read(), t: this.t.read(),
             policelost: this.policelost.read(), policefound: this.policefound.read() };
}