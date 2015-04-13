//@module
/*
  Copyright 2011-2014 Marvell Semiconductor, Inc.

  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
*/

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

exports.configure = function() {
	this.x.init();
    this.y.init();
    this.z.init();
    
    this.x1.init();
    this.y1.init();
    this.a1.init();
    this.s1.init();
    this.t1.init();
    
    this.x2.init();
    this.y2.init();
    this.a2.init();
    this.s2.init();
    this.t2.init();
    
    this.x3.init();
    this.y3.init();
    this.a3.init();
    this.s3.init();
    this.t3.init();
    
    this.x4.init();
    this.y4.init();
    this.a4.init();
    this.s4.init();
    this.t4.init();
    
}

exports.read = function() {
    return { x: this.x.read(), y: this.y.read(), z: this.z.read(), x1: this.x1.read(), y1: this.y1.read(), a1: this.a1.read(), s1: this.s1.read(), x2: this.x2.read(), y2: this.y2.read(), a2: this.a2.read(), s2: this.s2.read(), x3: this.x3.read(), y3: this.y3.read(), a3: this.a3.read(), s3: this.s3.read(),x4: this.x4.read(), y4: this.y4.read(), a4: this.a4.read(), s4: this.s4.read(), t1: this.t1.read(), t2: this.t2.read(), t3: this.t3.read(), t4: this.t4.read() };
}

