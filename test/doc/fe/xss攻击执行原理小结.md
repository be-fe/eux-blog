---
title: "xss攻击执行原理小结"
author: "龙山晴雪"
datetime: 2017-09-05 12:00:00
cover: "http://owtgo1dtq.bkt.clouddn.com/v2-5b2eccf41d318455930981b4ec221730_r.jpg"
---

**什么是XSS?**  


xss全称跨站脚本（Cross-site scripting）,是为不和层叠样式表(Cascading Style Sheets, CSS)的缩写混淆，故将跨站脚本攻击缩写为XSS。是一种网站应用程序的安全漏洞攻击，是代码注入的一种。它允许恶意用户将代码注入到网页上，其他用户在观看网页时就会受到影响。这类攻击通常包含了HTML以及用户端脚本语言。  


** 危害**  

XSS带来的危害有：窃取用户cookies，窃取个人信息；劫持会话，操纵用户网络数据；发起ddos攻击; 篡改页面、弹出广告等。  


** 类型**  

1、非持久型  


1.1 反射型  

用户将带有xss攻击的代码作为用户输入传给服务端，服务端没有处理用户输入直接返回给前端。  


1.2 DOM-based型  

DOM-based xss是由于浏览器解析机制导致的漏洞，服务器不参与。因为不需要服务器传递数据，xss代码会从url中注入到页面中，利用浏览器解析script、标签的属性和触发事件导致xss 。  

2、持久型  


用户含有xss代码的输入被存储到数据库或者存储文件上。  


** xss执行原理**  

造成xss代码执行的根本原因就在数据渲染到页面过程中，html解析触发执行了xss脚本。  


**注入方式**  


常见的脚本的注入分两类：  


1、直接注入script脚本。  


2、通过某些标签的属性和事件。比如：  



```
<img src="aaa.png" onerror="javascript:alert('xss');">、<a href="javascript:alert('xss');">xss</a>
```

等  


直接注入script脚本：我们可能经常使用jquery,通过html()方法去操作页面。这个时候就会触发xss,因为jquery的html()方法设计初衷就是让js脚本执行。原因是：jquery解析到script就会通过createElement(‘script’)创建一个script节点，而此时浏览器就会去执行这个script;  

同样的原生js的api,innerHTML也会把含有script脚本的字符串当成标签解析到浏览器，只不过因为浏览器加载js的原则：只会在页面加载时执行一次。所以通过innerHTML无法触发xss。  

text()、innerText等方法都是把含xss字符串当作文本节点，所以无法被解析成html节点，也就不会触发xss。  

通过属性和事件：  



```
<img src="aaa.png" onerror="javascript:alert('xss')">
```

。因为img标签未闭合所以会触发 onerror事件，导致xss脚本执行。  



```
<a href="javascript:alert('xss');">xss</a>
```

a标签的href会在调整链接的时候执行javascript脚本。  


通过属性和事件触发是依赖html标签注入到页面，在这个过程中会被chrome浏览器的XSS Auditor拦截。  


**防御**  


请记住一句：不要相信用户的输入。  


XSS防御的总体思路是：对输入(和URL参数)进行过滤，对输出进行转义。  


[过滤库](https://github.com/cure53/DOMPurify)  

[转义库](https://github.com/sindresorhus/escape-goat)  


** 参考资料**  

[浅谈XSS攻击的那些事（附常用绕过姿)](https://zhuanlan.zhihu.com/p/26177815?utm_source=weibo&utm_medium=social)