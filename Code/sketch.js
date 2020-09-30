//Démineur

function make2DArray(cols, rows) {
	var arr = new Array(cols);
	for (var i = 0; i < arr.length; i++){
		arr[i] = new Array(rows);
	}
	return arr;
}

var grid;
var cols;
var rows;
var w = 20;
var game_over;
var game_win;

var totalBees = 10;

function setup() {
	createCanvas(601, 321);
	cols = 9;
	rows = 9;
	grid = make2DArray(cols, rows);
	for (var i = 0; i < cols; i++) {
		for (var j = 0; j < rows; j++) {
			grid[i][j] = new Cell(i, j, w);
		}
	}

	// Pick totalBees spots
	var options = [];
	for (var i = 0; i < cols; i++) {
		for (var j = 0; j < rows; j++) {
			options.push([i, j]);
		}
	}

	for (var n = 0; n < totalBees; n++) {
		var index = floor(random(options.length));
		var choice = options[index];
		var i = choice[0];
		var j = choice[1];
		// Deletes that spot so it's no longer an option
		options.splice(index, 1);
		grid[i][j].bee = true;
	}

	for (var i = 0; i < cols; i++) {
		for (var j = 0; j < rows; j++) {
			grid[i][j].countBees();
		}
	}
}

function gameOver() {
	for (var i = 0; i < cols; i++) {
		for (var j = 0; j < rows; j++) {
			if (grid[i][j].bee){
				grid[i][j].revealed = true;
			}
		}
	}
	fill(255, 200);
	rect(0, 0, cols*w, rows*w);
	fill(0);
	textAlign(CENTER);
	text("Game Over ;(", cols*w/2 , rows*w/2);
}

function Win() {
	for (var i = 0; i < cols; i++) {
		for (var j = 0; j < rows; j++) {
			if (!grid[i][j].bee){
				grid[i][j].revealed = true;
			}
		}
	}
	fill(255, 200);
	rect(0, 0, cols*w, rows*w);
	fill(0);
	textAlign(CENTER);
	text("You're the winner !!!!!  XD", cols*w/2 , rows*w/2);
}

function mousePressed() {
	for (var i = 0; i < cols; i++){
		for (var j = 0; j < rows; j++){
			if (grid[i][j].contains(mouseX, mouseY)) {
				grid[i][j].reveal();

				if (grid[i][j].bee) {
					game_over = true;
				}
			}
		}
	}
}

function draw() {
	background(255);
	for (var i = 0; i < cols; i++){
		for (var j = 0; j < rows; j++){
			grid[i][j].show();
		}
	}	
	if (game_over == true) {
		gameOver();
	}
}