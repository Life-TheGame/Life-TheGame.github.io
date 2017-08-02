var pla;
var f = [];
var buS;
var buI;
var buB;
var buSo;
var buNe;
var buBa;
var buFu;
var buSk;
var buCo;
var pop;
var clickOn;
var clickOff;
var sleepS;
var wake;
var death;
var bMusic;
var dMusic;
var nMusic;
var next = false;
var PlaySounds_ = true;
var eaten = 0;
var ply;
var plx;
var day = 1;
var min;
var sleep = false;
var size = 35;
var timeInDay = 86400;
var timer;
var eatenToday;
var title = true;
var instructions;
var sizeInc;
var sizeMin;
var set = true;
var alive = true;
var fx;
var fy;
var sleepPlay = true;
var deathPlay = true;
var fullscreen_ = false;
var Phone = true;
var PhoneSkip = false;
var elsewhere = false;
var Continue_ = false;
var bPlayOnce = false;
var nMPlay = true;
var dMPlay = true;
var bMPlay = true;
var loading = true;
var nSounds = 0;
var aPercent = 0;
var pCounter = 0;
var waiter = 0;

function errorCallback() {
  background(255, 0, 255);
  text("100%", width/2, height/2);
  console.log("Error");
}

function successCallback(song) {
  pCounter = pCounter + 1;
  if (pCounter == 9) {
    fill(0);
    background(255, 255, 0);
    textSize(50);
    textAlign(CENTER, CENTER);
    text("100%", width/2, height/2);
    textSize(75);
    text("Gimme a sec", width/2, height/4);
    rectMode(CORNERS);
    noFill();
    stroke(0);
    strokeWeight(4);
    rect(width/2 - width/4, height/8 * 6 - 50, width/2 + width/4, height/8 * 6 + 50);
    fill(35, 255, 35);
    noStroke();
    rect(width/2 - width/4 + 2, height/8 * 6 - 48, width/4 + width/2 - 2, height/8 * 6 + 48);
    frameRate(1);
  }
  nSounds = nSounds + 1;
}

function whileLoading(percent) {
  if (pCounter != 9) {
    background(255, 255, 0);
    textSize(50);
    textAlign(CENTER, CENTER);
    fill(0);
    text(floor(percent * 100) + "%", width/2, height/2);
    textSize(75);
    text("Gimme a sec", width/2, height/4);
    rectMode(CORNERS);
    noFill();
    stroke(0);
    strokeWeight(4);
    rect(width/2 - width/4, height/8 * 6 - 50, width/2 + width/4, height/8 * 6 + 50);
    fill(35, 255, 35);
    noStroke();
    var w = width/2 * (nSounds / 9);
    rect(width/2 - width/4 + 2, height/8 * 6 - 48, width/4 + w, height/8 * 6 + 48);
  }
}

function setup() {
  bMusic = loadSound('assets/Life in D Minor Loop Ver.wav', successCallback, errorCallback, whileLoading);
  dMusic = loadSound('assets/Day in C Major.wav', successCallback, errorCallback, whileLoading);
  nMusic = loadSound('assets/Night in C Major.wav', successCallback, errorCallback, whileLoading);
  pop = loadSound('assets/pop.wav', successCallback, errorCallback, whileLoading);
  clickOn = loadSound('assets/buttonOn.wav', successCallback, errorCallback, whileLoading);
  clickOff = loadSound('assets/buttonOff.wav', successCallback, errorCallback, whileLoading);
  death = loadSound('assets/death.wav', successCallback, errorCallback, whileLoading);
  sleepS = loadSound('assets/sleep.wav', successCallback, errorCallback, whileLoading);
  wake = loadSound('assets/wake.wav', successCallback, errorCallback, whileLoading);
  var uagent = navigator.userAgent.toLowerCase();
  if (uagent.search("iphone" || "android" || "ipod" || "ipad" || "blackberry") > -1) {
    Phone = true;
  } else {
    Phone = false;
  }
  pla = new Player();
  createCanvas(windowWidth - 7, windowHeight - 7);
  //fullscreen();
  for (var i = 0; i < 50; i++) {
    f[i] = new Food();
  }
}

function draw() {
  if (nSounds === 9) {
    frameRate(60);
    if (bMPlay === true) {
      bMusic.loop();
      bMPlay = false;
    }
    if (!PlaySounds_) {
      bMusic.pause();
      bPlayOnce = true;
    } else if (PlaySounds_) {
      if (bPlayOnce == true) {
        bMusic.play();
        bPlayOnce = false;
      }
    }
    if (!title && !instructions && !next) {
      bMusic.stop();
    } else {
      dMusic.stop();
      nMusic.stop();
    }
    if (!elsewhere) {
      if (title) {
        dMusic.stop();
        eaten = 0;
        day = 1;
        sleep = false;
        size = 35;
        timeInDay = 86400;
        eatenToday = 0;
        sizeMin = 0;
        sizeInc = 0;
        sleepPlay = true;
        deathPlay = true;
        set = true;
        alive = true;
        next = false;
        dMPlay = true;
        nMPlay = false;
        textAlign(CENTER, CENTER);
        background(53);
        fill(0);
        textSize(45);
        text("Life: The Game v 1.9", width/2, height/9);
        text("Made By: Aiden Onstott", width/2, height/1.05);
        buS = new Button(width/2, height/2.75, "Start", (windowWidth + windowHeight) / 50, (windowWidth + windowHeight) / 18, false, false);
        buI = new Button(width/2, height/1.35, "Instructions", (windowWidth + windowHeight) / 65, (windowWidth + windowHeight) / 18, false, false);
        buSo = new Button(width/1.2, height / 1.24, "Toggle Sounds", (windowWidth + windowHeight) / 85, (windowWidth + windowHeight) / 25, true, false);
        buSo = new Button(width/8, height / 1.24, "Fullscreen", (windowWidth + windowHeight) / 85, (windowWidth + windowHeight) / 25, false, true);
        var dS = dist(mouseX, mouseY, width/2, height/2.75);
        var dI = dist(mouseX, mouseY, width/2, height/1.35);
        if (dS < (windowWidth + windowHeight) / 18 && mouseIsPressed) {
          buS.click('s');
          if (PlaySounds_) {
            clickOn.play();
          }
        } else if (dI < (windowWidth + windowHeight) / 18 && mouseIsPressed) {
          buI.click('i');
          if (PlaySounds_) {
            clickOff.play();
          }
        }
        for (var i = 0; i < f.length; i++) {
          f[i].show();
        }
      } else {
        if (instructions) {
          background(53);
          for (var i = 0; i < f.length; i++) {
            f[i].show();
          }
          textSize(22.5);
          fill(255, 150);
          text("You are a blob. You must eat the other smaller blobs to survive.", width/2, height/8 * 4);
          text("If you eat to many, you will die. Also, if you eat to little, you'll die.", width/2, height/8 * 5);
          textSize(15);
          text("These are indicated by your blob color!", width/2, height/8 * 5.5);
          textSize(22.5);
          text("Overnight, you will shrink, you must stay above size 0 to live.", width/2, height/8 * 6);
          text("Your shrinking rate will get faster overtime, stay alive.", width/2, height/8 * 7);
          buB = new Button(width/5.15, height/8 * 2, "Go!", (windowWidth + windowHeight) / 25, (windowWidth + windowHeight) / 18, false);
          buNe = new Button(width/1.25, height / 8 * 2, "Next", (windowWidth + windowHeight) / 25, (windowWidth + windowHeight) / 18, false);
          var dB = dist(mouseX, mouseY, width/5.15, height/8 * 2);
          var dNe = dist(mouseX, mouseY, width/1.25, height / 8 * 2);
          if (dB < (windowWidth + windowHeight) / 18 && mouseIsPressed) {
            buB.click('s');
            if (PlaySounds_) {
              clickOn.play();
            }
          } else if (dNe < (windowWidth + windowHeight) / 18 && mouseIsPressed) {
            buNe.click('n');
            if (PlaySounds_) {
              clickOn.play();
            }
          }
        } else if (next) {
          background(53);
          buBa = new Button(width/2, height/8 * 2, "Back", (windowWidth + windowHeight) / 25, (windowWidth + windowHeight) / 18, false);
          var dBa = dist(mouseX, mouseY, width/2, height/8 * 2);
          if (dBa < (windowWidth + windowHeight) / 18 && mouseIsPressed) {
            buBa.click('b');
            if (PlaySounds_) {
              clickOff.play();
            }
          }
          for (var i = 0; i < f.length; i++) {
            f[i].show();
          }
          textSize(22.5);
          fill(255, 150);
          text("The closest food blob to you will be outlined in blue.", width/2, height/8 * 4);
          text("The red colored food will increase your size by 0.25.", width/2, height/8 * 5);
          text("The yellow colored food will increase your size by 0.5.", width/2, height/8 * 6);
          text("The green colored food will increase your size by 1.", width/2, height/8 * 7);
        } else {
          if (set) {
            min = millis();
            set = false;
          }
          background(53);
          pla.show();
          if (!sleep) {
            pla.update();
            nMusic.stop();
            if (dMPlay && PlaySounds_) {
              dMusic.loop();
              dMPlay = false;
            }
            nMPlay = true;
          } else {
            textSize(500);
            text("ZZZ", width/2, height/2);
            size -= 0.025 + sizeMin;
            dMusic.stop();
            if (nMPlay && PlaySounds_) {
              nMusic.loop();
              nMPlay = false;
            }
            dMPlay = true;
          }

          textAlign(CENTER, CENTER);
          textSize(15);
          timer = millis()-min;
          fill(250, 150);
          //text("Eaten: " + eaten, width/2, height/2);
          text("Day: " + day, width/2, height/2.25);
          //text("Size: " + round(size), width/2, height/2.5);
          text("Length of Day: " + floor(timeInDay/2), width/2, height/2.75);
          text("Time: " + floor(timer), width/2, height/3);
          if (timer > timeInDay/2) {
            sleep = true;
            if (sleepPlay) {
              if (PlaySounds_) {
                sleepS.play();
                sleepPlay = false;
              }
            }
          }
          if (timer > 86400) {
            sleep = false;
            sleepPlay = true;
            day++;
            min = millis();
            eatenToday = 0;
            sizeInc += 10;
            sizeMin += 0.005;
            if (PlaySounds_) {
              wake.play();
            }
          }
          for (var i = 0; i < f.length; i++) {
            f[i].show();
            if (alive) {
              f[i].update();
            }
          }
          if (size <= 0) {
            alive = false;
            if (deathPlay) {
              if (PlaySounds_) {
                death.play();
                deathPlay = false;
              }
            }
            min = millis();
            background(53);
            fill(255, 150);
            textSize(50);
            noStroke();
            text("You died of starvation", width/2, height/2);
            text("Your current day was: " + day, width/2, height/4);
            textSize(20);
            text("Press title to go to the title", width/2, height/3);
            for (var i = 0; i < f.length; i++) {
              f[i].show();
              f[i].update();
            }
            if (!Phone) {
              buCo = new Button(width/2, height/1.4, "Title", (windowWidth + windowHeight) / 50, (windowWidth + windowHeight) / 18, false, false, true);
              if (Continue_) {
                title = true;
                Continue_ = false;
                if (PlaySounds_) {
                  clickOn.play();
                  bMPlay = true;
                }
              }
            } else {
              buCo = new Button(width/8, height/8 * 2, "Title", (windowWidth + windowHeight) / 25, (windowWidth + windowHeight) / 18, false);
              var dBa = dist(mouseX, mouseY, width/8, height/8 * 2);
              if (dBa < (windowWidth + windowHeight) / 18 && mouseIsPressed) {
                if (Continue_) {
                  buBa.click('c');
                  if (PlaySounds_) {
                    clickOff.play();
                  }
                }
              }
            }
          }
          if (size >= 125 + sizeInc) {
            alive = false;
            if (deathPlay) {
              if (PlaySounds_) {
                death.play();
                deathPlay = false;
              }
            }
            min = millis();
            background(53);
            fill(255, 150);
            textSize(50);
            noStroke();
            text("You died of overeating", width/2, height/2);
            text("Your current day was: " + day, width/2, height/4);
            textSize(20);
            text("Press title to go to the title", width/2, height/3);
            for (var i = 0; i < f.length; i++) {
              f[i].show();
              f[i].update();
            }
            if (!Phone) {
              buCo = new Button(width/2, height/1.4, "Title", (windowWidth + windowHeight) / 50, (windowWidth + windowHeight) / 18, false, false, true);
              if (Continue_) {
                title = true;
                Continue_ = false;
                if (PlaySounds_) {
                  clickOn.play();
                  bMPlay = true;
                }
              }
            } else {
              buCo = new Button(width/8, height/8 * 2, "Title", (windowWidth + windowHeight) / 25, (windowWidth + windowHeight) / 18, false);
              var dBa = dist(mouseX, mouseY, width/8, height/8 * 2);
              if (dBa < (windowWidth + windowHeight) / 18 && mouseIsPressed) {
                if (Continue_) {
                  buBa.click('c');
                  if (PlaySounds_) {
                    clickOff.play();
                  }
                }
              }
            }
          }
        }
      }
    }
    if (Phone) {
      elsewhere = true;
      background(53);
      textSize(25);
      fill(255);
      text("Hey! This game won't work on your phone! Mabye, you can try again in your browser?", width/2, height/2);
      for (var i = 0; i < f.length; i++) {
        f[i].show();
      }
    }
    if (windowWidth < 663) {
      background(53);
      text("The screen width " + windowWidth + " is too small", width/2, height/4);
    }
    if (windowHeight < 443) {
      background(53);
      text("The screen height " + windowHeight + " is too small", width/2, height/8);
    }
  }
}
function mouseClicked() {
  if (!elsewhere && title) {
    var dSo = dist(mouseX, mouseY, width/1.2, height/1.24);
    var dFu = dist(mouseX, mouseY, width/8, height / 1.24);
    if (dSo < (windowWidth + windowHeight) / 25) {
      if (PlaySounds_ == false) {
        clickOn.play();
        PlaySounds_ = true;
      } else {
        clickOff.play();
        PlaySounds_ = false;
      }
    }
    if (dFu < (windowWidth + windowHeight) / 25) {
      if (!fullscreen()) {
        if (PlaySounds_) {
          clickOn.play();
        }
        fullscreen(true);
      } else {
        if (PlaySounds_) {
          clickOff.play();
        }
        fullscreen(false);
      }
    }
  }
  if (!alive) {
    var dCo = dist(mouseX, mouseY, width/2, height/1.4);
    if (dCo < (windowWidth + windowHeight) / 18) {
      Continue_ = true;
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth - 7, windowHeight - 7);
  for (var i = 0; i < f.length; i++) {
    f[i].eaten(true);
  }
  eaten = 0;
}
