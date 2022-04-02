
class Raf  {
    private timer:number = -1
    private callbackFn:Function = ()=>{}
    isActive:Boolean = false
    constructor(fn:Function){
        this.callbackFn = fn
        this.loop = this.loop.bind(this)
        this.resume = this.resume.bind(this)
        this.pause = this.pause.bind(this)
    }
    private loop(){
        if(!this.isActive) return;
        this.callbackFn()
        this.timer = requestAnimationFrame(this.loop)
    }
    //停止
    pause(){
        if(this.timer > 0 && this.isActive){
            this.isActive = false;
            cancelAnimationFrame(this.timer);
            this.timer = -1;           
        }
    }
    //开始
    resume(){
        this.isActive = true;
        this.loop()
    }
}

export default Raf
