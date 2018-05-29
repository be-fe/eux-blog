---
title: "ES6 对unicode的支持"
author: "谢郁"
datetime: 2017-12-6 12:00:00
cover: "https://bj.bcebos.com/v1/eux-blog-static/ES6对unicode的支持.png"
---

- Chrome 内置抓包工具
- Block requests
- 截取长图
- 代码的覆盖率分析
- Make site better


#### ES5只支持\uffff(65535)以内的unicode

比如你写

```javascript
"\u22000" //在unicode中对应为生僻字：𢀀
```

但是最后展示为："∀0"。

结论：JavaScript 内部，字符以 UTF-16 的格式储存，每个字符固定为`2`个字节。对于那些需要`4`个字节储存的字符（Unicode 码点大于`0xFFFF`的字符），JavaScript 会认为它们是两个字符。

那么参考下[各种字符的unicode区间](https://github.com/xfgryujk/TiebaManager/wiki/%E5%90%84%E7%A7%8D%E5%AD%97%E7%AC%A6%E7%9A%84unicode%E5%8C%BA%E9%97%B4)，其实还是有很多会用到的字符，它们的区间大于0xFFFF的。比如我们常见的emoji表情。这些在ES5中就没办法进行处理了。

#### ES6的写法

##### 万能写法：{}

```javascript
"\u{22000}"
```

这种写法比较简便，在正则中也可以使用，前提是要有u标示符, 否则会被识别为正则语法中的花括号

```javascript
"𢀀的蛋".match(/\u{22000}/u) //return ["𢀀"]
"𢀀的蛋".match(/\u{22000}/)  //return null
```

##### `String.prototype.charCodeAt` vs `String.prototype.codePointAt`

前者是ES5的写法，后者是ES6的写法，均由字符返回十进制的unicode编码，区别在于是否支持0xffff以上。

```js
"𢀀".charCodeAt()   //55368 这个值是错的
"𢀀".codePointAt()  //139264 十进制
"𢀀".codePointAt().toString(16) //"22000" 转为16进制的快捷方法
```



##### `String.fromCharCode` vs `String.fromCodePoint`

前者是ES5的写法，后者是ES6的写法，由unicode编码返回相应的字符串。

需要注意参数默认为十进制

```js
String.fromCodePoint(0x22000)  //"𢀀"
String.fromCodePoint(22000)    //"嗰"
```



#### 正则表达式的Unicode Property支持

[Unicode Property的解释](http://www.infoq.com/cn/news/2011/03/regular-expressions-unicode-2)

ES5中的正则是不支持Unicode Property的，而ES6可以支持，这样我们可以更方便的用正则包含或排除某些字符（[常用的unicode字符属性](http://php.net/manual/zh/regexp.reference.unicode.php)），比较好用的一个是C属性，表示不对应任何字符的unicode码，可以有效的过滤掉没用的unicode码。

比如这个例子：\uffff是一个不对应任何字符的码点，我们就可以很容易的过滤掉这个非法字符。

```js
"\u6211\uffff".replace(/\p{C}/u, '');  //我
```



#### Babel能不能兼容？

能。Babel编译器可以转换uncode regex, babel-polyfill可以兼容String.fromCodePoint和String.prototype.codePointAt。

注：String.fromCodePoint和String.prototype.codePointAt属于新的API，所有ES6+中新的API，都需要使用babel-polyfill，可以在项目中引用babel-polyfill，或在编译器中配置babel-plugin-transform-runtime.

<img width="1096" height="746" src="http://text-learn.qiniudn.com/65395a8351886b09951f5f917f676f03.png" style="width: 400px">

<img src="http://text-learn.qiniudn.com/f9dc4bf38b9c437f4e159b091789beb4.png" width="1008" height="836">



### 参考文章

- [各种字符的unicode区间](https://github.com/xfgryujk/TiebaManager/wiki/%E5%90%84%E7%A7%8D%E5%AD%97%E7%AC%A6%E7%9A%84unicode%E5%8C%BA%E9%97%B4)
- [Unicode Property的解释](http://www.infoq.com/cn/news/2011/03/regular-expressions-unicode-2)
- [常用的unicode字符属性](http://php.net/manual/zh/regexp.reference.unicode.php)
- [阮一峰 ECMAScript6入门](http://es6.ruanyifeng.com)

#### 彩蛋：一些有意思的小bug

```
var reg = /[\u{ffff}-\u{fffff}]/u
reg.test("😁") //true

var reg = /[\u0030-\uffff]/
reg.test("😁") //true

var reg = /[\u{0030}-\u{ffff}]/u
reg.test("😁") //false

var reg = /[\u4e00-\u9fa5]/    
reg.test("😁") //false

不用u，进入特殊字符区间，就会出错，期望是false, 实际是true
var reg = /[\u4e00-\uffff]/
reg.test("\u{fffff}")

var reg= /😁/
reg.test("😁") //true

var reg= /😁{2}/
reg.test("😁😁") //false

var reg= /😁{2}/u
reg.test("😁😁") //true
```

