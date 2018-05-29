---
title: "在浏览器环境下使用Protocol Buffers协议"
author: "苏 伟荣"
datetime: 2018-04-24 12:00:00
cover: "https://bj.bcebos.com/v1/eux-blog-static/在浏览器环境下使用Protocol Buffers协议.jpg"
---

###  在浏览器环境下使用Protocol Buffers协议

#### 什么是Protocol Buffers？

wiki上面有这样一段描述：

> **Protocol Buffers** is a method of serializing structured data. It is useful in developing programs to communicate with each other over a wire or for storing data. The method involves an interface description language that describes the structure of some data and a program that generates source code from that description for generating or parsing a stream of bytes that represents the structured data.

它是一种序列化数据格式，类似我们常用的JSON，XML。用的比较多的是在后台服务间进行数据通讯。

### 概况：

#### 基本流程

### ![概况图](http://eux-blog-static.bj.bcebos.com/%E6%A6%82%E5%86%B5%E5%9B%BE.png)前端应该怎么使用？

在说怎么使用 Protocol Buffers 前先说一下具体涉及的几个概念：

1. proto文件，用来定义需要的存储结构的文件。
2. proto文件编译器，用来将在proto文件定义的存储结构转化成需要运行的开发语言环境版本，比如转换为JS环境下版本。

#### 1. 编写proto文件

下面这个例子是都是比较简单常用的数据类型；也可自定义一些数据类型，比如下面的ClassType，这个类型可以用到协议文件的任何结构里面。

```protobuf
// common.proto
enum OSType{
    type_mac = 1;
    type_win = 2;
}
```

```protobuf
// msg.proto
import "common.proto";

enum ClassType{
    type_one = 1;
    type_second = 2;
}

message oneMsg {
    required uint32 id = 1;
 	required string name = 2;
 	required ClassType type = 3;
 	optional OSType osType = 4;
}
```

更多的字段说明可以参考官方说明：[https://developers.google.com/protocol-buffers/docs/proto](https://developers.google.com/protocol-buffers/docs/proto)

#### 2. 选编译工具

[goole官方工具](https://github.com/google/protobuf/releases) - google官方支持多语言，有一个统一的编译工具，不支持浏览器环境下的协议文件编译（也不建议这么做）。

[protobuf.js](https://github.com/dcodeIO/protobuf.js) - 第三方的一个针对JS环境的库

#### 3. 编译proto文件(基于protobuf.js)

* 先install一下编译工具包

  ```shell
  npm install protobufjs --save
  ```

* 使用编译工具把定义的proto文件编译成你想要的数据格式

  ```shell
  # pbjs v6.7.0 参数格式
  pbjs -t json -w es6 -o msg.js msg.proto common.proto

  #pbjs v4.1.2 参数格式
  #pbjs -s proto -t json  ./msg.proto > msg.json
  ```

  具体参数可以参考：[https://github.com/dcodeIO/protobuf.js#pbjs-for-javascript](https://github.com/dcodeIO/protobuf.js#pbjs-for-javascript)

  常用的是*JSON*或者*JS模块*这两种模式；想直接使用proto文件？也是可以的，但是需要在生产环境引入protobuf.js的编译模块，并且性能会不如JS或者JSON这两种使用方式。

  那JSON和JS模块这两个使用方式有什么区别？

  本质上并没有任何区别！！！

  但根据个人经验，如果用JSON的方式会更加可控，因为你可以选择性的使用这个JSON配置来在生产环境需要的时候再初始化协议相关工具函数。

#### 4. 使用产出的JS工具函数处理数据

* 序列化

  ```js
  // 基于protobufjs v6.7.0
  import * as $protobuf from "protobufjs/light";
  // 基于protobufjs v4.1.2
  //import * as $protobuf from "protobufjs";
  import ProtoMsg from 'msg.json';

  // 基于protobufjs v6.7.0
  let Msg = (new $protobuf.Root()).addJSON(ProtoMsg);
  // 基于protobufjs v4.1.2
  // let Msg = $protobuf.newBuilder({})["import"](ProtoMsg).build()

  Msg.encode({
      id: 1,
      name: 'pb'
      type: 2
  });
  // <Buffer>
  ```

* 反序列化

  ```js
  // 基于protobufjs v6.7.0
  import * as $protobuf from "protobufjs/light";
  // 基于protobufjs v4.1.2
  //import * as $protobuf from "protobufjs";
  import ProtoMsg from 'msg.json';

  // 基于protobufjs v6.7.0
  let Msg = (new $protobuf.Root()).addJSON(ProtoMsg);
  // 基于protobufjs v4.1.2
  // let Msg = $protobuf.newBuilder({})["import"](ProtoMsg).build()

  Msg.decode(<Buffer>) // === {id: 1,name: 'pb', type: 2}
  ```


###优势&劣势

####优势：

* **体积小**, 相对XML和JSON，它表达同样的数据可以达到一个3到10倍的压缩效果。
* **序列化和反序列化性能高**，因为二进制序列的操作效率会比字符串要高，并且Protocol Buffers没有类似xml的词法文法分析，序列化和反序列化的步骤少很多。

####劣势：

* **对于浏览器环境编译代码体积较大**，因为预先加载数据的序列化和反序列化方法，会导致需要加载额外的js代码。
* 因为基于buffer，所以兼容性不如json和xml。

### 写在最后：

​	在前端实践Protocol Buffers的过程中我们遇到好些代码体积和组织的问题；如果你的页面跟server数据通讯非常频繁的话可以考虑使用Protocol Buffers，比如频繁即时通讯；如果是控制台或者其他一些spa应用，还是需要权衡一下数据使用成本，代码体积和数据压缩的收益。

相关参考资料：

[Protocol Buffers 官方](https://developers.google.com/protocol-buffers/docs/overview)

[Protobuf](https://github.com/google/protobuf)

[Google Protocol Buffer 的使用和原理](https://www.ibm.com/developerworks/cn/linux/l-cn-gpb/index.html)

[protobuf.js](https://github.com/dcodeIO/protobuf.js)









