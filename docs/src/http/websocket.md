## WebSocket 面试速记

> WebSocket 基于 TCP、位于应用层。一次握手即可建立全双工长连接，消息头开销极小，同时支持文本与二进制。

### 核心特性
- **一次握手，持久通信**：先通过 HTTP `Upgrade` 协议，成功后复用同一 TCP 通道双向传输。
- **全双工低延迟**：客户端与服务端可随时互发消息，不再依赖轮询或长轮询。
- **帧格式轻量**：相比 HTTP，每条消息只需极少头部字段，适合高频推送。
- **跨域无同源限制**：握手阶段可跨域，服务端需校验 `Origin` 头防止滥用。
- **天然支持二进制**：`Opcode` 可选文本、二进制或控制帧。
- **ws / wss**：明文与 TLS 加密版，默认端口 80 / 443，线上推荐 `wss`。

### 典型场景
- 实时聊天、客服、弹幕系统。
- 行情、体育比分、物流轨迹等实时数据推送。
- 协同编辑、在线白板、多玩家互动。
- IoT 设备状态同步、位置共享。

### 握手流程速记（HTTP Upgrade）
1. 浏览器发起 HTTP 请求，关键头：
   - `Connection: Upgrade`
   - `Upgrade: websocket`
   - `Sec-WebSocket-Key`: 客户端随机 base64 字符串
   - `Sec-WebSocket-Version: 13`
   - （可选）`Sec-WebSocket-Protocol`: 子协议协商
2. 服务端校验后返回 101：
   - `HTTP/1.1 101 Switching Protocols`
   - `Upgrade: websocket`
   - `Connection: Upgrade`
   - `Sec-WebSocket-Accept`: 对 `Sec-WebSocket-Key + GUID` 做 SHA1 后 base64
3. 升级成功，后续按 WebSocket 帧规范传输，脱离 HTTP。

```http
GET /chat HTTP/1.1
Connection: Upgrade
Upgrade: websocket
Sec-WebSocket-Key: dGhlIHNhbXBsZSBub25jZQ==
Sec-WebSocket-Version: 13

HTTP/1.1 101 Switching Protocols
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Accept: s3pPLMBiTxaQ9kYGzzhZRbK+xOo=
```

### 帧结构速记
- `FIN`：是否为消息的最后一帧，可对大消息分片传输。
- `Opcode`：0x1 文本，0x2 二进制，0x8 Close，0x9/0xA 为 Ping/Pong。
- `Mask`：浏览器发出的帧必须带掩码，服务端返回可不带。
- `Payload length`：支持 7 / 16 / 64 位长度编码，最大可达 2^63−1。

### 实战注意点
- **鉴权**：握手时携带 Cookie/Token，或在首帧补充认证；服务端应校验并拒绝非法连接。
- **Origin 校验**：严格检查 `Origin`，防止被恶意页面劫持。
- **限流与监控**：限制单连接消息频率与大小，记录连接数、失败率、重连次数。
- **部署**：网关需透传 `Upgrade` 头；负载均衡需粘性会话或借助消息中间件同步。
- **安全**：优先使用 `wss`，结合权限控制、防注入、防暴力刷连接。

### 心跳 + 重连要点
- **为什么需要心跳？** 长连接可能被网关或 NAT 空闲回收，或在弱网环境下悄悄断掉。定期发送心跳可以：
  1. 证明客户端仍在线，让服务端/中间设备保持连接。
  2. 及时发现“假存活”连接，超时后主动重连。
- **流程概览**：建立连接 → 发送 `ping` → 等待服务端 `pong` → 收到则重置心跳，不到达则触发重连；`close/error` 事件同样进入重连逻辑。
- **重连策略**：使用指数退避（每次延迟翻倍，有上限），避免短时间高频重试导致雪崩。
- **业务隔离**：心跳与业务消息分开处理，避免互相干扰。

```js
const HEARTBEAT = 30000;  // 30s 发送一次 ping
const TIMEOUT = 8000;     // 8s 内未收到 pong 判定失活
let ws;
let heartbeatTimer;
let timeoutTimer;
let retry = 0;

function connect() {
  cleanup();
  ws = new WebSocket('wss://example.com/im');
  ws.addEventListener('open', onOpen);
  ws.addEventListener('message', onMessage);
  ws.addEventListener('close', onBreak);
  ws.addEventListener('error', onBreak);
}

function onOpen() {
  retry = 0;
  sendHeartbeat(true);        // 首次立即发送心跳
}

function onMessage(event) {
  const data = JSON.parse(event.data);
  if (data.type === 'pong') {
    sendHeartbeat(false);     // 收到回应，排程下一次心跳
  } else {
    // TODO: 处理业务消息
  }
}

function sendHeartbeat(immediate) {
  clearTimeout(heartbeatTimer);
  clearTimeout(timeoutTimer);

  heartbeatTimer = setTimeout(() => {
    ws?.send(JSON.stringify({ type: 'ping', ts: Date.now() }));
    timeoutTimer = setTimeout(() => onBreak('heartbeat-timeout'), TIMEOUT);
  }, immediate ? 0 : HEARTBEAT);
}

function onBreak(reason) {
  if (ws?.readyState === WebSocket.CLOSING || ws?.readyState === WebSocket.CLOSED) {
    // no-op
  } else {
    ws?.close();
  }
  retry += 1;
  const delay = Math.min(15000, 2000 * retry); // 2s 起步，封顶 15s
  setTimeout(connect, delay);
  console.warn(`WebSocket reconnect (${reason ?? 'break'}), wait ${delay}ms`);
}

function cleanup() {
  clearTimeout(heartbeatTimer);
  clearTimeout(timeoutTimer);
  if (ws) {
    ws.removeEventListener('open', onOpen);
    ws.removeEventListener('message', onMessage);
    ws.removeEventListener('close', onBreak);
    ws.removeEventListener('error', onBreak);
  }
}

connect();
```

### 面试追问关键词
- WebSocket 与轮询 / SSE 有何差别，分别适合什么场景？
- 如何做鉴权、Origin 校验、限流和异常监控？
- 心跳与断线重连如何设计，怎样避免“假活”连接？
- 集群部署时如何广播消息、保持会话粘性？
- 代理/网关需要哪些配置才能支持 `Upgrade`？

答题顺序建议：**是什么 → 场景 → 握手流程 → 帧结构 → 实战（心跳/重连/安全） → 常见追问**，即可覆盖大多数面试问题。

::: details 常见追问参考答案
- **WebSocket vs 轮询 / SSE**：
  - 轮询是客户端定期发送 HTTP 请求，延迟高且浪费带宽；长轮询改进了频率，但依然是单向、重复建立连接。
  - SSE（Server-Sent Events）是单向推送，只能服务器 → 客户端；若需要客户端发消息仍要额外通道。
  - WebSocket 一次握手后双向、低延迟，适合高实时、双方交互场景。
- **鉴权 / Origin / 限流 / 监控**：
  - 握手阶段携带 Cookie / Token / Query，服务端校验后存储用户信息；必要时在首帧内再次认证。
  - 严格检查 `Origin` 头，只接受可信来源；可结合白名单或签名校验。
  - 通过连接数限制、单连接消息频率限制以及总带宽限制来防止滥用；配合日志、告警监控异常断开与重连。
- **心跳 + 断线重连设计、避免假活**：
  - 定期发送 `ping`，若在超时时间内未收到 `pong`，主动关闭并重连。
  - 服务端也可下发心跳或检测 send queue 长度，双向监控。
  - 业务层可在消息里携带时间戳/序列号，校验延迟、重复或乱序，保证“真在线”。
- **集群广播与粘性会话**：
  - 多实例部署时可使用 Redis Pub/Sub、消息队列或专用 WebSocket 网关广播消息。
  - 若依赖本地 session，需要负载均衡开启粘性会话（如 IP hash / cookie hash）；更推荐将 session 存入共享存储。
- **代理 / 网关 配置**：
  - 需确保反向代理（Nginx、Envoy、CDN）透传 `Upgrade` 和 `Connection` 头，并启用 `proxy_http_version 1.1`。
  - 调整超时时间，防止代理层过快关闭空闲连接。
  - 如果使用 HTTPS，需要配置 `wss` 证书，保证端到端加密。
- **降级方案**：
  - 若浏览器或后端不支持 WebSocket，可退回到 SSE（只推送）或长轮询；对双向场景，也可采用 WebRTC DataChannel（复杂度更高）。
:::
