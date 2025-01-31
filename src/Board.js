import Position from "./Position";

class Board {
	constructor({ width, height, radius, fontSize }) {
		this.canvas = document.createElement("canvas");
		this.context = this.canvas.getContext("2d");
		this.radius = radius || 20;
		this.fontSize = fontSize || 25;
		this.clientPosition = { x: 0, y: 0 };
		this.prevPosition = { x: 0, y: 0 };
		this.buttons = 0;
		this.shift = false;
		this.alt = false;
		this.selector = "";
		this.position = new Position(0, 0);

		this.canvas.width = width || 300;
		this.canvas.height = height || 400;

		this.init();
	}

	init() {
		this.canvas.onmousemove = (event) => {
			this.prevPosition = { ...this.clientPosition };
			this.clientPosition = {
				x: event.clientX - this.canvas.offsetLeft + window.scrollX,
				y: event.clientY - this.canvas.offsetTop + window.scrollY,
			};
			this.buttons = event.buttons;
			this.shift = event.shiftKey;
			this.alt = event.altKey;
		};
		window.onresize = () => {
			if (this.selector) this.appendTo(this.selector);
		};
	}
	appendTo(selector) {
		this.selector = selector;
		const parent = document.querySelector(selector);
		parent.innerHTML = "";
		parent.append(this.canvas);
		this.canvas.width = parent.offsetWidth;
		this.canvas.height = parent.offsetHeight;
	}
	drawCircle(x, y, r) {
		this.context.lineWidth = 5;
		this.context.beginPath();
		this.context.arc(x, y, r, 0, 2 * Math.PI);
		this.context.stroke();
		this.context.fillStyle = "#fff";
		this.context.fill();
		this.context.fillStyle = "#000";
		this.context.lineWidth = 1;
	}
	drawRectangles(x, y, w = 150, h = 100, r) {
		this.context.beginPath();
		this.context.roundRect(x, y, w, h, r);
		this.context.fillStyle = "#fff";
		this.context.fill();
		this.context.fillStyle = "#000";
		this.context.stroke();
	}
	// drawNode(x, y, u, active) {
	// 	if (active) this.context.strokeStyle = "#dc3545";
	// 	this.drawCircle(x, y, this.radius);
	// 	this.context.font = `${this.fontSize}px Arial`;
	// 	this.context.textAlign = "center";
	// 	this.context.fillText(u, x, y + this.fontSize / 2);
	// 	this.context.strokeStyle = "#000";
	// }
	drawNode(x, y, u, active) {
		if (active) this.context.strokeStyle = "#dc3545";
		this.drawRectangles(x, y, this.radius);
		this.context.font = `${this.fontSize}px Arial`;
		this.context.textAlign = "center";
		this.context.textBaseline = "middle";
		this.context.fillText(u, x + 150 / 2, y + 100 / 2);
		this.context.strokeStyle = "#000";
	}
	drawMotionLine(x1, y1, x2, y2, color) {
		this.context.lineWidth = 5;
		this.context.strokeStyle = color || "orange";
		this.context.beginPath();
		this.context.moveTo(x1, y1);
		this.context.lineTo(x2, y2);
		this.context.stroke();
		this.context.lineWidth = 1;
		this.context.strokeStyle = "#000";
	}
	drawLine(x1, y1, x2, y2) {
		this.context.beginPath();
		this.context.moveTo(x1, y1);
		this.context.lineTo(x2, y2);
		this.context.stroke();
	}
	drawDirected(x1, y1, x2, y2, distance) {
		const curvePos = this.getCurvePos(x1, y1, x2, y2, distance);
		const angle = Math.atan2(curvePos.y - y2, curvePos.x - x2);
		const A = {
			x: x2 + this.radius * Math.cos(angle),
			y: y2 + this.radius * Math.sin(angle),
		};
		const M = {
			x: A.x + (this.radius * Math.cos(angle) * Math.pow(3, 1 / 2)) / 2,
			y: A.y + (this.radius * Math.sin(angle) * Math.pow(3, 1 / 2)) / 2,
		};
		const B = {
			x: M.x + (this.radius / 2) * Math.cos(angle - Math.PI / 2),
			y: M.y + (this.radius / 2) * Math.sin(angle - Math.PI / 2),
		};

		const C = {
			x: M.x + (this.radius / 2) * Math.cos(angle + Math.PI / 2),
			y: M.y + (this.radius / 2) * Math.sin(angle + Math.PI / 2),
		};

		this.context.beginPath();
		this.context.fillStyle = "#fff";
		this.context.lineWidth = 2;
		this.context.moveTo(A.x, A.y);
		this.context.lineTo(B.x, B.y);
		this.context.lineTo(C.x, C.y);
		this.context.lineTo(A.x, A.y);
		this.context.stroke();
		this.context.fill();
		this.context.lineWidth = 1;
	}

	drawDistance(x1, y1, x2, y2, distance, fill) {
		const d = this.getDistance(new Position(x1, y1), new Position(x2, y2));
		const curvePos = this.getCurvePos(x1, y1, x2, y2, distance);

		const middlePos = this.getCurvePos(x1, y1, x2, y2, distance / 2);

		const toPos = this.position.ratioLine(
			{
				x: middlePos.x,
				y: middlePos.y,
			},
			{
				x: curvePos.x,
				y: curvePos.y,
			},
			0.8
		);

		this.context.fillStyle = fill || "#000";
		this.context.beginPath();
		this.context.moveTo(middlePos.x, middlePos.y);
		this.context.lineTo(toPos.to.x, toPos.to.y);
		this.context.stroke();
		this.context.fillText(parseInt(d / 100), curvePos.x, curvePos.y);
		this.context.textAlign = "center";
		this.context.fillStyle = "#fff";
	}

	drawHorizontal(y) {
		this.context.strokeStyle = "#fff";
		this.context.beginPath();
		this.context.moveTo(0, y);
		this.context.lineTo(this.canvas.width, y);
		this.context.stroke();
		this.context.strokeStyle = "#000";
	}
	drawVertical(x) {
		this.context.strokeStyle = "#fff";
		this.context.beginPath();
		this.context.moveTo(x, 0);
		this.context.lineTo(x, this.canvas.height);
		this.context.stroke();
		this.context.strokeStyle = "#000";
	}
	drawGrid() {
		for (let i = 0; i <= this.canvas.height; i += this.radius * 2)
			this.drawHorizontal(i);
		for (let i = 0; i <= this.canvas.width; i += this.radius * 2)
			this.drawVertical(i);
	}
	drawCurve(x1, y1, x2, y2, distance) {
		this.context.moveTo(x1, y1);
		const curvePos = this.getCurvePos(x1, y1, x2, y2, distance);

		this.context.quadraticCurveTo(curvePos.x, curvePos.y, x2, y2);
		this.context.stroke();

		this.context.beginPath();
		const canterPos = this.getCurvePos(x1, y1, x2, y2, distance / 2);
		this.context.fillStyle = "#fff";
		this.context.arc(canterPos.x, canterPos.y, 5, 0, 2 * Math.PI);
		this.context.fill();
		this.context.stroke();
		this.context.fillStyle = "#000";
	}

	getMiddle(x1, y1, x2, y2) {
		return this.position.getMiddle(x1, y1, x2, y2);
	}

	getCurvePos(x1, y1, x2, y2, distance) {
		return this.position.getCurvePos(x1, y1, x2, y2, distance);
	}
	getDistance(pos1, pos2) {
		return this.position.getDistance(pos1, pos2);
	}
	clear() {
		this.context.fillStyle = "#f4f8ff";
		this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
		this.context.fill();
		this.context.fillStyle = "#000";
	}
}

export default Board;
