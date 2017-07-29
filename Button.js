function Button(x, y, string, s, bs, Toggle, Fulls, Cont) {
  if (Toggle) {
    if (PlaySounds_) {
      fill(255, 150);
    } else {
      fill(200, 150);
    }
  } else if (Fulls) {
    if (fullscreen()) {
      fill(255, 150);
    } else {
      fill(200, 150);
    }
  } else {
    fill(255, 150);
  }

  noStroke();
  rectMode(CORNERS);
  rect(x-bs, y-bs, x+bs, y+bs);
  fill(0, 0, 0);
  textAlign(CENTER, CENTER);
  textSize(s);
  text(string, x, y);

  this.click = function(IorS) {
    if (IorS == 'i') {
      title = false;
      instructions = true;
    } else if (IorS == 's') {
      title = false;
      instructions = false;
    } else if (IorS == 'n') {
      title = false;
      instructions = false;
      next = true;
    } else if (IorS == 'b') {
      title = false;
      instructions = true;
      next = false;
    } else if (IorS == 'k') {
      title = true;
      PhoneSkip = true;
      elsewhere = false;
    } else if (IorS == 'c') {
      Continue_ = false;
      title = true;
      bMPlay = true;
    }
  }
}
