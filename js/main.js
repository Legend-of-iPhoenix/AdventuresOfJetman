var canvas, context;

var character = new function() {
	this.velocityX = 0;
	this.velocityY = 0;
	this.positionX = 0;
	this.positionY = 0;
	this.tick = function(object) {
		object.velocityY -= 1;
		object.velocityX *= .95;
		object.velocityX = parseInt(object.velocityX.toFixed(2));
		object.positionX += object.velocityX;
		object.positionY += object.velocityY;
		if (object.positionY < 0) {
			object.positionY = 0;
			object.velocityY = 0;
		} else {
			if (object.positionY > 164) {
				object.positionY = 0;
			} else {
				if (object.positionX > 264 || object.positionX < 0) {
					object.positionX = object.positionX < 0 ? 264 : 0;
				}
			}
		}

		object.printStats();
	}
	this.handleVelocityChange = function(deltaX,deltaY) {
		this.velocityX += deltaX;
		this.velocityY += deltaY;
		this.printStats();
	}
	this.printStats = function() {
		var _this = this;
		Object.keys(this).forEach(function(key) {
			if (typeof _this[key] !== "function") {
				console.log(key+": "+_this[key])
    	}
		});
	}
	this.startTicking = function(object) {
		setInterval(object.tick,100,object);
	}
}

window.onload = function() {
	canvas = document.getElementById("canvas");
	context = canvas.getContext('2d');
	character.startTicking(character)
	document.body.onkeyup = function(e) {
		if (e.code == 'KeyW' || e.code == 'ArrowUp') {
			character.handleVelocityChange(0,2);
		}
		if (e.code == 'KeyA' || e.code == 'ArrowLeft') {
			character.handleVelocityChange(-2,0);
		}
		if (e.code == 'KeyD' || e.code == 'ArrowRight') {
			character.handleVelocityChange(2,0);
		}
	}
}