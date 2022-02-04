(()=>{var t={29:(t,e,s)=>{t=s.nmd(t);const i=s(571);t.export=i},571:(t,e,s)=>{(t=s.nmd(t)).export=class{constructor(){this.__data__=[]}top(){return this.__data__[this.__data__.length-1]}empty(){return 0===this.__data__.length}pop(){this.__data__.pop()}push(t){this.__data__.push(t)}}}},e={};function s(i){var o=e[i];if(void 0!==o)return o.exports;var h=e[i]={id:i,loaded:!1,exports:{}};return t[i](h,h.exports,s),h.loaded=!0,h.exports}s.n=t=>{var e=t&&t.__esModule?()=>t.default:()=>t;return s.d(e,{a:e}),e},s.d=(t,e)=>{for(var i in e)s.o(e,i)&&!s.o(t,i)&&Object.defineProperty(t,i,{enumerable:!0,get:e[i]})},s.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),s.nmd=t=>(t.paths=[],t.children||(t.children=[]),t),(()=>{"use strict";class t{constructor(t,e){this.x=t,this.y=e}getDistance(t,e){return Math.sqrt(Math.pow(t.x-e.x,2)+Math.pow(t.y-e.y,2))}getCurvePos(t,e,s,i,o){const h=this.getMiddle(t,e,s,i),a=Math.atan2(e-i,t-s);return{x:h.x+o*Math.cos(a+Math.PI/2),y:h.y+o*Math.sin(a+Math.PI/2)}}getMiddle(t,e,s,i){return{x:(t+s)/2,y:(e+i)/2}}}var e=s(29),i=s.n(e);window.Graph=class{constructor({directed:e,showDistance:s,showGrid:i,radius:o,character:h}={}){this.alphabet="_ABCDEFGHIJKLMNOPQRSTUVWXYZ",this.board=new class{constructor({width:e,height:s,radius:i,fontSize:o}){this.canvas=document.createElement("canvas"),this.context=this.canvas.getContext("2d"),this.radius=i||20,this.fontSize=o||25,this.clientPosition={x:0,y:0},this.prevPosition={x:0,y:0},this.buttons=0,this.shift=!1,this.selector="",this.position=new t(0,0),this.canvas.width=e||300,this.canvas.height=s||400,this.init()}init(){this.canvas.onmousemove=t=>{this.prevPosition={...this.clientPosition},this.clientPosition={x:t.clientX-this.canvas.offsetLeft+window.scrollX,y:t.clientY-this.canvas.offsetTop+window.scrollY},this.buttons=t.buttons,this.shift=t.shiftKey},window.onresize=()=>{this.selector&&this.appendTo(this.selector)}}appendTo(t){this.selector=t;const e=document.querySelector(t);e.innerHTML="",e.append(this.canvas),this.canvas.width=e.offsetWidth,this.canvas.height=e.offsetHeight}drawCircle(t,e,s){this.context.lineWidth=5,this.context.beginPath(),this.context.arc(t,e,s,0,2*Math.PI),this.context.stroke(),this.context.fillStyle="#fff",this.context.fill(),this.context.fillStyle="#000",this.context.lineWidth=1}drawNode(t,e,s,i){i&&(this.context.strokeStyle="#dc3545"),this.drawCircle(t,e,this.radius),this.context.font=`${this.fontSize}px Arial`,this.context.textAlign="center",this.context.fillText(s,t,e+this.fontSize/2),this.context.strokeStyle="#000"}drawLine(t,e,s,i){this.context.lineWidth=2,this.context.beginPath(),this.context.moveTo(t,e),this.context.lineTo(s,i),this.context.stroke(),this.context.lineWidth=1}drawDirected(t,e,s,i,o){const h=this.getCurvePos(t,e,s,i,o),a=Math.atan2(h.y-i,h.x-s),r={x:s+this.radius*Math.cos(a),y:i+this.radius*Math.sin(a)},n=r.x+this.radius*Math.cos(a)*Math.pow(3,.5)/2,d=r.y+this.radius*Math.sin(a)*Math.pow(3,.5)/2,c={x:n+this.radius/2*Math.cos(a-Math.PI/2),y:d+this.radius/2*Math.sin(a-Math.PI/2)},l={x:n+this.radius/2*Math.cos(a+Math.PI/2),y:d+this.radius/2*Math.sin(a+Math.PI/2)};this.context.lineWidth=5,this.context.beginPath(),this.context.moveTo(r.x,r.y),this.context.lineTo(c.x,c.y),this.context.lineTo(l.x,l.y),this.context.lineTo(r.x,r.y),this.context.fillStyle="#000",this.context.stroke(),this.context.fill(),this.context.lineWidth=1}drawDistance(e,s,i,o,h){const a=this.getDistance(new t(e,s),new t(i,o)),r=this.getCurvePos(e,s,i,o,h);this.context.fillStyle="#000",this.context.beginPath(),this.context.fillText(parseInt(a/100),r.x,r.y),this.context.textAlign="center",this.context.fillStyle="#fff"}drawHorizontal(t){this.context.strokeStyle="#fff",this.context.beginPath(),this.context.moveTo(0,t),this.context.lineTo(this.canvas.width,t),this.context.stroke(),this.context.strokeStyle="#000"}drawVertical(t){this.context.strokeStyle="#fff",this.context.beginPath(),this.context.moveTo(t,0),this.context.lineTo(t,this.canvas.height),this.context.stroke(),this.context.strokeStyle="#000"}drawGrid(){for(let t=0;t<=this.canvas.height;t+=2*this.radius)this.drawHorizontal(t);for(let t=0;t<=this.canvas.width;t+=2*this.radius)this.drawVertical(t)}drawCurve(t,e,s,i,o){this.context.moveTo(t,e);const h=this.getCurvePos(t,e,s,i,o);this.context.quadraticCurveTo(h.x,h.y,s,i),this.context.stroke()}getMiddle(t,e,s,i){return this.position.getMiddle(t,e,s,i)}getCurvePos(t,e,s,i,o){return this.position.getCurvePos(t,e,s,i,o)}getDistance(t,e){return this.position.getDistance(t,e)}clear(){this.context.fillStyle="#f4f8ff",this.context.fillRect(0,0,this.canvas.width,this.canvas.height),this.context.fill(),this.context.fillStyle="#000"}}({radius:o}),this.nodes=[],this.edges=[],this.functions=[],this.target=null,this.selectedEdgeId=null,this.directed=e,this.showDistance=s,this.showGrid=i,this.character=h,this.init()}init(){this.board.canvas.ondblclick=()=>{this.target||this.addNode(this.nodes.length+1,this.board.clientPosition.x,this.board.clientPosition.y)},this.board.canvas.addEventListener("mousemove",(()=>{const{x:t,y:e}=this.board.clientPosition;document.body.style.cursor="unset",this.edges.map(((s,i)=>{if(1===this.board.buttons)return;const o=this.nodes[s.from-1],h=this.nodes[s.to-1];if(!o||!h)return;const a=this.board.getCurvePos(o.x,o.y,h.x,h.y,s.curve);this.board.getDistance(a,{x:t,y:e})<this.board.radius&&(this.selectedEdgeId=i),this.target&&(this.selectedEdgeId=null)})),this.nodes.forEach((s=>{this.equalPoint(t,s.x)&&this.equalPoint(e,s.y)&&(this.target=this.target||s)})),this.target&&(this.board.buttons&&this.board.shift?document.body.style.cursor="move":document.body.style.cursor="pointer",this.board.shift||1===this.board.buttons||this.equalPoint(t,this.target.x)&&this.equalPoint(e,this.target,e)||(this.target=null))})),this.update()}update(){this.draw(),this.checkAddEdge(),this.updateCurve(),this.updateNodes(),setTimeout((()=>{this.update()}),1e3/60)}updateCurve(){1===this.board.buttons&&null!==this.selectedEdgeId&&(this.target||(this.edges[this.selectedEdgeId].curve+=this.board.clientPosition.x-this.board.prevPosition.x))}addNode(t,e,s){const i={x:e||Math.floor(Math.random()*this.board.canvas.width),y:s||Math.floor(Math.random()*this.board.canvas.height),label:t,move:10};this.nodes.push(i)}addEdge(t,e){const s={from:t,to:e,curve:100*Math.random()};this.edges.push(s),this.target=null}removeNode(t){this.nodes=this.nodes.filter((e=>e.label!==t))}removeEdge(t){const{from:e,to:s}=t;this.edges=this.edges.filter((t=>t.from!==e||t.to!==s))}draw(){this.board.clear(),this.showGrid&&this.board.drawGrid(),this.drawEdges(),this.drawLine(),this.drawNodes()}drawNodes(){this.nodes.forEach((t=>{this.board.drawNode(t.x,t.y,this.character?this.alphabet[t.label]:t.label,this.target?.label===t.label)}))}updateNodes(){this.nodes=this.nodes.map((t=>this.board.buttons&&!this.board.shift&&this.target&&this.target.label===t.label?(this.target=this.toClientPosition(t),this.toClientPosition(t)):this.magicFunction(t)))}magicFunction(t){return t.move>=0?{...t,x:t.x+.1,y:t.y+.1,move:t.move-.1}:t.move>=-10?{...t,x:t.x-.1,y:t.y-.1,move:t.move-.1}:{...t,move:10}}toClientPosition(t){return{...t,x:this.board.clientPosition.x,y:this.board.clientPosition.y}}drawEdges(){this.edges.forEach((t=>this.drawEdge(t)))}drawLine(){if(!this.board.shift||1!==this.board.buttons||!this.target)return;const{x:t,y:e}=this.board.clientPosition;this.board.drawLine(this.target.x,this.target.y,t,e)}checkAddEdge(){if(!this.target)return;if(!this.board.shift)return;const{x:t,y:e}=this.board.clientPosition;this.nodes.forEach((s=>{this.target&&s.label!==this.target.label&&this.equalPoint(t,s.x)&&this.equalPoint(e,s.y)&&(this.addEdge(this.target.label,s.label),this.target=null)}))}drawEdge(t){let e=null,s=null;if(this.nodes.forEach((i=>{i.label==t.from&&(e=i),i.label==t.to&&(s=i)})),!e||!s)return this.removeEdge(t);this.board.drawCurve(e.x,e.y,s.x,s.y,t.curve),this.directed&&this.board.drawDirected(e.x,e.y,s.x,s.y,t.curve),this.showDistance&&this.board.drawDistance(e.x,e.y,s.x,s.y,t.curve)}exportMatrix(){const t=[],e=[];for(let t=0;t<=this.nodes.length;t++)e.push(0);for(let s=0;s<=this.nodes.length;s++)t.push([...e]);return this.edges.forEach((e=>{t[e.from][e.to]++,this.directed||t[e.to][e.from]++})),t}equalPoint(t,e){return Math.abs(t-e)<=this.board.radius}neighbours(t){return this.exportMatrix()[t].map(((t,e)=>t?e:t)).filter((t=>t))}deepFirstSearch(t){const e=new(i()),s=[];e.push(t);const o=[];for(;!e.empty();){const t=e.pop();if(s[t])continue;s[t]=!0;const i=this.neighbours(t);o.push({u:t,stack:[...e.__data__],marked:[...s],neigh:i}),i.forEach((t=>e.push(t)))}return o}appendTo(t){this.board.appendTo(t)}setDirected(t){this.directed=t}setShowGrid(t){this.showGrid=t}setShowDistance(t){this.showDistance=t}setRadius(t){this.board.radius=t}getNodes(){return this.nodes.map((t=>({...this.edges,label:this.character?this.alphabet[t.label]:t.label})))}getEdges(){return this.edges.map((t=>({...t,from:this.character?this.alphabet[t.from]:t.from,to:this.character?this.alphabet[t.to]:t.label})))}}})()})();