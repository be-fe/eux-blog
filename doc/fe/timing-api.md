---
title: "Timing Api"
author: "梁 冬"
datetime: 2017-08-23 12:00:00
cover: "http://owtgo1dtq.bkt.clouddn.com/timing-overview.png"
---

# Timing Api

`Timing Api` 是通过获取页面响应时间记录页面性能的 `api`。  


有同学该问了监测页面性能浏览器 `devtool` 里边的 `performance` 不是清楚的多，用 `performance` 的你si不si有病。  


当然不是啦，注意我说的是记录，我们用浏览器的devtool固然好用，但那都是我们自己电脑上的数据，为了优化用户体验，有很多场景我们需要将用户的数据收集起来，然后…嘿嘿…当然是分析性能瓶颈，然后提高用户体验啦  


—–   废话不多说，我是分割线  —–  



### 兼容性

[看兼容性点我](http://caniuse.com/#search=timing)  


`Timing Api` 出了有一段时间了，感觉兼容性还需要提高，尤其 IE 需要 11 以后，可能和这个 `API` 很少用到有很大关系  



### Window.performance

虽然叫 `Timing API` 但是用起来却是 `window.performance`  



```
// 兼容性写法
const performance = window.performance || window.msPerformance || window.webkitPerformance;
```


## performance.memory(内存)



- usedJSHeapSize  

JS 对象（包括V8引擎内部对象）占用的内存
- totalJSHeapSize  

可使用的内存  
- jsHeapSizeLimit  

内存大小限制



## performance.navigation(我从哪里来)



- redirectCount  

如果有重定向的话，页面通过几次重定向跳转而来
- type


   - 0   即 TYPE_NAVIGATENEXT 正常进入的页面（非刷新、非重定向等）
   - 1   即 TYPE_RELOAD       通过 window.location.reload() 刷新的页面
   - 2   即 TYPE_BACK_FORWARD 通过浏览器的前进后退按钮进入的页面（历史记录）
   - 255 即 TYPE_UNDEFINED    非以上方式进入的页面






## performance.timing(时间)

<img src="http://dvcs.w3.org/hg/webperf/raw-file/tip/specs/NavigationTiming/timing-overview.png?_=2670727" alt="image" width="912" height="555" />
  



<table>
<thead>
<tr>
<th>属性</th>
<th>含义</th>
</tr>
</thead>
<tbody>
<tr>
<td>navigationStart</td>
<td>在同一个浏览器上下文中，前一个网页（与当前页面不一定同域）unload 的时间戳，如果无前一个网页 unload ，则与 fetchStart 值相等</td>
</tr>
<tr>
<td>unloadEventStart</td>
<td>前一个网页（与当前页面同域）unload 的时间戳，如果无前一个网页 unload 或者前一个网页与当前页面不同域，则值为 0</td>
</tr>
<tr>
<td>unloadEventEnd</td>
<td>和 unloadEventStart 相对应，返回前一个网页 unload 事件绑定的回调函数执行完毕的时间戳</td>
</tr>
<tr>
<td>redirectStart</td>
<td>第一个 HTTP 重定向发生时的时间。有跳转且是同域名内的重定向才算，否则值为 0</td>
</tr>
<tr>
<td>redirectEnd</td>
<td>最后一个 HTTP 重定向完成时的时间。有跳转且是同域名内部的重定向才算，否则值为 0</td>
</tr>
<tr>
<td>fetchStart</td>
<td>浏览器准备好使用 HTTP 请求抓取文档的时间，这发生在检查本地缓存之前</td>
</tr>
<tr>
<td>domainLookupStart</td>
<td>DNS 域名查询开始的时间，如果使用了本地缓存（即无 DNS 查询）或持久连接，则与 fetchStart 值相等</td>
</tr>
<tr>
<td>domainLookupEnd</td>
<td>DNS 域名查询完成的时间，如果使用了本地缓存（即无 DNS 查询）或持久连接，则与 fetchStart 值相等</td>
</tr>
<tr>
<td>connectStart</td>
<td>HTTP（TCP） 开始建立连接的时间，如果是持久连接，则与 fetchStart 值相等 注意如果在传输层发生了错误且重新建立连接，则这里显示的是新建立的连接开始的时间</td>
</tr>
<tr>
<td>connectEnd</td>
<td>HTTP（TCP） 完成建立连接的时间（完成握手），如果是持久连接，则与 fetchStart 值相等 注意如果在传输层发生了错误且重新建立连接，则这里显示的是新建立的连接完成的时间  注意这里握手结束，包括安全连接建立完成、SOCKS 授权通过</td>
</tr>
<tr>
<td>secureConnectionStart</td>
<td>HTTPS连接开始的时间，如果不是安全连接，则值为 0</td>
</tr>
<tr>
<td>requestStart</td>
<td>HTTP 请求读取真实文档开始的时间（完成建立连接），包括从本地读取缓存  连接错误重连时，这里显示的也是新建立连接的时间</td>
</tr>
<tr>
<td>responseStart</td>
<td>HTTP 开始接收响应的时间（获取到第一个字节），包括从本地读取缓存</td>
</tr>
<tr>
<td>responseEnd</td>
<td>HTTP 响应全部接收完成的时间（获取到最后一个字节），包括从本地读取缓存</td>
</tr>
<tr>
<td>domLoading</td>
<td>开始解析渲染 DOM 树的时间，此时 Document.readyState 变为 loading，并将抛出 readystatechange 相关事件</td>
</tr>
<tr>
<td>domInteractive</td>
<td>完成解析 DOM 树的时间，Document.readyState 变为 interactive，并将抛出 readystatechange 相关事件  注意只是 DOM 树解析完成，这时候并没有开始加载网页内的资源</td>
</tr>
<tr>
<td>domContentLoadedEventStart</td>
<td>DOM 解析完成后，网页内资源加载开始的时间  在 DOMContentLoaded 事件抛出前发生</td>
</tr>
<tr>
<td>domContentLoadedEventEnd</td>
<td>DOM 解析完成后，网页内资源加载完成的时间（如 JS 脚本加载执行完毕）</td>
</tr>
<tr>
<td>domComplete</td>
<td>DOM 树解析完成，且资源也准备就绪的时间，Document.readyState 变为 complete，并将抛出 readystatechange 相关事件</td>
</tr>
<tr>
<td>loadEventStart</td>
<td>load 事件发送给文档，也即 load 回调函数开始执行的时间  注意如果没有绑定 load 事件，值为 0</td>
</tr>
<tr>
<td>loadEventEnd</td>
<td>load 事件的回调函数执行完毕的时间</td>
</tr>
</tbody>
</table>

### 如何用？


```
let t = performance.timing;
let pData = {};

// 页面开始加载时间
if (t.navigationStart) {
    pData.tStart = t.navigationStart;
}
// 页面导航结束时间
if (t.navigationStart && t.domainLookupStart) {
    pData.tNavigation = t.domainLookupStart - t.navigationStart;
}
// 页面DNS耗时
if (t.domainLookupEnd && t.domainLookupStart) {
    pData.tDNS = t.domainLookupEnd - t.domainLookupStart;
}
// 页面Tcp耗时
if (t.connectEnd && t.connectStart) {
    pData.tTcp = t.connectEnd - t.connectStart;
    if (t.connectEnd && t.secureConnectionStart) {
        console.info('[system]', 'tcp (ssl):', (t.connectEnd - t.connectStart)+'ms ('+(t.connectEnd - t.secureConnectionStart)+'ms)');
    }
}
// 页面request耗时
if (t.responseStart && t.requestStart) {
    pData.tRequest = t.connectEnd - t.connectStart;
}
// 页面response耗时
if (t.responseEnd && t.responseStart) {
    pData.tResponse = t.responseEnd - t.responseStart;
}
// 页面从dom开始加载到dom完成耗时
if (t.domComplete && t.domLoading) {
    pData.tDomComplete = t.domComplete - t.domLoading;
    if (t.domContentLoadedEventStart && t.domLoading) {
        // pData.tDomLoaded = t.domContentLoadedEventStart - t.domLoading;
    }
}
// 页面从load事件开始加载到load完成耗时
if (t.loadEventEnd && t.loadEventStart) {
    pData.tLoad = t.loadEventEnd - t.loadEventStart;
}
if (t.navigationStart && t.loadEventEnd) {
    // 页面从最开始加载到load完成总耗时
    pData.tLoadTotal = t.loadEventEnd - t.navigationStart;
    // 页面从最开始加载到Dom完成总耗时（页面可操作时间）
    pData.tDomTotal = t.domComplete - t.navigationStart;
}
if (t.responseStart && t.navigationStart) {
    // 页面白屏时间
    pData.tWhiteScreen = t.responseStart - t.navigationStart;
}

```


### Function


## performance.getEntries()

获取所有资源请求的时间数据，这个方法我们可以用来获取我们页面加载的静态资源  


![image](http://i1.buimg.com/1949/093d6b92dccdba1e.png)
  


比较有用的几个属性  



```
name：资源的链接

initiatorType: 初始类型（注意这个类型并不准确，例如在css中的图片资源会这个值显示css，所以还是推荐用name中的后缀名）

duration: 资源的总耗时（包括等待时长，请求时长，响应时长 相当于responseEnd - startTime）

transferSize: 转换后的文件大小(略大于encodedBodySize, 为什么我取这个呢，因为这个值是和chrome的devtool Network里的size一致)
```


## performance.now()

`performance.now()` 与 `Date.now()` 不同的是，返回了以微秒（百万分之一秒）为单位的时间，更加精准。  


并且与 `Date.now()` 会受系统程序执行阻塞的影响不同，`performance.now()` 的时间是以恒定速率递增的，不受系统时间的影响（系统时间可被人为或软件调整）。  


注意 `Date.now()` 输出的是 UNIX 时间，即距离 1970 的时间，而 `performance.now()` 输出的是相对于 `performance.timing.navigationStart(页面初始化)` 的时间。  


使用 `Date.now()` 的差值并非绝对精确，因为计算时间时受系统限制（可能阻塞）。但使用 `performance.now()` 的差值，并不影响我们计算程序执行的精确时间。  



## performance.mark(), Performance.measure()

使用 `performance.mark()` 标记各种时间戳（就像在地图上打点），保存为各种测量值（测量地图上的点之间的距离），便可以批量地分析这些数据了。  


这个感觉实际用处不是很明显, 在此就不多说了 想详细了解的同学可以去看  


[腾讯AlloyTeam 初探 performance – 监控网页与程序性能](http://www.alloyteam.com/2015/09/explore-performance/) （本文大多参考此文章）  


[使用window.performance分析web前端性能](http://www.bubuko.com/infodetail-1228020.html)  


[MDN Performance.timing](https://developer.mozilla.org/en-US/docs/Web/API/Performance/timing)