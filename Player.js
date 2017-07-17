function Player() {
  this.x = width/2;
  this.y = height/2;
  this.clr;

  this.show = function() {
    noStroke();
    this.clr = map(size, 0, 125 + sizeInc, 255, 0);
    fill(255, this.clr, this.clr, 150);
    ellipse(this.x, this.y, size, size);
  }

  this.update = function() {
    this.x = mouseX;
    this.y = mouseY;
    plx = this.x;
    ply = this.y;
  }
}
