---
title: "Chrome 调试工具的一些高阶功能"
author: "苏 迪"
datetime: 2017-08-21 12:00:00
---

- Chrome 内置抓包工具
- Block requests
- 截取长图
- 代码的覆盖率分析
- Make site better



#### Chrome 内置抓包工具

在浏览器地址栏输入**chrome://net-internals/#events**，即可打开自带的抓包工具。工具处于live状态，其他tab 页有请求刷新，列表会随之刷新请求的快照，点击快照可查看详细的请求信息，配合 network面板能看到一个完整的请求。  


[<img src="http://upload-images.jianshu.io/upload_images/670206-fe6451d3a9893c7c.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240" alt="1502785912" width="856" height="457" />
](http://eux.baidu.com/wp-content/uploads/2017/08/1502785912.png)  



#### Block requests

network 面板右击请求即可看到 block 选项，这个选项能够使我们在请求和域的级别上打断点。  


eg: 配合 Preserve log 可以监测请求在不同域之间转发跳转时状态变化(请求在不同域之间转发跳转，network面板会经常性地丢失 response)。  


[<img src="https://developers.google.cn/web/updates/images/2017/04/block-request-url.png" alt="block-request-url" width="1260" height="1182" />
](http://eux.baidu.com/wp-content/uploads/2017/08/block-request-url.png)  


   



#### 截取长图

切换 device 到其他模式(比如调试移动端)时，右边菜单栏提供了 capture full-page screenshots的选项。  


eg: 配合这个选项可以做一些 module lazyload 的优化。  


[![ab06d04fa8a8278ca1c5c1cd056e6fc](//upload-images.jianshu.io/upload_images/670206-85bb64da6ce38d62.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
](http://eux.baidu.com/wp-content/uploads/2017/08/ab06d04fa8a8278ca1c5c1cd056e6fc.png)  


   



#### 代码的覆盖率分析

通过coverage 面板可以找到没有用到的 css和 js 代码，点击单个文件可以查看详情，并且也是处于 live 状态，页面发生变化时，覆盖率报告也会随之刷新。通过右边菜单 more tools 或者通过快捷键 ctrl + shift +p (windows) 输入coverage 即可打开 coverage。  


[<img src="https://developers.google.cn/web/updates/images/2017/04/coverage.png" alt="coverage" width="1238" height="870" />
](http://eux.baidu.com/wp-content/uploads/2017/08/coverage.png)  


[<img src="https://developers.google.cn/web/updates/images/2017/04/coverage-breakdown.png" alt="coverage-breakdown" width="1236" height="1000" />
](http://eux.baidu.com/wp-content/uploads/2017/08/coverage-breakdown.png)  



#### Make site better

Audits panel 提供了 PWA, performance, 无障碍，最佳实践四个维度的网站测试报告。提供了不是很常见的无障碍测试，配合报告我们可以进行更好的无障碍优化。  


[![lh-report](http:////upload-images.jianshu.io/upload_images/670206-1496396c2c705f1b.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
](http://eux.baidu.com/wp-content/uploads/2017/08/lh-report.png)  


在每次发布版本时，[Chrome Devtools Updates](https://developers.google.cn/web/updates/2017/) 会提示更新的内容。当然，最简单的方法就是保持chrome的版本更新，更新后 devtool 面板会自动推送 features && changes。  



#### 参考资料



- [Chrome Devtools](https://developers.google.cn/web/tools/chrome-devtools/)
- [Chrome Devtools Updates](https://developers.google.cn/web/updates/2017/)
- [chrome://net-internals](https://www.chromium.org/developers/design-documents/network-stack/netlog)