let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
ctx.globalAlpha = 1;

clear = () => ctx.clearRect(0, 0, canvas.width, canvas.height);
randomColor = () => {
	let c = "0123456789ABCDEF";
	return "#" + c[Math.floor(Math.random()*16)] + c[Math.floor(Math.random()*16)] + c[Math.floor(Math.random()*16)];
}

// Classe pour un point aléatoire sur le canvas
class Point {
	constructor(){
		this.x = Math.random() * canvas.width;
		this.y = Math.random() * canvas.height;
		this.color = "#FFF";
	}

	draw(){
		ctx.beginPath();
		ctx.arc(this.x, this.y, 4, 0, Math.PI * 2);
		ctx.fillStyle = this.color;
		ctx.fill();
		ctx.closePath();
	}
}

// Classe pour un cluster pour K-Means
class Cluster {
	constructor(){
		this.x = Math.random() * canvas.width;
		this.y = Math.random() * canvas.height;
		this.color = randomColor();
	}

	draw(){
		ctx.beginPath();
		ctx.arc(this.x, this.y, 8, 0, Math.PI * 2);
		ctx.fillStyle = this.color;
		ctx.fill();
		ctx.lineWidth = 2;
		ctx.strokeStyle = "white";
		ctx.stroke();
		ctx.closePath();
	}

	move(x, y){
		this.x = x;
		this.y = y;
	}
}

function update() {
	clear();
	for(let i=0; i<points.length; i++){
		points[i].draw();
	}
	
	for(let i=0; i<clusters.length; i++){
		clusters[i].draw();
	}
}

// 1
function colorerPoints() {
	let distance;
	for(let i=0; i<points.length; i++){
		let c = clusters[0];
		let min = Infinity;
		for(let j=0; j<clusters.length; j++){
			distance = Math.sqrt(Math.pow(clusters[j].x-points[i].x ,2) + Math.pow(clusters[j].y-points[i].y ,2));
			if(distance < min){
				min = distance;
				c = clusters[j];
			}
		}
		points[i].color = c.color;
	}
	update();
}

// 2
function deplacerClusters() {
	for(let i=0; i<clusters.length; i++){
		let mx = 0, my = 0, n = 0;
		for(let j=0; j<points.length; j++){
			if(clusters[i].color == points[j].color){
				mx += points[j].x;
				my += points[j].y;
				n++;
			}
		}
		mx /= n;
		my /= n;
		clusters[i].move(mx, my);
	}
	update();
}

let points = new Array(100);
for(let i=0; i<points.length; i++){
	points[i] = new Point();
}

let clusters = new Array(7);
for(let i=0; i<clusters.length; i++){
	clusters[i] = new Cluster();
}

update();

setInterval(() => {
	colorerPoints();
	setTimeout(() => deplacerClusters());
});