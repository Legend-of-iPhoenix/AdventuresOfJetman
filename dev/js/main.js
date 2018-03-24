var context, character, itemList, canvas;
var scale = 10;


function Item(positionX, positionY, pointValue) {
	this.positionX = positionX;
	this.positionY = positionY;
	this.pointValue = pointValue;
}

Item.prototype.remove = function() {

}

Item.prototype.checkCollisions = function(character) {
	if (character.positionX - 5 <= this.positionX && character.positionX + 5 >= this.positionX) {
		if (character.positionY - 5 <= this.positionY && character.positionY + 5 >= this.positionY) {
			character.alterScore(this.pointValue);
			this.remove();
		}
	}
}

function Character() {
	this.velocityX = 0;
	this.velocityY = 0;
	this.positionX = 0;
	this.positionY = 0;
	this.tickTimeout = 0;
	this.score = 0;
	this.printStats = function() {
		var _this = this;
		Object.keys(this).forEach(function(key) {
			if (typeof _this[key] !== "function") {
				console.log(key+": "+_this[key])
	  	}
		});
	}
	this.context;
}

function tick() {
	console.log(1);
}

Character.prototype.alterScore = function(amount) {
	this.score += amount;
}

Character.prototype.tick = function() {
	console.log(this.positionX.toFixed(1), this.positionY.toFixed(1));
	this.context.strokeStyle = "#fff";
	this.context.fillStyle = "#fff";
	this.context.beginPath();
	this.context.arc(this.positionX, canvas.height-this.positionY, scale+1, 0, 2 * Math.PI, false);
	this.context.fill();
	this.velocityY -= scale;
	this.velocityX *= .95;
	this.velocityX = parseFloat(this.velocityX.toFixed(2));
	this.velocityX = Math.abs(this.velocityX) <= scale/5 ? 0 : this.velocityX;
	this.positionX += this.velocityX;
	this.positionY += this.velocityY;
	if (this.positionY < 0) {
		this.positionY = 0;
		this.velocityY = 0;
	} else {
		if (this.positionY > canvas.height - scale) {
			this.positionY = 0;
		}
	}
	if (this.positionX > canvas.width || this.positionX < 0) {
		this.positionX = this.positionX < 0 ? canvas.width - scale : scale;
	}
	this.context.fillStyle = "#000";
	this.context.beginPath();
	this.context.arc(this.positionX, canvas.height-this.positionY, scale, 0, 2 * Math.PI, false);
	this.context.fill();
	//this.printStats();
}

Character.prototype.handleVelocityChange = function(deltaX,deltaY) {
	console.log(deltaX,deltaY);
	this.velocityX += deltaX;
	this.velocityY += deltaY;
	//this.printStats();
}

character = new Character();
itemsList = [new Item(0,0,2)];


window.onload = function() {
	canvas = document.createElement("canvas");
	document.body.appendChild(canvas);
	canvas.width = 264*scale;
	canvas.height = 164*scale;
	canvas.style.width = "100%";
	canvas.style.height = "62%";
	context = canvas.getContext('2d');
	document.onkeydown = function(e) {
		if (e.code == 'KeyW' || e.code == 'ArrowUp') {
			character.handleVelocityChange(0,5*scale);
		}
		if (e.code == 'KeyA' || e.code == 'ArrowLeft') {
			character.handleVelocityChange(0-(5*scale),0);
		}
		if (e.code == 'KeyD' || e.code == 'ArrowRight') {
			character.handleVelocityChange(5*scale,0);
		}
	}
	character.context = context;
	setInterval(tickCharacter,75);
}

function tickCharacter() {
	character.tick()
}