(this["webpackJsonpcountdown-solver"]=this["webpackJsonpcountdown-solver"]||[]).push([[0],{18:function(e,t,n){},21:function(e,t,n){},22:function(e,t,n){"use strict";n.r(t);var a=n(1),r=n.n(a),s=n(11),c=n.n(s),o=(n(18),n(5)),i=n(8),u=n(2),l=n(0),v=function(e){var t=e.className,n=e.onClick,a=e.text;return Object(l.jsx)("button",{onClick:n,className:"Button "+t,children:a})};function f(e){var t=Object(a.useState)(e.isTarget?0:-1),n=Object(u.a)(t,2),r=n[0],s=n[1];var c;return Object(l.jsx)("input",{type:"tel",value:(c=e.isTarget?e.value:r,e.isTarget?function(e){for(var t=String(e);t.length<3;)t="0"+t;return t}(c):c>=0?String(c):""),onInput:function(t){if(""===t.target.value)return s(-1),void e.onChange(-1);var n=parseInt(t.target.value);0<=n&&n<=999&&(s(n),e.onChange(n))},className:"NumberCard "+(e.isTarget?"Target":r>=0?"":"Empty")})}f.defaultProps={isTarget:!1,value:-1};var h=f,j=[0,1,2,3,4,5],p=function(e){var t=e.target,n=e.targetChange,a=e.onChange;function r(e){e>0&&(n(Math.floor(898*Math.random())+101),setTimeout((function(){return r(e-1)}),75))}return Object(l.jsxs)("div",{className:"NumberBoard",children:[Object(l.jsx)(h,{value:t,isTarget:!0,onChange:function(e){return n(e)}}),Object(l.jsxs)("div",{children:[Object(l.jsx)(v,{className:"Randomizer",onClick:function(){return r(10)}}),j.map((function(e){return Object(l.jsx)(h,{onChange:function(t){return a(e,t)}},e)}))]})]})},b=n(9);function g(e){return Object(l.jsxs)("div",{className:"WhiteBoard",children:[Object(l.jsx)("span",{className:"dot",style:{transform:"translate(2.25vmin, 4.5vmin)"}}),Object(l.jsx)("span",{className:"dot",style:{transform:"translate(77.25vmin, 4.5vmin)"}}),Object(l.jsx)("span",{className:"dot",style:{transform:"translate(2.25vmin, 39.5vmin)"}}),Object(l.jsx)("span",{className:"dot",style:{transform:"translate(77.25vmin, 39.5vmin)"}}),Object(l.jsx)("div",{className:"Expression "+(""===e.expression?"Hidden":""),children:Object(l.jsx)(b.MathJaxContext,{config:{loader:{load:["[tex]/html"]},tex:{packages:{"[+]":["html"]},inlineMath:[["$","$"]],displayMath:[["$$","$$"]]}},version:3,children:Object(l.jsx)(b.MathJax,{inline:!0,dynamic:!0,children:"$$\\color{#4c282f}{".concat(e.expression,"}$$")})})})]})}g.defaultProps={expression:""};var x=g,d=n(4),m=n(12),O=n(13),C=function(){function e(t,n){Object(m.a)(this,e),this.values=t,this.expressions=n}return Object(O.a)(e,[{key:"concatWith",value:function(e){this.values=[].concat(Object(d.a)(this.values),Object(d.a)(e.values)),this.expressions=[].concat(Object(d.a)(this.expressions),Object(d.a)(e.expressions))}}]),e}(),N={"+":function(e,t){return e+t},"-":function(e,t){return t-e},"*":function(e,t){return e*t},"/":function(e,t){return t/e}};var k=function(){var e=Object(a.useState)(0),t=Object(u.a)(e,2),n=t[0],r=t[1],s=Object(a.useState)([-1,-1,-1,-1,-1,-1]),c=Object(u.a)(s,2),f=c[0],h=c[1],j=Object(a.useState)(""),b=Object(u.a)(j,2),g=b[0],d=b[1],m=S([0,1,2,3,4,5]),O={value:-1,expression:""},k=!1,w={};function y(e,t){2*t>e&&(t=e-t);for(var n=1,a=1;a<t+1;a++)n*=e-t+a,n/=a;return n}function M(e){return e.join("")}function S(e){return new Array(1<<e.length).fill().map((function(t,n){return e.filter((function(e,t){return n&1<<t}))})).sort((function(e,t){return e.length-t.length})).slice(1)}function T(e,t){if(k)return new C([],[]);for(var a=[],r=[],s=0;s<e.values.length;s++)for(var c=0;c<t.values.length;c++){var o=$(e.expressions[s],t.expressions[c]),i=$(e.values[s],t.values[c]).map((function(e){return N[e[0]](e[1],e[2])}));a=a.concat(i),r=r.concat(o)}return function(e){for(var t=e.values,a=e.expressions,r=[],s=0,c=0;c<t.length;c++)if(r.indexOf(t[c])<0&&isFinite(t[c])&&t[c]>=0&&Number.isInteger(t[c])){var o=t[c];if(Math.abs(o-n)<Math.abs(O.value-n)&&(O.value=o,O.expression=a[c-s],o===n)){k=!0;break}r.push(o)}else a.splice(c-s,1),s+=1;return new C(r,a)}(new C(a,r))}function $(e,t){return[["+"].concat(e).concat(t),["-"].concat(e).concat(t),["-"].concat(t).concat(e),["*"].concat(e).concat(t),["/"].concat(e).concat(t),["/"].concat(t).concat(e)]}return Object(l.jsxs)("div",{className:"Board",children:[Object(l.jsx)(v,{className:"Solve",onClick:function(){for(var e=[],t=0;t<6;t++){if(f[t]<0)return void console.log("Missing Card #"+(t+1));e.push(f[t])}k=!1,O={value:e[0],expression:e[0]},w={"":new C([],[])},function(e){for(var t=e.length,n=0;n<t;n++)w[M([n])]=new C([f[n]],[f[n]]);for(var a=0,r=y(t,1)-1,s=1;s<t;s++){a+=y(t,s),r+=y(t,s+1);for(var c=function(e){if(k)return"break";for(var t=new C([],[]),n=S(m[e]),a=function(a){var r=w[M(n[a])],s=w[M(m[e].filter((function(e){return n[a].indexOf(e)<0})))];t.concatWith(T(r,s))},r=0;n[r].length<=Math.floor(m[e].length/2)&&!k;r++)a(r);w[M(m[e])]=t},o=a;o<r+1&&"break"!==c(o);o++);}}(e),d(O.value+"="+function(e){for(var t=[],n=e.length-1;n>-1;n--)if("number"==typeof e[n])t.push({value:e[n],op:-1});else{var a=t.pop(),r=t.pop();switch(e[n]){case"+":t.push({value:r.value+"+"+a.value,op:0});break;case"-":var s=0<=a.op&&a.op<=1?"\\left("+a.value+"\\right)":a.value;t.push({value:r.value+"-"+s,op:1});break;case"*":var c=0<=r.op&&r.op<=1?"\\left("+r.value+"\\right)":r.value,o=0<=a.op&&a.op<=1?"\\left("+a.value+"\\right)":a.value;t.push({value:c+"\\times"+o,op:2});break;case"/":t.push({value:"\\frac{"+r.value+"}{"+a.value+"}",op:3})}}return t[t.length-1].value}(O.expression))},text:"SOLVE"}),Object(l.jsx)(x,{expression:g}),Object(l.jsx)(p,{target:n,targetChange:r,onChange:function(e,t){h(Object(i.a)(Object(i.a)({},f),{},Object(o.a)({},e,t)))}})]})};n(21);var w=function(){return Object(l.jsx)("div",{className:"container",children:Object(l.jsx)(k,{})})},y=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,23)).then((function(t){var n=t.getCLS,a=t.getFID,r=t.getFCP,s=t.getLCP,c=t.getTTFB;n(e),a(e),r(e),s(e),c(e)}))};c.a.render(Object(l.jsx)(r.a.StrictMode,{children:Object(l.jsx)(w,{})}),document.getElementById("root")),y()}},[[22,1,2]]]);
//# sourceMappingURL=main.3019e8d3.chunk.js.map