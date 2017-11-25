---
title: "setTimeout"
author: "sucer"
datetime: 2015-09-30 12:00:00
cover: "http://ww2.sinaimg.cn/large/633b942ejw1eybwqwbr6hj20rs0gigob.jpg"
---

![](http://ww2.sinaimg.cn/large/43b712ebjw1ewkfd1dgcij20c306f74n.jpg)
  


<span class="s1">嗯，写这篇博文的起因是群里有人问，为什么我的代码直接执行了，而没有等到他delay 5秒钟？</span>  


代码如下：  



```
setTimeout(window.location.href = 'index.php?xxx=111', 5000)
```

<span class="s1">当时，我回复：“你把你置入的代码用个匿名函数包起来就行了。”但这样的回复只是基于长期打代码的经验而已，并没有深入追究，写这篇博文算是为了弥补自己的知识漏洞。</span>  


<span class="s1">关于setTimeout和setInterval，我们在认知上一直存在一个误区。如果我们认认真阅读过ECMAScript-262，我们会发现，这两个方法并没有在ECMA中被定义。</span>  


<span class="s1">那么，他们到底来自哪里呢？翻阅MSDN和MDN对其的描述，我们可以看到如下内容：</span>  


![](http://ww1.sinaimg.cn/large/43b712ebjw1ewke8muhj3j209w02mwei.jpg)
  


<span class="s1">嗯，他的规范来自于DOM文档，那我们继续观摩最新的HTML规范。</span>  



```
[NoInterfaceObject, Exposed=(Window,Worker)]
interface WindowTimers {  
  long setTimeout(Function handler, optional long timeout = 0, any... arguments);
  long setTimeout(DOMString handler, optional long timeout = 0, any... arguments);
  void clearTimeout(optional long handle = 0);
  long setInterval(Function handler, optional long timeout = 0, any... arguments);
  long setInterval(DOMString handler, optional long timeout = 0, any... arguments);
  void clearInterval(optional long handle = 0);
};
Window implements WindowTimers;
```

<span class="s1">我们发现接口windowTimers中重载了setTimeout和setInterval，使他们能够接受Function和DOMString两种不同的参数。</span>  


<span class="s1">而当他们接受的参数为string类型时，实际上是执行了eval来解析我们所置入的代码。因此，我们在没有打引号的情况下，事实上是做了和:</span>  



```
eval(window.location.href = 'index.php?xxx=111');
```

<span class="s1">差不多的操作，当然没有计时直接执行了。</span>  


<span class="s1">而当我们将代码置入一个匿名函数中时，实际上是执行了一个回调，这样比直接置入字符串更加的安全。</span>  


<span class="s1">分析了定义以后，我们就可以对setTimeout的用法有一个清晰的认识</span>  



```
function fn() {  
    alert(1);
}
setTimeout('fn()', 5000);  
// after 5s ，alert 1;

function fn() {  
    alert(1);
}
setTimeout(fn, 5000);  
// after 5s ，alert 1;

setTimeout(function () {  
    alert(1);
}, 5000);
// after 5s ，alert 1;

setTimeout('alert(1)', 5000);  
// after 5s ，alert 1;
```

<span class="s1">嗯，当然了，它还可以带参数写成:</span>  



```
setTimeout(func, delay, [param1, param2, ...]);
```

<span class="s1">这样的形式，不过老生常谈的IE9以下是不支持的。</span>  


<span class="s1">好了，说到这里，我们就应该注意到一个关键词“eval”，“eval”可以解析字符串形式的代码，而且是官方不推荐的代码解析方式，会有产生XSS漏洞的危险。那么作为可以在内部解析代码字符串的方法，我们需要给予比较大的关注。</span>  


<span class="s1">同样能够解析代码的有以下一些对象和方法:</span>  



```
eval

setTimeout(String)

setInterval(String)

Function

execScript

setImmediate(String)
```

<span class="s1">关于execScript，安利一篇老文章，<a href="http://ued.sina.com/?p=789"><span class="s2">点我查看</span></a></span>  


<span class="s1">关于setImmediate,<a href="http://www.cnblogs.com/fsjohnhuang/p/4151595.html"><span class="s2">点我查看</span></a></span>