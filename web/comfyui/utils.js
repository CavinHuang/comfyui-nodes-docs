
/**
 * 节流函数
 */
export const throttle = function(fn, delay) {
  let lastTime = 0
  return function() {
    const now = Date.now()
    if(now - lastTime > delay) {
      fn.apply(this, arguments)
      lastTime = now
    }
  }
}

 
export function svgToBase64(svgString) {
  // 对SVG字符串进行编码
  const encodedSvg = encodeURIComponent(svgString).replace(/%([0-9A-F]{2})/g, function(match, p1) {
      return String.fromCharCode('0x' + p1);
  });

  // 将编码后的字符串转换为base64
  const base64 = btoa(encodedSvg);
  return 'data:image/svg+xml;base64,' + base64;
}