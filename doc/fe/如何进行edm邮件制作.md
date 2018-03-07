---
title: "如何进行EDM邮件制作"
author: "谢 郁"
datetime: 2017-12-13 12:00:00

---

首先，制作EDM邮件的一个准则就是使用table布局和inline style，因为很多样式和标签邮件客户端是不识别的，再一个外部资源引入的CSS/JS和写在&lt;style&gt;标签里的CSS很多时候都会被邮件客户端干掉。这两点是我们开篇的基础知识。

### A Sad Story

一开始，我们使用了网页三剑客之DreamWaver，在一整张图片上使用`&lt;map&gt;`标签增加链接，网页和outlook里测试都非常perfect，但是放到Mac客户端里，链接无法被识别出来。

然后我们又使用了网页三剑客之Photoshop，对整张图进行了切片，并给切片附上了链接，然后直接导出为html，出来直接就是table布局，一些常用的样式，比如:

```css
border=0
cellpadding=0
cellspacing=0
```

这些都已经以inline的形式加入到table里了，看起来很完美了，可是发出去以后windows下的outlook显示有白边：效果是这样的：

![img](http://text-learn.qiniudn.com/92229A82923CC488CB77AD3C2F914195.JPG)

我们一开始认为，那一定是IE浏览器的锅，于是用浏览器打开页面一看，表现也是有白边，加各种样式也去不掉，后来发现是代码间的换行导致的，于是很简单，我们随便弄个在线的html压缩工具把代码一压缩就行了，IE下的白边果然就没有了。

然后再看，发现链接有默认样式（白边存在时不出现，很神奇），一个很难看的蓝框框，这个也简单，把图片和链接的`border`和`outline`、`text-decoration` 统统设为none就行。

但是茫茫多的图片和链接，都要到inline里面一个一个设置显然工作量很大，没关系，我们可以使用[juice](https://github.com/Automattic/juice)这个工具，可以很方便的帮我们把style放到inline里面去。写个gulp任务还是很容易的。

再看IE浏览器的效果，OK了，但是回头看windows outlook客户端，还是老样子，时间太晚，决定回家再说，家里装的最新的windows10自带的新式邮件客户端，估计高级货应该没问题，结果回去一看还是一样的问题。微软太令我失望了。不过新的客户端可以很容易的把邮件另存为eml格式，这样我用编辑器打开就可以查看源码了，于是我就去找别人写好的案例，自己写不行，抄还不会么？

发现人家有的是把链接和图片包在`&lt;p&gt;`标签里，没关系，可以用[cheerio](https://github.com/cheeriojs/cheerio)这个`node端的jQuey`库，找到文本里所有的`&lt;td&gt;`下的`&lt;img&gt;`或`&lt;a&gt;`，只需要用iQuery一样的wrap语法外面包一层就行：
<pre class="EnlighterJSRAW" data-enlighter-language="js">var cheerio = require('cheerio');
var $ = cheerio.load(content);
var p = $('&lt;p style="margin:0; padding:0"&gt;&lt;/p&gt;')
$('td &gt; a').wrap(p); $('td &gt; img').wrap(p);</pre>
心里刚刚为自己的机智点赞，但是实验的效果依然跟之前一样。看来不是这个原因。

最后只得一张图片一张图片的check，希望能通过归纳法找到规律，结果还真找到了，之前切图的同学有一些图片高度上切的比较窄，而outlook对应浏览器的渲染对tr有个内置的最小高度，当图片高度小于这个最小高度的话，白边就出现了，于是乎只能重新切图。

切完图以后再retry，效果比之前好很多，但还是有细细的白边，于是继续另存以后check代码，发现我们之前因为safari浏览器可以很方便的直接将网页以邮件发送，都是用的这种形式进行发送，但是代码里显示，用这种方式发的话，它会在你的代码外面包一些额外的标签
<pre class="EnlighterJSRAW" data-enlighter-language="html">&lt;base class=3D""&gt;
&lt;div class=3D"Apple-Mail-URLShareUserContentTopClass"&gt;&lt;br class=3D""&gt;
&lt;/div&gt;
&lt;div class=3D"Apple-Mail-URLShareWrapperClass" style=3D"position:relative!i=
mportant"&gt;
&lt;blockquote type=3D"cite" class=3D"" style=3D"border-left-style:none; color=
:inherit; padding:inherit; margin:inherit"&gt;
&lt;br class=3D""&gt;</pre>
外部包了这一堆都是源码中没有的，然后我尝试去掉了`&lt;blockquote&gt;`标签，效果就OK了，但是怎么把这个邮件发出去就是问题了。最后尝试了一下，发现可以先用safari发送给自己，收到以后再全选以后复制粘贴用邮件客户端发送，就不会有这些额外的标签了。

### Tips

- 使用photoshop的切片工具可以无需编写代码就方便的生成页面
- 切图时注意不要有高度值太小的，切片高度应大于40px为佳
- 使用table布局和inline style
- 需要对html代码进行压缩，规避IE下空格和换行符的影响
- 使用[juice](https://github.com/Automattic/juice)将style标签里的样式自动变成inline style
- &lt;map&gt;标签在Mac邮件客户端里无法识别
- 对于链接和图片，需要设置`border`、`outline`、`text-decoration` 为none
- 邮件制作看似简单，要做好也需要一个构建环境，目前我用的是gulp+juice+htmlmin
