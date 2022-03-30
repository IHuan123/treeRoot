import { initCanvas, polar2cart, r180, r90, r15, CanvasContext } from "@/utils/index";
import { Debounce } from "@/utils/tools"
import useRafFn from "@/utils/useRafFn";
const { random } = Math

interface Options{
    watchWindowSize?: boolean
}
const defaultOptions:Options = {
    watchWindowSize:false
}
export default class Plum {
    private ctx: CanvasRenderingContext2D
    private grd: CanvasGradient
    private controls: useRafFn
    //canvans 尺寸
    private width: number = document.body.clientWidth
    private height: number = document.body.clientHeight

    //下一个点
    private steps: any[] = []
    //上一个点
    private prevSteps: any[] = []
    private iterations = 0
    private readonly len: number = 5
    private readonly init: number = 5


    constructor(options:Options = defaultOptions) {
        let canvasInfo: CanvasContext = initCanvas(this.width, this.height);
        this.ctx = canvasInfo.ctx;

        this.grd = this.ctx.createLinearGradient(0, 0, this.width, this.height);
        let lineColorW = ~~(random() * 4) + 2;
        this.grd.addColorStop(0, `#00E676${lineColorW}0`);
        this.grd.addColorStop(0.5, `#00E5FF${lineColorW}0`);
        this.grd.addColorStop(1, `#FF3D00${lineColorW}0`);
        this.controls = new useRafFn(this.frame);
        this.start()
        if(options.watchWindowSize){
            this.resize()
        }
    }
    /**
     * 
     * @param x x坐标
     * @param y y坐标
     * @param rad偏移角度
     * @returns void
     */
    step = (x: number, y: number, rad: number) => {
        const length = random() * this.len;

        //随机获取下一个坐标
        const [nx, ny] = polar2cart(x, y, length, rad);
        this.ctx.beginPath();
        this.ctx.moveTo(x, y);
        this.ctx.lineTo(nx, ny);
        const linW = 1;
        this.ctx.lineWidth = linW;
        this.ctx.strokeStyle = this.grd;

        this.ctx.stroke();
        const rad1 = rad + random() * r15;
        const rad2 = rad - random() * r15;
        if (nx < -100 || nx > this.width + 100 || ny < -100 || ny > this.height + 100) return;
        if (this.iterations <= this.init || random() > 0.5)
            this.steps.push(() => this.step(nx, ny, rad1));
        if (this.iterations <= this.init || random() < 0.5)
            this.steps.push(() => this.step(nx, ny, rad2));
    }
    /**
     * 遍历绘画所有点
     */
    frame = () => {
        this.iterations += 1;
        this.prevSteps = this.steps;
        this.steps = [];
        if (!this.prevSteps.length) {
            this.controls.pause();
        }
        this.prevSteps.forEach((i) => i());
    }
    // 开始
    start = () => {
        this.iterations = 0;
        //每次开始都要clear画布
        this.ctx.clearRect(0, 0, this.width, this.height);
        //随机生成两颗树(窗口上下/左右相对的)
        this.steps =
            random() < 0.5
                ? [
                    () => this.step(0, random() * this.height, 0),
                    () => this.step(this.width, random() * this.height, r180),
                ]
                : [
                    () => this.step(random() * this.width, 0, r90),
                    () => this.step(random() * this.width, this.height, -r90),
                ];
        this.controls.resume(); //开始
    }
    // 监听window尺寸
    resize = () => {
        const resizeStart = new Debounce().use(this.start);
        // const throttleResize = new Throttle().use(()=>{

        // },100)
        window.addEventListener("resize", (e) => {
            this.width = document.body.clientWidth;
            this.height = document.body.clientHeight;
            this.ctx = initCanvas(this.width, this.height).ctx;
            if (this.controls.isActive) this.controls.pause();
            //每次开始都要clear画布
            this.ctx.clearRect(0, 0, this.width, this.height);
            resizeStart()
        }, false)
    }
}