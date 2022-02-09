(()=>{"use strict";class t{constructor(t,s){this.x=t,this.y=s}getDistance(t,s){return Math.sqrt(Math.pow(t.x-s.x,2)+Math.pow(t.y-s.y,2))}getCurvePos(t,s,i,e,h){const o=this.getMiddle(t,s,i,e),n=this.getAngle(t,s,i,e);return{x:o.x+h*Math.cos(n+Math.PI/2),y:o.y+h*Math.sin(n+Math.PI/2)}}getMiddle(t,s,i,e){return{x:(t+i)/2,y:(s+e)/2}}getAngle(t,s,i,e){return Math.atan2(s-e,t-i)}ratioLine(t,s,i){i=1-i;const e=this.getDistance(t,s)*i,h=this.getAngle(t.x,t.y,s.x,s.y);return{from:t,to:{x:s.x+e*Math.cos(h),y:s.y+e*Math.sin(h)}}}}class s{constructor(){this.__data__=[]}deQueue(){return this.__data__.shift()}enQueue(t){this.__data__.push(t)}empty(){return!this.__data__.length}}class i{constructor(t){this.__data__=[]}top(){return this.__data__[this.__data__.length-1]}empty(){return 0===this.__data__.length}pop(){return this.__data__.pop()}push(t){this.__data__.push(t)}includes(t){return-1!==this.__data__.indexOf(t)}}class e{constructor(t){this.stack=new i,this.step=1,this.num=[],this.minNum=[],this.linkedParts=[],this.graph=t}tarjan(){return this.graph.nodes.forEach((t=>{this.num[t.label]||this.__tarjan(t.label)})),this.linkedParts}__tarjan(t){if(this.num[t])return this.linkedParts;if(this.num[t]=this.step,this.minNum[t]=this.step,this.step++,this.stack.push(t),this.graph.neighbours(t).forEach((s=>{if(this.stack.includes(s))return this.minNum[t]=Math.min(this.num[s],this.minNum[t]);this.__tarjan(s),this.minNum[t]=Math.min(this.minNum[s],this.minNum[t])})),this.num[t]!==this.minNum[t])return this.linkedParts;const s=[];for(;this.stack.top()!==t;)s.push(this.stack.pop());return s.push(this.stack.pop()),this.linkedParts.push(s),this.linkedParts}}window.Graph=class{constructor({directed:s,showDistance:i,showGrid:e,radius:h,character:o,motion:n}={}){this.alphabet="_ABCDEFGHIJKLMNOPQRSTUVWXYZ",this.board=new class{constructor({width:s,height:i,radius:e,fontSize:h}){this.canvas=document.createElement("canvas"),this.context=this.canvas.getContext("2d"),this.radius=e||20,this.fontSize=h||25,this.clientPosition={x:0,y:0},this.prevPosition={x:0,y:0},this.buttons=0,this.shift=!1,this.alt=!1,this.selector="",this.position=new t(0,0),this.canvas.width=s||300,this.canvas.height=i||400,this.init()}init(){this.canvas.onmousemove=t=>{this.prevPosition={...this.clientPosition},this.clientPosition={x:t.clientX-this.canvas.offsetLeft+window.scrollX,y:t.clientY-this.canvas.offsetTop+window.scrollY},this.buttons=t.buttons,this.shift=t.shiftKey,this.alt=t.altKey},window.onresize=()=>{this.selector&&this.appendTo(this.selector)}}appendTo(t){this.selector=t;const s=document.querySelector(t);s.innerHTML="",s.append(this.canvas),this.canvas.width=s.offsetWidth,this.canvas.height=s.offsetHeight}drawCircle(t,s,i){this.context.lineWidth=5,this.context.beginPath(),this.context.arc(t,s,i,0,2*Math.PI),this.context.stroke(),this.context.fillStyle="#fff",this.context.fill(),this.context.fillStyle="#000",this.context.lineWidth=1}drawNode(t,s,i,e){e&&(this.context.strokeStyle="#dc3545"),this.drawCircle(t,s,this.radius),this.context.font=`${this.fontSize}px Arial`,this.context.textAlign="center",this.context.fillText(i,t,s+this.fontSize/2),this.context.strokeStyle="#000"}drawMotionLine(t,s,i,e,h){this.context.lineWidth=5,this.context.strokeStyle=h||"orange",this.context.beginPath(),this.context.moveTo(t,s),this.context.lineTo(i,e),this.context.stroke(),this.context.lineWidth=1,this.context.strokeStyle="#000"}drawLine(t,s,i,e){this.context.lineWidth=2,this.context.beginPath(),this.context.moveTo(t,s),this.context.lineTo(i,e),this.context.stroke(),this.context.lineWidth=1}drawDirected(t,s,i,e,h){const o=this.getCurvePos(t,s,i,e,h),n=Math.atan2(o.y-e,o.x-i),a={x:i+this.radius*Math.cos(n),y:e+this.radius*Math.sin(n)},r=a.x+this.radius*Math.cos(n)*Math.pow(3,.5)/2,d=a.y+this.radius*Math.sin(n)*Math.pow(3,.5)/2,c={x:r+this.radius/2*Math.cos(n-Math.PI/2),y:d+this.radius/2*Math.sin(n-Math.PI/2)},l={x:r+this.radius/2*Math.cos(n+Math.PI/2),y:d+this.radius/2*Math.sin(n+Math.PI/2)};this.context.lineWidth=5,this.context.beginPath(),this.context.moveTo(a.x,a.y),this.context.lineTo(c.x,c.y),this.context.lineTo(l.x,l.y),this.context.lineTo(a.x,a.y),this.context.fillStyle="#000",this.context.stroke(),this.context.fill(),this.context.lineWidth=1}drawDistance(s,i,e,h,o,n){const a=this.getDistance(new t(s,i),new t(e,h)),r=this.getCurvePos(s,i,e,h,o);this.context.fillStyle=n||"#000",this.context.beginPath(),this.context.fillText(parseInt(a/100),r.x,r.y),this.context.textAlign="center",this.context.fillStyle="#fff"}drawHorizontal(t){this.context.strokeStyle="#fff",this.context.beginPath(),this.context.moveTo(0,t),this.context.lineTo(this.canvas.width,t),this.context.stroke(),this.context.strokeStyle="#000"}drawVertical(t){this.context.strokeStyle="#fff",this.context.beginPath(),this.context.moveTo(t,0),this.context.lineTo(t,this.canvas.height),this.context.stroke(),this.context.strokeStyle="#000"}drawGrid(){for(let t=0;t<=this.canvas.height;t+=2*this.radius)this.drawHorizontal(t);for(let t=0;t<=this.canvas.width;t+=2*this.radius)this.drawVertical(t)}drawCurve(t,s,i,e,h){this.context.moveTo(t,s);const o=this.getCurvePos(t,s,i,e,h);this.context.quadraticCurveTo(o.x,o.y,i,e),this.context.stroke()}getMiddle(t,s,i,e){return this.position.getMiddle(t,s,i,e)}getCurvePos(t,s,i,e,h){return this.position.getCurvePos(t,s,i,e,h)}getDistance(t,s){return this.position.getDistance(t,s)}clear(){this.context.fillStyle="#f4f8ff",this.context.fillRect(0,0,this.canvas.width,this.canvas.height),this.context.fill(),this.context.fillStyle="#000"}}({radius:h}),this.nodes=[],this.edges=[],this.target=null,this.selectedEdgeId=null,this.directed=s,this.showDistance=i,this.showGrid=e,this.character=o,this.motionSteps={step:0,steps:[]},this.onchange=Function,this.motion=n,this.linkedParts=[],this.init()}init(){this.board.canvas.ondblclick=()=>{this.target||this.addNode(this.nodes.length+1,this.board.clientPosition.x,this.board.clientPosition.y)},this.board.canvas.addEventListener("mousemove",(()=>{const{x:t,y:s}=this.board.clientPosition;document.body.style.cursor="unset",this.edges.map(((i,e)=>{if(1===this.board.buttons)return;const h=this.nodes[i.from-1],o=this.nodes[i.to-1];if(!h||!o)return;const n=this.board.getCurvePos(h.x,h.y,o.x,o.y,i.curve/2);this.board.getDistance(n,{x:t,y:s})<this.board.radius&&(this.selectedEdgeId=e),this.target&&(this.selectedEdgeId=null)})),this.nodes.forEach((i=>{this.equalPoint(t,i.x)&&this.equalPoint(s,i.y)&&(this.target=this.target||i)})),this.target&&(this.board.buttons&&this.board.shift?document.body.style.cursor="move":document.body.style.cursor="pointer",this.board.shift||1===this.board.buttons||this.equalPoint(t,this.target.x)&&this.equalPoint(s,this.target,s)||(this.target=null))})),this.board.canvas.onclick=()=>{this.board.alt&&(this.removeEdge(this.edges[this.selectedEdgeId]||{}),this.target&&this.removeNode(this.target.label))},this.render()}render(){this.update(),this.draw(),setTimeout((()=>{this.render()}),1e3/60)}update(){this.checkAddEdge(),this.updateCurve(),this.updateNodes(),this.updateMotion()}draw(){this.board.clear(),this.showGrid&&this.board.drawGrid(),this.drawEdges(),this.drawLine(),this.drawNodes(),this.drawMotions(),this.drawLinked()}updateCurve(){1===this.board.buttons&&null!==this.selectedEdgeId&&(this.target||(this.onchange(),this.edges[this.selectedEdgeId].curve+=this.board.clientPosition.x-this.board.prevPosition.x))}updateNodes(){this.nodes=this.nodes.map((t=>this.updateNode(t)))}updateNode(t){return this.board.buttons&&!this.board.shift&&this.target&&this.target.label===t.label?(this.target=this.toClientPosition(t),this.onchange(),this.toClientPosition(t)):this.motion?this.magicFunction(t):t}updateMotion(){if(!this.motionSteps.steps?.length)return;let t=!1;this.motionSteps.steps=this.motionSteps.steps.map(((s,i)=>i>this.motionSteps.step?{...s,step:0}:s.step>=1||t?s:(t=!0,{...s,step:s.step+=.01})))}drawMotions(){this.motionSteps.steps.forEach((t=>this.drawMotion(t)))}drawMotion(t,s){this.nodes[t.from-1]&&this.nodes[t.to-1]&&(t=this.board.position.ratioLine(this.nodes[t.from-1],this.nodes[t.to-1],t.step),this.board.drawMotionLine(t.from.x,t.from.y,t.to.x,t.to.y,s))}addNode(t,s,i){const e={x:s||Math.floor(Math.random()*this.board.canvas.width),y:i||Math.floor(Math.random()*this.board.canvas.height),label:t,move:10};this.nodes.push(e),this.onchange()}addEdge(t,s){const i={from:t,to:s,curve:100*Math.random()};this.edges.push(i),this.target=null,this.onchange()}removeNode(t){this.nodes=this.nodes.filter((s=>s.label!==t)),this.onchange(),this.linkedParts=[]}removeEdge(t){const{from:s,to:i}=t;this.edges=this.edges.filter((t=>t.from!==s||t.to!==i)),this.onchange(),this.linkedParts=[]}drawNodes(){this.nodes.forEach((t=>{this.board.drawNode(t.x,t.y,this.character?this.alphabet[t.label]:t.label,this.target?.label===t.label)}))}magicFunction(t){return t.move>=0?{...t,x:t.x+.1,y:t.y+.1,move:t.move-.1}:t.move>=-10?{...t,x:t.x-.1,y:t.y-.1,move:t.move-.1}:{...t,move:10}}toClientPosition(t){return{...t,x:this.board.clientPosition.x,y:this.board.clientPosition.y}}drawEdges(){this.edges.forEach((t=>this.drawEdge(t)))}drawLine(){if(!this.board.shift||1!==this.board.buttons||!this.target)return;const{x:t,y:s}=this.board.clientPosition;this.board.drawLine(this.target.x,this.target.y,t,s)}checkAddEdge(){if(!this.target)return;if(!this.board.shift)return;const{x:t,y:s}=this.board.clientPosition;this.nodes.forEach((i=>{this.target&&i.label!==this.target.label&&this.equalPoint(t,i.x)&&this.equalPoint(s,i.y)&&(this.addEdge(this.target.label,i.label),this.target=null)}))}drawEdge(t){let s=null,i=null;if(this.nodes.forEach((e=>{e.label==t.from&&(s=e),e.label==t.to&&(i=e)})),!s||!i)return this.removeEdge(t);this.board.drawCurve(s.x,s.y,i.x,i.y,t.curve),this.directed&&this.board.drawDirected(s.x,s.y,i.x,i.y,t.curve),this.showDistance&&this.board.drawDistance(s.x,s.y,i.x,i.y,t.curve)}exportMatrix(){const t=[],s=[];for(let t=0;t<=this.nodes.length;t++)s.push(0);for(let i=0;i<=this.nodes.length;i++)t.push([...s]);return this.edges.forEach((s=>{t[s.from][s.to]++,this.directed||t[s.to][s.from]++})),t}equalPoint(t,s){return Math.abs(t-s)<=this.board.radius}neighbours(t){return this.exportMatrix()[t].map(((t,s)=>t?s:t)).filter((t=>t))}deepFirstSearch(t){const s=[],e=new i;let h=[];for(e.push({to:t});!e.empty();){const t=e.top();(e.pop(),s[t.to])||(s[t.to]=!0,h.push(t),this.neighbours(t.to).forEach((s=>{e.push({from:t.to,to:s})})))}return h={step:0,steps:h.filter((t=>t.from)).map((t=>({...t,step:0})))},this.motionStart(h),h}breadthFirstSearch(t){const i=[],e=new s;let h=[];for(e.enQueue({to:t});!e.empty();){const t=e.deQueue();i[t.to]||(i[t.to]=!0,h.push(t),this.neighbours(t.to).forEach((s=>{e.enQueue({from:t.to,to:s})})))}return h={step:0,steps:h.filter((t=>t.from)).map((t=>({...t,step:0})))},this.motionStart(h),h}drawLinked(){this.linkedParts.length&&this.linkedParts.forEach((t=>{if(1!==t.length)for(let s=0;s<t.length;s++)for(let i=0;i<t.length;i++)s!==i&&this.neighbours(t[s]).includes(t[i])&&this.drawMotion({from:t[s],to:t[i],step:1},"red")}))}tarjanStop(){this.linkedParts=[],this.onchange()}tarjanStart(){this.linkedParts=this.tarjan(),this.onchange()}tarjan(){return new e(this).tarjan()}appendTo(t){this.board.appendTo(t)}motionStart(t){this.motionSteps=t,this.onchange()}motionStop(){this.motionSteps.step=0,this.motionSteps.steps=[],this.onchange()}nextStep(){return this.motionSteps.step===this.motionSteps.step-1||(this.motionSteps.step++,this.onchange()),this.motionSteps.step}prevStep(){return 0===this.motionSteps.step||(this.motionSteps.step--,this.onchange()),this.motionSteps.step}getNodes(){return this.nodes.map((t=>({...this.edges,label:this.character?this.alphabet[t.label]:t.label})))}getEdges(){return this.edges.map((t=>({...t,from:this.character?this.alphabet[t.from]:t.from,to:this.character?this.alphabet[t.to]:t.label})))}setDirected(t){this.directed=t,this.onchange()}setShowGrid(t){this.showGrid=t,this.onchange()}setShowDistance(t){this.showDistance=t,this.onchange()}setRadius(t){this.board.radius=t,this.onchange()}setMotion(t){this.motion=t,this.onchange()}setCharacter(t){this.character=t,this.onchange()}}})();