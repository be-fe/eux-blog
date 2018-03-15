---
title: "脚本的动态加载"
author: "sucer"
datetime: 2015-11-13 08:00:00
cover: "http://ww2.sinaimg.cn/large/699ef9c0jw1ey7nk0c3qtj20rs0gimyl.jpg"
---

### 脚本的动态加载


> > 我们平时如何挂载脚本?  



众所周知，在web应用中，我们时常需要使用js脚本对应用做这样或者那样的操作。而仙贝们为了解放大家的双手，降低大家的开发成本，创造了很多具有各种用途，或者针对对应问题的解决方案。这些解决方案，被称作框架和库。  


而作为这些脚本的使用者，我们只需要简单而又传统的将脚本使用script标签插入我们的应用中就行了。  




```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>test</title>
</head>
<body>
    <script src="myscript.js"></script>
</body>
</html>
```


如上文所说，这是简单而又传统的使用方法。事实上在技术快速迭代的今天，传统方式有时候并不能满足我们的需求。当一个webapp含有过多的功能的时候，我们的脚本可能越来越大。而用户的体验则是：这网站打开真慢啊～～～  


然而事实上我们功能做得相当的多，效果做得相当的好，大部分用户其实只是使用了其中的某几个基础功能而已。但只是为了所有功能能够使用而增加了加载量，似乎有些得不偿失。  



> > 然后，我们有了动态加载脚本的想法  



从*Netscape Navigator 4.0*为起点，浏览器厂商们都开始支持起了不同形态的动态html。通过dom api，程序猿们可以轻松的对节点进行各种操作。于是对我们来说，又有了新的方法去加载脚本。  




```
var script = document.createElement('script');
script.async = true;
script.src = 'myScript.js';
document.getElementsByTagName('head')[0].appendChild(script);
```


当然了，这样的写法是最基础的增加方法。在这样的写法下，我们无法得知脚本到底有没有加载完，如果依赖脚本没有加载并解释完毕，那么我们加载它就没有任何意义，还会因此阻断所有相关操作。  


谢天谢地，天无绝人之路，浏览器老板们还是给我们提供了方法对脚本加载情况进行探知。我们所知的onreadystatechange事件和onload事件可以帮我们判断脚本是否加载完毕～  




```
script.onreadystatechange = script.onload = function (evt) {
    var evt = evt ? evt : window.event;
    if (!evt.readyState || evt.readyState === 'loaded' || evt.readyState === 'complete') {
        cb && cb();
        script.onreadystatechange = script.onload ＝ null;
        script.parent.removeChild(script);
        script = null;
    }
}
```



> > 作为一个正常人，我们想不想加载更多东西呢？  



想！当然想。作为一个正常人，我们极其希望也load别的东西过来，那现在我们还有什么东西可以通过动态加载呢？css／picture／function都可以成为我们的加载对象。这时候，我们就该有一个简单的加载器了，聚合我们想要的功能，让我们解放双手！  




```
var handler = {
    js: jsHandler,
    css: cssHandler,
    fn: fnHandler
};

var Loader = function (src, type) {

    if (src === undefined) {
        throw new Error('木有参数');
    }

    //  修正参数
    if (!type) {
        if (typeof src === 'string') {
            if (/\.css$|\.css\?/i.test(src)) {
                type = 'css';
            }
            if (/\.js$|\.js\?/i.test(src)) {
                type = 'js';
            }
        }
        if (typeof src === 'function') {
            type = 'fn'
        }
    }

    type = type || 'js';

    handler[type](src);
};

function jsHandler(src) {}

function cssHandler(href) {}

function fnHandler(fn) {}
```



> > 如何填充我们的函数  



<img src="http://ww3.sinaimg.cn/large/43b712ebgw1ey33fsbjl3j20hd0lhtfg.jpg" alt="" width="625" height="773" />
  


我们有了处理不同类型加载项的逻辑，但首先，我们还是要完善jsHandler函数  



> > 获取head元素  





```
var doc = document;
var head = doc.head || doc.getElementsByTagName("head")[0] || doc.documentElement;
```


将document和head缓存起来，以便多次使用，这可以提高一点点的性能…  



> > 为jsHandler完善加载部分  





```
function jsHandler(src, callback) {
    var script = doc.createElement('script');
    script.async = true;
    script.src = src;

    // 对支持onload事件的浏览器做处理
    var hasOnload = 'onload' in script;
    if (hasOnload) {
        script.onload = jsOnload;
        script.onerror = function () {
            jsOnload(true);
        }
    }

    // 对支持onreadystatechange的浏览器做处理
    else {
        script.onreadystatechange = function() {
            if (/loaded|complete/.test(script.readyState)) {
                jsOnload();
            }
        }
    }

    head.appendChild(script);

    // 当事件
    function jsOnload(error) {
        isTimeout = false;
        script.onload = script.onerror = script.onreadystatechange = null;
        head.removeChild(script);
        script = null;
        callback(error);
    }
}
```


```
在上面这段代码中，我们为加载js做了一系列处理，由于浏览器厂商的实现问题，我们要对脚本是否加载成功或失败作出判断，这是个很麻烦的事情，尤其是对需要向下兼容的同学来说。
```


从[headjs](http://qianduanblog.com/post/headjs.html)这篇文章的注释来看，脚本是否加载完毕依赖于onload事件，而ie9及以下依赖于对状态标志进行load或者complete字符的检测。  




```
// IE 7/8 (2 events on 1st load)
// 1) event.type = readystatechange, s.readyState = loading
// 2) event.type = readystatechange, s.readyState = loaded

// IE 7/8 (1 event on reload)
// 1) event.type = readystatechange, s.readyState = complete 

// event.type === 'readystatechange' && /loaded¦complete/.test(s.readyState)

// IE 9 (3 events on 1st load)
// 1) event.type = readystatechange, s.readyState = loading
// 2) event.type = readystatechange, s.readyState = loaded
// 3) event.type = load            , s.readyState = loaded

// IE 9 (2 events on reload)
// 1) event.type = readystatechange, s.readyState = complete 
// 2) event.type = load            , s.readyState = complete 

// event.type === 'load'             && /loaded¦complete/.test(s.readyState)
// event.type === 'readystatechange' && /loaded¦complete/.test(s.readyState)

// IE 10 (3 events on 1st load)
// 1) event.type = readystatechange, s.readyState = loading
// 2) event.type = load            , s.readyState = complete
// 3) event.type = readystatechange, s.readyState = loaded

// IE 10 (3 events on reload)
// 1) event.type = readystatechange, s.readyState = loaded
// 2) event.type = load            , s.readyState = complete
// 3) event.type = readystatechange, s.readyState = complete 

// event.type === 'load'             && /loaded¦complete/.test(s.readyState)
// event.type === 'readystatechange' && /complete/.test(s.readyState)

// Other Browsers (1 event on 1st load)
// 1) event.type = load, s.readyState = undefined

// Other Browsers (1 event on reload)
// 1) event.type = load, s.readyState = undefined            

// event.type == 'load' && s.readyState = undefined
```


当然，如果遇到了既不支持onload又不支持onreadystatechange的浏览器的时候，我们只能另寻他法了。  


如果要加载的脚本是你写的，那你自己可以处理～如果加载的脚本不是你写的～哦喽，不在本文讨论范围之内～  



> > 当你需要jsHandler检测加载是否超时的时候  



我们为jsHandler增加一个参数timeout，并在函数中实现如下逻辑  




```
function jsHandler(src, callback, timeout) {
    ...
    // 检测是否超时的标志
    var isTimeout = true;
    ...

    if (timeout) {
        setTimeout(timeoutHandler, timeout);
    }

    head.appendChild(script);

    function jsOnload(error) {
        // 当在时间内完成操作时，不管是否成功，将超时标志设为false
        isTimeout = false;
        script.onload = script.onerror = script.onreadystatechange = null;
        head.removeChild(script);
        script = null;
        callback(error);
    }

    function timeoutHandler() {
        // 如果标志未改变，认为其超时
        if (isTimeout) {
            jsOnload(true);
        }
    }
}
```



> > 当我们同步执行代码的时候  



当我们需要加载一个或者多个脚本的时候，我们会发现，“奥我次奥，怎么请求了那么多次呢？这不科学。”  


这是因为我们的loader在多处被调用或同步调用了，于是我们想啊，搞个map纪录缓存算了。于是乎：  


－ 我们需要一些变量  




```
// 用作存储脚本信息
var cache = {};
// 用作生成不重复的客户端id
var _cid = 0;
// 用作存储其他loader实例需要运行的脚本任务
var processCache = {};

// 加载状态标识
var DONE = 'done';
var REJECTED = 'rejected';
var PENDING = 'pending';
```




- 我们需要产生不同的存储id




```
/**
 * 产生客户端id
 * @return {Number} [description]
 */
function cid() {
    return _cid++;
}
```




- 我们需要创建一个Script类，new一个实例用于存储任务的基本信息




```
/**
 * Script对象，储存需要加载的任务的基本信息
 * @param  {String} uri     uri 地址 | 需要执行的函数
 * @param  {String} type    任务类型
 */
function Script(uri, type) {
    this.uri = uri;
    this.type = type;
    this.cid = cid();
    this.status = PENDING;
}
```


－ 当我们寻找缓存中的任务对象的时候，因该返回正确的对象。怎么寻找缓存呢，当然是通过地址来索引啦  




```
/**
 * 从缓存中获取需要的Script对象
 * 如果没有，新建一个
 * @param  {String} uri     uri 地址 | 需要执行的函数
 * @param  {String} type    任务类型
 * @return {Object}         需要的Script对象
 */
function get(uri, type) {
    // 如果不存在于缓存中，创建一个新的Script对象
    return cache[uri] || (cache[uri] = new Script(uri, type));
}
```



> > 如果我们的脚本或函数有别名怎么办！  





```
var alias = {};
/**
 * 获取有别名的Script对象
 * @param  {String} uri     uri 地址 | 需要执行的函数
 * @param  {String} type    任务类型
 * @return {Object}      Script Object
 */
function getCache(uri, type) {
    var src = getAlias(uri);
    return  src ? get(src) : get(uri, type);
}

/**
 * 获取真实地址
 * @param  {String} name [description]
 * @return {[type]}      return uri
 */
function getAlias(name) {
    return alias[name];
}
```


别名的用途在于我们不用多次输入同样长度的uri,或者说是函数。  



> > 现在，该填充我们的Loader类了。  



我们要很清楚的知道，Loader需要做什么。  


一个简单的Loader应该可以多次添加需要加载的内容，then或者add方法可以让用户添加任务。那它应该有一个内置的list，可以存储这些待添加的任务。  


它也应该可以在全部脚本加载完的时候执行我们的callback，那么我们应该实现一个方法接受一个回调，在任务执行完时调用。  


我们也要可以对某些地址进行别名命名，也需要设置超时时间  




- 实现Loader类




```
/**
 * Loader类
 */
var Loader = function () {
    this.list = [];
    this.timeout = 0;
    this.callback = null;
};
```




- 实现then方法，使用then的时候应该可以连续使用




```
/**
 * 实现的then方法
 * @param  {String} src  地址
 * @param  {String} type 类型
 * @return {Object}      Loader对象
 */
Loader.prototype.then = function(src, type) {
    if (src === undefined) {
        throw new Error('木有参数');
    }

    //  修正参数
    if (!type) {
        if (typeof src === 'string') {
            if (/\.css$|\.css\?/i.test(src)) {
                type = 'css';
            }
            if (/\.js$|\.js\?/i.test(src)) {
                type = 'js';
            }
        }
        if (typeof src === 'function') {
            type = 'fn'
        }
    }

    type = type || 'js';
    this.list.push(getCache(src, type));
    return this;
};
```




- 实现done方法




```
/**
 * done方法，接受一个callback，在所有任务完成时调用
 * @param  {Function} cb 完成后的回调
 * @return {Object}      第一次调用done后返回一个新的对象
 */
Loader.prototype.done = function(cb) {
    if (this.callback === null) {
        this.callback = cb;
    }
    if (!this.list.length) {
        this.callback && this.callback();
        return;
    }
    var script = this.list.shift();
    handler[script.type](this, script);
    if (!this.called) {
        this.called = true;
        return new Loader();
    }
};
```




- 实现config配置




```
Loader.prototype.config = function (opts) {
    this.timeout = opts.timeout || 0;
    if (opts.alias && !opts.alias.length) {
        for (var i = opts.alias.length - 1; i >= 0; i--) {
            alias[i] = opts.alias[i];
        }
    }
}
```



> > 如何让错误集中显示  



我们需要接入一个resolve方法，Loader类也应该有一个errors的列表来储存每次错误的信息，最后放到callback中集中显示。  




```
function resolve(loader, s) {
    if (s.error) {
        loader.errors.push(s);
    }
    loader.done();
    var cache = processCache[s.cid];
    if (cache && !cache.length) {
        for (var i = 0, len = cache.length; i < len; i++) {
            cache.shift().loader.done();
        }
    }
}

var Loader = function () {
    this.list = [];
    this.timeout = 0;
    this.errors = [];
    this.callback = null;
};
```



> > 最终，我们将所有的思路组装起来  





```
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(factory);
    } else {
        // Browser globals
        root.Loader = factory();
    }
}(this, function () {

    // 用作存储脚本信息
    var cache = {};
    // 用作生成不重复的客户端id
    var _cid = 0;
    // 用作存储其他loader实例需要运行的脚本任务
    var processCache = {};
    // 用作储存别名
    window.alias = {};

    // 加载状态标识
    var DONE = 'done';
    var REJECTED = 'rejected';
    var PENDING = 'pending';

    // 获取document,head
    var doc = document;
    var head = doc.head || doc.getElementsByTagName("head")[0] || doc.documentElement;

    /**
     * 产生客户端id
     * @return {Number} [description]
     */
    function cid() {
        return _cid++;
    }

    /**
     * Script对象，储存需要加载的任务的基本信息
     * @param  {String} uri     uri 地址 | 需要执行的函数
     * @param  {String} type    任务类型
     */
    function Script(uri, type) {
        this.uri = uri;
        this.type = type;
        this.cid = cid();
        this.status = PENDING;
    }

    /**
     * 从缓存中获取需要的Script对象
     * 如果没有，新建一个
     * @param  {String} uri     uri 地址 | 需要执行的函数
     * @param  {String} type    任务类型
     * @return {Object}         需要的Script对象
     */
    function get(uri, type) {
        // 如果不存在于缓存中，创建一个新的Script对象
        return cache[uri] || (cache[uri] = new Script(uri, type));
    }

    /**
     * 获取真实地址
     * @param  {String} name [description]
     * @return {[type]}      return uri
     */
    function getAlias(name) {
        return alias[name];
    }

    function getCache(uri, type) {
        var opts = getAlias(uri);
        return  opts ? get(opts.uri, opts.type) : get(uri, type);
    }

    // 处理
    var handler = {
        js: jsHandler,
        css: cssHandler,
        fn: fnHandler
    };

    // 对函数的处理
    function fnHandler(context, s) {
        // 函数不需要判断是否为正在加载状态
        try {
            s.uri();
            resolve(context, s);
        }
        catch (e) {
            s.error = e.message;
            resolve(context, s);
        }
    }

    // 对css请求的处理
    function cssHandler(context, s) {
        // 当其他Loader实体中的任务已经完成时
        if (s.status !== PENDING) {
            resolve(context, s);
            return;
        }
        var link = document.createElement('link');
        link.type = 'text/css';
        link.rel  = 'stylesheet'
        link.href = s.uri;
        head.appendChild(link);
        resolve(context, s);
    };

    // 对js动态加载的处理
    function jsHandler(context, s) {

        // 处理已完成任务
        if (s.status !== PENDING) {
            resolve(context, s);
            return;
        }

        // 如果非第一个加载，将剩余的任务和任务关联的上下文塞进正在进行的进程中
        if (s.changeState) {
            processCache[s.cid] = processCache[s.cid] || [];
            processCache[s.cid].push({ loader: context, s: s });
            return;
        }

        s.changeState = true;

        // 设置超时标志
        var isTimeout = true;
        var script = document.createElement('script');
        script.async = true;
        script.src = s.uri;

        // 如果支持onload事件
        var hasOnload = 'onload' in script;


        if (hasOnload) {
            script.onload = jsOnload;
            script.onerror = function () {
                jsOnload('ScriptError');
            }
        }
        else {
            script.onreadystatechange = function() {
                if (/loaded|complete/.test(script.readyState)) {
                    jsOnload();
                }
            }
        }

        // 如果设置了超时，启动一个计时器
        if (context.timeout) {
            setTimeout(timeoutHandler, context.timeout);
        }

        head.appendChild(script);

        function jsOnload(error) {
            isTimeout = false;
            script.onload = script.onerror = script.onreadystatechange = null;
            head.removeChild(script);
            script = null;
            if (error && typeof error === 'string') {
                s.error = error;
            }
            resolve(context, s);
        }

        function timeoutHandler() {
            if (isTimeout) {
                console.log('timeout');
                jsOnload('RequestTimeout');
            }
        }
    }

    function resolve(loader, s) {
        if (s.error) {
            loader.errors.push(s);
        }
        loader.done();
        var cache = processCache[s.cid];
        if (cache && !cache.length) {
            for (var i = 0, len = cache.length; i < len; i++) {
                cache.shift().loader.done();
            }
        }
    }

    var Loader = function () {
        this.list = [];
        this.errors = [];
        this.timeout = [];
        this.callback = null;
    };

    Loader.prototype.then = function(src, type) {
        if (src === undefined) {
            throw new Error('木有参数');
        }

        //  修正参数
        if (!type) {
            if (typeof src === 'string') {
                if (/\.css$|\.css\?/i.test(src)) {
                    type = 'css';
                }
                if (/\.js$|\.js\?/i.test(src)) {
                    type = 'js';
                }
            }
            if (typeof src === 'function') {
                type = 'fn'
            }
        }

        type = type || 'js';
        this.list.push(getCache(src, type));
        return this;
    };

    Loader.prototype.done = function(cb) {
        if (this.callback === null) {
            this.callback = cb;
        }
        if (!this.list.length) {
            this.callback && this.callback(this.errors);
            return;
        }
        var script = this.list.shift();
        handler[script.type](this, script);
        if (!this.called) {
            this.called = true;
            return new Loader();
        }
    };

    Loader.prototype.config = function (opts) {
        this.timeout = opts.timeout || 0;
        if (opts.alias && !opts.alias.length) {
            for (var i in alias) {

            }
            for (var i = opts.alias.length - 1; i >= 0; i--) {
                alias[i] = opts.alias[i]
            }
        }
        return this;
    };

    return Loader;
}));
```


除了此类常规的写法，我们其实还可以使用其他更多的方法来实现脚本动态加载，比如自定义事件，比如模块化加载的实现，比如promise实现等等  


这篇文章的意义在于开阔思维，回顾基础。  


下面的observer对象实现了一个简单的事件注册，监听，销毁的功能，对模式有过研究或者码力深厚的同学肯定不陌生。  




```
var observer = (function () {

    var list = {};

    var on = function (evt, cb) {
        if (!list[evt]) {
            list[evt] = [];
        }
        list[evt].push(cb);
    };

    var trigger = function () {
        var evtName = Array.prototype.shift.call(arguments);
        callbacks = list[evtName];
        if (!callbacks || callbacks.length === 0) {
            return;
        }
        for (var i = 0, len = callbacks.length; i < len; i++) {
            callbacks[i].apply(this, arguments);
        }
    };

    var off = function (evt, fn) {
        var callbacks = list[evt];
        if (!callbacks) {
            return;
        }
        if (!fn) {
            callbacks && callbacks.length = 0;
            return;
        }
        for (var i = 0, len = callbacks.length i < len; i++) {
            if (fn === callbacks[i]) {
                callbacks.splice(i, 1);
            }
        }
    };

    // 暴露对外接口
    return {
        trigger: trigger,
        on: on,
        off: off
    }
})();
```



> > 延伸阅读  



[JavaScript Promise 探微](http://malcolmyu.github.io/malnote/2014/08/30/JavaScript-Promise-In-Wicked-Detail/)  


[SeaJs源码解析1](https://github.com/lifesinger/lifesinger.github.io/issues/170)  


[SeaJs源码解析2](https://github.com/lifesinger/lifesinger.github.io/issues/171)  


[SeaJs源码解析3](https://github.com/lifesinger/lifesinger.github.io/issues/175)  


[HeadJs](http://qianduanblog.com/post/headjs.html)