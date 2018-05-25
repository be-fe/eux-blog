---
title: "深入理解window.onload"
author: "谢 郁"
datetime: 2018-05-25 12:00:00
cover: ""
---

**现象：**在一个Hybrid应用中，用户反馈弱网条件下页面的进度条总是不消失，最后发现是页面接口先于其他资源返回，而接口中包含大量图片导致了onload会推迟，从而客户端控制的进度条不会消失，页面调用客户端的方法不会执行。

#### 先放结论

**onload的触发时机：**JS加载并执行完毕且页面中所有外链资源加载完成之后大约3-4ms（这个值跟机型和浏览器有关）

#### 1、onload不是立即触发的

请问下面哪个alert先触发？

```javascript
window.onload = function() {
    alert('onload');
}
setTimeout(function(){
    alert('timeout');
}, 2)
```

答案是timeout先触发。而在我的电脑上，把timeout的值调成5或5以上，就是onload先触发了。

#### 2、JS的执行对onload有影响

```js
window.onload = function() {
    alert('onload');
}
var a
for (var i = 0; i < 100000000; i++) {
    a = a + i;
}
```

你会发现onload会等很久才触发。

#### 3、动态加载的资源可能对onload产生影响

```html
<body></body>
<script>
  window.onload = function() {
    alert('onload');
  }
  document.body.innerHTML = '<img src="a.png"> .... <img src="z.png">';
</script>
```

我们把网速调的慢一点，我们会很清晰的发现这种JS动态加进去的图片也会阻塞onload，只有a-z图片都加载完成，onload才会触发。而我们改成下面：
```js
window.onload = function() {
    setTimeout(function() {
       document.body.innerHTML = '<img src="a.png"> .... <img src="z.png">';
    }, 10)
    alert('onload');
}
```
这时就会发现，onload马上就触发了，不必等待图片加载完成。

再讲一个更实际的例子：
```html
<img src="aaa.png">
<script>
window.onload = function() {
    alert('onload');
}
$.ajax({
    url: imgList,
  	success: function(arr) {
        arr.forEach(function() {
            $('body').append('<img src="' + arr.imgUrl + '">')
        })
    }
})
</script>
```

假设aaa.png加载时间为100ms，ajax接口返回时间为50ms，那么假设imgList中有100张图片，那么onload的时间就会被推迟到这100张图片都加载完成之后。

而如果aaa.png加载时间为50ms，接口请求为100ms的时候，就不会有这个问题。但是我们没法保证接口请求一定慢于图片请求。

因此**带图片的列表请求需要放在window.onload之后执行**。

#### 4、onload和客户端方法的对应

iOS中判断webview加载完成的**webViewDidFinishLoad**方法，Android中判断webview加载完成的**onPageFinished**方法本质触发时机上都对应页面上的window.onload，一般来说会稍晚于window.onload（某些特殊情况会早于window.onload，比如页面里有iframe等情况）。

也就是说**对onload有影响的因素也同样会影响这些Native方法**。而在Hybrid开发中，一些Native和web之间的交互和调用往往要在webViewDidFinishLoad/onPageFinished之后。因此如果onload的触发被推迟了，那么这些Native相关的调用也都会被推迟。



#### 5、百度统计对onload的影响

```js
var _hmt = _hmt || [];
    (function() {
      var hm = document.createElement("script");
      hm.src = "https://hm.baidu.com/hm.js?2fdsasa8f9f2f0e59e7db6c398edfbfcb1f";
      var s = document.getElementsByTagName("script")[0];
      s.parentNode.insertBefore(hm, s);
})();
```

上面是百度统计的代码，我们可以看到它动态加载了一个script，而这个script会马上以一个小gif的形式发送一个上报请求，经过测试，如果页面上没有其它元素，这个**小gif加载完成后才会触发onload**，那么总加载时间就是script加载时间 + gif加载时间。

因此应该尽量把百度统计代码提前，避免百度统计拖慢onload时间。百度统计官方也是**建议将统计代码放在head中**。