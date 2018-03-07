---
title: "[译] 使用SMIL实现SVG动画"
author: "莳子"
datetime: 2015-12-25 08:00:00

---

## 概览

SVG图形可以通过动画元素来生成动画。什么是动画元素呢？动画元素是由同步多媒体整合语言(SMIL, Synchronized Multimedia Integration Language)引入的，SMIL可以让你在元素的属性上（比如位置，选择，颜色），或者某个路径上实现动画。SMIL中的动画元素包括：  




- <animate> 可用于针对某个纯量属性在一定时间内的动画实现
- <set> 是animate的一种简写，在类似visibility这类非数值属性上的动画实现中使用会比较方便
- <animateMotion> 可将元素沿指定路径移动
- <animateColor> 用于颜色的动画实现，要注意的是，尽管这个元素现仍存在于SVG1.1文档里，但它实际上已被移除


除了这些SMIL文档里的动画元素，SVG还提供了一些与之兼容的拓展。比如：  




- <animateTransform> 可用于在诸如transform的属性上实现动画;
- path(属性)可以让我们把SVG里的路径设置语法在某种程度上用于animationMotion元素的动画；
- <mpath>通常与animateMotion元素连用，用于指向某个路径。该元素需要包含在animateMotion元素中；
- keypoints（属性）作为animateMotion的属性值使用，用于精确控制动作路径上动画的速度；
- rotate(属性)作为animateMotion的属性值使用，用于指定对象是否随着路径变换自动旋转。也就是说，对象的x轴方向是否和动作路径的切线方向保持一致，这一点在控制动作路径上的动画的时候非常关键，在后面的animateMotion章节里会有更多介绍。


在某种程度上，SVG动画跟CSS动画很相似，但是SVG动画可以实现一些CSS动画无法实现的功能。  



## 为什么要使用SVG动画

尽管我们是可以通过CSS来控制SVG的样式和动画，比如说，一般在HTML可以使用的变化和变换也是同样适用于SVG元素的，但是仍然有一些SVG属性是不能通过CSS去控制的，比如SVG路径就涉及到用data(d=””)属性去定义路径形状，然而这种属性是可以通过SMIL去控制的。换句话说，SVG元素是通过SVG表现属性(SVG presentation attributes)来描述的，这些表现属性中的一部分可以通过CSS控制，但其余部分就无法通过CSS控制。  


这也就意味这，有不少动画效果是无法通过CSS来完成。如果你希望能够控制那些无法直接通过CSS实现的属性，可以用JS去实现，也可以用SMIL里的动画去实现。如果你更想用JS,你可以考虑使用被称作是“SVG领域中的jQuery”的snap.svg，其例子可参考这里。不过如果你更想使用偏向于描述动画的方式的话，那就可以使用这篇文章接下来会介绍到的方法。  


另外值得一提的是，使用SMIL比起使用JS的优势还在于，如果SVG是在CSS中以img或者background-image的形式嵌入页面的话，js动画就不起作用了，然后SMIL动画则在这两种情况下都没有问题（浏览器支持的前提下），在我看来，这也是SMIL的一个大优势。  



## 浏览器兼容

除了IE和Opera Mini以外，浏览器对SMIL动画的支持还是不错的。详情可以参考这里。如果你需要为SMIL动画提供备选方案，可以使用Modernizr来检测浏览器是否支持，如果不支持的话可以采用JS动画或者静态图片等等其他方式。  



## 实际应用


### 使用xlink:href指定动画目标

不论你想使用哪个动画元素，你都需要先指定动画目标。指定动画目标的第一种方式就是使用xlink:href，为这个属性设置动画目标的URI地址即可。要注意的是，目标元素必须是当前SVG文档片段中的一部分。  



```
<rect id="cool_shape" ... />
<animation xlink:href="#cool_shape" .../>
```

如果你之前接触过SVG动画元素的话，你可以就已经见过第二种指定目标元素的方式，那就是将动画元素是嵌套在目标元素中。因为如果没有明确指定xlink:href的值，那么目标元素就是当前动画元素的最近一层父元素。  



```
<rect id="cool_shape" ...>
 <animation ... />
</rect>
```

以上这两种指定目标元素的方式都是可行的。  



### 使用attributeName和attributeType指定动画属性

动画元素还有一个共有的属性：attributeName，用来指定你想要实现动画的属性。比如，当你想要在水平方向移动<circle>时，就可以给attributeName属性赋值为cx。  


要注意的是，attributeName一次只能接受一个值，如果你想要对多个属性规定动画，那就要为这个目标元素定义多个动画，这一点相比CSS就有些不那么方便，不过考虑到其他可能存在的动画属性（稍后会提到），每次只能为attributeName赋一个值确实是有利于避免过于复杂。  


另外，当你指定属性名是，你也可以增加一个XML命名空间(XMLNS, XML namespace)前缀来表明这个属性的命名空间，比如用attributeType。举例而言，如果有些属性是属于CSS命名空间的（意味着这些属性也是可以在CSS属性里的），其余的属性就只能是XML里的。（相关对比信息可以看这里）。如果没有明确指定attributeType的值或设为auto时，浏览器会先从CSS属性中寻找匹配的属性名，如果没有找到，就继续在默认的XML命名空间里寻找。  


举个例子，以下代码是用于在opacity属性上添加动画，因为我们知道opacity属性是存在于CSS中的，所以我们可以把attributeType设为CSS命名空间：  



```
<rect ...>
 <animate attributeType="CSS" attributeName="opacity" from="1" to="0" dur="5s" repeatCount="indefine"/>
</rect>
```


### 使用from,to,duration,fill,by指定动画的状态

我们从一个简单的例子开始熟悉这些属性，首先我们来尝试通过改变一个圆的cx属性在水平轴上移动它的位置。  


我们将使用<animate>这个动画元素来实现这个动画，<animate>元素通常用于对数值和颜色实施动画，而且正如我们之前提到过的，每个<animate>每次只能用于对一个属性进行动画设置。  


总的来说，为了让某个属性的值在一段时间内变成另一个值，通常会使用到from,to,dur，另外你也可以通过begin来制定何时开始动画。  



```
<circle id="my-circle" r="30" cx="50" cy="50" fill="orange" />
 <animate 
 xlink:href="#my-circle"
 attributeName="cx"
 from="50"
 to="450" 
 dur="1s"
 begin="click"
 fill="freeze" />
```

在animate元素里，begin的值是设为click，这个值代表目标元素circle会在点击后开始移动。你也可以把这个值设置成具体的时间，比如begin=”0s”代表这个动画会在页面加载完毕后马上执行，类似地，你也可以通过begin=”2s”这样的方式来延迟动画开始。  


begin属性里更有意思的是你可以给它赋click+1s这样的值，这样你就可以在元素被点击后，再延迟1s来开始动画。除此之外，你还可以通过这个属性来跟其他的动画达成同步，稍后会细讲。  


其他的属性，比如from,to,dur跟CSS动画里的keyframe中的from、to， animation-duration意思是类似的。  


不过fill属性会稍微有点不一样，因为它看起来跟SVG中用来设置填充颜色的属性是一样的，不过在<animate>中，它代表的是元素是否在动画结束后变成初始状态，此时它有两个值：  




- freeze 代表动画效果将保持动画结束时的状态，在之后处于冻结状态（除非重启动画）
- remove 代表当动画结束后，动画过程中实施的效果会被移除（除非重启动画）


by属性显然就是用来表示相对变化的了，by的效果几乎只有在非关联步骤中可以看到，有点像CSS中的steps()，SVG里有一个跟CSS里的steps()相对应的设置calcMode=”discrete”，后面会细讲。  


by属性设置的另一个体现在于当你仅指定了to属性，后面会结合set元素一起看个例子。  


关于by还有一点要提的是，当你要实现附加动画和累加动画的时候比较有用。这一点会在介绍附加动画和累加动画的时候具体讲。  



### 使用restart重新开始动画

有时候我们会需要保证动画在进行过程中不能被重新触发开始，这一点可以通过设置restart属性来实现，它的可能值有：  




- always：默认值，代表动画可以随时重新开始;
- whenNotActive： 代表只有在动画处于非激活状态时才可以重新开始，如果动画正在进行中，将会忽略触发它重新开始的事件;
- never动画将在整个容器时间段内无法重新开始（对于SVG文档片段来说，意味着整个文档过程中将不能重启动画）;



### 为动画命名并关联多个动画

当我们想要实施多个动画的时候，比如我们不仅要移动一个圆，还想要在位置移动结束后改变圆的填充色，如果用CSS思路来实现的话，我们可能会把改变颜色的begin值设为位置移动时长。 但是在SMIL中有一种类似事件处理的机制：我们之前提到过可以把click+5s这样的值赋给begin，这样的值叫做“事件值(event value)”，也就是说一个事件后还有一个“时刻值(clock value)”，为什么叫“时刻值”而不是“时间值(time value)”呢，原因在于，你确实可以写成“10min”或者”01:33″（1分钟33秒），甚至可以写成“02:30:01”，不过这种写法并不是所有的浏览器都支持。所以如果浏览器支持的话，写成click+01:30代表动画会在点击后的1分30秒后执行。  


另外一种关联多个动画的方式是“事件+另一个动画的ID”，比如你有多个动画（不论是否是同一个目标元素），你想让他们产生关联，比如动画A在动画B结束后开始，使用这种方式的话你就不需要知道其他动画的时长了。  


举个栗子：  



```
<circle id="orange-circle" r="30" cx="50" cy="50" fill="orange" />
```


```
<rect id="blue-rectangle" width="50" height="50" x="25" y="200" fill="#0099cc"></rect>
```


```
<animate 
 xlink:href="#orange-circle"
 attributeName="cx"
 from="50"
 to="450" 
 dur="5s"
 begin="click"
 fill="freeze" 
 id="circ-anim" />
```


```
<animate 
 xlink:href="#blue-rectangle"
 attributeName="x" 
 from="50"
 to="425" 
 dur="5s"
 begin="circ-anim.begin + 1s"
 fill="freeze" 
 id="rect-anim" />
```

上面这段代码以为这蓝色方块将在橙色圆形的动画开始后的1s时开始。  

类似的还可以是在动画结束前的前3s开始另一个动画：  



```
<animate 
 xlink:href="#blue-rectangle"
 attributeName="x" 
 from="50"
 to="425" 
 dur="5s"
 begin="circ-anim.end - 3s"
 fill="freeze" 
 id="rect-anim"/>
```


### 使用repeatCount重复执行动画

如果你想重复执行动画，可以使用repeatCount属性，其对应的值可以是某个具体的数字，也可以是一些特殊的关键字，如indefinite来一直重复动画。  



```
<animate 
 xlink:href="#orange-circle"
 attributeName="cx"
 from="50"
 to="450" 
 dur="5s"
 begin="click"
 repeatCount="2"
 fill="freeze" 
 id="circ-anim" />
```

有一点值得注意的是，动画在重复执行时，每一次都是从from这个值重新开始，而并不能从之前一次的动画结束点开始，这一点相比CSS的animation-direction:alternate就有些不便了。如果在SMIL中要达到类似的效果，就需要用JS来设置from和to值的变化了。相关方法可以看这里。  


还有一种技巧是把中间时间对应的值设为结束值，开始时间和结束时间对应的值都设为起始值，如果用keyframe来理解的话看起来就是这样的：  



```
@keyframes example {
 from, to {
 left: 0;
 }
```


```
50% {
 left: 300px;
 }
}
```

但是这个方法并不适用于所有场景，要具体场景具体分析。  



### 使用repeatDur限制动画重复时长

有时候如果一个时间比较长的动画一直重复的话可能会影响用户体验，所以可能会需要把动画重复的时间限制在一定范围内，即达到某个时间点后（相对于文档加载开始这个时间点而言）停止动画重复。这个时间范围我们称之为“表现时间(presentation time)。”，注意，这个时间是相对于整个文档片段的开始时间，而非某个动画的开始时间。  



```
<animate 
 xlink:href="#orange-circle"
 attributeName="cx"
 from="50"
 to="450" 
 dur="2s"
 begin="0s"
 repeatCount="indefinite"
 repeatDur="01:30" 
 fill="freeze" 
 id="circ-anim" />
```

上面这个例子就会在页面加载后的1分30秒后停止动画。  



### 基于重复次数同步多个动画

之前我们提到过可以通过给begin属性设置值使不同动画产生关联，我们也可以类似地通过重复次数来同步动画：  



```
<animate 
 xlink:href="#blue-rectangle"
 attributeName="x" 
 from="50"
 to="425" 
 dur="5s"
 begin="circ-anim.repeat(2)"
 fill="freeze" 
 id="rect-anim" />
```

这个例子中的begin值设定意味着它的目标元素会在circ-anim的动画重复了两次后开始。  



### 使用keyTimes和values控制动画帧

我们知道，在CSS动画中一般是这样设置动画帧：  



```
@keyframes example {
 0% {
 left: 0;
 }
 50% {
 left: 320px;
 }
 80% {
 left: 270px;
 }
 100% {
 left: 300px;
 }
}
```

在SMIL中，你也可以类似地控制动画，不过语法却大不相同。我们将使用keyTimes来制定帧的节点，用values来指定对应的值，所以在SMIL中是像这样控制动画帧的：  



```
<animate 
 xlink:href="#orange-circle"
 attributeName="cx"
 from="50"
 to="450" 
 dur="2s"
 begin="click"
 values="50; 490; 350; 450"
 keyTimes="0; 0.5; 0.8; 1"
 fill="freeze" 
 id="circ-anim" />
```

在上面这个例子中的keyTimes和values的值都是以列表的形式出现的，keyTimes中的每个值对应一个values里的值。keyTimes里的值是一个介于0和1之间的小数，代表着占全部时长的比例，整体来说还是跟CSS的帧控制比较相似的。  


要注意的是，如果定义了values，那么from,’to’,’by’都会被忽略。另外，keyTimes不是必须要设定的，如果你已经写明了values，那么其值根据values的值平均分配到不同的时间点上。  



### 使用calcMode和keySplines控制动画节奏

我们都知道，在CSS中可以使用animation-timing-function来控制动画节奏，比如通过使用特定关键字或者定义贝塞尔函数来实现不同动画节奏。  


在SMIL中，是通过calcMode来做这件事的，其默认值是linear（animateMotion除外，稍后会细说），其他的值还包括：discrete,paced,spline：  


discrete意味着动画将直接从一个值变为另一个值，有点类似于CSS里的steps()；  

paced有点像linear，只不过它会忽略keyTimes中定义的中间步骤。设定属性值为paced之后会计算随后的值并相应地分配时间。如果你的values里面本身就是线性模式的话，用paced和linear并没有什么区别。  

spline会根据贝塞尔曲线的设定将一个值过渡到下一个值。具体来讲，曲线的时间点在keyTimes中定义，具体的控制则是在keySplines属性中完成。  

什么是keySplines呢？先来看看它在CSS中对应的是什么吧：  



```
@keyframes bounce {
 0% {
 top: 0;
 animation-timing-function: ease-in;
 }
 15% {
 top: 200px;
 animation-timing-function: ease-out;
 }
 30% {
 top: 70px;
 animation-timing-function: ease-in;
 }
 45% {
 top: 200px;
 animation-timing-function: ease-out;
 }
 60% {
 top: 120px;
 animation-timing-function: ease-in;
 }
 75% {
 top: 200px;
 animation-timing-function: ease-out;
 }
 90% {
 top: 170px;
 animation-timing-function: ease-in;
 }
 100% {
 top: 200px;
 animation-timing-function: ease-out;
 }
}
```

在CSS中，你可以像上面的例子那样为每个帧时间点设置动画速度，当然你也可以写成具体的贝塞尔函数：  


ease-in = cubic-bezier(0.47, 0, 0.745, 0.715)  

ease-out = cubic-bezier(0.39, 0.575, 0.565, 1)  

那么在SMIL中怎么实现呢？我们先定义好一些keyTimes和values的值：  



```
<animate 
 xlink:href="#orange-circle"
 attributeName="cy"
 from="50"
 to="250" 
 dur="3s"
 begin="click"
 values="50; 250; 120;250; 170; 250; 210; 250"
 keyTimes="0; 0.15; 0.3; 0.45; 0.6; 0.75; 0.9; 1"
 fill="freeze" 
 id="circ-anim" />
```

现在我们来添加keySplines属性。keySplines接受一系列的贝塞尔控制点，每个控制点（control points）由四个值组成：x1, x2, y1, y2，这四个值用来描述某个时间区间的贝塞尔变化，这些值必须是在0到1之间，而且如果没有设置calcMode为spline的话这些值都将被忽略。  


上面我们谈到keySplines接受一系列的贝塞尔控制点，具体而言，keySplines需要两个控制点来绘制曲线。通过Lea的贝塞尔曲线工具我们看到，相同颜色的坐标代表对应的相同点：  


img  


所以要把我们上面的例子改为SMIL动画的话将会是这样：  



```
<animate 
 xlink:href="#orange-circle"
 attributeName="cy"
 from="50"
 to="250" 
 dur="3s"
 begin="click"
 values="50; 250; 120;250; 170; 250; 210; 250"
 keyTimes="0; 0.15; 0.3; 0.45; 0.6; 0.75; 0.9; 1"
 keySplines=".42 0 1 1;
 0 0 .59 1;
 .42 0 1 1;
 0 0 .59 1;
 .42 0 1 1;
 0 0 .59 1;
 .42 0 1 1;
 0 0 .59 1;"
 fill="freeze" 
 id="circ-anim"/>
```

当然如果你只想在整个动画过程中采取一种贝塞尔函数的话，你仍然要规定keyTimes属性值，不过只需要规定0;1即可，不用插入中间值。  



### 使用additive和accumulate完成附加动画和累加动画

有时候我们需要动画能够以它之前的动画结束点作为开始，比如，你需要一个元素的某个属性值一直增加，这个时候我们就需要使用additive和accumulate。  


跟其他动画一样，你首先要制定from和to的值，然而如果你设置了additive为sum的话，那么这些中间变化的值都将会以最初的动画属性值作为参考值。比如在最开始的移动圆位置的例子中，你规定的cx是50，并且from=”0″,to=”100″，那么实际上圆的移动将会以0+50,100+50作为开始和结束。  


说白了，additive的属性其实就是规定了from和to的值是否以当前值为参考值，除了可以赋值为sum以外，还可以赋值replace。replace值是默认值，意味着from和to规定的值将替代当前/初始值，没有注意到这一点的话可能会造成动画开始时诡异的移动。  


话说回来，如果我们想要的效果是重复第二次动画的时候，是以第一次动画结束时的状态为开始呢？这时候就可以使用accumulate。不难理解accumulate属性就是规定动画是否累积，默认值是none，也就是我们之前看过的重复动画的时候都从头开始。不过如果你把这个属性的值改成sum的话，就可以看到每一次动画重复都是以前一次的动画为基点的。不过别忘了有些情况下设置accumulate会失效，比如如果目标属性不支持累加，动画并没有重复，或者是动画仅规定了to属性。  



### 使用end指定动画结束时间

end值跟begin值很类似。也可以设置相对时间，事件值等等。  



### 使用多个begin和end值来定义动画间隔

事实上，begin和end属性都可以接受以分号分隔的列表值。此时，每个begin开始值就对应一个end里面的结束值，从而形成“激活态”和“非激活态”。举例来说：  



```
<animateTransform 
 xlink:href="#deepPink-rectangle"
 attributeName="transform" 
 attributeType="XML"
 type="rotate"
 from="0 75 75"
 to="360 75 75" 
 dur="2s"
 begin="0s; 5s; 9s; 17s;"
 end="2s; 8s; 15s; 25s;"
 fill="freeze" 
 restart="whenNotActive"
 />
```

在这个例子中，动画就会在0-2秒时执行，然后进入“非激活态”，到第5秒时又进入“激活态”，持续到第8秒，然后再次进入“非激活态”，以此形成动画间隔。  


也许你会说如果把repeatCount设为indefinite的时候是否可以形成间隔，答案是肯定的，因为有end值，所以它并不会一直进行。  



### 使用min和max限制激活时长

正如你可以控制动画的重复时间，你还可以限制动画的激活状态。min和max就是用来分别限制动画激活时长的最小值和最大值，两者都可以接受我们刚才提到的”时刻值“。  


就min而言，它规定了动画激活态的最小值，这个值应当为0或大于0，默认值为0。对于max来说，它规定了动画激活态的最大值，这个值必须大于0，默认值是indefinite。如果同时规定了min和max值，那么max值必须大于min值，否则这两者都会因不符合条件而被忽略。  


那么，到底什么是元素的激活态呢？我们之前提过基本时长(simple duration，也就是在不考虑任何动画重复的情况下的时长，这个我们使用dur属性规定的)和重复时长(repeat duration). 所以这些不同的时长有什么区别？为什么end属性就能够结束动画？  


实际情况是这样的，浏览器先首先根据dur，repeatCount，repeatDur，end几个值计算出一个激活时长。然后，将这个激活时长的值跟min和max的值做对比，如果之前算出的这个激活市场在最大值和最小值范围内的话，就保持使用这个先计算出来的激活时长。如果不在这个最大值最小值范围的话，那么就有可能发生以下情况：  


如果这个首先计算出来的值大于max值，那么元素的激活时长将会被设置为max的值；  

如果这个首先计算出来的值小于min值，那么元素的激活时长将会被设为min的值，并且，如果元素的重复时长（或者基本时长）比min值大，那么元素将以正常形态进行动画，否则，元素将先正常进行重复时长（或基本时长），然后就根据fill的值被冻结住或消失。  

如果需要了解更多浏览器如何处理激活时长的话，可以参考这里。  



### 渐变路径例子

还有一个无法再CSS中实现动画，但是可以在SMIL中实现动画的是SVG<path>中的d属性（也就是SVG中的<path>属性），这个属性规定了形状的信息，包括告诉浏览器在哪里进行点或线的绘制。  


通过对这个属性实施动画，我们可以创造路径渐变效果从而得到形状渐变的效果。不过，为了能够顺利地进行形状转换，开始，结束以及这期间会出现的形状都必须包括相同数量的绘制点，而且顺序需要保持一致。因为形状变化的实质是靠移动这些绘制点来实现的，所以如果缺失这些绘制点或者打乱了他们的顺序，形状就无法正常显示了。  


具体实现来说，你需要把attributeName的值设为d，把from和to的值设置为开始和结束时的形状，然后在values里把中间形状的值放进去。更详细的介绍还可以看这里。  



### 使用元素在绝对路径上实现动画

使用<animateMotion>可以指定路径，并让元素在路径上移动。这个元素接受的属性值跟之前的一样，并且还可以接受keyPoints，rotate，path这三个属性，除此之外，就是calcMode这个属性的默认值变成了paced。  



#### 使用<animateMotion>可以让元素沿着某条路线移动

path用来指定移动的路线，跟在path元素上规定d的方法类似。不过这时候规定的路径值是相对于元素当前的位置而言的。  


以下图的路径为例：  

img  



```
<animateMotion 
 xlink:href="#circle"
 dur="1s"
 begin="click"
 fill="freeze"
 path="M0,0c3.2-3.4,18.4-0.6,23.4-0.6c5.7,0.1,10.8,0.9,16.3,2.3 c13.5,3.5,26.1,9.6,38.5,16.2c12.3,6.5,21.3,16.8,31.9,25.4c10.8,8.7,21,18.3,31.7,26.9c9.3,7.4,20.9,11.5,31.4,16.7
 c13.7,6.8,26.8,9.7,41.8,9c21.4-1,40.8-3.7,61.3-10.4c10.9-3.5,18.9-11.3,28.5-17.8c5.4-3.7,10.4-6.7,14.8-11.5
 c1.9-2.1,3.7-5.5,6.5-6.5" />
```

注意看这里的坐标，是以M(moving)开头的，也就是说先移动到(0,0)这个点，然后才开始绘制曲线(curve)的。我们上面也提到过了，这时的path属性是相对于元素的相对位置的，所以刚才提到的(0,0)是圆的初始位置，而不是坐标系的左上角。所以如果你没有指定这个起始点，可能在动画的开始会有诡异的移位，比如：  



```
<path fill="none" stroke="#000000" stroke-miterlimit="10" d="M100.4,102.2c3.2-3.4,18.4-0.6,23.4-0.6c5.7,0.1,10.8,0.9,16.3,2.3
 c13.5,3.5,26.1,9.6,38.5,16.2c12.3,6.5,21.3,16.8,31.9,25.4c10.8,8.7,21,18.3,31.7,26.9c9.3,7.4,20.9,11.5,31.4,16.7
 c13.7,6.8,26.8,9.7,41.8,9c21.4-1,40.8-3.7,61.3-10.4c10.9-3.5,18.9-11.3,28.5-17.8c5.4-3.7,10.4-6.7,14.8-11.5
 c1.9-2.1,3.7-5.5,6.5-6.5"/>
```

这里的初始值是(100.4,102.2)，所以一开始的时候，这个圆会分别向右边和下边移动100,102个单元，然后才开始其他的路径。  



#### 使用指定移动路线

还有一种指定移动路线的方式<mpath>，<mpath>是<animateMotion>的子元素，使用<mpath>可以引用外部路径：  



```
<animateMotion xlink:href="#circle" dur="1s" begin="click" fill="freeze">
 <mpath xlink:href="#motionPath" />
</animateMotion>
```


#### 的覆盖规则

鉴于animateMotion有多种实现的方式，自然也就有重写规则：  


对于指定移动路径而言，mpath会覆盖path,’path’会覆盖values，values会覆盖frombyto；  

对于指定keyTimes的对应点而言，keyPoints会覆盖path，path会覆盖values,最后才是from，by和to；  



#### 使用rotate时候元素相对于移动路线的方向

当元素沿着某一条路线移动的时候，可以用rotate属性来设置元素在移动时的方向：  




- auto：元素会根据路径的方向自动旋转
- auto-reverse： 元素会根据路径的方向加上180度的角度自动旋转
- 某个数字： 元素以这个数字为旋转角度沿着路径移动



#### 使用keyPoints控制相对移动路线的动画距离

keyPoints属性用于在移动路径中为相应的keyTimes提供具体值，如果指定了keyPoints的值，keyTimes的值将会使用keyPoints的值而非values中的值。  


keyPoints接受以分号间隔的介于0和1之间的小数，代表目标元素应该移动的长度，总长度是由浏览器计算得到的。如果规定了keyPoints的值，keyTimes里就应该有对应个数的值。还有就是注意这里需要把calcMode的值设为linear才行。  



#### 在绝对路径上移动文字

在绝对路径上移动文字跟移动其他SVG元素不太一样，你需要使用的是<animate>元素而不是<animateMotion>。  


首先我们来把文字定位到某个路径上，此时可以把<textPath>嵌套到<text>元素里，而具体的路线将在<textPath>里指定。  



```
<path id="myPath" fill="none" stroke="#000000" stroke-miterlimit="10" d="M91.4,104.2c3.2-3.4,18.4-0.6,23.4-0.6c5.7,0.1,10.8,0.9,16.3,2.3
 c13.5,3.5,26.1,9.6,38.5,16.2c12.3,6.5,21.3,16.8,31.9,25.4c10.8,8.7,21,18.3,31.7,26.9c9.3,7.4,20.9,11.5,31.4,16.7
 c13.7,6.8,26.8,9.7,41.8,9c21.4-1,40.8-3.7,61.3-10.4c10.9-3.5,18.9-11.3,28.5-17.8c5.4-3.7,10.4-6.7,14.8-11.5
 c1.9-2.1,3.7-5.5,6.5-6.5"/>
 <text>
 <textpath xlink:href="#myPath">
 Text laid out along a path.
 </textpath>
 </text>
```

此外，还可以使用startOffset来指定文字在路径中的偏移量。0%代表路径的开始，100%代表结尾，如果你设置offset是50%，文字就会从路径的中间开始。  



### 使用实现动画变化

<animateTransform>元素会针对目标元素的变换属性实施动画，也就是说可以控制移动，缩放，旋转，倾斜。它用到的属性和<animate>元素一样，不过还有一个type属性。  


这个type属性是用来指定具体的变换类型的，包括translate, scale, rotate, skewX, skewY。  



### 元素

set元素提供了一种更简洁的为指定时长设置属性值的方式。不过它不能用来设置附加或累加属性。  



## 结语

不是所有的SVG属性都可以拿来实现动画，具体哪些属性可以做动画哪些不能，还是要看这里。但是SMIL还是非常有潜力的，希望以后能有更多惊艳的作品。