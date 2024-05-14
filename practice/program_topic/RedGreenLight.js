/**
 * @description 使用Promise实现红绿灯交替重复亮
 * 红灯3秒亮一次，绿灯2秒亮一次，黄灯1s亮一次，如何让三个灯不断交替重复亮
 */
// const red = () => console.log('red')
// const green = () => console.log('green')
// const yellow = () => console.log('yellow')

const LIGHT_INTERVAL = {
  RED: 1000,
  GREEN: 2000,
  YELLOW: 1000
}
const red = (interval = LIGHT_INTERVAL.RED) => {
  return new Promise(resolve => {
    console.log('red light')
    setTimeout(resolve, interval)
  })
}
const green = (interval = LIGHT_INTERVAL.GREEN) => {
  return new Promise(resolve => {
    console.log('green light')
    setTimeout(resolve, interval)
  })
}

const yellow = (interval = LIGHT_INTERVAL.YELLOW) => {
  return new Promise(resolve => {
    console.log('yellow light')
    setTimeout(resolve, interval)
  })
}
const trafficLight = () => {
  red()
    .then(green)
    .then(yellow)
    .then(trafficLight)
}
// trafficLight()
/**
 * 方案二：
 * 每一个方法内部使用promise实现
 * 遍历数组，promise.then中执行灯的方法
 * 遍历完重新开始执行
 * 搭配console.time(label) + console.timeEnd(label)查看代码执行时间
 * console.timeLog(label)是在timeEnd结束前查看中间执行时间
 */
class ExtendImplement {
  static lights = [
    { color: 'red', duration: 3000, func: () => console.log('red') },
    { color: 'green', duration: 2000, func: () => console.log('green') },
    { color: 'yellow', duration: 1000, func: () => console.log('yellow') }
  ]
  light ({ color, duration, func } = {}) {
    console.time(color)
    return new Promise(resolve => {
      setTimeout(() => {
        func()
        resolve()
        console.timeEnd(color)
      }, duration);
    })
  }
  run () {
    const lightSquence = ExtendImplement.lights.reduce((promise, lightConfig) => {
      return promise.then(() => this.light(lightConfig))
    }, Promise.resolve())
    // 或者箭头函数
    lightSquence.then(this.run.bind(this))
  }
}
const lightRun = new ExtendImplement()
lightRun.run()