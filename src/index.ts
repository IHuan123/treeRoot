import { initCanvas, polar2cart, r180, r90, r15 } from "@/utils/index";
import { Debounce, Throttle } from "@/utils/tools"
import useRafFn from "@/utils/useRafFn";
const { random } = Math
const f = {
  start: () => {
    console.log("start");
  },
};

let init = 5, len = 5;
(function () {
  let el: HTMLCanvasElement = document.getElementById("draw") as HTMLCanvasElement,
    canvasWidth = document.body.clientWidth,
    canvasHeight = document.body.clientHeight;
  let { ctx } = initCanvas(el, canvasWidth, canvasHeight);

  //canvans高宽
  let { width, height } = el;
  const grd = ctx.createLinearGradient(0, 0, canvasWidth, canvasHeight);
  let lineColorW = ~~(random() * 4) + 2;
  grd.addColorStop(0, `#00E676${lineColorW}0`);
  grd.addColorStop(0.5, `#00E5FF${lineColorW}0`);
  grd.addColorStop(1, `#FF3D00${lineColorW}0`);

  //下一个点
  let steps: any[] = [];
  //上一个点
  let prevSteps: any[] = [];
  let iterations = 0;
  const step = (x: number, y: number, rad: number) => {
    const length = random() * len;

    //随机获取下一个坐标
    const [nx, ny] = polar2cart(x, y, length, rad);
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(nx, ny);
    const linW = 1;
    ctx.lineWidth = linW;
    ctx.strokeStyle = grd;

    ctx.stroke();
    const rad1 = rad + random() * r15;
    const rad2 = rad - random() * r15;
    if (nx < -100 || nx > width + 100 || ny < -100 || ny > height + 100) return;
    if (iterations <= init || random() > 0.5)
      steps.push(() => step(nx, ny, rad1));
    if (iterations <= init || random() < 0.5)
      steps.push(() => step(nx, ny, rad2));
  };

  // step(0,200,0)
  const frame = () => {
    iterations += 1;
    prevSteps = steps;
    steps = [];
    if (!prevSteps.length) {
      controls.pause();
    }
    prevSteps.forEach((i) => i());
  };
  
  const controls = new useRafFn(frame);
  f.start = () => {
    iterations = 0;
    //每次开始都要clear画布
    ctx.clearRect(0, 0, width, height);
    //随机生成两颗相对树
    steps =
      random() < 0.5
        ? [
            () => step(0, random() * height, 0),
            () => step(width, random() * height, r180),
          ]
        : [
            () => step(random() * width, 0, r90),
            () => step(random() * width, height, -r90),
          ];
    controls.resume(); //开始
  };
  f.start();
  
  const resizeStart = new Debounce().use(f.start);
  // const throttleResize = new Throttle().use(()=>{

  // },100)
  window.addEventListener("resize",function(e){
    canvasWidth = document.body.clientWidth;
    canvasHeight = document.body.clientHeight;
    ctx = initCanvas(el, canvasWidth, canvasHeight).ctx;
    [width,height]= [canvasWidth,canvasHeight];
    if(controls.isActive) controls.pause();
    //每次开始都要clear画布
    ctx.clearRect(0, 0, width, height);
    resizeStart()
  },false)

})()