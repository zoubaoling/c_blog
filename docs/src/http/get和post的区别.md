## get和post有什么区别？
1. get一般是获取数据，post一般是提交数据
2. get参数会放在url上，所以安全性比较差,不能用来传递敏感信息，post是放在body中
3. get请求刷新服务器或退回是没有影响的（无害），post请求退回时会重新提交数据，有副作用
4. get请求只能进行url编码，post请求支持很多种编码方式，适合大量数据、二进制文件和复杂的数据结构: `text/xml | application/json | multipart/from-data（表单）| application/x-www-form-urlencoded(与get url一样)` 
5. post参数没有长度限制，get由于浏览器对URL长度的限制会导致参数长度被限制-不同的浏览器不一样
6. get参数直接收ASCII字符，post没有限制
7. get请求由于参数在URL中，可以收藏书签，而post不行
8. get请求时会被缓存, post请求不会被缓存
9. get请求参数会被完整保留在浏览器历史记录里，而POST中的参数不会被保留