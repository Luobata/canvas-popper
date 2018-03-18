import { getMargin } from './help';

interface textConfig {
    text: string;
    width: string;
    fontSize: string;
    fontFamily: string;
    lineHeight?: string | number;
    color: string;
    padding: string;
}
export default class TypeSetting {
    config: textConfig;
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    body: HTMLElement;

    constructor(config: textConfig) {
        this.config = config;
        this.body = document.body;

        this.canvasInit();
        this.init();
        this.testCaseInit();
    }

    testCaseInit() {
        const div = document.createElement('div');
        div.innerText = this.config.text;
        div.style.width = this.config.width;
        div.style.fontSize = this.config.fontSize;
        div.style.fontFamily = this.config.fontFamily;
        div.style.padding = this.config.padding;
        div.style.color = this.config.color;
        div.style.border = '1px solid black';

        this.canvas.style.border = '1px solid black';
        this.canvas.style.margin = '20px 0 0 0';

        this.body.appendChild(div);
        this.body.appendChild(this.canvas);
    }

    canvasInit() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.canvas.width = parseInt(this.config.width, 10);
        this.canvas.height = this.init();
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
        let beginY = startY;
        this.ctx.save();
        this.ctx.fillStyle = this.config.color;
        this.ctx.font = `${this.config.fontSize} ${this.config.fontFamily}`;
        this.ctx.textBaseline = 'top';
        for (const i of this.config.text) {
            const width = getWidth(i);
            const eX = beginX + width;
            const margin = getMargin(i);
            if (eX > endX) {
                beginX = startX;
                beginY += lineHeight;
                this.ctx.fillText(i, beginX, beginY);
                beginX += width;
            } else {
                this.ctx.fillText(i, beginX, beginY);
                beginX = eX;
            }
        }
        this.ctx.restore();

        return beginY + startY + lineHeight;
    }
}
