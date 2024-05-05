## 说说你对BOM的理解，常见的BOM对象你了解哪些

### BOM
浏览器对象模型，提供了独立于内容与浏览器窗口进行交互的对象，和浏览器做一些交互效果，比如：
- 页面的后退、前进、刷新
- 浏览器窗口发生变化
- 滚动条的滚动
- 获取客户的信息：浏览器版本，屏幕分辨率等

window location history navigator screen

浏览器的全部内容可以看作DOM，整个浏览器可以看作BOM
| DOM | BOM |
| --- | --- |
| 文档对象模型 | 浏览器对象模型 |
| 把*文档*当作一个对象 | 把*浏览器*当作一个对象 |
| 顶级对象是document | 顶级对象是window |
| 操作页面元素 | 浏览器窗口交互 |
| W3C标准规范 | 浏览器厂商个字浏览器上定义，兼容性差 |

### 对象
- window: 是浏览器窗口，也是JS的全局对象，控制浏览器窗口的各个方面：定时器、对话框、页面导航等
  - moveBy(x, y): 窗口从当前位置水平移动窗口x像素，垂直移动y像素，x负数向左，y负数向上
  - moveTo(x, y): 移动窗体左上角到相对屏幕左上角的(x,y)
  - resizeBy(w, h) resizeTo(w, h)
  - scrollTo(x, y) scrollBy(x, y)
  - window.open(url, windowName, str, bool): 导航特定URL并打开新窗口
    - str: 一个特性字符串，主要是配置新窗口或者新标签页的浏览器特性，比如工具栏、窗台栏等等
    - bool：是否打开新窗口
  - window.close: 关闭通过window.open打开的窗口
  - 窗口到屏幕的距离：screenLeft-窗口距离屏幕左侧的距离；screenTop-窗口距离屏幕顶部的距离
  - 窗口大小
    - innerHeight|innerWidth-浏览器可视窗口的大小(不包括顶部菜单、开发工具等，纯文档内容大小)
    - outerHeight|outerWidth-浏览器窗口的大小,包括顶部菜单、开发工具等
    - 可视窗口实际开发时使用: document.documentElement.clientWidth | clientHeight
  - window.screenX | window.screenY: 窗口左上角的坐标，窗口左上角到屏幕的位置，同availLeft考虑双屏，以主屏为基准，减去系统工具栏和菜单等宽高
  - setTimeout setInterval
  - window.alert window.confirm window.prompt
  - document.cookie 读写
- location: 地址栏URL相关信息
  - location.reload: 重新刷新页面。如果页面自上一次请求来没有改变，就会从缓存里重新加载。参数传true，可以强制从服务器中重新加载
  - location.replace: 导航到传入URL，被替换的会从历史记录中删除
  - 除了hash以外的属性，只要修改一个，页面就会重新加载
  - 属性：
    - hash: #contents，#及后面的字符，没有返回空
    - host: www.baidu.com:80, 服务器 + 端口
    - hostname: www.baidu.com, 域名，不带端口号
    - port: 端口号
    - protocol: https:, 协议
    - href: httpxxxxx#xx，完整的URL
    - pathname: /rights/add, 服务器下面的文件路径，host之后查询？之前
    - search: ?q=js&b=js,查询字符串，？及之后的部分
- navigator: 浏览器相关信息, 区分浏览器类型，属性较多，兼容性复杂
  - language languages platform cookieEnabled
  - vendor: 浏览器厂商名称;vendorSub: 浏览器厂商的更多信息
  - appName: 浏览器全名;appVersion: 浏览器版本，通常与实际不一致
- screen: 屏幕信息
  - availHeight: 只读，可用高度，屏幕像素高度减去系统组件(菜单、工具栏)高度
  - availWidth: 只读,可用宽度，屏幕像素宽度减去系统组件(菜单、工具栏)宽度
  - width: **屏幕**像素宽度,与浏览器窗口大小无关
  - height: **屏幕**像素高度,与浏览器窗口大小无关
  - availLeft: 只读，没有被系统组件占用的屏幕的最左侧像素，减去菜单、工具栏等
    - 如果存在双屏，以主屏为准，副屏的left为其左侧+/-偏离主屏左侧的水平距离
  - availTop: 只读，没有被系统组件占用的屏幕的最顶端像素，减去菜单工具栏等
    - 如果存在双屏，以主屏为准，副屏的top为其顶部+/-偏离主屏顶部的垂直距离
- history: 浏览器历史记录，可以通过参数向前、向后，或者指定URL跳转
  - history.go: 整数数字或者字符串;字符：向最新的一个包含指定字符的记录页面跳转；数字：正数向前，负数向后 跳转N个记录
  - history.forward: 向前跳转一个页面
  - history.back: 向后跳转一个页面
  - history.length: 获取历史记录数量，chrome最大50
  - history.pushState(object, title, url) object为随着状态保存的一个对象，title为新页面的标题，url为新的网址
    - 只能同源间跳转
    - 不会触发hashchange
  - replaceState(object, title, url) 与pushState的唯一区别在于该方法是替换掉history栈顶元素
  - history.state 返回在history栈顶的任意值的拷贝。通过这种方式可以查看state值


### clientWidth VS offsetWidth
- clientWidth 可视内容大小，不包括padding border scrollbars，纯内容大小
- offsetWidth 内容大小，包括padding border scrollbars