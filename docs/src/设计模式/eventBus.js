
/**
 * @description 发布订阅模式
 * 消息总线 EventBus: 订阅事件、发布事件、移除事件
 * 发布者Publisher 可以继承消息总线或者绑定上下文, 向消息总线发布
 * 订阅者Subscriber 可以继承消息总线或者绑定上下文，向消息总线订阅
 */
class EventBus {
  constructor () {
    this.events = new Map()
  }
  on (type, handler) {
    if (!this.events.has(type)) {
      this.events.set(type, [])
    }
    this.events.get(type).push(handler)
  }
  off (type, handler) {
    if (this.events.has(handler)) {
      const handlers = this.events.get(type)
      const index = handlers.indexOf(handler)
      if (index !== -1) handlers.splice(index, 1)
      this.events.delete(type)
    if (handlers.length === 0) this.events.delete(handler)
    }
  }
  emit (type, ...args) {
    if (this.events.has(type)) {
      this.events.get(type).forEach(handler => {
        handler(...args)
      })
    }
  }
  once (type, handler) {
    const _wrap = (...args) => {
      handler(...args)
      this.off(type, _wrap)
    }
    this.on(type, _wrap)
  }
}
const eventBus = new EventBus()
const onTest = (...data) => console.log('update:', ...data)
eventBus.on('login', onTest)
eventBus.emit('login', 2, 3)

class Publisher {
  constructor (context) {
    this.context = context
  }
  publish (type, data) {
    this.context.emit(type, data)
  }
}
class Subscriber {
  constructor (context) {
    this.context = context
  }
  subscribe (type, cb) {
    this.context.on(type, cb)
  }
}