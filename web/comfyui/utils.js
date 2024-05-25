
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