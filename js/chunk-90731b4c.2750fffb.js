(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-90731b4c"],{"0d03":function(t,e,a){var s=a("6eeb"),r=Date.prototype,i="Invalid Date",n="toString",o=r[n],l=r.getTime;new Date(NaN)+""!=i&&s(r,n,(function(){var t=l.call(this);return t===t?o.call(this):i}))},"159b":function(t,e,a){var s=a("da84"),r=a("fdbc"),i=a("17c2"),n=a("9112");for(var o in r){var l=s[o],c=l&&l.prototype;if(c&&c.forEach!==i)try{n(c,"forEach",i)}catch(A){c.forEach=i}}},"17c2":function(t,e,a){"use strict";var s=a("b727").forEach,r=a("b301");t.exports=r("forEach")?function(t){return s(this,t,arguments.length>1?arguments[1]:void 0)}:[].forEach},3623:function(t,e,a){},4160:function(t,e,a){"use strict";var s=a("23e7"),r=a("17c2");s({target:"Array",proto:!0,forced:[].forEach!=r},{forEach:r})},"427f2":function(t,e,a){"use strict";var s=a("3623"),r=a.n(s);r.a},"4e7f":function(t,e){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAP4AAAB6CAYAAACft+6fAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAANWSURBVHhe7dntcqMgFADQdt//nXfFwZlMNyimcEE9509LQ+7l62pivwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAmMx3/hnu7yL/GuJ7kX99rNZr/sQ1La3h1dbiT/4ZqvUBZF9a7yQ3m8lh7eUFhRe+gxIrYr3t6fWEFr4DEityve3ttQz5qM89Kf7rCCt8hyKW9WZP2JPImoP4xKfEvfRYb3tYXoOrzXuKwr/7YRmh53o/eS9Lcz8z7xnWz3f8h4k6WMxteOE7iNdjzz43w90+cceHB1L4MIHoT1EKH4LsfcyPpvBhsOi7fRKWsHS1GzHpTesr8Jm5tMpdylmKf2aMJXtjfxd/r/8ZNWPvnasU/2hse+M6em8Pj73j723Ep2pjtsydYiW5OZ2WY1snusjN/+y9dtaaaJGb3Ywo+uSRhd9zQ49i98rdK+6rlCPJzUNn+p7xLm5krrN6je03wq42pclHX/GiNuHdvHrnfs0ZNc+ftjHcaa41uV77/PTJe3rzcO9GSgfsjiLnesd1DbvilBYv+qp3tIm14/kkTovctTGO+vXwOv7acZbUjH+LMUOuUo692KX3RHDHz9ImJLl5KHdvsnE5VFWs2n6zWie6yM2i3O1Xc80hQnK9M2vRJwr/gkYfGspSsW/yn6ak8Gmmx2GPvMj9Jtda6YvcPJS7r/KfQin8h0mH+1M5BI2NKH6FT7Vc/y4AHUQXv8KHB1L4nOau30fkXV/hQwPrd6AKuftwCh8CzVL8Ch+CzVD8Ch8eSOHDAw0v/Oj/Xz5di/W2Z9fnjg8PNEXhpztIkpu3MPN81sVe5Ga1/LbQeUXmi57bSGFPF0cv6vYkdW8cZ5621s7nNWbpPWfybo5ilV7vrTb/1m9PbYwZctXkeNUqzqdCkmxKk42wLeiIMRzl3l4/oyZWqU9PW/6I3DPl2l6v1SrOp3zHp5moQ5vcNVeU0MKfYQHvuIklkXP9mWtkbo6F3/Fn2KQnHZSIuZZy9Mr9Lm5krjsY8lE/LWaSm0P0yD96TiVpXEluNnUUt2XeFCvJzf/svXbWmmiRmwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMI+vr384NQC5ljwf/wAAAABJRU5ErkJggg=="},"595f":function(t,e,a){"use strict";var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"message-alert"},t._l(t.messages,(function(e,s){return a("div",{key:s,staticClass:"alert alert-dismissible",class:"alert-"+e.status},[t._v(" "+t._s(e.message)+" "),a("button",{staticClass:"close",attrs:{type:"button","aria-label":"Close"},on:{click:function(e){return t.removeMessage(s)}}},[a("span",{attrs:{"aria-hidden":"true"}},[t._v("×")])])])})),0)},r=[],i=(a("4160"),a("a434"),a("0d03"),a("159b"),{name:"Navbar",data:function(){return{messages:[]}},methods:{updateMessage:function(t,e){var a=Math.floor(new Date/1e3);this.messages.push({message:t,status:e,timestamp:a}),this.removeMessageWithTiming(a)},removeMessage:function(t){this.messages.splice(t,1)},removeMessageWithTiming:function(t){var e=this;setTimeout((function(){e.messages.forEach((function(a,s){a.timestamp===t&&e.messages.splice(s,1)}))}),5e3)}},created:function(){var t=this;t.$bus.$on("message:push",(function(e){var a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"warning";t.updateMessage(e,a)}))}}),n=i,o=(a("427f2"),a("2877")),l=Object(o["a"])(n,s,r,!1,null,null,null);e["a"]=l.exports},8418:function(t,e,a){"use strict";var s=a("c04e"),r=a("9bf2"),i=a("5c6c");t.exports=function(t,e,a){var n=s(e);n in t?r.f(t,n,i(0,a)):t[n]=a}},"8c4d":function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[s("Alert"),s("nav",{staticClass:"container"},[s("div",{staticClass:"l-nav-table"},[s("router-link",{staticClass:"l-logo",attrs:{to:"/"}},[s("img",{attrs:{src:a("4e7f"),alt:""}})]),s("ul",{staticClass:"l-nav-mainOption"},[s("li",[s("router-link",{attrs:{to:"/shop"}},[t._v("優秀好書")])],1),s("li",[s("router-link",{attrs:{to:"/aboutUs"}},[t._v("關於我們")])],1),s("li",{staticClass:"l-nav-user"},[s("router-link",{attrs:{to:"/login"}},[s("i",{staticClass:"fas fa-user"})])],1)]),s("div",{staticClass:"dropdown"},[t._m(0),s("div",{staticClass:"dropdown-menu",attrs:{"aria-labelledby":"dropdownMenuButton"}},[s("router-link",{attrs:{to:"/shop"}},[t._v("優秀好書")]),s("router-link",{attrs:{to:"/aboutUs"}},[t._v("關於我們")])],1)])],1)]),s("main",[s("router-view")],1),s("footer",[s("div",{staticClass:"l-footer-table"},[s("div",{staticClass:"l-logo2"},[s("router-link",{attrs:{to:"/"}},[s("img",{attrs:{src:a("4e7f"),alt:""}})])],1),t._m(1)])])],1)},r=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("button",{staticClass:"btn btn-secondary dropdown-toggle",attrs:{type:"button",id:"dropdownMenuButton","data-toggle":"dropdown","aria-haspopup":"true","aria-expanded":"false"}},[a("i",{staticClass:"fas fa-bars"})])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("ul",{staticClass:"l-footer-icon"},[a("li",[a("a",{attrs:{href:"https://fb.me",alt:"Facebook 粉絲專頁"}},[a("i",{staticClass:"fab fa-facebook-square"})])]),a("li",[a("a",{attrs:{href:"https://line.me/zh-hant/",alt:"LINE 官方帳號"}},[a("i",{staticClass:"fab fa-line"})])]),a("li",[a("a",{attrs:{href:"https://www.instagram.com/?hl=zh-tw",alt:"Instagram"}},[a("i",{staticClass:"fab fa-instagram"})])]),a("li",[a("a",{attrs:{href:"https://twitter.com/home?lang=zh-tw",alt:"Twitter"}},[a("i",{staticClass:"fab fa-twitter-square"})])])])}],i=a("1157"),n=a.n(i),o=a("595f"),l={components:{Alert:o["a"]},created:function(){n()(window).scroll((function(){n()("html, body").scrollTop()>=230?n()(".l-nav-table").hide().stop():n()(".l-nav-table").show().stop()}))}},c=l,A=a("2877"),u=Object(A["a"])(c,s,r,!1,null,null,null);e["default"]=u.exports},a434:function(t,e,a){"use strict";var s=a("23e7"),r=a("23cb"),i=a("a691"),n=a("50c4"),o=a("7b0b"),l=a("65f0"),c=a("8418"),A=a("1dde"),u=Math.max,f=Math.min,h=9007199254740991,d="Maximum allowed length exceeded";s({target:"Array",proto:!0,forced:!A("splice")},{splice:function(t,e){var a,s,A,m,v,p,g=o(this),b=n(g.length),w=r(t,b),L=arguments.length;if(0===L?a=s=0:1===L?(a=0,s=b-w):(a=L-2,s=f(u(i(e),0),b-w)),b+a-s>h)throw TypeError(d);for(A=l(g,s),m=0;m<s;m++)v=w+m,v in g&&c(A,m,g[v]);if(A.length=s,a<s){for(m=w;m<b-s;m++)v=m+s,p=m+a,v in g?g[p]=g[v]:delete g[p];for(m=b;m>b-s+a;m--)delete g[m-1]}else if(a>s)for(m=b-s;m>w;m--)v=m+s-1,p=m+a-1,v in g?g[p]=g[v]:delete g[p];for(m=0;m<a;m++)g[m+w]=arguments[m+2];return g.length=b-s+a,A}})},b301:function(t,e,a){"use strict";var s=a("d039");t.exports=function(t,e){var a=[][t];return!a||!s((function(){a.call(null,e||function(){throw 1},1)}))}},fdbc:function(t,e){t.exports={CSSRuleList:0,CSSStyleDeclaration:0,CSSValueList:0,ClientRectList:0,DOMRectList:0,DOMStringList:0,DOMTokenList:1,DataTransferItemList:0,FileList:0,HTMLAllCollection:0,HTMLCollection:0,HTMLFormElement:0,HTMLSelectElement:0,MediaList:0,MimeTypeArray:0,NamedNodeMap:0,NodeList:1,PaintRequestList:0,Plugin:0,PluginArray:0,SVGLengthList:0,SVGNumberList:0,SVGPathSegList:0,SVGPointList:0,SVGStringList:0,SVGTransformList:0,SourceBufferList:0,StyleSheetList:0,TextTrackCueList:0,TextTrackList:0,TouchList:0}}}]);
//# sourceMappingURL=chunk-90731b4c.2750fffb.js.map