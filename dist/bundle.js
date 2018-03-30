(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.projectName = factory());
}(this, (function () { 'use strict';

var getMargin = function getMargin(i) {
    // 判断一个字的左右可堆积margin于优先级
};

var type;
(function (type) {
    type["canvas"] = "canvas";
    type["dom"] = "dom";
})(type || (type = {}));
var inputDiv;
var getLength = function getLength(str) {
    inputDiv.innerHTML = new String(str.replace(/[ ]/g, '&nbsp;'));
    return inputDiv.getBoundingClientRect().width;
};
var Canvas = /** @class */function () {
    function Canvas(config) {
        this.config = config;
        this.body = document.body;
        this.rate = window.devicePixelRatio;
        if (this.config.type === 'canvas') {
            this.canvasInit();
            this.init();
            // this.testCaseInit();
        } else {
            this.domInit();
            // this.testDomInit();
        }
    }
    Canvas.prototype.testCaseInit = function () {
        var div = document.createElement('div');
        var canvasWrap = document.createElement('div');
        div.innerText = this.config.text;
        div.style.width = this.config.width;
        div.style.fontSize = this.config.fontSize;
        div.style.fontFamily = this.config.fontFamily;
        div.style.padding = this.config.padding;
        div.style.color = this.config.color;
        div.style.border = '1px solid black';
        div.style.textAlign = 'left';
        canvasWrap.style.width = this.config.width;
        canvasWrap.style.border = '1px solid black';
        canvasWrap.style.margin = '20px 0 0 0';
        canvasWrap.style.textAlign = 'center';
        canvasWrap.style.fontSize = '0';
        canvasWrap.appendChild(this.canvas);
        this.body.appendChild(div);
        this.body.appendChild(canvasWrap);
    };
    Canvas.prototype.testDomInit = function () {
        var div = document.createElement('div');
        div.style.width = this.config.width;
        div.style.padding = this.config.padding;
        div.style.color = this.config.color;
        div.style.border = '1px solid black';
        div.style.textAlign = 'center';
        div.style.margin = '20px 0 0 0';
        div.appendChild(this.dom);
        this.body.appendChild(div);
    };
    Canvas.prototype.canvasInit = function () {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        var size = this.init();
        this.canvas.width = size.width * this.rate;
        this.canvas.height = size.height * this.rate;
        this.canvas.style.width = size.width + 'px';
        this.canvas.style.height = size.height + 'px';
    };
    Canvas.prototype.domInit = function () {
        if (!inputDiv) {
            inputDiv = document.createElement('div');
            inputDiv.style.position = 'absolute';
            inputDiv.style.display = 'inline-block';
            inputDiv.style.visibility = 'hidden';
            inputDiv.style.fontSize = this.config.fontSize;
            inputDiv.style.fontFamily = this.config.fontFamily;
            document.body.appendChild(inputDiv);
        }
        var startX = parseInt(this.config.padding, 10);
        var startY = startX;
        var endX = parseInt(this.config.width, 10) - startX;
        var beginX = startX;
        var beginY = startY;
        var maxWidth = 0;
        for (var _i = 0, _a = this.config.text; _i < _a.length; _i++) {
            var i = _a[_i];
            var width = getLength(i);
            var eX = beginX + width;
            if (eX > endX) {
                if (beginX > maxWidth) {
                    maxWidth = beginX;
                }
                beginX = startX + width;
            } else {
                beginX = eX;
            }
        }
        this.dom = document.createElement('div');
        this.dom.style.width = maxWidth + 'px';
        this.dom.innerText = this.config.text;
        this.dom.style.display = 'inline-block';
        this.dom.style.fontSize = this.config.fontSize;
        this.dom.style.fontFamily = this.config.fontFamily;
        this.dom.style.textAlign = 'left';
        this.dom.style.color = this.config.color;
    };
    Canvas.prototype.init = function () {
        var _this = this;
        // 暂定4边padding等宽
        var startX = parseInt(this.config.padding, 10);
        var startY = startX;
        var endX = parseInt(this.config.width, 10) - startX;
        var getWidth = function getWidth(val) {
            _this.ctx.save();
            _this.ctx.font = _this.config.fontSize + " " + _this.config.fontFamily;
            var height = _this.ctx.measureText(val).width;
            _this.ctx.restore();
            return height;
        };
        var getLineHeight = function getLineHeight() {
            var height = getWidth('w');
            if (!_this.config.lineHeight) {
                // 不存在
                return 1.5 * height;
            }
            if (typeof _this.config.lineHeight === 'number') {
                return _this.config.lineHeight * height;
            }
            return parseInt(_this.config.lineHeight, 10);
        };
        var lineHeight = getLineHeight();
        var beginX = startX;
        // let beginY = startY + lineHeight;
        var beginY = startY;
        var size = parseInt(this.config.fontSize, 10) * this.rate + 'px';
        this.ctx.save();
        this.ctx.fillStyle = this.config.color;
        this.ctx.font = size + " " + this.config.fontFamily;
        this.ctx.textBaseline = 'top';
        var maxWidth = 0;
        for (var _i = 0, _a = this.config.text; _i < _a.length; _i++) {
            var i = _a[_i];
            var width = getWidth(i);
            var eX = beginX + width;
            var margin = getMargin(i);
            if (eX > endX) {
                // console.log(beginX);
                if (beginX > maxWidth) {
                    maxWidth = beginX;
                }
                beginX = startX;
                beginY += lineHeight;
                this.ctx.fillText(i, beginX * this.rate, beginY * this.rate);
                beginX += width;
            } else {
                this.ctx.fillText(i, beginX * this.rate, beginY * this.rate);
                beginX = eX;
            }
        }
        this.ctx.restore();
        return {
            width: maxWidth,
            height: beginY + startY + lineHeight
        };
    };
    return Canvas;
}();

return Canvas;

})));
//# sourceMappingURL=bundle.js.map
