function Cell(i, j, w) {
	this.i = i;
	this.j = j;
	this.x = i * w;
	this.y = j * w;
	this.w = w;
	this.neighborCount = 0;

	this.bee = false;
	this.revealed = false;
}

Cell.prototype.show = function() {
	stroke(0);
	fill(200);
	rect(this.x, this.y, this.w, this.w);
	if (this.revealed) {
		if (this.bee) {
			fill(255, 0, 0);
			ellipse(this.x + this.w * 0.5, this.y + this.w * 0.5, this.w * 0.5);
		} else {
			fill(255);
			rect(this.x, this.y, this.w, this.w);
			if (this.neighborCount > 0) {
				textAlign(CENTER);
				if (this.neighborCount == 1) {
					fill(0, 0, 255);
				} else if (this.neighborCount == 2) {
					fill(0, 255, 0);
				} else if (this.neighborCount == 3) {
					fill(255, 0, 0);
				} else if (this.neighborCount == 4) {
					fill(0, 0, 153);
				} else if (this.neighborCount == 5) {
					fill(153, 0, 0);
				} else if (this.neighborCount == 6) {
					fill(0, 255, 255);
				} else if (this.neighborCount == 7) {
					fill(255, 153, 153);
				} else {
					fill(102, 0, 0);
				}
				text(this.neighborCount, this.x + this.w * 0.5, this.y + this.w - 6);
			}
		}
	}
}

Cell.prototype.countBees = function() {
	if (this.bee) {
		this.neighborCount = -1;
		return;
	}
	var total = 0;
	for (var xoff = -1; xoff <= 1; xoff++) {
		for (var yoff = -1; yoff <= 1; yoff++) {
			var i = this.i + xoff;
			var j = this.j + yoff;
			if (i > -1 && i < cols && j > -1 && j < rows){
				var neighbor = grid[i][j];
				if (neighbor.bee) {
					total++;
				}
			}
		}
	}
	this.neighborCount = total;
}

Cell.prototype.contains = function(x, y) {
	return (x > this.x && x < this.x + this.w && y > this.y && y < this.y + this.w)
}

Cell.prototype.reveal = function() {
	this.revealed = true;
	console.log(this.neighborCount);
	if (this.neighborCount == 0) {
		// flood fill time
		this.floodFill();

	}
}
Cell.prototype.floodFill = function() {
	for (var xoff = -1; xoff <= 1; xoff++) {
		for (var yoff = -1; yoff <= 1; yoff++) {
			var i = this.i + xoff;
			var j = this.j + yoff;
			if (i > -1 && i < cols && j > -1 && j < rows){
				var neighbor = grid[i][j];
				if (!neighbor.bee && !neighbor.revealed) {
					neighbor.reveal();
				}
			}
		}
	}
}