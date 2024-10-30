// Add these variables at the top of your file
var chatId = '';
var userId = '';

// Add this function to initialize Telegram Web App data
function initTelegramData() {
  if (typeof window !== 'undefined' && window.Telegram && window.Telegram.WebApp) {
    var webAppData = window.Telegram.WebApp.initDataUnsafe;
    chatId = webAppData.chat_instance || '';
    userId = webAppData.user ? webAppData.user.id.toString() : '';
    console.log('Telegram Web App data initialized:', { chatId, userId });
  } else {
    console.log('Telegram Web App not available');
  }
}

// Call this function when your script loads
document.addEventListener('DOMContentLoaded', function() {
  initTelegramData();
  // Do after the document fully loaded
});

// ===============================================================
// ================== SHOW/HIDE PAGES - ADMIN ====================
// ===============================================================
var adminCPItems = document.querySelector('.admin-cp-items');
var adminCPBtn = document.querySelector('.admin-cp-button');
adminCPBtn.addEventListener('click', function(){ adminCPItems.classList.toggle('hidden'); }, false);

// ---------------------- Pages ---------------------- //

// Splash Page
var pageSplash = document.querySelector('#pageSplash');
var splashScreenTxt = document.querySelector('#splashScreenTxt');
var splashScreenLogo = document.querySelector('#splashScreenLogo');

// Play Delay Page
var pagePlayDelay = document.querySelector('#pagePlayDelay');
var palyDelayCont = document.querySelector('#palyDelayCont');
var playDelayNum = document.querySelector('#playDelayNum');

// Play Area Page
var pagePlayArea = document.querySelector('#pagePlayArea');
var gmStatsTimeProgress = document.querySelector('#gmStatsTimeProgress');
var gmStatsPauseBtn = document.querySelector('#gmStatsPauseBtn');
var gmStatsScore = document.querySelector('#gmStatsScore');
var gmStatsLvlNumb = document.querySelector('#gmStatsLvlNumb');
var gameSpace = document.querySelector('#gameSpace');
var gmStatsCurrentTapCount = document.querySelector('#gmStatsCurrentTapCount');
var gmStatsTotalTapCount = document.querySelector('#gmStatsTotalTapCount');

// Game Menu Page
var pageGameMenu = document.querySelector('#pageGameMenu');
var newGameBtn = document.querySelector('#newGameBtn');
var highScoresBtn = document.querySelector('#highScoresBtn');
var aboutBtn = document.querySelector('#aboutBtn');

// Tutorial Page
var pageTutorial = document.querySelector('#pageTutorial');
var tutPgStartGameBtn = document.querySelector('#tutPgStartGameBtn');

// Pause Menu Page
var pagePauseMenu = document.querySelector('#pagePauseMenu');
var lvlPausedScore = document.querySelector('#lvlPausedScore');
var pmRstrtLvlBtn = document.querySelector('#pmRstrtLvlBtn');
var pmCntnuGmBtn = document.querySelector('#pmCntnuGmBtn');

// Level passed page
var pageLevelPassed = document.querySelector('#pageLevelPassed');
var lvlPssdTitle = document.querySelector('#lvlPssdTtl');
var lvlPssdScore = document.querySelector('#lvlPssdScore');
var lvlPssdBonusScore = document.querySelector('#lvlPssdBonusScore');
var lvlPssdContinueNextLvlBtn = document.querySelector('#lvlPssdContinueNextLvlBtn');

// You lost page
var pageYouLost = document.querySelector('#pageYouLost');
var lvlLostScore = document.querySelector('#lvlLostScore');
var lvlLostBestScore = document.querySelector('#lvlLostBestScore');
var lvlLostTtl = document.querySelector('#lvlLostTtl');
var lvlLostTryAgainBtn = document.querySelector('#lvlLostTryAgainBtn');
var lvlLostIcon = document.querySelector('#lvlLostIcon');

// High Score Page
var pageHighScore = document.querySelector('#pageHighScore');
var lvlLostNewHighScore = document.querySelector('#lvlLostNewHighScore');

// About Page
var pageAbout = document.querySelector('#pageAbout');
var abtPageBackBtn = document.querySelector('#abtPageBackBtn');

// ------- Show Hide Pages Control Panel ------- //
var playDelayPageToggle = document.getElementById('playDelayPageToggle');
var playAreaPageToggle = document.getElementById('playAreaPageToggle');
var gameMenuPageToggle = document.getElementById('gameMenuPageToggle');
var tutorialPageToggle = document.getElementById('tutorialPageToggle');
var pauseMenuPageToggle = document.getElementById('pauseMenuPageToggle');
var levelPassedPageToggle = document.getElementById('levelPassedPageToggle');
var youLostPageToggle = document.getElementById('youLostPageToggle');
var highScorePageToggle = document.getElementById('highScorePageToggle');
var aboutPageToggle = document.getElementById('aboutPageToggle');
var splashPageToggle = document.getElementById('splashPageToggle');

var pagesTogglesArray = [
  playAreaPageToggle, gameMenuPageToggle, tutorialPageToggle, playDelayPageToggle,
  pauseMenuPageToggle, levelPassedPageToggle,
  youLostPageToggle, highScorePageToggle, aboutPageToggle, splashPageToggle
]
var pagesArray = [
  pagePlayArea, pageGameMenu, pageTutorial, pagePlayDelay,
  pagePauseMenu, pageLevelPassed,
  pageYouLost, pageHighScore, pageAbout, pageSplash
]

// show/hide pages if the checkbox is checked
togglePage = function(pageToggle, page) {
  if (pageToggle.checked) {
    toolsBox.showPage(page);
  } else {
    toolsBox.hidePage(page);
  }
}

// on click event to all toggles on the page to show/hide pages
for (var i = 0; i < pagesTogglesArray.length; i++) {
  pagesTogglesArray[i].addEventListener('click', function(){
    for (var i = 0; i < pagesTogglesArray.length; i++) {
      togglePage(pagesTogglesArray[i], pagesArray[i]);
    }
  }, false);
}

// ------------- GENERAL FUNCTIONS ------------- //
toolsBox = {
  delay: function(fun, delayTime) {
    var delayAction = setTimeout(fun, delayTime);
  },
  gnrtRndmNum: function(minNumb, maxNumb) {
    return Math.floor(Math.random() * (maxNumb - minNumb + 1)) + minNumb;
  },
  showPage: function(page) {
    page.style.display = "block";
  },
  hidePage: function(page) {
    page.style.display = "none";
  },
  hideSplashScreen: function() {
    splashScreenTxt.classList.add('fadeOut-animation');
    splashScreenLogo.classList.add('fadeOut-animation');
    toolsBox.delay(function() {
      toolsBox.showPage(pageGameMenu);
      toolsBox.hidePage(pageSplash);
    }, 1500);
  },
  onClickNTouchstart: function(element, fun) {
    element.addEventListener('click', fun, false);
    element.addEventListener('touchstart', fun, false);
  },
  toggleAnimation: function(element, animationClass) {
    element.classList.add(animationClass);
    element.addEventListener('animationend', function() {
      element.classList.remove(animationClass);
    }, false);
  },
  windowSize: {
    width: window.innerWidth || document.body.clientWidth,
    height: window.innerHeight || document.body.clientHeight
  },
  pagePlayDelay: {
    updateNumber: function() {
      toolsBox.toggleAnimation(playDelayNum, 'grow-animation');
      playDelayNum.innerHTML = parseInt(playDelayNum.innerHTML, 10) - 1;
    },
    start: function() {
      toolsBox.toggleAnimation(playDelayNum, 'grow-animation');
      var timer = setInterval(function(){
        if (playDelayNum.innerHTML > 1) {
          audioPool.playSound(delayCount);
          toolsBox.pagePlayDelay.updateNumber();
        } else {
          clearInterval(timer);
          toolsBox.hidePage(pagePlayDelay);
          playDelayNum.innerHTML = 3;
        }
      },500);
    }
  },
  pageAbout: {
    creditsAnimation:'',
    creditsCont: document.querySelector('.credits-cont'),
    moveCredits: function() {
      var creditsCont = toolsBox.pageAbout.creditsCont;
      toolsBox.pageAbout.creditsAnimation = window.setInterval(function() {
        creditsCont.scrollTop += 2;
        if (creditsCont.scrollTop === creditsCont.scrollHeight-creditsCont.offsetHeight) {
          clearInterval(toolsBox.pageAbout.creditsAnimation);
          creditsCont.scrollTop = 0;
          toolsBox.pageAbout.moveCredits();
        }
      }, 40)
    },
    stopMovingCredits: function() {
      clearInterval(toolsBox.pageAbout.creditsAnimation);
    }
  }
}

var timeEngine = {
  progressTimer: '',
  timeLeft: 0,
  levelTime: 0,
  progressValue: 100,
  endingSound: false,
  start: function(time) {
    timeEngine.timeLeft = time;
    timeEngine.progressTimer = setInterval(function(){timeEngine.updateTimeProgress(time)}, 100);
  },
  stop: function() {
    clearInterval(timeEngine.progressTimer);
    gmStatsTimeProgress.classList.remove('switchColors-animation');
    if (timeEngine.endingSound) {
      timeEngine.endingSound = false;
      audioPool.stopSound(timeAlmostUp);
    }
  },
  resume: function() {
    timeEngine.start(timeEngine.timeLeft);
  },
  reset: function() {
    timeEngine.stop();
    timeEngine.timeLeft = 0;
    timeEngine.progressValue = 100;
    timeEngine.progressValue = timeEngine.progressValue;
    gmStatsTimeProgress.style.width = timeEngine.progressValue + "%";
  },
  updateTimeProgress: function(time) {
    timeEngine.timeLeft = timeEngine.timeLeft - (1/10);
    timeEngine.progressValue = timeEngine.timeLeft * 100 / gameEngine.levelTime;
    gmStatsTimeProgress.style.width = timeEngine.progressValue + "%";
    timeEngine.checkTime();
  },
  checkTime: function() {
    if (timeEngine.timeLeft <= 0) {
      timeEngine.stop();
      gameEngine.timesUp();
      timeEngine.endingSound = false;
      audioPool.stopSound(timeAlmostUp);
    }
    if (timeEngine.timeLeft < 4 && timeEngine.timeLeft > 0) {
      gmStatsTimeProgress.classList.add('switchColors-animation');
      if (!timeEngine.endingSound) {
        timeEngine.endingSound = true;
        audioPool.playSound(timeAlmostUp);
      }
    }
  }
}

var circlesEngine = {
  create: function(typeOfCircle, numOfCircles) {
    var element = document.createElement('div');

    switch (typeOfCircle.toLowerCase()) {
      case ".evil-circle":
        element.setAttribute('class', 'tpbl-circle c-red evil-circle');
        gameSpace.appendChild(element);
        toolsBox.onClickNTouchstart(element, function(){
          circlesEngine.evilCircleTap();
        });
        return element;
        break;

      case ".good-circle":
        element.setAttribute('class', 'tpbl-circle c-blue good-circle');
        gameSpace.appendChild(element);
        toolsBox.onClickNTouchstart(element, function(){
          circlesEngine.goodCircleTap(typeOfCircle, numOfCircles);
        });
        return element;
        break;

      default:
    }
  },
  destroy: function(circle){
    Array.from(circle).forEach(function(element){
      element.parentNode.removeChild(element);
    });
  },
  randomPosition: function(circle){
    gameSpcWidth = gameSpace.offsetWidth;
    gmSpcHeight = gameSpace.offsetHeight;
    tpblCircleWidth = circle.offsetWidth;
    tpblCircleHeight = circle.offsetHeight;

    circle.style.left = toolsBox.gnrtRndmNum(tpblCircleWidth, (gameSpcWidth - tpblCircleWidth)) + "px";
    circle.style.top = toolsBox.gnrtRndmNum(tpblCircleHeight, (gmSpcHeight - tpblCircleHeight)) + "px";
  },
  add: function(typeOfCircle, numOfCircles) {
    if (document.querySelectorAll(typeOfCircle).length > 0) {
      circle = document.querySelectorAll(typeOfCircle);
      circlesEngine.destroy(circle);
    }
    if (numOfCircles) {
      for (var i = 0; i < numOfCircles; i++) {
        circle = circlesEngine.create(typeOfCircle, numOfCircles);
        circlesEngine.randomPosition(circle);
        circlesEngine.addWithDelay(i, circle, typeOfCircle);
      }
    } else {
      circle = circlesEngine.create(typeOfCircle, numOfCircles);
      circlesEngine.randomPosition(circle);
    }
  },
  addWithDelay: function(i, circle, typeOfCircle) {
    setTimeout(function() {
      circle.classList.add('grow-animation');
      audioPool.playSound(circleAppear);
    }, i*50);
  },
  goodCircleTap: function(typeOfCircle, numOfCircles){
    gameEngine.goodCircleTap();
    circlesEngine.add(typeOfCircle, numOfCircles);

    evilCircles = document.querySelectorAll('.evil-circle');
    if (evilCircles.length > 0) {
      circlesEngine.add('.evil-circle', evilCircles.length);
    }
  },
  evilCircleTap: function(){
    gameEngine.evilCircleTap();
  },
  goodCirclesTapCount: 0,
  redCirclesTapCount: 0
}

var gameEngine = { 
  levelNum: 1,
  levelTime: 10,
  tapNum: 0,
  tapsGoal: 10,
  tapValue: 13,
  score: 0,
  goodCirclesCount: 1,
  evilCirclesCount: 4,
  highestScore: 0,
  bonusScore: 0,
  updateScore: function(amount) {
    gameEngine.score = amount;
    gmStatsScore.innerHTML = gameEngine.score;
  },
  updateLevel: function(levelNum) {
    gameEngine.levelNum = levelNum;
    gmStatsLvlNumb.innerHTML = "Level " + gameEngine.levelNum;
  },
  updateTapCount: function(tapNum, tapsGoal) {
    gameEngine.tapNum = tapNum;
    gmStatsCurrentTapCount.innerHTML = gameEngine.tapNum;
    gameEngine.tapsGoal = tapsGoal;
    gmStatsTotalTapCount.innerHTML = "/" + gameEngine.tapsGoal;
  },
  
  updateLevelTime: function(time) {
    gameEngine.levelTime = time;
  },
  updateBonusScore: function(bonus) {
    gameEngine.bonusScore = bonus;
  },
  reset: function() {
    levelsEngine.resetLevels();
    gameEngine.updateScore(0);
    gameEngine.updateLevel(levelsEngine.levels[0].levelNum);
    gameEngine.updateLevelTime(levelsEngine.levels[0].time);
    gameEngine.updateTapCount(0, levelsEngine.levels[0].tapsGoal);
    gameEngine.tapValue = levelsEngine.levels[0].tapValue;
    gameEngine.goodCirclesCount = levelsEngine.levels[0].goodCirclesCount;
    gameEngine.evilCirclesCount = levelsEngine.levels[0].evilCirclesCount;
  },
  start: function(score, level, time, tapsGoal, tapValue, goodCirclesCount, evilCirclesCount) {
    gameEngine.updateScore(score);
    gameEngine.updateLevel(level);
    gameEngine.updateLevelTime(time);
    gameEngine.updateTapCount(0, tapsGoal);
    gameEngine.tapValue = tapValue;
    gameEngine.goodCirclesCount = goodCirclesCount;
    gameEngine.evilCirclesCount = evilCirclesCount;

    circlesEngine.add('.good-circle', goodCirclesCount);
    circlesEngine.add('.evil-circle', evilCirclesCount);

    timeEngine.reset();
    timeEngine.start(time);

    console.log('Game Started! 🏁');
  },
  startLevel: function() {
    gameEngine.start(
      gameEngine.score,
      levelsEngine.levels[gameEngine.levelNum-1].levelNum,
      levelsEngine.levels[gameEngine.levelNum-1].time,
      levelsEngine.levels[gameEngine.levelNum-1].tapsGoal,
      levelsEngine.levels[gameEngine.levelNum-1].tapValue,
      levelsEngine.levels[gameEngine.levelNum-1].goodCirclesCount,
      levelsEngine.levels[gameEngine.levelNum-1].evilCirclesCount
    );
  },
  checkTapsCount: function() {
    if (gameEngine.tapNum >= gameEngine.tapsGoal) {
      if (timeEngine.timeLeft > 0) {
        gameEngine.showBonusScore();
      }
      gameEngine.levelPassed();
    }
  },
  goodCircleTap: function() {
    gameEngine.tapNum = gameEngine.tapNum + 1;
    gameEngine.updateScore(gameEngine.score + gameEngine.tapValue);
    gameEngine.updateTapCount(gameEngine.tapNum, gameEngine.tapsGoal);
    gameEngine.checkTapsCount();
    toolsBox.toggleAnimation(gmStatsCurrentTapCount, 'burst-animation');
    audioPool.playSound(touchBlue);
  },
  evilCircleTap: function() {
    gameEngine.deadlyTap();
    audioPool.playSound(touchRed);
  },
  pause: function() {
    timeEngine.stop();
  },
  resume: function() {
    timeEngine.resume();
  },
  stop: function() {
    timeEngine.stop();
    console.log('game STOPPED!');
    gameEngine.reset();
  },
  gameLost: function() {
    audioPool.playSound(levelLost);
    lvlLostScore.innerHTML = gameEngine.score;
    toolsBox.hidePage(pagePlayArea);
    toolsBox.showPage(pageYouLost);
    gameEngine.stop();
    gameEngine.submitScore(); // Add this line to submit the score
  },
  deadlyTap: function() {
    console.log('You lost! 🐜');
    lvlLostTtl.innerHTML = "You Lost";
    if (lvlLostIcon.classList.contains('times-up-icon')) {
      lvlLostIcon.classList.remove('times-up-icon');
      lvlLostIcon.classList.add('you-lost-icon');
    }
    gameEngine.gameLost();
  },
  timesUp: function() {
    console.log('time is up! ⏱');
    lvlLostTtl.innerHTML = "Time's Up";
    if (lvlLostIcon.classList.contains('you-lost-icon')) {
      lvlLostIcon.classList.remove('you-lost-icon');
      lvlLostIcon.classList.add('times-up-icon');
    }
    gameEngine.gameLost();
  },
  levelPassed: function() {
    console.log('Level passed! 💃');
    audioPool.playSound(levelPassed);
    timeEngine.stop();

    lvlPssdTtl.innerHTML = "Level " + gameEngine.levelNum;
    if (gameEngine.bonusScore > 0) {
      lvlPssdScore.innerHTML = gameEngine.score - gameEngine.bonusScore;
    } else {
      lvlPssdScore.innerHTML = gameEngine.score;
    }

    gameEngine.updateLevel(gameEngine.levelNum + 1);

    levelsEngine.addNewLevel(
      gameEngine.levelNum,
      gameEngine.levelTime + 1,
      gameEngine.tapValue + 2,
      gameEngine.tapsGoal + 1,
      1,
      gameEngine.evilCirclesCount + 1
    );

    toolsBox.hidePage(pagePlayArea);
    toolsBox.showPage(pageLevelPassed);

    gameEngine.submitScore(); // Submit the score after each level
  },
  showBonusScore: function() {
    console.log('You got '
    + Math.round(timeEngine.timeLeft) * 10
    + " extra score because you finished "
    + timeEngine.timeLeft
    + " seconds before the time!" );
    gameEngine.updateBonusScore(Math.round(timeEngine.timeLeft, 10) * 10);
    if (gameEngine.bonusScore > 0) {
      lvlPssdBonusScore.innerHTML = "Bonus +" + gameEngine.bonusScore;
    }
    gameEngine.score += gameEngine.bonusScore;
  },
  submitScore: function() {
    if (!chatId || !userId) {
      console.log('Chat ID or User ID not available');
      return;
    }

    fetch('https://score-r55o.onrender.com/saveScore', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chatId: chatId,
        userId: userId,
        score: gameEngine.score
      })
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to save score');
      }
      return response.text();
    })
    .then(data => {
      console.log('Score saved successfully:', data);
    })
    .catch(error => {
      console.error('Error saving score:', error);
    });
  }
}

var levelsEngine = {
  levels : [
    {
      levelNum: 1,
      time: 7,
      tapValue: 3,
      tapsGoal: 5,
      goodCirclesCount: 1,
      evilCirclesCount: 4
    }
  ],
  addNewLevel: function(lN, t, tV, tG, gC, eC) {
    levelsEngine.levels.push({
      levelNum: lN,
      time: t,
      tapValue: tV,
      tapsGoal: tG,
      goodCirclesCount: gC,
      evilCirclesCount: eC
    });
  },
  resetLevels: function() {
    levelsEngine.levels = [];
    levelsEngine.addNewLevel(1, 7, 3, 5, 1, 4);
  }
}

var audioPool = {
  sounds: [
    circleAppear = { sound: "circleAppear", preaload: true, volume: 1, loop: false },
    touchBlue = { sound: "touchBlue", preaload: true, volume: 0.5, loop: false },
    touchRed = { sound: "touchRed", preaload: true, volume: 1, loop: false },
    levelPassed = { sound: "levelPassed", preload: true, volume: 1, loop: false },
    levelLost = { sound: "levelLost", preload: true, volume: 1, loop: false },
    buttonTap = { sound: "buttonTap", preload: true, volume: 1, loop: false },
    delayCount = { sound: "delayCount", preload: true, volume: 1, loop: false },
    timeAlmostUp = { sound: "timeAlmostUp", preload: true, volume: 0.5, loop: true }
  ],
  createAudioPlayer: function(element) {
    element.audioPlayer = document.createElement('audio');

    mp3Source = document.createElement('source');
    oggSource = document.createElement('source');

    mp3Link = "sounds/mp3/" + element.sound + ".mp3";
    oggLink = "sounds/ogg/" + element.sound + ".ogg";

    mp3Source.setAttribute('type', 'audio/mpeg');
    oggSource.setAttribute('type','audio/ogg');
    mp3Source.setAttribute('src', mp3Link);
    oggSource.setAttribute('src', oggLink);

    element.audioPlayer.appendChild(mp3Source);
    element.audioPlayer.appendChild(oggSource);
    document.body.appendChild(element.audioPlayer);

    element.audioPlayer.volume = element.volume;

    if (element.preload) {
      element.audioPlayer.load();
    }
    if (element.loop) {
      element.audioPlayer.loop = true;
    }
  },
  addSounds: function() {
    for (var i = 0; i < audioPool.sounds.length; i++) {
      audioPool.createAudioPlayer(audioPool.sounds[i]);
    }
  },
  playSound: function(soundName) {
    soundName.audioPlayer.currentTime = 0;
    soundName.audioPlayer.play();
  },
  stopSound: function(soundName) {
    soundName.audioPlayer.pause();
    soundName.audioPlayer.currentTime = 0;
  }
}

audioPool.addSounds();

document.ontouchmove = function(e) {
  e.preventDefault();
}

toolsBox.onClickNTouchstart(tutPgStartGameBtn, function(){
  audioPool.playSound(buttonTap);
  gameEngine.stop();

  toolsBox.hidePage(pageTutorial);
  toolsBox.showPage(pagePlayDelay);
  toolsBox.pagePlayDelay.start();

  toolsBox.delay( function() {
    toolsBox.showPage(pagePlayArea)
  }, 1500);
  toolsBox.delay(gameEngine.startLevel, 1500);
});

toolsBox.onClickNTouchstart(lvlPssdContinueNextLvlBtn, function() {
  audioPool.playSound(buttonTap);
  toolsBox.hidePage(pageLevelPassed);
  toolsBox.showPage(pagePlayDelay);
  toolsBox.pagePlayDelay.start();

  toolsBox.delay( function() {
    toolsBox.showPage(pagePlayArea)
  }, 1500);
  toolsBox.delay(gameEngine.startLevel, 1500);
  gameEngine.submitScore(); // Add this line to submit the score when continuing to next level
});

lvlLostTryAgainBtn.addEventListener('click', function() {
  audioPool.playSound(buttonTap);
  toolsBox.hidePage(pageYouLost);
  toolsBox.showPage(pageGameMenu);
  gameEngine.stop();
  gameEngine.submitScore(); // Add this line to submit the score when trying again
}, false);

toolsBox.onClickNTouchstart(gmStatsPauseBtn, function() {
  audioPool.playSound(buttonTap);
  gameEngine.pause();
  toolsBox.showPage(pagePauseMenu);
  toolsBox.hidePage(pagePlayArea);
  lvlPausedScore.innerHTML = gameEngine.score;
});

toolsBox.onClickNTouchstart(pmRstrtLvlBtn, function() {
  audioPool.playSound(buttonTap);
  toolsBox.showPage(pageGameMenu);
  toolsBox.hidePage(pagePauseMenu);
  gameEngine.stop();
});

toolsBox.onClickNTouchstart(pmCntnuGmBtn, function() {
  audioPool.playSound(buttonTap);
  toolsBox.showPage(pagePlayArea);
  toolsBox.hidePage(pagePauseMenu);
  gameEngine.resume();
});

abtPageBackBtn.addEventListener('click', function() {
  audioPool.playSound(buttonTap);
  toolsBox.showPage(pageGameMenu);
  toolsBox.hidePage(pageAbout);
  toolsBox.pageAbout.stopMovingCredits();
}, false);

newGameBtn.addEventListener('click', function() {
  audioPool.playSound(buttonTap);
  toolsBox.showPage(pageTutorial);
  toolsBox.hidePage(pageGameMenu);
}, false);

aboutBtn.addEventListener('click', function() {
  audioPool.playSound(buttonTap);
  toolsBox.showPage(pageAbout);
  toolsBox.hidePage(pageGameMenu);
  toolsBox.pageAbout.moveCredits();
}, false);

toolsBox.hideSplashScreen();
