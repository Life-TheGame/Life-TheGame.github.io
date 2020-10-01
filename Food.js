function Food() {
  this.x = random(width);
  this.y = random(height);
  this.d = dist(this.x, this.y, plx, ply);
  this.rand = floor(random(1, 4));
  this.add;

  this.show = function() {
    if (this.closestFood()) {
      strokeWeight(2);
      stroke(0, 0, 255);
    } else {
      noStroke();
    }
    if (this.rand == 1) {
      fill(150, 50, 50, 150);
      this.add = 0.25;
    } else if (this.rand == 2) {
      fill(150, 150, 50, 150);
      this.add = 0.5;
    } else if (this.rand == 3) {
      fill(50, 150, 50, 150);
      this.add = 1;
    }
    ellipse(this.x, this.y, (windowWidth + windowHeight) / 115, (windowWidth + windowHeight) / 115,);
  }

  this.update = function() {
    this.d = dist(this.x, this.y, plx, ply);
    if (alive) {
      if (this.d < size/2) {
        this.eaten(false);
        size += this.add;
      }
      fy = this.y;
      fx = this.x;
    }
  }

  this.eaten = function(resizing) {
    if (alive) {
      eaten++;
      eatenToday++;
      this.x = random(width);
      this.y = random(height);

      if (PlaySounds_ && !resizing) {
        pop.play();
      }
    }
  }

  this.closestFood = function() {
    if (!title) {
      if (!instructions && !next && alive) {
        for (var i = 0; i < f.length; i++) {
          if (this.d > f[i].d || this.d < 20) {
            return false;
          }
        }
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
}
