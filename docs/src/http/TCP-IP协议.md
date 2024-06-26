## 如何理解TCP/IP协议?
`TCP/IP` 传输控制协议/网际协议，是指能够在多个不同网络间实现信息传输的协议簇- FTP、SMTP、TCP、UDP、IP
- TCP（传输控制协议）: 一种面向连接的、可靠的、基于字节流的传输层通信协议
- IP（网际协议）: 用于封包交换数据网络的协议

**划分**
1. 五层体系的协议结构: 应用层、传输层、网络层、数据链路层、物理层，为介绍网络原理设计的
2. TCP/IP四层体系结构: 应用层、传输层、网络层（网际互联层）、网络接口层, 实际应用的体系
   
- `应用层`: 负责一切与应用程序相关的功能，HTTP协议 FTP协议 DNS查询 SMTP(应用层 + 表示层 + 会话层)
- `传输层`: 提供可靠的传输服务
  - UPD 无连接 不安全
  - TCP 面向连接 数据可靠
- `网络层`: 负责数据在不同网络间的传输，选择合适的路由和交换节点，确保数据成功传送- IP ARP RARP ICMP
- `网络接口层`: 负责实际数据的传输，IP数据封装成帧,在两个相邻节点间传送 + 确保数据在物理媒介上传输  (数据链路层 + 物理层)