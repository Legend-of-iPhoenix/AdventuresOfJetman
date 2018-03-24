function Item(positionX, positionY, oncollide) {
	this.positionX = positionX;
	this.positionY = positionY;
	this.oncollide = oncollide;
}

Item.prototype.checkCollisions = function(character) {
	if (character.positionX - 5 <= this.positionX && character.positionX + 5 >= this.positionX) {
		if (character.positionY - 5 <= this.positionY && character.positionY + 5 >= this.positionY) {
			this.oncollide(character);
		}
	}
}

function Character() {
	this.velocityX = 0;
	this.velocityY = 0;
	this.positionX = 0;
	this.positionY = 0;
	this.tickInterval = function() {
		return -1;
	}
	this.printStats = function() {
		var _this = this;
		Object.keys(this).forEach(function(key) {
			if (typeof _this[key] !== "function") {
				console.log(key+": "+_this[key])
	  	}
		});
	}
}

Character.prototype.tick = function(context) {
	context.strokeStyle = "#fff";
	context.fillStyle = "#fff";
	context.beginPath();
	context.arc(this.positionX, 164-this.positionY, 3, 0, 2 * Math.PI, false);
	context.fill();
	this.velocityY -= 1;
	this.velocityX *= .95;
	this.velocityX = parseInt(this.velocityX.toFixed(2));
	this.positionX += this.velocityX;
	this.positionY += this.velocityY;
	if (this.positionY < 0) {
		this.positionY = 0;
		this.velocityY = 0;
	} else {
		if (this.positionY > 164) {
			this.positionY = 0;
		} else {
			if (this.positionX > 264 || this.positionX < 0) {
				this.positionX = this.positionX < 0 ? 264 : 0;
			}
		}
	}
	context.fillStyle = "#000";
	context.beginPath();
	context.arc(this.positionX, 164-this.positionY, 2, 0, 2 * Math.PI, false);
	context.fill();
	//this.printStats();
}

Character.prototype.handleVelocityChange = function(deltaX,deltaY) {
	console.log(deltaX,deltaY);
	this.velocityX += deltaX;
	this.velocityY += deltaY;
	// dthis.printStats();
}

Character.prototype.startTicking = function(context) {
	console.log(this);
	var x = setInterval(this.tick,75,context);
	this.tickInterval = function() {
		return x;
	}
}

var character = new Character();
var itemsList = [new Item(0,0,console.log)];


window.onload = function() {
	canvas = document.createElement("canvas");
	document.body.appendChild(canvas);
	canvas.width = 264;
	canvas.height = 164;
	canvas.style.width = "100%";
	canvas.style.height = "62%";
	context = canvas.getContext('2d');
	character.startTicking(context);
	document.onkeydown = function(e) {
		if (e.code == 'KeyW' || e.code == 'ArrowUp') {
			character.handleVelocityChange(0,5);
		}
		if (e.code == 'KeyA' || e.code == 'ArrowLeft') {
			character.handleVelocityChange(-5,0);
		}
		if (e.code == 'KeyD' || e.code == 'ArrowRight') {
			character.handleVelocityChange(5,0);
		}
	}
}