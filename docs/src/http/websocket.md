## 说说对WebSocket的理解？应用场景？
### 定义
WebSocket是一种网络传输协议，位于OSI模型的应用层
  - 可在单个TCP连接上进行全双工通信，客户端和服务器只需要完成一次握手，两者之间就可以创建持久性的连接，并进行双向数据传输（通信连接前，使用HTTP协议进行握手，从HTTP连接升级为WebSocket连接）
  - 能更好的节省服务器资源和带宽并达到实时通迅

### 特点
1. 全双工，支持双向通信，实时性更强
2. 引入ws和wss分别表示明文和密文，默认端口分别是80和443，wss://www.chrono.com:443/im?user_id=xxx
3. 数据格式比较轻量，性能开销小，通信高效。不同于Http每次都需要携带完整的头部
4. 没有同源限制，客户端可以和任何服务器通信
5. 保持连接状态，直到被任何一方终止（后端设置了超时断线时间或网络异常等），创建通信后，可省略状态信息，不同于HTTP每次请求需要携带身份验证
6. 更好的二进制支持。可以发送文本，也可以发送二进制数据


### 应用场景
- 弹幕
- 聊天程序
- 基于位置的应用
- 实时报警
- 协同编辑
- 体育实况更新
- 股票基金报价实时更新

### 握手
> WS建立通信连接前，需要使用HTTP协议进行握手，服务器返回101响应，从HTTP连接升级为WebSocket连接

**请求头：**
```js
GET /chat HTTP/1.1
Host: server.example.com
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Key: dGhlIHNhbXBsZSBub25jZQ==
Origin: http://example.com
Sec-WebSocket-Protocol: chat, superchat
Sec-WebSocket-Version: 13
```
  - Connection：必须设置Upgrade，表示客户端希望连接升级
  - Upgrade：必须设置Websocket，表示希望升级到Websocket协议
  - Sec-WebSocket-Key：客户端临时生成一个 base64 编码的密文，用于简单的认证秘钥。要求服务端必须返回一个对应加密的“Sec-WebSocket-Accept应答，否则客户端会抛出错误，并关闭连接
  - Sec-WebSocket-Version ：表示支持的Websocket版本

**响应头**
```js
HTTP/1.1 101 Switching Protocols
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Accept: s3pPLMBiTxaQ9kYGzzhZRbK+xOo=Sec-WebSocket-Protocol: chat
```
  - HTTP/1.1 101 Switching Protocols：表示服务端接受 WebSocket 协议的客户端连接
  - Sec-WebSocket-Accep：验证客户端请求报文，同样也是为了防止误连接。具体做法是把请求头里“Sec-WebSocket-Key”的值，加上一个专用的 UUID，再计算摘要


### 注意事项
- 注意消息处理的频率，避免无限制消耗
- 使用WSS加密
- 检查origin来源，避免劫持
- 实施合理的超时机制，自动断开非活动或异常的连接

### 心跳保活机制
WS是一个长连接，需要一个鉴活机制，保证连接正常，作用：
1. 定时发送消息给服务端，让服务端知道连接还在继续，避免设置了超时自动断连
2. 检测正常连接状态下，服务端是否正常。定时发送检测信息给服务端，服务端按照约定要发送一个信息给浏览器，否则就按照超时处理

**使用方法**
- new WebSocket(url)
- ws.onmessage onopen onerror onclose | addEventListener('message...')
- ws.readyState
- ws.send(data) | close()

**示例代码**
1. 初始化WS，先初始化状态：关闭连接、移出事件绑定、清理心跳保活定时器
2. open监听：执行保活方法-发送保活信息、定时器超时重连
3. message监听：1.业务数据处理；2.收到心跳响应数据，清理定时器，重新执行保活方法
4. error监听：重连
```js
let socket,heartBeatTimeout
const sendHeatBeat = ()=>{
  //如果超过十秒未收到心跳响应消息，则重新建立连接
  socket.send('heartBeat-request')
  heartBeatTimeout = setTimeout(()=>{
    initWs()
  },10000)
}
const onOpen = ()=>{
  sendHeatBeat()
}
const onMessage = e => {
  if(e.data === 'heartBeat-response') {
    //收到心跳响应消息，则重新计时
    clearTimeout(heartBeatTimeout)
    heartBeatTimeout = null
    sendHeatBeat()
  }
}
const onError = () => {
  //连接失败后，需要重新建立连接
  initWs()
}
const destroyWs = ()=>{
  if(socket) {
    socket.close()
    socket.removeEventListener('open',onOpen)
    socket.removeEventListener('message',onMessage)
    socket.removeEventListener('error',onError)
    clearTimeout(heartBeatTimeout)
    heartBeatTimeout = null
  }
}
const initWs = ()=>{
  destroyWs()
  socket = new WebSocket('ws://localhost:8080');
  socket.addEventListener('open',onOpen)
  socket.addEventListener('message',onMessage)
  socket.addEventListener('error',onError)
}
initWs()
```