---
title: "利用 javascript 实现富文本编辑器"
author: "田 光宇"
datetime: 2017-11-02 12:00:00
cover: "http://owtgo1dtq.bkt.clouddn.com/46648fd495648ddb8b4f0bb94360160d.jpg"
---

近期项目中需要开发一个兼容PC和移动端的富文本编辑器，其中包含了一些特殊的定制功能。考察了下现有的js富文本编辑器，桌面端的很多，移动端的几乎没有。桌面端以UEditor为代表。但是我们并不打算考虑兼容性，所以没有必要采用UEditor这么重的插件。为此决定自研一个富文本编辑器。本文，主要介绍如何实现富文本编辑器，和解决一些不同浏览器和设备之间的bug。    

# 准备阶段  
在现代浏览器中已经为我们准备好了许多API来让 html 支持富文本编辑功能，我们没有必要自己完成全部内容。  
## contenteditable="true"
首先我们需要让一个 `div` 成为可编辑状态，加入`contenteditable="true"` 属性即可。  



```html  
<div contenteditable="true" id="rich-editor"></div>
```


在这样的 `<div>` 中插入任何节点都将默认是可编辑状态的。如果想插入不可编辑的节点，我们就需要指定插入节点的属性为 `contenteditable="false"`。  

## 光标操作  
作为富文本编辑器，开发者需要有能力控制光标的各种状态信息，位置信息等。浏览器提供了 `selection` 对象和 `range` 对象来操作光标。    
### selection 对象  
Selection对象表示用户选择的文本范围或插入符号的当前位置。它代表页面中的文本选区，可能横跨多个元素。文本选区由用户拖拽鼠标经过文字而产生。  
获得一个 selection 对象  

   

```javascript    
let selection = window.getSelection();
```

 

通常情况下我们不会直接操作 `selection` 对象，而是需要操作用 `seleciton` 对象所对应的用户选择的 `ranges` (区域)，俗称”拖蓝“。获取方式如下：  



```javascript  
let range = selection.getRangeAt(0);
```



由于浏览器当前可能存在多个文本选取，所以 `getRangeAt` 函数接受一个索引值。在富文本编辑其中，我们不考虑多选取的可能性。  

selection 对象还有两个重要的方法， `addRange` 和 `removeAllRanges`。分别用于向当前选取添加一个 range 对象和 删除所有 range 对象。之后你会看到他们的用途。  

### range 对象  
通过 selection 对象获得的 range 对象才是我们操作光标的重点。Range表示包含节点和部分文本节点的文档片段。初见 range 对象你有可能会感到陌生又熟悉，在哪儿看见过呢？作为一个前端工程师，想必你一定拜读过《javascript 高级程序设计第三版》 这本书。在第12.4节，作者为我们介绍了 DOM2 级提供的 range 接口，用来更好的控制页面。反正我当时看的一脸？？？？这个有啥用，也没有这种需求啊。这里我们就大量的用到这个对象。对于下面节点：  



```html   
<div contenteditable="true" id="rich-editor">
    <p>百度EUX团队</p>
</div>
```


光标位置如图所示：  
<img src="https://caelumtian.github.io/2017/08/21/%E5%88%A9%E7%94%A8javascript%E6%90%AD%E5%BB%BA%E5%AF%8C%E6%96%87%E6%9C%AC%E7%BC%96%E8%BE%91%E5%99%A8/a.png" alt="" width="237" height="47" />
打印出此时的 range 对象：  
<img src="https://caelumtian.github.io/2017/08/21/%E5%88%A9%E7%94%A8javascript%E6%90%AD%E5%BB%BA%E5%AF%8C%E6%96%87%E6%9C%AC%E7%BC%96%E8%BE%91%E5%99%A8/b.png" alt="" width="762" height="132" />  

其中属性含义如下：  
* startContainer: range 范围的起始节点。
* endContainer: range 范围的结束节点
* startOffset: range 起点位置的偏移量。
* endOffset: range 终点位置的偏移量。
* commonAncestorContainer: 返回包含 startContainer 和 endContainer 的最深的节点。  
* collapsed: 返回一个用于判断 Range 起始位置和终止位置是否相同的布尔值。  

这里我们的 startContainer , endContainer, commonAncestorContainer都为 `#text` 文本节点 '百度EUX团队'。因为光标在‘度‘字后面，所以startOffset 和 endOffset 均为 2。且没有产生拖蓝，所以 collapsed 的值为 true。我们再看一个产生拖蓝的例子：  

光标位置如图所示：  
<img src="https://caelumtian.github.io/2017/08/21/%E5%88%A9%E7%94%A8javascript%E6%90%AD%E5%BB%BA%E5%AF%8C%E6%96%87%E6%9C%AC%E7%BC%96%E8%BE%91%E5%99%A8/c.png" alt="" width="280" height="46" /> 
打印出此时的 range 对象：  
<img src="https://caelumtian.github.io/2017/08/21/%E5%88%A9%E7%94%A8javascript%E6%90%AD%E5%BB%BA%E5%AF%8C%E6%96%87%E6%9C%AC%E7%BC%96%E8%BE%91%E5%99%A8/d.png" alt="" width="763" height="133" />  

由于产生了拖蓝 startContainer 和 endContainer 不再一致，collapsed 的值变为了 false。startOffset 和 endOffset 正好代表了拖蓝的起终位置。更多的效果大家自己尝试吧。  

操作一个 range 节点，主要有如下方法：  

* setStart(): 设置 Range 的起点
* setEnd(): 设置 Range 的终点 
* selectNode(): 设定一个包含节点和节点内容的 Range  
* collapse(): 向指定端点折叠该 Range
* insertNode(): 在 Range 的起点处插入节点。
* cloneRange(): 返回拥有和原 Range 相同端点的克隆 Range 对象  

富文本编辑里面常用的就这么多，还有很多方法就不列举了。  

#### 修改光标位置  
我们可以通过调用 `setStart()` 和 `setEnd()` 方法，来修改一个光标的位置或拖蓝范围。这两个方法接受的参数为各自的起终节点和偏移量。例如我想让光标位置到"百度EUX团队"最末尾，那么可以采用如下方法：  



```javascript 
let range = window.getSelection().getRangeAt(0),
    textEle = range.commonAncestorContainer;
range.setStart(range.startContainer, textEle.length);
range.setEnd(range.endContainer, textEle.length); 
```


我们加入一个定时器来查看效果： 

<img src="https://caelumtian.github.io/2017/08/21/%E5%88%A9%E7%94%A8javascript%E6%90%AD%E5%BB%BA%E5%AF%8C%E6%96%87%E6%9C%AC%E7%BC%96%E8%BE%91%E5%99%A8/e.gif" alt="" width="142" height="30" />  

然而这种方式有个局限性，就是当光标所在的节点如果发生了变动。比如被替换或者加入新的节点了，那么再用这种方式就不会有任何效果。为此我们有时候需要一种强制更改光标位置手段, 简要代码如下(实际中你有可能还需要考虑自闭和元素等内容)：



```javascript    
function resetRange(startContainer, startOffset, endContainer, endOffset) {
    let selection = window.getSelection();
        selection.removeAllRanges();
    let range = document.createRange();
    range.setStart(startContainer, startOffset);
    range.setEnd(endContainer, endOffset);
    selection.addRange(range);
}
```


我们通过重新创造一个 range 对象并且删除原有的 ranges 来保证光标一定会变动到我们想要的位置。 

## 修改文本格式  
实现富文本编辑器，我们就要能够有修改文档格式的能力，比如加粗，斜体，文本颜色，列表等内容。DOM 为可编辑区提供了 `document.execCommand` 方法，该方法允许运行命令来操纵可编辑区域的内容。大多数命令影响文档的选择（粗体，斜体等），而其他命令插入新元素（添加链接）或影响整行（缩进）。当使用 contentEditable时，调用 execCommand() 将影响当前活动的可编辑元素。语法如下：  

> bool = document.execCommand(aCommandName, aShowDefaultUI, aValueArgument)  

* aCommandName: 一个 DOMString ，命令的名称。可用命令列表请参阅 命令 。
* aShowDefaultUI: 一个 Boolean， 是否展示用户界面，一般为 false。Mozilla 没有实现。
* aValueArgument: 一些命令（例如insertImage）需要额外的参数（insertImage需要提供插入image的url），默认为null。  

总之浏览器能把大部分我们想到的富文本编辑器需要的功能都实现了，这里我就不一一演示了。感兴趣的同学可以查看 [MDN - document.execCommand](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/execCommand)。  

到这里，我相信你已经可以做出一个像模像样的富文本编辑器了。想想还挺激动的，但是呢，一切都没有结束，浏览器又一次坑了我们。  


# 实战开始，填坑的旅途
就在我们都以为开发如此简单的时候，实际上手却遇到了许多坑。   
## 修正浏览器的默认效果  
浏览器提供的富文本效果并不总是好用的，下面介绍几个遇到的问题。
### 回车换行
当我们在编辑其中输入内容并回车换行继续输入后，可编辑框内容生成的节点和我们预期是不符的。  
<img src="https://caelumtian.github.io/2017/08/21/%E5%88%A9%E7%94%A8javascript%E6%90%AD%E5%BB%BA%E5%AF%8C%E6%96%87%E6%9C%AC%E7%BC%96%E8%BE%91%E5%99%A8/f.png" alt="" width="296" height="56" />   
<img src="https://caelumtian.github.io/2017/08/21/%E5%88%A9%E7%94%A8javascript%E6%90%AD%E5%BB%BA%E5%AF%8C%E6%96%87%E6%9C%AC%E7%BC%96%E8%BE%91%E5%99%A8/a.png" alt="" width="237" height="47" />    
可以看到最先输入的文字没有被包裹起来，而换行产生的内容，包裹元素是 `<div>` 标签。为了能够让文字被 `<p>` 元素包裹起来。
我们要在初始化的时候，向`<div>`默认插入`<p><br></p>` 元素(`<br>`标签用来占位，有内容输入后会自动删除)。这样以后每次回车产生的新内容都会被`<p>` 元素包裹起来(在可编辑状态下，回车换行产生的新结构会默认拷贝之前的内容，包裹节点，类名等各种内容)。  
我们还需要监听 keyUp 事件下 `event.keyCode === 8` 删除键。当编辑器中内容全被清空后(delete键也会把`<p>`标签删除)，要重新加入`<p><br></p>`标签，并把光标定位在里面。   

### 插入 ul 和 ol 位置错误  
当我们调用 `document.execCommand("insertUnorderedList", false, null)` 来插入一个列表的时候，新的列表会被插入`<p>`标签中。  
<img src="https://caelumtian.github.io/2017/08/21/%E5%88%A9%E7%94%A8javascript%E6%90%AD%E5%BB%BA%E5%AF%8C%E6%96%87%E6%9C%AC%E7%BC%96%E8%BE%91%E5%99%A8/h.png" alt="" width="215" height="149" />    
为此我们需要每次调用该命令前做一次修正，参考代码如下：



```javascript  
function adjustList() {
    let lists = document.querySelectorAll("ol, ul");
     for (let i = 0; i < lists.length; i++) {
        let ele = lists[i]; // ol
        let parentNode = ele.parentNode;
        if (parentNode.tagName === 'P' && parentNode.lastChild === parentNode.firstChild) {
                parentNode.insertAdjacentElement('beforebegin', ele);
                parentNode.remove()
        }
    }
}
```


这里有个附带的小问题，我试图在 `<li><p></p></li>` 维护这样的编辑器结构(默认是没有`<p>`标签的)。效果在 chrome 下运行很好。但是在 safari 中，回车永远不会产生新的 `<li>` 标签，这样就是去了该有的列表效果。  

### 插入分割线    
调用 `document.execCommand('insertHorizontalRule', false, null);` 会插入一个`<hr>`标签。然而产生的效果却是这样的：  
<img src="https://caelumtian.github.io/2017/08/21/%E5%88%A9%E7%94%A8javascript%E6%90%AD%E5%BB%BA%E5%AF%8C%E6%96%87%E6%9C%AC%E7%BC%96%E8%BE%91%E5%99%A8/i.gif" alt="" width="191" height="60" />  
光标和`<hr>`的效果一致了。为此要判断当前光标是否在 `<li>` 里面，如果是则在 `<hr>` 后面追加一个空的文本节点 `#text` 不是的话追加 `<p><br></p>`。然后将光标定位在里面，可用如下方式查找。



```javascript    
/**
 * 查找父元素
 * @param {String} root 
 * @param {String | Array} name 
 */
function findParentByTagName(root, name) {
    let parent = root;
    if (typeof name === "string") {
        name = [name];
    }
    while (name.indexOf(parent.nodeName.toLowerCase()) === -1 && parent.nodeName !== "BODY" && parent.nodeName !== "HTML") {
        parent = parent.parentNode;
    }
    return parent.nodeName === "BODY" || parent.nodeName === "HTML" ? null : parent;
},
```



### 插入链接  
调用 `document.execCommand('createLink', false, url);` 方法我们可以插入一个 url 链接，但是该方法不支持插入指定文字的链接。同时对已经有链接的位置可以反复插入新的链接。为此我们需要重写此方法。



```javascript 
function insertLink(url, title) {
    let selection = document.getSelection(),
        range = selection.getRangeAt(0);
    if(range.collapsed) {
        let start = range.startContainer,
            parent = Util.findParentByTagName(start, 'a');
        if(parent) {
            parent.setAttribute('src', url);
        }else {
            this.insertHTML(`<a href="${url}">${title}</a>`);
        }
    }else {
        document.execCommand('createLink', false, url);
    }
} 
```



### 设置 h1 ~ h6 标题  
浏览器没有现成的方法，但我们可以借助 `document.execCommand('formatBlock', false, tag)`, 来实现，代码如下：



```javascript  
function setHeading(heading) {
    let formatTag = heading,
        formatBlock = document.queryCommandValue("formatBlock");
    if (formatBlock.length &gt; 0 &amp;&amp; formatBlock.toLowerCase() === formatTag) {
        document.execCommand('formatBlock', false, ``);
    } else {
        document.execCommand('formatBlock', false, ``);
    }
}
```

### 插入定制内容  
当编辑器上传或加载附件的时候，要插入能够展示附件的 `<div>` 节点卡片到编辑中。这里我们借助 `document.execCommand('insertHTML', false, html);` 来插入内容。为了防止div被编辑，要设置 ``contenteditable="false"``哦。

### 处理 paste 粘贴
在富文本编辑器中，粘贴效果默认采用如下规则：   

1. 如果是带有格式的文本，则保留格式(格式会被转换成html标签的形式)
2. 粘贴图文混排的内容，图片可以显示，src 为图片真实地址。
3. 通过复制图片来进行粘贴的时候，不能粘入内容
4. 粘贴其他格式内容，不能粘入内容  

为了能够控制粘贴的内容，我们监听 `paste` 事件。该事件的 event 对象中会包含一个 clipboardData 剪切板对象。我们可以利用该对象的 getData 方法来获得带有格式和不带格式的内容，如下。   




```javascript    
let plainText = event.clipboardData.getData('text/plain');  // 无格式文本
let plainHTML = event.clipboardData.getData('text/html');   // 有格式文本
```




之后调用 `document.execCommand('insertText', false, plainText);` 或 `document.execCommand('insertHTML', false, plainHTML;` 来重写编辑上的paste效果。

然而对于规则 3 ，上述方案就无法处理了。这里我们要引入 `event.clipboardData.items` 。这是一个数组包含了所有剪切板中的内容对象。比如你复制了一张图片来粘贴，那么 `event.clipboardData.items` 的长度就为2：
`items[0]` 为图片的名称，items[0].kind 为 'string', items[0].type 为 'text/plain' 或 'text/html'。获取内容方式如下：  


```javascript 
items[0].getAsString(str => {
    // 处理 str 即可
}) 
```



`items[1]` 为图片的二进制数据，items[1].kind 为'file'， items[1].type 为图片的格式。想要获取里面的内容，我们就需要创建 `FileReader` 对象了。示例代码如下：  




```javascript    
let file = items[1].getAsFile();
// file.size 为文件大小
let reader = new FileReader();
reader.onload = function() {
    // reader.result 为文件内容，就可以做上传操作了
}
if(/image/.test(item.type)) {
    reader.readAsDataURL(file);   // 读取为 base64 格式
}
```




处理完图片，那么对于复制粘贴其他格式内容会怎么样呢？在 mac 中，如果你复制一个磁盘文件，event.clipboardData.items 的长度为 2。 items[0] 依然为文件名，然而 items[1] 则为图片了，没错，是文件的缩略图。  

### 输入法处理  
当使用输入发的时候，有时候会发生一些意想不到的事情。 比如百度输入法可以输入一张本地图片，为此我们需要监听输入法产生的内容做处理。这里通过如下两个事件处理： 

* compositionstart: 当浏览器有非直接的文字输入时, compositionstart事件会以同步模式触发
* compositionend: 当浏览器是直接的文字输入时, compositionend会以同步模式触发

## 修复移动端的问题  
在移动端，富文本编辑器的问题主要集中在光标和键盘上面。我这里介绍几个比较大的坑。  

### 自动获取焦点  
如果想让我们的编辑器自动获得焦点，弹出软键盘，可以利用 `focus()` 方法。然而在 ios 下，死活没有结果。这主要是因为 ios safari 中，为了安全考虑不允许代码获得焦点。只能通过用户交互点击才可以。还好，这一限制可以去除： 



```object-c    
[self.appWebView setKeyboardDisplayRequiresUserAction:NO]
```


### iOS 下回车换行，滚动条不会自动滚动  
在 iOS 下，当我们回车换行的时候，滚动条并不会随着滚动下去。这样光标就可能被键盘挡住，体验不好。为了解决这一问题，我们就需要监听 `selectionchange` 事件，触发时，计算每次光标编辑器顶端距离，之后再调用 window.scroll() 即可解决。问题在于我们要如何计算当前光标的位置，如果仅是计算光标所在父元素的位置很有可能出现偏差(多行文本计算不准)。我们可以通过创建一个临时 `<span>` 元素查到光标位置，计算`<span>`元素的位置即可。代码如下：



```javascript  
function getCaretYPosition() {
    let sel = window.getSelection(),
        range = sel.getRangeAt(0);
    let span = document.createElement('span');
    range.collapse(false);
    range.insertNode(span);
    var topPosition = span.offsetTop;
    span.parentNode.removeChild(span);
    return topPosition;
}
```



正当我开心的时候，安卓端反应，编辑器越编辑越卡。什么鬼？我在 chrome 上线检查了一下，发现 `selectionchange` 函数一直在运行，不管有没有操作。
在逐一排查的时候发现了这么一个事实。`range.insertNode` 函数同样触发 `selectionchange` 事件。这样就形成了一个死循环。这个死循环在 safari 中就不会产生，只出现在 safari 中，为此我们就需要加上浏览器类型判断了。  

### 键盘弹起遮挡输入部分  
网上对于这个问题主要的方案就是，设置定时器。局限与前端，确实只能这采用这样笨笨的解决。最后我们让 iOS 同学在键盘弹出的时候，将 webview 高度减去软键盘高度就解决了。



```object-c  
CGFloat webviewY = 64.0 + self.noteSourceView.height;
self.appWebView.frame = CGRectMake(0, webviewY, BDScreenWidth, BDScreenHeight - webviewY - height); 
```


### 插入图片失败  
在移动端，通过调用 jsbridge 来唤起相册选择图片。之后调用 `insertImage` 函数来向编辑器插入图片。然而，插入图片一直失败。最后发现是因为早 safari 下，如果编辑器失去了焦点，那么 `selection` 和 `range` 对象将销毁。因此调用 `insertImage` 时，并不能获得光标所在位置，因此失败。为此需要增加，`backupRange()` 和 `restoreRange()` 函数。当页面失去焦点的时候记录 range 信息，插入图片前恢复 range 信息。  



```javascript    
backupRange() {
    let selection = window.getSelection();
    let range = selection.getRangeAt(0);
    this.currentSelection = {
        "startContainer": range.startContainer,
        "startOffset": range.startOffset,
        "endContainer": range.endContainer,
        "endOffset": range.endOffset
    }
}
restoreRange() {
    if (this.currentSelection) {
        let selection = window.getSelection();
            selection.removeAllRanges();
        let range = document.createRange();
        range.setStart(this.currentSelection.startContainer, this.currentSelection.startOffset);
        range.setEnd(this.currentSelection.endContainer, this.currentSelection.endOffset);
        // 向选区中添加一个区域
        selection.addRange(range);
    }
}
```



在 chrome 中，失去焦点并不会清除 `seleciton` 对象和 `range` 对象，这样我们轻轻松松一个 `focus()` 就搞定了。  

重要问题就这么多，限于篇幅限制其他的问题省略了。总体来说，填坑花了开发的大部分时间。  


# 其他功能  
基础功能修修补补以后，实际项目中有可能遇到一些其他的需求，比如当前光标所在文字内容状态啊，图片拖拽放大啊，待办列表功能，附件卡片等功能啊，markdown切换等等。在了解了js 富文本的种种坑之后，range 对象的操作之后，相信这些问题你都可以轻松解决。这里最后提几个做扩展功能时候遇到的有去的问题。  
## 回车换行带格式 
前面已经说过了，富文本编辑器的机制就是这样，当你回车换行的时候新产生的内容和之前的格式一模一样。如果我们利用 `.card` 类来定义了一个卡片内容，那么换行产生的新的段落都将含有 `.card` 类且结构也是直接 copy 过来的。我们想要屏蔽这种机制，于是尝试在 keydown 的阶段做处理(如果在 keyup 阶段处理用户体验不好)。然而，并没有什么用，因为用户自定义的 keydown 事件要在 浏览器富文本的默认 keydown 事件之前触发，这样你就做不了任何处理。  
为此我们为这类特殊的个体都添加一个 property 属性，添加在 property 上的内容是不会被copy下来的。这样以后就可以区分出来了，从而做对应的处理。  
## 获取当前光标所在处样式  
这里主要是考虑 下划线，删除线之类的样式，这些样式都是用标签类描述的，所以要遍历标签层级。直接上代码：  


```javascript
function getCaretStyle() {
    let selection = window.getSelection(),
        range = selection.getRangeAt(0);
        aimEle = range.commonAncestorContainer,
        tempEle = null;
    let tags = ["U", "I", "B", "STRIKE"],
        result = [];
    if(aimEle.nodeType === 3) {
        aimEle = aimEle.parentNode;
    }
    tempEle = aimEle;
    while(block.indexOf(tempEle.nodeName.toLowerCase()) === -1) {
        if(tags.indexOf(tempEle.nodeName) !== -1) {
            result.push(tempEle.nodeName);
        }
        tempEle = tempEle.parentNode;
    }
    let viewStyle = {
        "italic": result.indexOf("I") !== -1 ? true : false,
        "underline": result.indexOf("U") !== -1 ? true : false,
        "bold": result.indexOf("B") !== -1 ? true : false,
        "strike": result.indexOf("STRIKE") !== -1 ? true : false
    }
    let styles = window.getComputedStyle(aimEle, null);
    viewStyle.fontSize = styles["fontSize"],
    viewStyle.color = styles["color"],
    viewStyle.fontWeight = styles["fontWeight"],
    viewStyle.fontStyle = styles["fontStyle"],
    viewStyle.textDecoration = styles["textDecoration"];
    viewStyle.isH1 = Util.findParentByTagName(aimEle, "h1") ? true : false;
    viewStyle.isH2 = Util.findParentByTagName(aimEle, "h2") ? true : false;
    viewStyle.isP = Util.findParentByTagName(aimEle, "p") ? true : false;
    viewStyle.isUl = Util.findParentByTagName(aimEle, "ul") ? true : false;
    viewStyle.isOl = Util.findParentByTagName(aimEle, "ol") ? true : false;
    return viewStyle;
} 
```

# 最后说一句
该项目目前提测中，所以呢，一但发现有意思的坑，我会及时补充的。  

# 参考内容    
* [MDN - document.execCommand](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/execCommand)
* [MDN - selection](https://developer.mozilla.org/zh-CN/docs/Web/API/Selection)
* [MDN - range](https://developer.mozilla.org/zh-CN/docs/Web/API/Range)  
* [input 事件兼容处理以及中文输入法优化](http://frontenddev.org/article/compatible-with-processing-and-chinese-input-method-to-optimize-the-input-events.html)
* [js获取剪切板内容，js控制图片粘贴](https://segmentfault.com/a/1190000004288686)
* [iOS UIWebView 全属性详解](http://blog.csdn.net/ll845876425/article/details/51884736)



















 





