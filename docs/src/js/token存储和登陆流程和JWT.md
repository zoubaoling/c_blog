## token存储在sessionStorage还是localStorage
> token：验证身份的令牌，一般就是用户通过账号密码登录后，服务端把这些凭证通过加密等一系列操作后得到的字符串

1. 存loaclstorage里，后期每次请求接口都需要把它当作一个字段传给后台
     - 简单易用，持久存储，需要在客户端管理，不参与发送到服务器的HTTP请求
     - 容易受到XSS跨站脚本攻击，如果攻击者可以在页面执行恶意脚本，可以轻易访问到LocalStorage并窃取令牌
2. 存cookie中，会自动发送，缺点数据大小有限制
     - 存储在浏览器中，跟随请求自动发送
     - 可以配置HttpOnly，提高安全性，cookie无法通过脚本访问
     - 设置SameSite，减少CSRF跨站请求伪造的风险(`Strict Lax None`是否自动携带cookie)
     - 持久存储，可以设置过期时间
     - 如果没有设置HttpOnly和SameSite，可能受到XSS和CSRF的攻击
     - 数据大小有限制
3. SessionStorage
     - 与LocalStoragel类似，但是数据仅在会话期间可用，简单易用，自带过期管理
     - 容易受到XSS攻击
     - 数据在不同窗口之间不共享
  
如果存在localstorage中，容易被XSS攻击，但是如果做好了对应的措施，那么是利大于弊

## token的登陆流程
1. 客户端用账号密码请求登录
2. 服务端收到请求后，需要去验证账号密码
3. 验证成功之后，服务端会签发一个token，把这个token发送给客户端
4. 客户端收到token后保存起来，可以放在cookie也可以是localstorage
5. 客户端每次向服务端发送请求资源的时候，都需要携带这个token
6. 服务端收到请求，接着去验证客户端里的token，验证成功才会返回客户端请求的数据

## 了解过JWT吗？
`JSON Web Token`通过JSON形式作为在web应用中的令牌，可以在各方之间安全的把信息作为JSON对象传输，用于实现用户认证和授权

JWT组成部分：头部Header,有效载荷Payload, 签名Signature，最终通过点`.`连接起来
  - Header: Token的类型- JWT，使用的哈希算法- RSA等
  - Payload: 需要传输的数据-用户ID、过期时间等，在JWT中透明，拥有JWT的人可以读取
  - Signature: 防止数据篡改，头部和载荷都会被密钥进行签名（为了验证消息在传递过程中没有改变，使用header中的算法生成，最终可以比对确认）
  
每个部分都会使用base64编码

示例：
  - `header: { type: 'JWT', alg: "HS256" }` -> 使用Base64编码后成一个字符串 -> 'xxxxx'
  - `payload: { name: '', admin: '', exp: 0, sub: '', ... }` -> 使用base64编码成一个字符串 -> 'xxx'
  - `signature`: 将编码后的header和payload用点(.)连接起来，形成一个字符串，使用header指定的算法和一个密钥对组合字符串签名，生成一个散列摘要，而不是加密
  - 最终将编码后的字符用点`.`拼接，形成完整的JWT
  
**JWT的认证流程**
1. 前端把账号密码发送给后端的接口
2. 后端核对账号密码成功后，把用户id等其他信息作为JWT 负载，把它和头部分别进行base64编码拼接后签名，形成一个JWT（token）。
3. 前端请求时都会把JWT放在HTTP请求头的Authorization字段内
4. 后端检查是否存在，如果存在就验证JWT的有效性（签名是否正确，token是否过期）
5. 验证通过后后端使用JWT中包含的用户信息进行其他的操作，并返回对应结果
     - 将JWT分解，把头部和载荷进行签名，将新签名与JWT中的签名进行比对
   
简洁、包含性、因为Token是JSON加密的形式保存在客户端，所以JWT是`跨语言`的，原则上是任何web形式都支持。

### JWT和Token
- Token是服务器随机生成的字符串，对用户不可解，不一定base64， JWT是JSON形式，内容对持有者可读，除非加密
- Token适合简单的认证机制，不需要传输额外的信息；JWT适合需要在不同系统或组件间安全传递信息，比如单点登录
- 都可以存储在Cookie或LocalStorage中，但是JWT包含敏感数据
- Token依赖数据库存储额外信息，JWT自身包含，可以减少数据库查询

