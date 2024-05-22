/**
 * @description 策略模式将一系列算法封装起来，组成包括策略类和上下文类
 */
// 定义的文件
enum POP_TYPES {
  POP_TEXT,
  POP_VIDEO,
  POP_INFO
}
interface PopStrategy {
  (...args: any[]): void
}
const showTextPop: PopStrategy = (...args) => console.log(args)
const showVideoPop: PopStrategy = (...args) => console.log(args)
const showInfoPop: PopStrategy = (...args) => console.log(args)
const POP_STRATEGY = {
  [POP_TYPES.POP_TEXT]: showTextPop,
  [POP_TYPES.POP_VIDEO]: showVideoPop,
  [POP_TYPES.POP_INFO]: showInfoPop
}
const executePopStrategy = (strategy: POP_TYPES, ...args: any[]) => POP_STRATEGY[strategy]?.(...args)
// 使用的文件
const operateVideo = () => {
  executePopStrategy(POP_TYPES.POP_VIDEO)
}