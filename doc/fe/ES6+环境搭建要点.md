---
title: "ES6+ 开发环境搭建要点"
author: "谢郁"
datetime: "2018-5-04"
cover: "https://bj.bcebos.com/v1/eux-blog-static/ES6开发环境.jpg"
---

## ES6+ 开发环境搭建要点

要在我们的实际开发中使用ES6+语法，必须要搭建一个编译环境，将ES6+语法转换为浏览器可执行且兼容性良好的ES5语法才能使用，那么搭建一个ES6+的真实项目开发环境有哪些注意事项呢？

#### Babel

Babel可以帮我们将大部分的ES6+ 的语法转为ES5，但是需要注意的是，Babel只能转换语法，不能转换API，哪些属于语法，哪些属于API呢？可以认为声明、流程控制、循环、作用域这些相关的都属于语法，而新的数据类型，以及新的对象方法、类方法都属于API。下面这个表大家可以在Babel官网上看到，列出了Babel所能转换的语法。

<img src="http://qiniu.fe-learn.com/assets/babel.png" width="600">

我们可以直接使用babel的命令行工具，也可以在webpack， gulp等环境下使用相关的babel插件来进行转换。



#### Babel-Polyfill

前面我们讲到了，Babel只能转语法，而不能转换API，如果我们想使用ES6+的API，例如`Array.from(arguments)`就需要使用 Babel-Polyfill，一个类似于ES5-shim的东西。以下是 Babel-Polyfill 可以兼容的API

<img src="http://qiniu.fe-learn.com/assets/babel-polyfill.png" width="600">

最简单的用法当然是在页面中直接引入

```html
<script src="//cdnhost/babel-polyfill.js">
```

或者

```js
require('babel-polyfill');  //commonJS 语法
import 'babel-polyfill';    //ES Modules语法
```

但是这种引用方式也会带来一些问题，比如我只用到了2、3个新的API，却会把整个Babel-Polyfill引入。Babel-Polyfill的大小还是比较大的，那么我们可以在编译的时候分析，到底用到了哪些新的API，从而只加载我们用到的polyfill。**（使用babel提供的transform-runtime插件）**

### 模块化编译工具（Webpack/Browserfy/Rollup等）

我们一般都会在代码中使用ES Modules以增加我们代码的可维护性，如

```js
import xxx from 'xxx.js';
```

Babel可以帮我们将ES Modules转为CommonJS语法，也可以通过配置选择不进行任何处理。但是不管CommonJS还是ES Modules，浏览器都是不支持的，需要模块化工具将一个个模块按顺序连接成一个完整的、顺序的脚本。在工具选择上需要注意以下几点：

- webpack1和Browserfy都不能处理ES Modules，所以需要Babel将ES Modules转为CommonJS语法后进行二次处理。
- webpack2及以后的版本同时支持ES Modules和CommonJS
- Rollup只支持ES Modules


### 更多的shim&polyfill

除了对ES6+之外，我们还得根据项目情况，添加一些额外的shim或者polyfill。比如fetch、requestAnimationFrame 这种浏览器API，如果我们需要兼容IE8，还需要添加 ES5 shim来兼容更早的JS语法。



### 完善的开发环境

我们引入了 **Babel + Babel-Polyfill + 模块化编译工具 + 其他shim&polyfill**就可以实现一个基本的ES6+开发环境，当然我们还需要整合一些其它功能和优化，来组成一个完善的开发环境

##### 1. Dev-server

我们在开发过程中需要启动一个dev-server，dev-server除了启动一个静态文件服务器以外还可以帮我们做如下一些事情。

- 免刷新热更新
- 插入辅助开发工具：如显示本机IP，生成二维码等
- 代理服务，解决跨域和身份验证问题

##### 2. 语法转换

如果我们使用了react、vue、typescript等框架，我们还需要配置相关的语法转换器，通常我们会使用相应的webpack-loader。当然也可以使用其他的转换器转换后再提供给webpack处理。

##### 3. 性能优化

大量的JS，可能还包括CSS, JSON等文件都需要等待编译后才能看到效果，会比较影响开发效率。我们可以采取以下一些思路进行优化：

- 不编译一些肯定不需要编译的东西。
- 样式和JS分开编译
- 开启多进程提升速度**（如happy-pack）**
- 使用缓存
- 提前对一些依赖预编译，如webpack的dll插件

##### 4. sourceMap

在开发环境下，我们实际在浏览器上运行的代码并不是源码，而是编译后的结果，因此我们需要生成sourcemap，让我们在debug的时候能够定位到源码的具体哪一行。

##### 5. 其它资源处理

多数项目还需要对html/css/image等资源进行处理，开发环境需要考虑这些点。

##### 6. DEV/RD/QA/ONLINE环境区分

一般来说，我们在本地开发、开发环境、测试环境、线上环境都有一些不同的配置，同时为了方便debug，我们在本地环境和开发环境一般会有一些日志和辅助debug代码。依赖手工每次在上线的时候进行修改是非常不靠谱的，因此我们的开发脚手架应当包含DEV/RD/QA/ONLINE等环境区分。

##### 7. 自定义动作

我们往往还需要根据具体的情况进行一些操作，如：

- 将编译后的代码转换为一个和原来不同的目录结构以适应线上环境
- 提供接口，以引入一些其它的插件


### 总结

总结一下，一个最基本的ES6+的开发环境需要 **Babel + Babel-Polyfill + 模块化编译工具**这三个要素。而一个完善可用的编译环境则需要考虑很多ES6语法转换之外的要点。一般来讲，满足以下的要点，就可以称之为一个比较完善的ES6+的开发环境了。

- **Babel**
- **Babel-Polyfill **
  - 直接引用
  - transform-runtime


- **模块化编译工具**
  - Webpack
  - Browserfy
  - Rollup
- **其他shim&polyfill**
  - ES5-shim
  - fetch-ie8
  - 等等......
- **完善的开发环境**
  - dev-server
  - 配置语法转换器
  - 打包性能优化
  - 开发环境下的sourceMap
  - 对样式、图片、HTML等的处理
  - 测试、线上、本地各个环境的区分
  - 开放接口，接入其他自定义流程

















