---
title: "分形的基本画法"
author: "赵 琳琳"
datetime: 2015-11-18 08:00:00
cover: "http://ww3.sinaimg.cn/large/633b942ejw1ey78r7joqzj20rs0gi41j.jpg"
---


## 前言

简单的讲，分形是具有自相似性的图形，不论怎么放大分形图形都能保持它局部的细节。另外分形还有个更精确的定义：维数可以是非整数。假如曲线是一维图形，平面是二维图形，立方体是三维图形；利用分形的技术可以画出维数介于整数维之间的图形。  


这篇文章主要介绍了如何用js画分形几何及分形艺术图形，同时也适用于任何具有绘图API的语言。  



## 用递归画分形

递归即调用自身，我们很容易就可以想到用递归来实现自相似性。  


这里需要先介绍一下乌龟绘图（LOGO），它是一个简单的绘图工具，仅有几个基本的绘图命令：FORWARD、MOVE、TURN、RESIZE。跟我们熟悉的canvas，svg图形不同，LOGO绘图没有坐标的概念，程序保存一个当前向量，通过向量和命令来确定移动的方向和步长。  


利用LOGO命令可以简单的画出多边形、五角星等基本的几何图形。下面是利用canvasAPI实现的版本：  



```
forward: function (D) {
    this.x = this.x + this.vector[0] * D;
    this.y = this.y + this.vector[1] * D;
    this.ctx.lineTo(this.x, this.y);
    this.ctx.stroke();
},
move: function (D) {
    this.x = this.x + this.vector[0] * D;
    this.y = this.y + this.vector[1] * D;
    this.ctx.moveTo(this.x, this.y);
},
turn: function (A) {
    var newV0 = this.vector[0] * Math.cos(-A) - this.vector[1] * Math.sin(-A);
    var newV1 = this.vector[0] * Math.sin(-A) + this.vector[1] * Math.cos(-A);
    this.vector[0] = newV0;
    this.vector[1] = newV1;
},
resize: function (S) {
    if (S < 0) {
        this.turn(Math.PI);
        S = -S;
    }
    this.vector[0] *= S;
    this.vector[1] *= S;
},
```


### 分形地垫

分形地垫也可以叫多边形地垫，即不断的绘制多边形。下图是一个具有代表性的分形地垫——sierpinki地垫。  


<img src="http://ww3.sinaimg.cn/large/699ef9c0jw1ey52auxjvuj20ag09a74b.jpg" alt="" width="376" height="334" />
  


第1层  


<img src="http://ww2.sinaimg.cn/large/699ef9c0jw1ey529t7tllj20af09574s.jpg" alt="" width="375" height="329" />
  


第6层  


   


Sierpinski地垫递归算法伪代码：  



```
SIERPINSKI(level)
  if level = 0 
    POLY(3, 2∏/3)
  else
    repeat 3 times
      RESIZE 1/2
      SIERPINSKI (level - 1)
      RESIZE 2
      MOVE 1
      TURN 2∏/3
```

可以看出，在第0层程序画的是一个正三角形，第1层时，递归调用了三次自身，每次都画了一个边长为原来的1/2的小三角形。随着递归层数的增加，绘制的三角形数量会以3的指数幂方式增长。  


利用同样的方法我们还可以画出其它的分形地垫：  


<img src="http://ww1.sinaimg.cn/large/699ef9c0jw1ey52fzt7q1j20a709yt8q.jpg" alt="" width="367" height="358" />
  


分形台阶  


<img src="http://ww2.sinaimg.cn/large/699ef9c0jw1ey52kssmsvj20cs0bjgmh.jpg" alt="" width="460" height="415" />
  


分形瑞士国旗  


   



### 凹凸分形

凹凸分形是另一种经典的分形几何图形，下图是一个具有代表性的凹凸分形——Koch曲线  


   


<img src="http://ww3.sinaimg.cn/large/699ef9c0jw1ey52mjctbzj209s05odfn.jpg" alt="" width="352" height="204" />
  


第1层  


<img src="http://ww2.sinaimg.cn/large/699ef9c0jw1ey52m0wiipj20a0044wef.jpg" alt="" width="360" height="148" />
  


第5层  


Koch曲线递归算法伪代码：  



```
KOCH(level)
  if level = 0 
    FORWARD 1
  else
    RESIZE 1/3
    KOCH(level - 1)
    TURN ∏/3
    KOCH(level - 1)
    TURN -2∏/3
    KOCH(level - 1)
    TURN ∏/3
    KOCH(level - 1)
    RESIZE 3
```

可以看出koch曲线的第0层画的是一条直线，第1层调用了4次自身，画了4直线，长度是原来的1/3。  


利用同样的方法可以画出其它一些分形曲线：  


<img src="http://ww1.sinaimg.cn/large/699ef9c0jw1ey52o1ioauj20ce07kaat.jpg" alt="" width="446" height="272" />
  


C曲线  


<img src="http://ww3.sinaimg.cn/large/699ef9c0jw1ey52og2wwbj20a8069q30.jpg" alt="" width="368" height="225" />
  


方形曲线  


将凹凸分形作为多边形的边即可画出koch雪花及星形图案：  


<img src="http://ww2.sinaimg.cn/large/699ef9c0jw1ey52ou64dhj206c057aa0.jpg" alt="" width="228" height="187" />
 <img src="http://ww1.sinaimg.cn/large/699ef9c0jw1ey52phwmroj209y096aal.jpg" alt="" width="358" height="330" />
  



### 分形植物

分形植物是一类较复杂的分形几何图形，下图是几个简单的分形植物图形，完全利用上文介绍的方法生成。也可以通过L系统等符号递归方法生成更复杂的分形植物图形，这里不再详细介绍。  


<img src="http://ww4.sinaimg.cn/large/699ef9c0jw1ey52rewovij209007kq37.jpg" alt="" width="324" height="272" />
  


**分形藤条**  


<img src="http://ww1.sinaimg.cn/large/699ef9c0jw1ey52rmkj5jj207j074aab.jpg" alt="" width="271" height="256" />
  


**分形灌木**  


<img src="http://ww2.sinaimg.cn/large/699ef9c0jw1ey52rvix9wj209h083t93.jpg" alt="" width="341" height="291" />
  


**分形树**  



## 用迭代函数系统画分形

迭代函数系统（Iterate Function System, IFS）即用一组迭代函数来替代递归实现分形的迭代过程。斐波那契数列即是一个简单的迭代函数系统：  



```
F（0）=  0
F（1）=  1
F（n）=  F(n-1)+F(n-2)     （n≥2，n∈N*）
```

我们可以很容易的写出相应的递归程序和非递归的迭代程序。迭代函数系统需要用公式来表示递归绘图中的旋转、放缩、平移等几何变换过程，其好处是迭代函数系统方式比递归方式性能更高，而且可以应用随机参数生成更丰富的图形。  


在迭代函数系统中，我们需要用坐标表示点和向量，并利用公式对点和坐标进行迭代以确定最终需要绘制的坐标点。下述是坐标表示的迭代函数：  



```
xn  =  a × xn-1 + c × yn-1 + e
yn  =  b × xn-1 + d × yn-1 + f
```

也可以表示成矩阵形式  



```
                                 a   b   0
(xn, yn, 1) = (xn-1, yn-1, 1) ·  c   d   0
                                 e   f   1
```

<span style="line-height: 1.5;">对于任意的旋转、放缩、平移等几何变换，我们都可以利用公式对点和向量进行计算以得到对应的变换矩阵，而且可以通过矩阵计算简单的将变换叠加起来。具体的公式这里不再详细介绍，可以参考文章结尾处的相关书籍。</span>  


CSS和Canvas中的transform方法都是通过变换矩阵来实现图形变形的。下图是canvas的transform函数文档，可以看到变换矩阵中的每个字母都有其几何上的意义。  


<img src="http://ww2.sinaimg.cn/large/699ef9c0jw1ey52svao9aj20ie0hctaw.jpg" alt="" width="662" height="624" />
  



## 分形之间的转换

分形之间是可以相互转换的，用M表示变换矩阵，我们可以利用下述公式在两个变换矩阵之间插值，通过不断改变x值大小使分形从原有形状变成另一个样子。  



```
M = （1 - x)M旧 + xM新
```

关键代码：  



```
var MSe = [], MTr = [];
MSe[0] = M.image(
    new Affine(200, 400),
    new Affine(300, 400),
    new Affine(200, 300),
    new Affine(200, 300),
    new Affine(250, 300),
    new Affine(200, 250)
);
MSe[1] = M.image(
    new Affine(200, 400),
    new Affine(300, 400),
    new Affine(200, 300),
    new Affine(300, 400),
    new Affine(350, 400),
    new Affine(300, 350)
);

MTr[0] = M.scale(0.75, new Affine(250, 400))
    .compose(M.rot(Math.PI / 6, new Affine(250, 400)))
    .compose(M.trans(new Affine(0, -100, true)));
MTr[1] = M.scale(0.75, new Affine(250, 400))
    .compose(M.rot(-Math.PI / 6, new Affine(250, 400)))
    .compose(M.trans(new Affine(0, -100, true)));

var x = 0;
var that = this;
var timer = setInterval(function() {
    var M0 = M.add(M.multi(1 - x, MSe[0]), M.multi(x, MTr[0]));
    var M1 = M.add(M.multi(1 - x, MSe[1]), M.multi(x, MTr[1]));
```

可以看到有两组变换矩阵MSe和MTr，目标矩阵M0和M1由MSe和MTr插值生成，x从0开始，每次增加一定值直到1即完成了从原有分形到新分形的转换。为了生成更平滑的动画，可以减小x每次增加的值，或采用更平滑的插值方法，如球面线性插值，Bezier曲线插值等。  


**从三角形地垫转换到分形藤条：**  


<img src="http://ww1.sinaimg.cn/large/699ef9c0jw1ey52thbyxrj20d10bzmy1.jpg" alt="" width="469" height="431" />
 <img src="http://ww1.sinaimg.cn/large/699ef9c0jw1ey52tvjek7j20d80axaar.jpg" alt="" width="476" height="393" />
 <img src="http://ww2.sinaimg.cn/large/699ef9c0jw1ey52ubsbqhj20ct0bedgg.jpg" alt="" width="461" height="410" />
 <img src="http://ww4.sinaimg.cn/large/699ef9c0jw1ey52umqc6sj20dl0cxab7.jpg" alt="" width="489" height="465" />
  


**从koch曲线转换到分形灌木：**  


<img src="http://ww3.sinaimg.cn/large/699ef9c0jw1ey52uw03jtj208709ojrc.jpg" alt="" width="295" height="348" />
 <img src="http://ww3.sinaimg.cn/large/699ef9c0jw1ey52v7v36aj206x0ac0sp.jpg" alt="" width="249" height="372" />
 <img src="http://ww3.sinaimg.cn/large/699ef9c0jw1ey52vj5uarj206q09jt8q.jpg" alt="" width="242" height="343" />
 <img src="http://ww2.sinaimg.cn/large/699ef9c0jw1ey52vyebxfj207o09nmxd.jpg" alt="" width="276" height="347" />
 <img src="http://ww4.sinaimg.cn/large/699ef9c0jw1ey52w72pbuj208g09pjs2.jpg" alt="" width="304" height="349" />
  


**从台阶地垫转换到分形树：**  


<img src="http://ww4.sinaimg.cn/large/699ef9c0jw1ey52xcvpltj2080083dfr.jpg" alt="" width="288" height="291" />
 <img src="http://ww2.sinaimg.cn/large/699ef9c0jw1ey52xjzpp0j207w07tdfx.jpg" alt="" width="284" height="281" />
 <img src="http://ww3.sinaimg.cn/large/699ef9c0jw1ey52xsfij9j209908vaak.jpg" alt="" width="333" height="319" />
 <img src="http://ww4.sinaimg.cn/large/699ef9c0jw1ey52y0waxlj20dm0bfabt.jpg" alt="" width="490" height="411" />
  


Flash动画就是根据这种方法生成的，我们可以在第1帧时创建一些图形，在第10帧时对图形做一些平移放缩等变换，软件可以自动生成第1至10帧之间的动画。方法即是在两个帧所确定的变换矩阵之间进行插值生成中间图形。  


需要注意的一点是相互转换的分形之间，迭代函数的个数必须相同。即三角形地垫和分形藤条都是由三个迭代函数组成的迭代函数系统，递归时也是调用了三次自身。  



## 分形网球算法

之前所画的分形都是具有对称性的规则的几何图形，其原因是我们在每次迭代时都以固定次序计算了迭代函数系统中的所有函数。分形网球算法是另一种分形画法，每次迭代时根据参数随机选择迭代函数系统中的一个进行迭代。  


关键代码：  



```
var p1 = p, p2 = 1 - p;
var r, Pn, M;
var result = [[P0.x, P0.y]];
for (var i = 0; i < n; i++) {
    r = Math.random();
    if (r < p1) {
        M = M1;
    }
    else if (r < p1 + p2) {
        M = M2;
    }
    Pn = P0.transform(M);
    result.push([Pn.x, Pn.y]);
    P0 = Pn;
}
```

代码中使用了两个变换M1和M2，对应控制参数p1和1—p1。迭代时我们生成随机数r并根据r的大小来决定使用M1还是M2来生成新点。下图是M1和M2绘制出的图形，通过不同的随机参数控制，可以画出形状完全不同的图形。也可以通过不断改变参数大小生成分形动画。  


<img src="http://ww2.sinaimg.cn/large/699ef9c0jw1ey52yeac7sj20ee0e7dhh.jpg" alt="" width="518" height="511" />
  


**P1=0.5**  


<img src="http://ww1.sinaimg.cn/large/699ef9c0jw1ey52yt9iivj20e80ebwgq.jpg" alt="" width="512" height="515" />
  


**p1=0.8**  


<img src="http://ww1.sinaimg.cn/large/699ef9c0jw1ey52z237gcj20dz0dbq4j.jpg" alt="" width="503" height="479" />
  


**P1=0.95**  


著名的巴恩斯利蕨（Barnsley Fern）就是用分形网球算法画的，顺便一提，迭代函数系统方法就是巴恩斯利提出的。  


<img src="http://ww3.sinaimg.cn/large/699ef9c0jw1ey52zr8u4xj20870crmxz.jpg" alt="" width="295" height="459" />
  



## 创造任意图形

关于变换矩阵还有一个重要的定理：任意三点确定一个变换。即如果确定一个初始三角形，并且确定经过变换后，三角形的三个点的最终位置，用这六个点就可以求出对应的变换矩阵。可以很直观的看到巴恩斯利蕨的生成由五个三角形决定。其中红色三角形表示初始三角形；紫色的小三角形决定了叶子的茎；而两个蓝色的三角形决定了左右两片子叶；绿色的三角形将茎和两片子叶往上复制，形成整片叶子。  


<img src="http://ww3.sinaimg.cn/large/699ef9c0jw1ey530hc13ij20a107gq3r.jpg" alt="" width="361" height="268" />
  


利用这种方法你可以画出任何想要的图形，只要通过获取点坐标确定变换矩阵以及对应的控制随机参数。  


<img src="http://ww3.sinaimg.cn/large/699ef9c0jw1ey52zgql1ij20e50bc75y.jpg" alt="" width="509" height="408" />
  


**心形**  


通过改变控制参数，或者利用上一节的图形转换的技术，我们可以在此基础上创造出更加有趣的分形动画。  



## 分形的艺术——Mandelbrot集和Julia集

如果在网上搜索分形的话，会出现许多像下面这样的图形，它们跟我们之前看到的分形图形差别很大，更加复杂而具有随机性。  


<img src="http://ww1.sinaimg.cn/large/699ef9c0jw1ey530uzw54j20ds0dtzmm.jpg" alt="" width="496" height="497" />
<img src="http://ww3.sinaimg.cn/large/699ef9c0jw1ey5315rgwqj20dw0duq4k.jpg" alt="" width="500" height="498" />
  


**Julia集**  


<img src="http://ww2.sinaimg.cn/large/699ef9c0jw1ey531f9t3gj20dx0duwf1.jpg" alt="" width="501" height="498" />
<img src="http://ww3.sinaimg.cn/large/699ef9c0jw1ey531p53a0j20dv0dudgk.jpg" alt="" width="499" height="498" />
  


**Mandelbrot集**  


这些图形都是利用Mandelbrot集和Julia集方法画的，其实质也是利用迭代方法计算图形中每个像素点的色值，只不过迭代函数是非线性函数：f(Z) = Z2 + C 。其中Z, C均为复数，利用复数的计算法则进行迭代。Julia集是C值取常数，所有使f(Z)序列不发散的Z值的集合；  


Mandelbrot集是Z值取常数，所有使f(Z)序列不发散的C值的集合。  


我们看到的复杂的分形艺术都是利用Mandelbrot集和Julia集生成的，绘图软件可能使用更复杂的非线性函数生成，或者有更绚丽的配色，但实现原理都是一样的。具体的实现方法是采用逃逸时间算法，计算出每个像素点所代表复数值的逃逸速度（通过多少次迭代模大于固定值），最后根据迭代次数给像素点分配不同的色值即生成相应的分形图形。  


关键代码：  



```
// d: pixel distance, s: amplify size
julia: function (d, s, c, n) {
    var Z0, Z1;
    var C = new Complex(c[0], c[1]);
    var ZSet = [];
    for (var i = -d; i <= d; i++) {
        for (var j = -d; j <= d; j++) {
            Z0 = new Complex(i / d * s, j / d * s);
            for (var k = 0; k < n; k++) {
                Z1 = Z0.multiply(Z0).add(C);
                if (Z1.module() < 2) {
                    Z0 = Z1;
                }
                else {
                    break;
                }
            }
            ZSet.push(k);
        }
    }
    return ZSet;
},
// q: the central point, d: pixel distance, s: amplify size
mandelbrot: function (d, s, q, n) {
    var Z0, C;
    var ZSet = [];
    for (var i = -d; i <= d; i++) {
        for (var j = -d; j <= d; j++) {
            Z0 = new Complex(0, 0);
            C = new Complex(i / d * s + q[0], j / d * s + q[1]);
            for (var k = 0; k < n; k++) {
                Z1 = Z0.multiply(Z0).add(C);
                if (Z1.module() < 2) {
                    Z0 = Z1;
                }
                else {
                    break;
                }
            }
            ZSet.push(k);
        }
    }
    return ZSet;
}
```

可以看到生成julia集和Mandelbrot集的代码非常简短，程序对Z进行迭代，当Z的模大于2时记录下迭代次数k。d表示所画图形的像素大小/2，d为250则生成500*500大小的数组。S表示取值范围，取值越小则图像越放大。  


因为Mandelbrot集和Julia集需要对每个像素点进行迭代，所以程序的执行时间跟所绘制的图形大小以及最大迭代次数都相关。在浏览器环境下绘制一个500*500像素的图像需要10秒左右。  



## 参考



- 关于分形几何变换矩阵及相关公式定理，可以参考“计算机图形学与几何造型导论（Ronald Goldman）”第四章
- 关于Mandelbrot集和Julia集可以参考这篇文章 再谈Julia集与Mandelbrot集
- 关于分形相关理论可以参考科普书籍 蝴蝶效应之谜:走近分形与混沌(张天蓉)
- 代码地址 [https://github.com/walliychao/fractal](https://github.com/walliychao/fractal)