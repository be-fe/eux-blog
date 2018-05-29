---
title: "Link Preload 标签"
author: "田光宇"
datetime: 2017-08-28 12:00:00
cover: "https://bj.bcebos.com/v1/eux-blog-static/Link Preload 标签.png"
---

本文主要对 Preload 这一新标准介绍。目前 Preload 兼容性如下：  
![](https://bj.bcebos.com/v1/eux-blog-static/preload_state.png) 

## Preload 标签是什么 
Preload 作为一个新的 web 标准，旨在提高性能和为web开发人员提供更细粒度的加载控制。Preload使开发者能够自定义资源的加载逻辑，且无需忍受基于脚本的资源加载器带来的性能损失。    

```html  
<link rel="preload">
```  

## 类似的技术  
关于预加载，目前已经有几种方案  
### DNS prefetch  
DNS prefetching通过指定具体的URL来告知客户端未来会用到相关的资源，这样浏览器可以尽早的解析DNS。比如我们需要一个在example.com的图片或者视频文件。在`<head>`就可以这么写：  

```html    
<link rel="dns-prefetch" href="//example.com">
```  
### Preconnect  
和DNS prefetch类似，preconnect不光会解析DNS，还会建立TCP握手连接和TLS协议（如果需要）。用法如下：  

```html   
<link rel="preconnect" href="http://example.com"> 
```  
### Prefetch  
当能确定网页在未来一定会使用到某个资源时，开发者可以让浏览器提前请求并且缓存好以供后续使用。prefetch支持预拉取图片、脚本或者任何可以被浏览器缓存的资源。  

```html    
	
<link rel="prefetch" href="image.png">
```  

### Subresource  
subresource可以用来指定资源是最高优先级的。比如，在Chrome和Opera中我们可以加上下面的代码：  

```html  
<link rel="subresource" href="styles.css">  
```  

### Prerender  
prerender是一个重量级的选项，它可以让浏览器提前加载指定页面的所有资源。  

```html   
<link rel="prerender" href="/thenextpage.html"/>
```  



## Preload 的优势    
相对于类似的技术，Preload 有 as 属性，这让浏览器可做一些 subresource 和 prefetch 无法实现的事：  

* 浏览器可以设置正确的资源加载优先级
* 浏览器可以确保请求是符合内容安全策略的  
* 浏览器能根据 as 的值发送适当的 Accept 头部信息  
* 浏览器通过 as 值能得知资源类型  

Preload 的与众不同还体现在 onload 事件上（在 Chrome 中，prefetch 和 subresource 是不支持的）。preload 不会阻塞 windows 的 onload 事件，除非，preload资源的请求刚好来自于会阻塞 window 加载的资源。  

## Preload 用法举例    

```html   
<link rel="preload" href="a.js" as="script">
```  
忽略 as 属性，或者错误的 as 属性会使 preload 等同于 XHR 请求，浏览器不知道加载的是什么，
因此会赋予此类资源非常低的加载优先级。  

## Preload 应用  
### 对字体的提前加载  
字体被隐藏在css中间，浏览器有时候不能很好的将他们放入预加载器中，为此我们可以借助preload   

```html    
<link rel="preload" href="font.woff" as="font" type="font/woff" crossorigin>
```  
crossorigin 属性是必须的，即便是字体资源在自家服务器上，因为用户代理必须采用匿名模式来获取字体资源。  

### 基于标记语言的异步加载    
css 异步加载     

```html  
<link rel="preload" as="style" href="asyncstyle.css" onload="this.rel='stylesheet'">
```   

js 异步加载  

```html    
<link rel="preload" as="script" href="async_script.js" onload="var script = document.createElement('script'); script.src = this.href; document.body.appendChild(script);">
```  
async 属性会阻塞 window 的 onload 事件，这么写就没有问题了。  

### 动态加载，但不执行  

```javascript   
var link = document.createElement("link");
link.href = "myscript.js";
link.rel = "preload";
link.as = "script";
document.head.appendChild(link);
var script = document.createElement("script");
script.src = "myscript.js";
document.body.appendChild(script); 
```  

## Preload 在生产环境的案例  
### Treebo 案例  
Treebo，印度最大的旅馆网站之一，在 3G 网络下对其桌面版试验，在对其顶部图片和主要的 Webpack 打包文件使用 preload 之后，在首屏绘制和可交互延迟分别减少了 1s。 
 
![](https://bj.bcebos.com/v1/eux-blog-static/preload案例1.png)  

同样的，在对自己的渐进式 Web 应用程序主要打包文件使用 preload 之后，Flipkart 在路由解析之前 节省了大量的主线程空闲时间（在 3G 网络下的低性能手机下）。  

# 参考文献  
* [深入研究Chrome：Preload与Prefetch原理，及其优先级](https://mp.weixin.qq.com/s/O5E2ASBEzfKOxgzCCJDlfw)  
* [Preload: What Is It Good For?](https://www.smashingmagazine.com/2016/02/preload-what-is-it-good-for/)  
