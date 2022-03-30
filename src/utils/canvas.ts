export interface CanvasContext {
    ctx: CanvasRenderingContext2D 
    dpi: number
}
export function initCanvas(width = 400, height = 400, _dpi?: number):CanvasContext {
    let canvas: HTMLCanvasElement
    canvas = document.getElementById("canvas") as HTMLCanvasElement;
    // 如何dom节点中没有canvas则新建一个
    if (!canvas) {
        canvas = document.createElement("canvas") as HTMLCanvasElement;
        canvas.id = "canvas"
        document.body.appendChild(canvas)
    }
    const ctx:CanvasRenderingContext2D  = canvas.getContext('2d')!;
    const dpr = window.devicePixelRatio || 1; //像素比

    const bsr = 1;
    const dpi = _dpi || dpr / bsr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    canvas.width = dpi * width;
    canvas.height = dpi * height;
    ctx.scale(dpi, dpi)

    return { ctx, dpi }
}