/* MIT License
 * 
 * Copyright (c) 2021 ChezCoderTK
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

var element,
    context,
    mouseX,
    mouseY,
    canvas;
const getWidth = (function() { return Math.max(document.body.scrollWidth, document.documentElement.scrollWidth, document.body.offsetWidth, document.documentElement.offsetWidth, document.documentElement.clientWidth) });
const getHeight = (function() { return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight, document.body.offsetHeight, document.documentElement.offsetHeight, document.documentElement.clientHeight) });
const random = (function(min, max) { return Number(Math.random() * (max - min)) + min });

window.addEventListener("load", function() {
    element = document.getElementById("canvas");
    context = element.getContext("2d");

    element.setAttribute("width", getWidth());
    element.setAttribute("height", getHeight());

    let j = false;
    var updateLoop = setInterval(function() {
        if (j) clearInterval(updateLoop);
        try { update(); } catch (err) { console.error(err); j = true }
    });
    
    try {
        document.querySelector("html").style.margin = "0px";
        document.querySelector("html").style.padding = "0px";
        document.querySelector("body").style.margin = "0px";
        document.querySelector("body").style.padding = "0px";
        
        canvas = new CanvasTools(canvas);
    } catch {}

    main();
});

document.addEventListener("mousemove", function(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
    try {
        onMouseMove();
    } catch {}
});

document.addEventListener("mouseenter", function(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
    try {
        onMouseMove();
    } catch {}
});

document.addEventListener("mousedown", function() { try { onMouseDown(); } catch {} });
document.addEventListener("mouseup", function() { try { onMouseUp(); } catch {} });
document.addEventListener("keydown", function() { try { onKeyDown(); } catch {} });
document.addEventListener("keyup", function() { try { onKeyUp(); } catch {} });

window.getPageWidth = (function() { return Math.max(document.body.scrollWidth, document.documentElement.scrollWidth, document.body.offsetWidth, document.documentElement.offsetWidth, document.documentElement.clientWidth) });
window.getPageHeight = (function() { return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight, document.body.offsetHeight, document.documentElement.offsetHeight, document.documentElement.clientHeight) });

if (!window.__canvasTools__) {
    window.__canvasTools__ = {};
    window.__canvasToolsInstances__ = {};
}

class CanvasTools {
    constructor() {
        this.canvasElement = document.getElementById("canvas");
    }

    getCanvas() {
        return this.canvasElement;
    }

    getContext(contextType="2d") {
        return this.getCanvas().getContext(contextType);
    }

    /**
     * Clears the canvas
     * 
     * **index.html**
     * ```html
<canvas id="canvas" height="500" width="500"></canvas>
<script src="canvasTools.js"></script>
<script src="script.js"></script>```
     * 
     * **script.js**
     * ```js
var ct = new CanvasTools("canvas");
ct.clear();```
     * 
     * @author ChezCoder
     * @returns {void}
     */
    clear() {
        this.getContext().clearRect(0, 0, getWidth(), getHeight());
        return this;
    }

    /**
     * Create a rectangle instance
     * 
     * **index.html**
     * ```html
<canvas id="canvas" height="500" width="500"></canvas>
<script src="canvasTools.js"></script>
<script src="script.js"></script>```
     * 
     * **script.js**
     * ```js
var ct = new CanvasTools("canvas");
ct.createRectangle(100, 100).draw();```
     * 
     * @author ChezCoder
     * @param {number} width - The rectangle's width
     * @param {number} height - The rectangle's height
     * @param {number} [x=0] - The rectangle's x position
     * @param {number} [y=0] - The rectangle's x position
     * @param {num} [opt.borderWidth=0] - The rectangle's border width
     * @param {string} [opt.borderColor="black"] - The rectangle's border color
     * @param {string} [opt.fillColor="black"] - The rectangle's fill color
     */
    createRectangle(width, height, x=0, y=0, opt={borderWidth: 0, borderColor: "black", fillColor: "black"}, t = this) {
        return {
            getWidth: (function() { return width }),
            getHeight: (function() { return height }),
            getPosition: (function() { return {"x": x, "y": y} }),
            getBorderWidth: (function() { return opt.borderWidth }),
            getBorderColor: (function() { return opt.borderColor }),
            getFillColor: (function() { return opt.fillColor }),

            draw: function() {
                var context = t.getContext("2d");
                context.beginPath();
                context.lineWidth = this.getBorderWidth();
                context.strokeStyle = this.getBorderColor();
                context.fillStyle = this.getFillColor();
                context.rect(this.getPosition().x, this.getPosition().y, this.getWidth(), this.getHeight());
                context.fill();
                context.stroke();
            },

            setWeight: function(width) {
                this.getWidth = (function() { return width });
                return this;
            },

            setHeight: function(height) {
                this.getHeight = (function() { return height });
                return this;
            },

            setPosition: function(x, y) {
                this.getPosition = (function() { return {"x": x, "y": y} });
                return this;
            },

            setBorderWidth: function(width) {
                this.getBorderWidth = (function() { return width });
                return this;
            },
            
            setBorderColor: function(color) {
                this.getBorderColor = (function() { return color });
                return this;
            },
            
            setFillColor: function(color) {
                this.getFillColor = (function() { return color });
                return this;
            }
        }
    }

    /**
     * Create a circle instance
     * 
     * **index.html**
     * ```html
     * <canvas id="canvas" height="500" width="500"></canvas>
     * <script src="canvasTools.js"></script>
     * <script src="script.js"></script>
     * ```
     * 
     * **script.js**
     * ```js
     * var ct = new CanvasTools("canvas");
     * ct.circle(100, 300, 300).draw();
     * ```
     * 
     * @author ChezCoder
     * @param {number} radius - The circle's radius
     * @param {number} [x=0] - The circle's x position
     * @param {number} [y=0] - The circle's x position
     * @param {num} [opt.borderWidth=0] - The circle's border width
     * @param {string} [opt.borderColor="black"] - The circle's border color
     * @param {string} [opt.fillColor="black"] - The circle's fill color
     */
    createCircle(radius, x=0, y=0, opt={borderWidth: 0, borderColor: "black", fillColor: "black"}, t = this) {
        return {
            getRadius: (function() { return radius }),
            getPosition: (function() { return {"x": x, "y": y} }),
            getBorderWidth: (function() { return opt.borderWidth }),
            getBorderColor: (function() { return opt.borderColor }),
            getFillColor: (function() { return opt.fillColor }),

            draw: function() {
                var context = t.getContext("2d");
                context.beginPath();
                context.lineWidth = this.getBorderWidth();
                context.strokeStyle = this.getBorderColor();
                context.fillStyle = this.getFillColor();
                context.arc(this.getPosition().x, this.getPosition().y, this.getRadius(), 0, Math.PI * 2);
                context.fill();
                context.stroke();
            },

            setRadius: function(radius) {
                this.getRadius = (function() { return radius });
                return this;
            },

            setPosition: function(x, y) {
                this.getPosition = (function() { return {"x": x, "y": y} });
                return this;
            },

            setBorderWidth: function(width) {
                this.getBorderWidth = (function() { return width });
                return this;
            },
            
            setBorderColor: function(color) {
                this.getBorderColor = (function() { return color });
                return this;
            },
            
            setFillColor: function(color) {
                this.getFillColor = (function() { return color });
                return this;
            }
        }
    }

    /**
     * Create an ellipse instance
     * 
     * **index.html**
     * ```html
<canvas id="canvas" height="500" width="500"></canvas>
<script src="canvasTools.js"></script>
<script src="script.js"></script>```
     * 
     * **script.js**
     * ```js
var ct = new CanvasTools("canvas");
ct.createEllipse(100, 200, 300, 300).draw();```
     * 
     * 
     * @author ChezCoder
     * @param {number} width - The ellipses' radius
     * @param {number} height - The ellipses' radius
     * @param {number} [x=0] - The ellipses' x position
     * @param {number} [y=0] - The ellipses' x position
     * @param {number} [rotation=0] - The ellipses' rotation
     * @param {num} [opt.borderWidth=0] - The circle's border width
     * @param {string} [opt.borderColor="black"] - The circle's border color
     * @param {string} [opt.fillColor="black"] - The circle's fill color
     */
    createEllipse(width, height, x=0, y=0, rotation=0, opt={borderWidth: 0, borderColor: "black", fillColor: "black"}, t = this) {
        return {
            getPosition: (function() { return {x: x, y: y} }),
            getWidth: (function() { return width; }),
            getHeight: (function() { return height; }),
            getRotation: (function() { return rotation; }),
            getBorderWidth: (function() { return opt.borderWidth; }),
            getBorderColor: (function() { return opt.borderColor; }),
            getFillColor: (function() { return opt.fillColor; }),

            draw: function() {
                var context = t.getContext("2d");
                context.beginPath();
                context.lineWidth = this.getBorderWidth();
                context.strokeStyle = this.getBorderColor();
                context.fillStyle = this.getFillColor();
                ctx.ellipse(this.getPosition().x, this.getPosition().y, this.getWidth(), this.getHeight(), this.getRotation() * (Math.PI / 180), 0, Math.PI * 2);
                context.fill();
                context.stroke();
            },

            setPosition: function(x, y) {
                this.getPosition = (function() { return {"x": x, "y": y} });
                return this;
            },

            setWeight: function(width) {
                this.getWidth = (function() { return width });
                return this;
            },

            setHeight: function(height) {
                this.getHeight = (function() { return height });
                return this;
            },

            setRotation: function(degrees) {
                this.getRotation = (function() { return degrees });
                return this;
            },

            setBorderWidth: function(width) {
                this.getBorderWidth = (function() { return width });
                return this;
            },
            
            setBorderColor: function(color) {
                this.getBorderColor = (function() { return color });
                return this;
            },
            
            setFillColor: function(color) {
                this.getFillColor = (function() { return color });
                return this;
            }
        }
    }

    /**
     * Create an ellipse instance
     * 
     * **index.html**
     * ```html
<canvas id="canvas" height="500" width="500"></canvas>
<script src="canvasTools.js"></script>
<script src="script.js"></script>```
     * 
     * **script.js**
     * ```js
var ct = new CanvasTools("canvas");
ct.createLine(50, 100, 300, 400).draw();```
     * 
     * 
     * @author ChezCoder
     * @param {number} x1 - The x position of the line's first point
     * @param {number} y1 - The y position of the line's first point
     * @param {number} x2 - The x position of the line's first point
     * @param {number} y2 - The y position of the line's first point
     * @param {num} [opt.lineWidth] - The line's width
     * @param {string} [opt.lineColor="black"] - The line's color
     */
    createLine(x1, y1, x2, y2, opt={lineWidth: 1, lineColor: "black"}, t = this) {
        return {
            getPosition: (function() { return [{x: x1, y: y1}, {x: x2, y: y2}]; }),
            getLineWidth: (function() { return opt.lineWidth; }),
            getLineColor: (function() { return opt.lineColor; }),

            draw: function() {
                var context = t.getContext("2d");
                context.moveTo(this.getPosition()[0].x, this.getPosition()[0].y);
                context.lineWidth = this.getLineWidth();
                context.strokeStyle = this.getLineColor();
                context.lineTo(this.getPosition()[1].x, this.getPosition()[1].y);
                context.stroke();
            },

            setPosition: function(x1, y1, x2, y2) {
                this.getPosition = (function() { return [{x: x1, y: y1}, {x: x2, y: y2}]; });
                return this;
            },

            setLineWidth: function(width) {
                this.getLineWidth = (function() { return width; });
                return this;
            },

            setLineColor: function(color) {
                this.getLineColor = (function() { return color; });
                return this;
            }
        }
    }
}

/* ChezCoderTK 2021 */