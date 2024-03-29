
export class Debounce {
    /**
 * @param func 需要包装的函数
 * @param delay 延迟时间，单位ms
 * @param immediate 是否默认执行一次(第一次不延迟)
 */
    public use = (fn: Function, delay: number = 1000, immediate: Boolean = false): Function => {
        let timer: number | null
        return (...args: any) => {
            if (timer) clearTimeout(timer)
            if (immediate) {
                if (!timer) fn.apply(this, args);
                timer = setTimeout(function () { timer = null }, delay)
            } else {
                timer = setTimeout(() => {
                    fn.apply(this, args)
                }, delay)
            }
        }
    }
}

//节流
export class Throttle {
    public use = (fn: Function, delay: number = 500, immediate: Boolean = false) => {
        let pre = Date.now();
        return (...args: any) => {
            let cur = Date.now();
            if (immediate) {
                fn.apply(this, [...args])
                immediate = false
            }
            if (cur - pre >= delay) {
                fn.apply(this, [...args])
                pre = Date.now()
            }
        }
    }
}
