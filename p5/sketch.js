let balloons = [];
let numBalloons = 100;
let clouds = [];
let numClouds = 80;

function setup() {
	createCanvas(windowWidth, windowHeight);
	colorMode(HSB);
	background(212, 29, 96);
	
	//instantiate all of our balloons and clouds
	for(i = 0; i < numClouds; i += 1){
		clouds[i] = new Cloud(i);
	}
	for(i = 0; i < numBalloons; i += 1){
		balloons[i] = new Balloon(i);
	}
}

function draw() {
	background(212, 49, 96);
	
	//clouds move
	for(let i = 0; i < clouds.length; i += 1){
		clouds[i].update();
	}

	//balloons move
	for(let i = 0; i < balloons.length; i += 1) {
		balloons[i].update();
	}
}

class Balloon {
	constructor(i) {
		this.index = i;
		this.x = random(0, width);
		this.y = random(0, height);
		this.velX = random(-1.5, 1.5);
		this.velY = random(-1.5, 1.5);
		this.balloonSize = random(80, 135);
	}
	
	update() {
		//motion stuff
		this.x = this.x + this.velX;
		this.y = this.y + this.velY;
		
		if(this.x < 0 || this.x > width) {
			this.velX = this.velX * -1;
		}
		
		if(this.y < 0 || this.y > height) {
			this.velY = this.velY * -1;
		}
		
		//lines connecting basket
		stroke(0, 0, 0);
		strokeWeight(1);
		line(this.x, this.y, this.x - 15, this.y + 70);
		line(this.x, this.y, this.x + 15, this.y + 70);
		
		//circle balloon >> adjust hue based on index
		noStroke();
		fill(this.index / 0.5, 50, 97);
		circle(this.x, this.y, this.balloonSize);
		
		//basket
		fill(18, 70, 45);
		square(this.x - 15, this.y + 70, 30);
	}
}

class Cloud {
	constructor(i) {
		this.index = i;
		this.x = random(0, width);
		this.y = random(0, height);
		this.velX = random(-0.5, 0.5);
		this.velY = random(-0.5, 0.5);
	}
	
	update() {
		//motion stuff
		this.x = this.x + this.velX;
		this.y = this.y + this.velY;
		
		if(this.x < 0 || this.x > width) {
			this.velX = this.velX * -1;
		}
		
		if(this.y < 0 || this.y > height) {
			this.velY = this.velY * -1;
		}
		
		//clouds >> adjust size based on index
		fill(212, 10, 85);
		stroke(212, 10, 75);
		circle(this.x - (this.index / 3), this.y + (this.index / 3), this.index);
		circle(this.x + (this.index / 3), this.y + (this.index / 3), this.index);
		circle(this.x, this.y, this.index);
		
		//i wish the clouds could be randomly generated like you get with a loop
		//but it still looks like static when i do it
		//possible solution: many arrays where instantiated objects are little circles?
	}
}