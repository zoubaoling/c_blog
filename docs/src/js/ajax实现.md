## ajax是什么？怎么实现的？
AJAX: Async Javascript and XML异步的JS和XML，创建交互式网页应用的网页开发技术，在不重新加载整个网页的前提下，与服务器交换数据并更新部分内容
简单来说是：通过XmlHttpRequest(xhr)对象向服务器发送异步请求，然后从服务器拿到数据，最后通过JS操作DOM更新页面
**实现过程：**
  1. 创建XmlHttpRequest对象 xmh`new XMLHttpRequest()`
  2. 通过xmh对象里的open()方法和服务器建立连接`xml.open(method, url, [async: true][, user: null][, password: null])`
  3. 构建请求所需的数据，并通过xmh对象的send()发送给服务器`xml.send([body])`,get请求参数在URL中，body中为null
  4. 通过xmh对象的onreadystatechange事件监听服务器和web的通信状态`xml.onreadystatechange``xml.readyState === 4` `xml.status` `xml.responseText`
  5. 接收并处理服务器响应的数据结果
  6. 把处理的数据更新到HTML页面上

简单实现：
```javascript
function ajax ({ type = 'GET', url = '', data, success = () => (), fail: () => () } = {}) {
  const xhr = new XMLHttpRequest();
  type = type.toUpperCase()
  const isGet = type === 'GET'
  const realUrl = isGet ? url + '?' + data : url
  const params = isGet ? null : data 
  xhr.open(type, realUrl, true)
  xhr.send(params)

  xhr.onreadystatechange = (e) => {
    if (xhr.readyState === 4) {
      const status = xhr.status
      if (status >= 200 && status < 300) {
        success(xhr.responseText)
      } else {
        fail()
      }
    }
  }
}
```

### ajax fetch axios
- ajax
  - 基于原生XHR开发
  - 配置和调用方式混乱，使用不方便。事件异步模型不友好
- fetch
  - ajax替代品，es6出现，基于promise实现，支持async/await
  - 不是ajax的进一步封装，没有使用xhr,是原生的JS
  - 语法简介，更加语义化，API丰富
  - 默认不带cookie，需要配置
  - 无法监测请求进度(xhr可以)和终止请求
  - 只对网络请求报错，400 500都会看作成功请求
  - 不支持IE
- axios
  - 基于promise封装的http客户端，用于浏览器和node.js，浏览器发起xhr,node端发起http请求
  - 可以监测请求进度(xhr可以)和终止请求，自动转换JSON数据
  - 提供了广泛的请求和响应拦截
  - 客户端支持抵御XSRF攻击
  - 浏览器兼容比较好，包括IE
  - 功能比较丰富
  
#### 取消请求
- xhr: `xhr.abort()` status变为0，network中status变为Cancel
- fetch和axios都可以使用AbortController API，axios的CancelToken已经废弃了, axios.0.22.0后支持AbortController
  - 构造实例: `const controller = new AbortController()`
  - 将只读属性Signal传到请求中，将控制器与请求相关联 `{signal: controller.signal}`
  - 使用`controller.abort(message)`取消，可以用try/catch捕获message错误信息
  - catch响应error中通过axios.isCancel(error)可以判断是否取消，error.message

> AbortController可以取消单个或多个请求，与一个AbortController实例的signal属性关联的请求都会被取消

axios取消请求封装示例
```javascript
// http.js
import axios from 'axios';
// 存储每个请求的取消控制器
const cancelTokenMap = new Map();
// 存储每个请求的取消状态
const requestCancellationStatus = new Map();
const http = axios.create({
    baseURL: 'https://api.example.com',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json'
    }
});
// 请求拦截器
http.interceptors.request.use(config => {
    const { cancelable } = config;    
    if (cancelable) {
        const controller = new AbortController();
        config.signal = controller.signal;
        const key = `${config.url}-${config.method}`;

        cancelTokenMap.set(key, controller);
        requestCancellationStatus.set(key, false);  // 初始状态为未取消
    }

    return config;
}, error => {
    return Promise.reject(error);
});

// 响应拦截器
http.interceptors.response.use(response => {
    const config = response.config;
    const key = `${config.url}-${config.method}`;

    if (config.cancelable) {
        cancelTokenMap.delete(key);
        requestCancellationStatus.delete(key);
    }
    return response;
}, error => {
    if (axios.isCancel(error)) {
        const key = `${error.config.url}-${error.config.method}`;
        console.log('Request canceled', error.message);
        requestCancellationStatus.set(key, true);  // 标记为已取消
    }
    return Promise.reject(error);
});

// 提供一个方法来取消请求
http.cancelRequest = (url, method = 'get') => {
    const key = `${url}-${method}`;
    if (cancelTokenMap.has(key)) {
        const controller = cancelTokenMap.get(key);
        controller.abort();
        cancelTokenMap.delete(key);
        requestCancellationStatus.set(key, true);  // 标记为已取消
    }
};

// 提供一个方法来检查请求是否已被取消
http.isRequestCancelled = (url, method = 'get') => {
    const key = `${url}-${method}`;
    return requestCancellationStatus.get(key) || false;
};

export default http;
```
使用
```javascript
import http from './http';
// 发起一个可取消的请求
http.get('/data', { cancelable: true })
    .then(response => console.log(response))
    .catch(error => console.error('Error:', error));

// 如果需要取消上面的请求
http.cancelRequest('/data', 'get');

```
