import { getMargin } from './help';

enum type {
    canvas = 'canvas',
    dom = 'dom',
}

interface textConfig {
    text: string;
    width: string;
    fontSize: string;
    fontFamily: string;
    lineHeight?: string | number;
    color: string;
    padding: string;
    type: type;
}
let inputDiv: HTMLDivElement;

const getLength = (str: string) => {
    inputDiv.innerHTML = <string>new String(str.replace(/[ ]/g, '&nbsp;'));
    return inputDiv.getBoundingClientRect().width;
};

export default class Canvas {
    static debugger: boolean = false;
    config: textConfig;
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    dom: HTMLDivElement;
    body: HTMLElement;
    rate: number;

    constructor(config: textConfig) {
        this.config = config;
        this.body = document.body;
        this.rate = window.devicePixelRatio;

        if (this.config.type === 'canvas') {
            this.canvasInit();
            this.init();
            if (Canvas.debugger) {
                this.testCaseInit();
            }
        } else {
            this.domInit();
            if (Canvas.debugger) {
                this.testDomInit();
            }
        }
    }

    testCaseInit() {
        const div = document.createElement('div');
        const canvasWrap = document.createElement('div');
        div.innerText = this.config.text;
        div.style.width = this.config.width;
        div.style.fontSize = this.config.fontSize;
        div.style.fontFamily = this.config.fontFamily;
        div.style.lineHeight = this.config.lineHeight.toString();
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
    }

    testDomInit() {
        const div = document.createElement('div');
        div.style.width = this.config.width;
        div.style.padding = this.config.padding;
        div.style.color = this.config.color;
        div.style.border = '1px solid black';
        div.style.textAlign = 'center';
        div.style.margin = '20px 0 0 0';
        div.appendChild(this.dom);

        this.body.appendChild(div);
    }

    canvasInit() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        const size = this.init();
        this.canvas.width = size.width * this.rate;
        this.canvas.height = size.height * this.rate;
        this.canvas.style.width = size.width + 'px';
        this.canvas.style.height = size.height + 'px';
    }

    domInit() {
        if (!inputDiv) {
            inputDiv = <HTMLDivElement>document.createElement('div');
            inputDiv.style.position = 'absolute';
            inputDiv.style.display = 'inline-block';
            inputDiv.style.visibility = 'hidden';
            inputDiv.style.fontSize = this.config.fontSize;
            inputDiv.style.fontFamily = this.config.fontFamily;
            document.body.appendChild(inputDiv);
        }
        const startX = parseInt(this.config.padding, 10);
        const startY = startX;
        const endX = parseInt(this.config.width, 10) - startX;
        let beginX = startX;
        let beginY = startY;
        let maxWidth = 0;
        for (const i of this.config.text) {
            const width = getLength(i);
            const eX = beginX + width;
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
        this.dom.style.lineHeight = this.config.lineHeight.toString();
        this.dom.style.textAlign = 'left';
        this.dom.style.color = this.config.color;
    }

    init() {
        // 暂定4边padding等宽
        const startX = parseInt(this.config.padding, 10);
        const startY = startX;
        const endX = parseInt(this.config.width, 10) - startX;
        const getWidth = (val: string) => {
            this.ctx.save();
            this.ctx.font = `${this.config.fontSize} ${this.config.fontFamily}`;
            const height = this.ctx.measureText(val).width;
            this.ctx.restore();
            return height;
        };
        const getLineHeight = () => {
            const height = getWidth('w');
            if (!this.config.lineHeight) {
                // 不存在
                return 1.5 * height;
            }
            if (typeof this.config.lineHeight === 'number') {
                return this.config.lineHeight * height;
            }
            return parseInt(this.config.lineHeight, 10);
        };
        const lineHeight = getLineHeight();

        let beginX = startX;
        // let beginY = startY + lineHeight;
        let beginY = startY + lineHeight / 2;
        const size = parseInt(this.config.fontSize, 10) * this.rate + 'px';
        this.ctx.save();
        this.ctx.fillStyle = this.config.color;
        this.ctx.font = `${size} ${this.config.fontFamily}`;
        this.ctx.textBaseline = 'middle';
        let maxWidth = 0;
        for (const i of this.config.text) {
            const width = getWidth(i);
            const eX = beginX + width;
            const margin = getMargin(i);
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
            height: beginY + startY + lineHeight / 2,
        };
    }
}
