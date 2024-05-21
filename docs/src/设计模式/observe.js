/**
 * @description 观察者模式
 * 主体对象 Subject: 观察者列表，添加观察者，删除观察者，通知观察者
 * 观察者 Observe：更新方法(暴露给主体对象使用)
 */
class Subject {
  constructor () {
    this.observes = []
  }
  addObserve (observe) {
    this.observes.push(observe)
  }
  removeObserve (observe) {
    this.observes = this.observes.filter(item => item !== observe)
  }
  notify (...rest) {
    if (this.observes.length > 0) {
      this.observes.forEach(observe => {
        observe.update(...rest)
      })
    }
  }
}
class Observe {
  constructor (name) {
    this.name = name
  }
  update (...data) {
    console.log(this.name + 'update:', ...data)
  }
}
const subject = new Subject()
const ob1 = new Observe('ob1')
const ob2 = new Observe('ob2')
subject.addObserve(ob1)
subject.addObserve(ob2)
subject.notify(1, 2)
