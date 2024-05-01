## 你是怎么理解ES6中Proxy的？使用场景有哪些
### 定义
用于定义基本操作的自定义行为，创建指定对象的代理，实现基本操作的拦截和自定义

### 使用
new Proxy接收两个参数
  - 第一个是需要拦截的对象
  - 第二个是自定义行为handler，一个包含了各种函数属性的对象，定义了个操作的代理行为
handler支持的拦截属性
  - get(target, propKey, receiver) 拦截属性的读取
  - set(target, propKey, value, receiver) 拦截属性的设置
  - deleteProperty(target, propKey) 拦截属性的删除
  - ownKeys(target) 拦截Object.keys和for in、Object.assign、Object.getOwnPropertyNames、Object.getOwnPropertySymbols等循环，返回一个数组
  - apply(target, object, arts) 调用一个函数
  - construct(target, arts) 拦截new调用一个函数
  - getPrototypeOf(target)：拦截Object.getPrototypeOf(proxy)，返回一个对象
  - setPrototypeOf(target, proto)：拦截Object.setPrototypeOf(proxy, proto)，返回一个布尔值
  - getOwnPropertyDescriptor(target, propKey)：拦截Object.getOwnPropertyDescriptor(proxy, propKey)，返回属性的描述对象
- has(target, propKey), 拦截in操作符

代理撤销 `Proxy.revocable`
```js{4}
const { proxy, revoke } = Proxy.revocable
revoke()
// revoke执行后，proxy不可用
```
Reflect拥有proxy支持的代理行为的同名方法，可以改变一些默认行为，比如异常时不是报错，而是返回false

### 使用场景
- 拦截和监听外部对对象的访问
- 在复杂操作前对操作进行校验或对所需资源进行管理

- [ ] Proxy各实例讲解 深入理解ES6