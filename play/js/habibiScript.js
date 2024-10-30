document.addEventListener('DOMContentLoaded', function() {
    // Retrieve user and chat data
    const userId = Telegram.WebApp.initDataUnsafe.user.id;
    const userName = Telegram.WebApp.initDataUnsafe.user.first_name;
    const chatId = Telegram.WebApp.initDataUnsafe.chat.id;

    // Function to save score
    function saveScore(chatId, userId, score) {
        fetch('https://score-r55o.onrender.com/saveScore', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ chatId, userId, score })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Score saved:', data);
        })
        .catch(error => {
            console.error('Error saving score:', error);
        });
    }

    // Game elements
    var pageSplash = document.querySelector('#pageSplash');
    var pagePlayDelay = document.querySelector('#pagePlayDelay');
    var pagePlayArea = document.querySelector('#pagePlayArea');
    var pageGameMenu = document.querySelector('#pageGameMenu');
    var pageTutorial = document.querySelector('#pageTutorial');
    var pagePauseMenu = document.querySelector('#pagePauseMenu');
    var pageLevelPassed = document.querySelector('#pageLevelPassed');
    var pageYouLost = document.querySelector('#pageYouLost');
    var pageHighScore = document.querySelector('#pageHighScore');
    var pageAbout = document.querySelector('#pageAbout');

    var gmStatsTimeProgress = document.querySelector('#gmStatsTimeProgress');
    var gmStatsPauseBtn = document.querySelector('#gmStatsPauseBtn');
    var gmStatsScore = document.querySelector('#gmStatsScore');
    var gmStatsLvlNumb = document.querySelector('#gmStatsLvlNumb');
    var gameSpace = document.querySelector('#gameSpace');
    var gmStatsCurrentTapCount = document.querySelector('#gmStatsCurrentTapCount');
    var gmStatsTotalTapCount = document.querySelector('#gmStatsTotalTapCount');

    var newGameBtn = document.querySelector('#newGameBtn');
    var tutPgStartGameBtn = document.querySelector('#tutPgStartGameBtn');
    var lvlPssdContinueNextLvlBtn = document.querySelector('#lvlPssdContinueNextLvlBtn');
    var lvlLostTryAgainBtn = document.querySelector('#lvlLostTryAgainBtn');
    var pmRstrtLvlBtn = document.querySelector('#pmRstrtLvlBtn');
    var pmCntnuGmBtn = document.querySelector('#pmCntnuGmBtn');
    var abtPageBackBtn = document.querySelector('#abtPageBackBtn');

    // Tool box
    var toolsBox = {
        delay: function(fun, delayTime) {
            setTimeout(fun, delayTime);
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
        toggleAnimation: function(element, animationClass) {
            element.classList.add(animationClass);
            element.addEventListener('animationend', function() {
                element.classList.remove(animationClass);
            }, false);
        }
    };

    // Time engine
    var timeEngine = {
        progressTimer: null,
        timeLeft: 0,
        levelTime: 0,
        progressValue: 100,
        endingSound: false,
        start: function(time) {
            timeEngine.timeLeft = time;
            timeEngine.levelTime = time;
            timeEngine.progressTimer = setInterval(function(){timeEngine.updateTimeProgress()}, 100);
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
            gmStatsTimeProgress.style.width = timeEngine.progressValue + "%";
        },
        updateTimeProgress: function() {
            timeEngine.timeLeft = timeEngine.timeLeft - (1/10);
            timeEngine.progressValue = (timeEngine.timeLeft / timeEngine.levelTime) * 100;
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
    };

    // Circles engine
    var circlesEngine = {
        create: function(typeOfCircle, numOfCircles) {
            var element = document.createElement('div');
            switch (typeOfCircle.toLowerCase()) {
                case ".evil-circle":
                    element.setAttribute('class', 'tpbl-circle c-red evil-circle');
                    gameSpace.appendChild(element);
                    element.addEventListener('click', function(){
                        circlesEngine.evilCircleTap();
                    });
                    return element;
                case ".good-circle":
                    element.setAttribute('class', 'tpbl-circle c-blue good-circle');
                    gameSpace.appendChild(element);
                    element.addEventListener('click', function(){
                        circlesEngine.goodCircleTap(typeOfCircle, numOfCircles);
                    });
                    return element;
                default:
                    return null;
            }
        },
        destroy: function(circle){
            Array.from(circle).forEach(function(element){
                element.parentNode.removeChild(element);
            });
        },
        randomPosition: function(circle){
            var gameSpcWidth = gameSpace.offsetWidth;
            var gmSpcHeight = gameSpace.offsetHeight;
            var tpblCircleWidth = circle.offsetWidth;
            var tpblCircleHeight = circle.offsetHeight;
            circle.style.left = toolsBox.gnrtRndmNum(tpblCircleWidth, (gameSpcWidth - tpblCircleWidth)) + "px";
            circle.style.top = toolsBox.gnrtRndmNum(tpblCircleHeight, (gmSpcHeight - tpblCircleHeight)) + "px";
        },
        add: function(typeOfCircle, numOfCircles) {
            if (document.querySelectorAll(typeOfCircle).length > 0) {
                var circle = document.querySelectorAll(typeOfCircle);
                circlesEngine.destroy(circle);
            }
            if (numOfCircles) {
                for (var i = 0; i < numOfCircles; i++) {
                    var circle = circlesEngine.create(typeOfCircle, numOfCircles);
                    circlesEngine.randomPosition(circle);
                    circlesEngine.addWithDelay(i, circle, typeOfCircle);
                }
            } else {
                var circle = circlesEngine.create(typeOfCircle, numOfCircles);
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
            var evilCircles = document.querySelectorAll('.evil-circle');
            if (evilCircles.length > 0) {
                circlesEngine.add('.evil-circle', evilCircles.length);
            }
        },
        evilCircleTap: function(){
            gameEngine.evilCircleTap();
        }
    };

    // Game engine
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

            toolsBox.hidePage(pageGameMenu);
            toolsBox.showPage(pagePlayArea);

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

            saveScore(chatId, userId, gameEngine.score);
            
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
        },
        showBonusScore: function() {
            console.log('You got ' + Math.round(timeEngine.timeLeft) * 10 + " extra score because you finished " + timeEngine.timeLeft + " seconds before the time!");
            gameEngine.updateBonusScore(Math.round(timeEngine.timeLeft, 10) * 10);
            if (gameEngine.bonusScore > 0) {
                lvlPssdBonusScore.innerHTML = "Bonus +" + gameEngine.bonusScore;
            }
            gameEngine.score += gameEngine.bonusScore;
        }
    };

    // Levels engine
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
    };

    // Audio pool
    var audioPool = {
        sounds: [
            { sound: "circleAppear", preaload: true, volume: 1, loop: false },
            { sound: "touchBlue", preaload: true, volume: 0.5, loop: false },
            { sound: "touchRed", preaload: true, volume: 1, loop: false },
            { sound: "levelPassed", preload: true, volume: 1, loop: false },
            { sound: "levelLost", preload: true, volume: 1, loop: false },
            { sound: "buttonTap", preload: true, volume: 1, loop: false },
            { sound: "delayCount", preload: true, volume: 1, loop: false },
            { sound: "timeAlmostUp", preload: true, volume: 0.5, loop: true }
        ],
        createAudioPlayer: function(element) {
            element.audioPlayer = document.createElement('audio');
            var mp3Source = document.createElement('source');
            var oggSource = document.createElement('source');
            var mp3Link = "sounds/mp3/" + element.sound + ".mp3";
            var oggLink = "sounds/ogg/" + element.sound + ".ogg";
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
    };

    audioPool.addSounds();

    // Event listeners
    document.ontouchmove = function(e) {
        e.preventDefault();
    };

    tutPgStartGameBtn.addEventListener('click', function(){
        audioPool.playSound(audioPool.sounds[5]);
        gameEngine.stop();
        toolsBox.hidePage(pageTutorial);
        toolsBox.showPage(pagePlayDelay);
        toolsBox.delay(function() {
            toolsBox.showPage(pagePlayArea);
            gameEngine.startLevel();
        }, 1500);
    });

    lvlPssdContinueNextLvlBtn.addEventListener('click', function() {
        audioPool.playSound(audioPool.sounds[5]);
        toolsBox.hidePage(pageLevelPassed);
        toolsBox.showPage(pagePlayDelay);
        toolsBox.delay(function() {
            toolsBox.showPage(pagePlayArea);
            gameEngine.startLevel();
        }, 1500);
    });

    lvlLostTryAgainBtn.addEventListener('click', function() {
        audioPool.playSound(audioPool.sounds[5]);
        toolsBox.hidePage(pageYouLost);
        toolsBox.showPage(pageGameMenu);
        gameEngine.stop();
    });

    gmStatsPauseBtn.addEventListener('click', function() {
        audioPool.playSound(audioPool.sounds[5]);
        gameEngine.pause();
        toolsBox.showPage(pagePauseMenu);
        toolsBox.hidePage(pagePlayArea);
        lvlPausedScore.innerHTML = gameEngine.score;
    });

    pmRstrtLvlBtn.addEventListener('click', function() {
        audioPool.playSound(audioPool.sounds[5]);
        toolsBox.showPage(pageGameMenu);
        toolsBox.hidePage(pagePauseMenu);
        gameEngine.stop();
    });

    pmCntnuGmBtn.addEventListener('click', function() {
        audioPool.playSound(audioPool.sounds[5]);
        toolsBox.showPage(pagePlayArea);
        toolsBox.hidePage(pagePauseMenu);
        gameEngine.resume();
    });

    abtPageBackBtn.addEventListener('click', function() {
        audioPool.playSound(audioPool.sounds[5]);
        toolsBox.showPage(pageGameMenu);
        toolsBox.hidePage(pageAbout);
    });

    newGameBtn.addEventListener('click', function() {
        audioPool.playSound(audioPool.sounds[5]);
        gameEngine.reset();
        gameEngine.startLevel();
    });

    // Initialize game
    toolsBox.hidePage(pageSplash);
    toolsBox.showPage(pageGameMenu);
});
