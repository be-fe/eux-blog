---
title: "你可能不知道的cookie"
author: "谢 郁"
datetime: 2017-06-06 12:00:00
cover: "http://ww1.sinaimg.cn/large/825c1e3bly1fi2w7q9b74j20nj0dw7gy.jpg"
---

## 大家都了解的cookie

很多前端面试题都会考察cookie 大家一般都能答上的几个点：  




- 不能跨域
- 存储空间有限，4KB
- 通过`document.cookie`API进行get和set



## cookie与其他本地存储的区别

<span id="more-525"></span>  




2. 大小不同，cookie是最小的。
4. 数量受限,每个域名下的cookie数量最多为20个（但很多浏览器厂商在具体实现时支持大于20个)
6. 某个域下的cookie会自动随该域下的请求带在request header的cookie字段里。
8. 可以设定过期时间。
10. 可以设定path，而其他存储往往只有域的限制。
12. 存在httpOnly属性，只能由服务端设置，JS无法设置和获取。
14. 可以设置secure属性,当设置为true时，只能在HTTPS连接中被浏览器传递到服务器端进行会话验证，如果是HTTP,连接则不会传递该信息，所以不会被窃取到Cookie的具体内容。
16. 可以通过浏览器的清除历史功能清除
18. 用户可以禁用cookie



## [](http://gitlab.baidu.com/be-fe/hi-fe-resources/blob/master/%E6%8F%90%E7%82%BC/%E4%BD%A0%E5%8F%AF%E8%83%BD%E4%B8%8D%E7%9F%A5%E9%81%93%E7%9A%84cookie.md#cookie%E7%9A%84%E5%BA%94%E7%94%A8%E5%9C%BA%E6%99%AF)cookie的应用场景



- cookie最大的特点是自动随该域下的请求带在request header的cookie字段里，而无需额外的JS操作，在做通用的登录认证系统的时候有着天然的优势。
- cookie有httpOnly属性，可以防止XSS攻击，安全性比其他存储更有保障。
- 服务端在控制页面跳转的时候可以不通过JS方便的进行少量值的传递，控制页面的展示。
- 静态资源CDN之所以放在非主域名下，很大一部分原因在于可以无需携带相关cookie，减少流量损耗。



## [](http://gitlab.baidu.com/be-fe/hi-fe-resources/blob/master/%E6%8F%90%E7%82%BC/%E4%BD%A0%E5%8F%AF%E8%83%BD%E4%B8%8D%E7%9F%A5%E9%81%93%E7%9A%84cookie.md#cookie%E7%9A%84%E5%B1%9E%E6%80%A7)cookie的属性

<table style="height: 361px;" width="680">
<thead>
<tr>
<th>
<h6 style="text-align: center;">属性</h6>
</th>
<th>
<h6 style="text-align: center;">说明</h6>
</th>
<th>
<h6 style="text-align: center;">示例</h6>
</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align: center;">name</td>
<td style="text-align: center;">cookie的key值</td>
<td>‘id=sdbsdabsdsa;’</td>
</tr>
<tr>
<td style="text-align: center;">expires</td>
<td style="text-align: center;">到期时间</td>
<td>‘expires=21 Oct 2015 07:28:00 GMT</td>
</tr>
<tr>
<td style="text-align: center;">domain</td>
<td style="text-align: center;">cookie生效的域</td>
<td>‘domain=im.baidu.com;’</td>
</tr>
<tr>
<td style="text-align: center;">path</td>
<td style="text-align: center;">cookie生效的路径</td>
<td>‘path=/todo’</td>
</tr>
<tr>
<td style="text-align: center;">secure</td>
<td style="text-align: center;">是否只在https下生效</td>
<td>‘secure’</td>
</tr>
<tr>
<td style="text-align: center;">httponly</td>
<td style="text-align: center;">是否允许JS获取</td>
<td>‘httponly’</td>
</tr>
<tr>
<td style="text-align: center;">max-age</td>
<td style="text-align: center;">以秒为单位设置过期时间,IE6\7\8不生效</td>
<td>‘ 31536000’</td>
</tr>
</tbody>
</table>

## [](http://gitlab.baidu.com/be-fe/hi-fe-resources/blob/master/%E6%8F%90%E7%82%BC/%E4%BD%A0%E5%8F%AF%E8%83%BD%E4%B8%8D%E7%9F%A5%E9%81%93%E7%9A%84cookie.md#cookie%E7%9A%84%E5%A2%9E%E5%88%A0%E6%94%B9%E6%9F%A5)cookie的增删改查

服务端和JS端都可以对cookie进行增删改查, cookie中不得包含任何逗号、分号或空格，（可以用encodeURIComponent()来保证）.  



### [](http://gitlab.baidu.com/be-fe/hi-fe-resources/blob/master/%E6%8F%90%E7%82%BC/%E4%BD%A0%E5%8F%AF%E8%83%BD%E4%B8%8D%E7%9F%A5%E9%81%93%E7%9A%84cookie.md#%E6%9C%8D%E5%8A%A1%E7%AB%AF%E8%AE%BE%E7%BD%AEcookie)服务端设置cookie

服务端通过在请求的`response header`中携带`Set-Cookie`字段对cookie进行设置, 格式与用JS设置cookie是相同的,都采用`;`进行属性分隔. 例如:  



```
Set-Cookie: id=a3fWa; Expires=Wed, 21 Oct 2015 07:28:00 GMT; Secure; HttpOnly
```


### [](http://gitlab.baidu.com/be-fe/hi-fe-resources/blob/master/%E6%8F%90%E7%82%BC/%E4%BD%A0%E5%8F%AF%E8%83%BD%E4%B8%8D%E7%9F%A5%E9%81%93%E7%9A%84cookie.md#js%E8%AE%BE%E7%BD%AEcookie)JS设置cookie

JS设置domain: 默认值为当前域, n级域名可以设置 小于n级域名的domain. 例如: 在`www.baidu.com`域下 可以将domain设置为 `baidu.com`, 但是不能设置为`a.www.baidu.com`, 也不能设置为`tieba.baidu.com`,更不能设置为`sina.com`.  


JS设置path: 默认为`/`, path的设置不受限制, 比如我可以在`im.baidu.com/todo`下将cookie的path设置为`/search`  


JS对于secure属性,无论get还是set ,必须在https下,  


JS不能设置httponly属性,  


删除cookie: 指定key, domain, path 必须与想要删掉的cookie一模一样, 然后将`expires`的值设为一个过期值,即可删除.  


修改cookie: 指定key, domain, path 必须与想要修改的cookie一模一样, 否则将创建一个不同的cookie,然后设置想要更新的value或expires值.  



```
    var cookie = {
        getCookie: function (key) {
            return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(key).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
        },

        setCookie: function (opts) {
            if (Object.prototype.toString.call(opts) !== "[object Object]") {
                return;
            }
            if (!opts.key) {
                return;
            }
            if (!opts.value) {
                opts.value = '';
            }
            var tmp = opts.key + '=' + encodeURIComponent(opts.value) + ';';
            if (opts.expires) {
                tmp += 'expires=' + new Date(new Date().getTime() + opts.expires * 1000).toGMTString() + ';';
            }
            if (opts.path) {
                tmp += ('path=' + opts.path + ';');
            }

            if (opts.domain) {
                tmp += ('domain=' + opts.domain + ';');
            }

            if (opts.secure) {
                tmp += 'secure'
            }
            document.cookie = tmp;
        },

        delCookie: function (opts) {
            cookie.setCookie({
                key: opts.key,
                value: '',
                expired: -1000000000,
                path: opts.path,
                domain: opts.domain,
            })
        },
    }
```


## [](http://gitlab.baidu.com/be-fe/hi-fe-resources/blob/master/%E6%8F%90%E7%82%BC/%E4%BD%A0%E5%8F%AF%E8%83%BD%E4%B8%8D%E7%9F%A5%E9%81%93%E7%9A%84cookie.md#%E5%85%B6%E4%BB%96)其他


### [](http://gitlab.baidu.com/be-fe/hi-fe-resources/blob/master/%E6%8F%90%E7%82%BC/%E4%BD%A0%E5%8F%AF%E8%83%BD%E4%B8%8D%E7%9F%A5%E9%81%93%E7%9A%84cookie.md#%E5%88%A4%E6%96%AD%E6%98%AF%E5%90%A6%E5%90%AF%E7%94%A8cookie)判断是否启用cookie

使用`navigator.cookieEnabled`可以判断用户是否启用cookie  



```
if (!navigator.cookieEnabled) {
  // 让用户知道,开启网页中的cookies是很有必要的.
}
```


### [](http://gitlab.baidu.com/be-fe/hi-fe-resources/blob/master/%E6%8F%90%E7%82%BC/%E4%BD%A0%E5%8F%AF%E8%83%BD%E4%B8%8D%E7%9F%A5%E9%81%93%E7%9A%84cookie.md#%E6%98%AF%E5%90%A6%E5%8F%AF%E4%BB%A5%E7%9B%B4%E6%8E%A5%E4%BF%AE%E6%94%B9header%E4%B8%AD%E7%9A%84cookie%E5%AD%97%E6%AE%B5)是否可以直接修改header中的cookie字段?

Ajax请求可以设置header,但是某些header字段无法设置,比如`refer`, `cookie`等.  



### [](http://gitlab.baidu.com/be-fe/hi-fe-resources/blob/master/%E6%8F%90%E7%82%BC/%E4%BD%A0%E5%8F%AF%E8%83%BD%E4%B8%8D%E7%9F%A5%E9%81%93%E7%9A%84cookie.md#cookie%E8%87%AA%E5%8A%A8%E5%88%A0%E9%99%A4)cookie自动删除

cookie 会被浏览器自动删除，通常存在以下几种原因：  




- 会话 cooke (Session cookie) 在会话结束时（浏览器关闭）会被删除
- 持久化 cookie（Persistent cookie）在到达失效日期时会被删除
- 如果浏览器中的 cookie 数量达到限制，那么 cookie 会被删除以为新建的 cookie 创建空间。



### <span class="md-expand">CORS请求携带cookie</span>

<span class="md-line md-end-block">CORS请求默认不发送Cookie和HTTP认证信息。如果要把Cookie发到服务器，一方面要服务器同意，指定Access-Control-Allow-Credentials字段。</span>  



```
Access-Control-Allow-Credentials: true
```

<span class="md-line md-end-block">另一方面，开发者必须在AJAX请求中打开withCredentials属性。</span>  



```
var xhr = new XMLHttpRequest();
xhr.withCredentials = true;
```

<span class="md-line md-end-block">否则，即使服务器同意发送Cookie，浏览器也不会发送。或者，服务器要求设置Cookie，浏览器也不会处理。</span>  


<span class="md-line md-end-block md-focus">需要注意的是，如果要发送Cookie，Access-Control-Allow-Origin就不能设为星号，必须指定明确的、与请求网页一致的域名。同时，Cookie依然遵循同源政策，只有用服务器域名设置的Cookie才会上传，其他域名的Cookie并不会上传，且（跨源）原网页代码中的document.cookie也无法读取服务器域名下的Cookie。</span>  



## [](http://gitlab.baidu.com/be-fe/hi-fe-resources/blob/master/%E6%8F%90%E7%82%BC/%E4%BD%A0%E5%8F%AF%E8%83%BD%E4%B8%8D%E7%9F%A5%E9%81%93%E7%9A%84cookie.md#%E5%8F%82%E8%80%83%E8%B5%84%E6%96%99)参考资料



- [MDN Set-Cookie](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Set-Cookie)
- [MDN Document/cookie](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/cookie)
- [聊一聊 cookie](https://segmentfault.com/a/1190000004556040)
- [深入浅出cookie](https://www.cloudxns.net/Support/detail/id/1887.html)
- [HTTP cookies 详解](http://bubkoo.com/2014/04/21/http-cookies-explained/)
- [MDN cookieEnabled](https://developer.mozilla.org/zh-CN/docs/Web/API/Navigator/cookieEnabled)