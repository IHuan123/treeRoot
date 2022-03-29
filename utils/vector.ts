export type Vector = [number,number];
export const r180 = Math.PI
export const r90 = Math.PI / 2
export const r60 = Math.PI / 3
export const r45 = Math.PI / 4
export const r15 = Math.PI / 12


/**
 * 
 * @param x 起点x轴
 * @param y 起点y轴
 * @param r 半径
 * @param theta 方向
 * @returns 
 */
export function polar2cart(x = 0, y = 0, r = 0, theta = 0) {
    // dx dy 通过方向得到x,y坐标
    const dx = r * Math.cos(theta); 
    const dy = r * Math.sin(theta); 
    return [x + dx, y + dy]
}