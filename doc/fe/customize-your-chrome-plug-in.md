---
title: "定制属于你自己的chrome插件"
author: "sucer"
datetime: 2015-11-16 08:00:00
cover: "http://ww1.sinaimg.cn/large/633b942ejw1eyc2zav7jxj20rs0gigo2.jpg"
---

**1.添加图标到浏览器窗口，两种方式**  


<span class="s1"><b>1）地址栏右侧，如下图：</b></span>  


<span class="s2">manifest代码如下：</span>  



```
"browser_action": {
  "default_icon": "images/icon.gif",   // 直接定义插件图标
  "default_popup": "popup.html"  // 插件弹窗html
},
```

<img src="http://ww2.sinaimg.cn/large/43b712ebjw1ey33ussdiwj205g02aaa3.jpg" alt="" width="196" height="82" />
  


<span class="s1">更多资料参考：</span>  


<span class="s4"><a href="http://developer.chrome.com/extensions/browserAction.html">http://developer.chrome.com/extensions/browserAction.html</a></span>  


<span class="s1"><b>2）地址栏中，如下图：（注意默认为隐藏，必须通过js调出）</b></span>  


<img src="http://ww4.sinaimg.cn/large/43b712ebjw1ey33yrfudej2038010743.jpg" alt="" width="116" height="36" />
  



```
{
  "name": "通过url控制插件显示与隐藏",
  "version": "1.0",
  "description":  "只有当url中含有g时才显示插件",
  "background": { "scripts": ["background.js"] },
  "page_action" : {
    "default_icon" : "icon-19.png",
    "default_title" : "图标hover时显示文字"
  },
  "permissions" : [
    "tabs"
  ],
  "icons" : {
    "48" : "icon-48.png",
    "128" : "icon-128.png"
  },
  "manifest_version": 2
}
```

<span class="s1">调出代码如下，在background.js中：</span>  



```
function checkForValidUrl(tabId, changeInfo, tab) {
  // If the letter 'g' is found in the tab's URL...
  if (tab.url.indexOf('g') > -1) {
    // ... show the page action.
    chrome.pageAction.show(tabId);
  }
};

// Listen for any changes to the URL of any tab.
chrome.tabs.onUpdated.addListener(checkForValidUrl);
```

<span class="s1">更多资料参考：</span>  


<span class="s4"><a href="http://developer.chrome.com/extensions/pageAction.html">http://developer.chrome.com/extensions/pageAction.html</a></span>  


<span class="s1"><b>2.桌面提醒，如下图：（注意是电脑桌面，而不是chrome中）</b></span>  


<img src="http://ww1.sinaimg.cn/large/43b712ebjw1ey343se926j208r02b3yi.jpg" alt="" width="315" height="83" />
  


<span class="s1">改桌面提醒的代码在popup.html的js文件中写即可（备注：chrome插件中不允许写内联js，故需要将js写在外联js中）</span>  


<span class="s1">代码如下：</span>  



```
var notification = webkitNotifications.createNotification(
  'icon-48.png', // 弹窗图片，记住要在manifest中声明
  'Hello!', // 弹窗标题
  '最新新闻提示~~'  // 弹框内容
);

//或者弹出网页
var notification = webkitNotifications.createHTMLNotification(
  '<a href="http://www.baidu.com">错误! 超链接引用无效。  // 弹窗地址（只有300*180左右大小）
);

notification.show();
```

<span class="s1">这里还提供了与其它view通信的接口</span>  



```
var back = chrome.extension.getBackgroundPage();
back.document.body.innerHTML = "";
var views = chrome.extension.getViews({type:"notification"});
```

<span class="s1"><b>3.omnibox，可以基于地址栏扩展，如下图</b></span>  


<img src="http://ww4.sinaimg.cn/large/43b712ebjw1ey347jb0twj20cb046gm6.jpg" alt="" width="443" height="150" />
  


<span class="s1">代码如下：（这里要注意的一点时，需要输入keyword的值（如下demo是lhs），按tab键才能进入omnibox模式，进入该模式，后续绑定的事件才能生效）</span>  


<span class="s1">manifest.json配置文件如下：</span>  



```
{
  "name": "liuhui's Omnibox",
  "description" : "地址栏输入测试",
  "version": "1.1",
  "background": {
    "scripts": ["background.js"]
  },
  "omnibox": { "keyword" : "lhs" },
  "manifest_version": 2
}
```

<span class="s1">background.js文件如下：</span>  



```
//当用户在omnibox中输入时触发，类似于地址栏改变时执行
chrome.omnibox.onInputChanged.addListener(
  function (text, suggest) {
    console.log('inputChanged: ' + text);
    chrome.omnibox.setDefaultSuggestion({
      description:'默认显示'
    });
    suggest([
      {content:text + " one", description:"the first one"},
      {content:text + " number two", description:"the second entry"}
    ]);
  }
);

//当用户点击omnibox下拉提示时执行（默认添加了google搜索，点击时不触发此事件）
chrome.omnibox.onInputEntered.addListener(
  function (text) {
    console.log('inputEntered: ' + text);
    alert('You just typed "' + text + '"');
  }
);
```

<span class="s1">更多资料参考：</span>  


<span class="s4"><a href="http://developer.chrome.com/extensions/omnibox.html">http://developer.chrome.com/extensions/omnibox.html</a></span>  


<span class="s1"><b>4.经常看到很多chrome插件都有可配置项，例如refer_control怎么做到的呢？效果如下图：</b></span>  


<img src="http://ww4.sinaimg.cn/large/43b712ebjw1ey34cvmsajj20ad04gmxu.jpg" alt="" width="373" height="160" />
  


<span class="s1">manifest.json中配置项如下</span>  



```
{
  ...
  "manifest_version": 2,
  "options_page":"options.html"
}
```

<span class="s1">options.html即为配置项，随便配置即可（注意html中不能有内联js）</span>  


<span class="s1">至于options.html中配置项与插件的通信可以通过localstorage来解决</span>  


<span class="s1"><b>5.覆盖已有的页面,效果如下图</b></span>  


<img src="http://ww2.sinaimg.cn/large/43b712ebjw1ey34ehj0ouj20ca064gmd.jpg" alt="" width="442" height="220" />
  


<span class="s1">代码如下：</span>  



```
"chrome_url_overrides" : {
  "pageToOverride": "myPage.html"
}
```

<span class="s1">使用:bookmarks/history/newtab替换pageToOverride</span>  




- <span class="s1">bookmarks：书签页面，在chrome中输入chrome://bookmarks/ 打开</span>
- <span class="s1">history：历史访问记录页面，在chrome中输入chrome://chrome/history/打开</span>
- <span class="s1">newtab：新页面，在chrome中新建页面时展现，或者输入chrome://chrome/newtab/</span>


<span class="s1">一个插件中只能替换上述三种页面中的一个。</span>  


<span class="s1"><b>注意事项：</b></span>  




- <span class="s1">新页面最好小而快，用户经常希望立马打开页面</span>
- <span class="s1">新页面中药添加title,例如<title>new tab</title></span>
- <span class="s1">新页面不要有焦点，当新建窗口时，用户往往希望焦点在地址栏</span>
- <span class="s1">不要模仿默认的新建页</span>