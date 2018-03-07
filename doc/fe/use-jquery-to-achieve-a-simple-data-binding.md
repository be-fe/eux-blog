---
title: "利用jQuery实现简单的数据双向绑定"
author: "西瓜痞"
datetime: 2015-09-11 12:00:00
---

## 导语

在软件开发中，MVC或者MVVM是经常被用到的设计模式。在web前端开发中，之前我们需要自己写许多代码来完成这项功能。而现在有许多优秀的类库可以帮我们实现这个功能。  

许多优秀的前端框架都提供了强大的数据双向绑定的功能。比如 **Ember.js**， **Angular.js**， **KnockoutJS**。  

如果我们在一些小型的项目中，只是希望某个功能区域有数据双向绑定的功能，是不是就非得使用这么重的框架呢？事实上，我们可以用jQuery来实现一个简单的数据双向绑定的功能。  


从头开始做一个数据双向绑定并不是那么复杂。简单来说，需要实现下面三点：  




2. 我们需要指定View中的UI元素和数据中的属性对应关系。
4. 我们需要监听View中的UI元素内容以及数据的变化。
6. 最后就是我们需要把变化通知到所有与之绑定的数据或者UI元素。



## Javascript Code


```
function DataBinder (objectId) {
    // 使用jQuery空对象作为监听对象
    var pubSub = jQuery({});
    //
    var dataAttr = 'bind-' + objectId;
    var message = objectId + ':change';
    // 监听dom中所有元素的 data-binding 属性变化。并由pubSub来处理。
    $(document).on('input change', '[data-' + dataAttr + ']', function (event) {
        var $ele = $(this);
        console.log('$ele', $ele);
        pubSub.trigger(message, [$ele.data(dataAttr), $ele.val()]);
    });
    // pubSub把数据变化推送给所有与之绑定的页面元素
    pubSub.on(message, function (event, proName, newValue) {
        $('[data-' + dataAttr + '=' + proName + ']').each(function () {
            var $ele = $(this);
            if($ele.is('input, textarea, select')) {
                $ele.val(newValue);
            } else {
                $ele.html(newValue);
            }
        })
    });
    return pubSub;
}
function User(uid) {
    var binder = new DataBinder(uid);
    var user = {
        attributes: {},
        set: function (attrName, val) {
            this.attributes[attrName] = val;
            binder.trigger(uid + ':change', [attrName, val, this]);
        },
        get: function (attrName) {
            return this.attributes[attrName];
        },
        _binder: binder
    }
    return user;
}
```

调用的时候，用uid与之关联。  



## Javascript Code


```
var user = new User('user');
$('#btnSet').bind('click', function (event) {
    user.set('name', 'Liuyuan211');
});
```


## Html


```
<div class="item">
    <label>用户名：</label><input type="text" data-bind-user="name" /><span data-bind-user="name"></span>
</div>
<div class="item">
    <input type="button" id="btnSet" value="Set" />
</div>
```

该例子中，uid就是 `data-bind-user="name"` 中的 `user` ，绑定的页面元素会自动与user对应的属性关联。  



## 题外话

如果项目中需要使用的数据绑定功能更复杂，[knockout.js](http://knockoutjs.com/documentation/observables.html) 库也是一个不错的选择。  




- 免费开源
- javascript原生代码实现，不依赖其他库
- 小巧，只有50多K大
- 支持几乎所有主流浏览器