/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

(function(window, undefined) {
    var defaultindex = 0;
    var defaultVol = 0.5;
    var defaultisMuted = false;
    var defaultisPlay = false;
    var defaultplayMode = 1;
    var defaultisLoop = false;

    function playList() {
        this.srcList = new Array();
        this.musicList = new Array();
        this.currentMusic = new Object();

        this.init = function() {
            var aList = document.getElementsByTagName("a");
            var checker = new RegExp("\.mp3$");
            for (var eIndex in aList) {
                if (checker.exec(aList[eIndex].href)) {
                    this.srcList.push(aList[eIndex].href);
                    this.musicList.push(aList[eIndex].href);
                }
            }
            ;
            this.currentMusic.index = defaultindex;
            this.currentMusic.name = this.musicList[defaultindex];
            this.currentMusic.src = this.srcList[defaultindex];
        };

        this.getOne = function(index) {
            this.currentMusic.index = index;
            this.currentMusic.name = this.musicList[index];
            this.currentMusic.src = this.srcList[index];
            return this.currentMusic;
        };

        this.getNext = function() {
            this.currentMusic.index = (this.currentMusic.index + 1) % this.musicList.length;
            this.currentMusic.name = this.musicList[this.currentMusic.index];
            this.currentMusic.src = this.srcList[this.currentMusic.index];
            return this.currentMusic;
        };

        this.getPrev = function() {
            this.currentMusic.index = (this.currentMusic.index + this.musicList.length) % this.musicList.length;
            this.currentMusic.name = this.musicList[this.currentMusic.index];
            this.currentMusic.src = this.srcList[this.currentMusic.index];
            return this.currentMusic;
        };

        this.getRandom = function() {
            var tmpIndex = parseInt(Math.random() * this.musicList.length);
            while (tmpIndex === this.currentMusic.index)
                tmpIndex = parseInt(Math.random() * this.musicList.length);
            this.currentMusic.index = tmpIndex;
            this.currentMusic.name = this.musicList[tmpIndex];
            this.currentMusic.src = this.srcList[tmpIndex];
            return this.currentMusic;
        };

        this.isFirst = function() {
            return this.currentMusic.index === 0;
        };

        this.isLast = function() {
            return (this.currentMusic.index + 1) === this.srcList.length;
        };
    }
    ;

    function playPanel() {
        this.init = function() {
            this.initElement();
            this.initStyle();
        };

        this.initElement = function() {
            this.playerFrame = document.createElement("div");
            this.audioPlayer = document.createElement("audio");
            this.leftFrame = document.createElement("div");
            this.midFrame = document.createElement("div");
            this.midrightFrame = document.createElement("div");
            this.rightFrame = document.createElement("div");

            this.prevButton = document.createElement("img");
            this.playButton = document.createElement("img");
            this.nextButton = document.createElement("img");

            this.timeLine = document.createElement("div");
            this.timeButton = document.createElement("img");

            this.singleButton = document.createElement("img");
            this.listButton = document.createElement("img");
            this.randomButton = document.createElement("img");
            this.volSwitch = document.createElement("img");

            this.volLine = document.createElement("div");
            this.volButton = document.createElement("img");
        };

        this.initStyle = function() {
            this.playerFrame.setAttribute("style", "text-align: center;position: fixed;left: 0px;width: 1000px;bottom: 0px;border: 1px solid black;border-radius: 10px;");

            this.audioPlayer.autoplay = false;
            this.audioPlayer.controls = false;
            this.audioPlayer.volume = defaultVol;

            this.leftFrame.setAttribute("style", "float: left;");
            this.midFrame.setAttribute("style", "height: 64px;width: 412px;position: absolute;left: 218px;");
            this.midrightFrame.setAttribute("style", "height: 64px;position: absolute;left: 640px;");
            this.rightFrame.setAttribute("style", "height: 64px;width: 62px;position: absolute;left: 770px;");

            this.prevButton.setAttribute("src", "./buttons/prev.png");
            this.playButton.setAttribute("src", "./buttons/play.png");
            this.nextButton.setAttribute("src", "./buttons/next.png");

            this.timeLine.setAttribute("style", "cursor: pointer;margin-left: 6px;margin-top: 31px;height: 2px;width: 400px;background-color: black;float: left;");
            this.timeButton.setAttribute("src", "./buttons/time.png");
            this.timeButton.setAttribute("style", "cursor: pointer;margin-top: 26px;position: absolute;left: 6px;float: left;");

            this.singleButton.setAttribute("src", "./buttons/single.png");
            this.listButton.setAttribute("src", "./buttons/list.png");
            this.randomButton.setAttribute("src", "./buttons/random.png");
            this.volSwitch.setAttribute("src", "./buttons/vol_on.png");

            this.volLine.setAttribute("style", "cursor: pointer;margin-left: 6px;margin-top: 31px;height: 2px;width: 50px;background-color: black;float: left;");
            this.volButton.setAttribute("src", "./buttons/vol.png");
            this.volButton.setAttribute("style", "cursor: pointer;margin-top: 26px;position: absolute;left: 6px;float: left;");

            this.leftFrame.appendChild(this.prevButton);
            this.leftFrame.appendChild(this.playButton);
            this.leftFrame.appendChild(this.nextButton);

            this.midFrame.appendChild(this.timeLine);
            this.midFrame.appendChild(this.timeButton);

            this.midrightFrame.appendChild(this.singleButton);
            this.midrightFrame.appendChild(this.listButton);
            this.midrightFrame.appendChild(this.randomButton);
            this.midrightFrame.appendChild(this.volSwitch);

            this.rightFrame.appendChild(this.volLine);
            this.rightFrame.appendChild(this.volButton);

            document.body.appendChild(this.playerFrame);
        };

        this.switchToPause = function() {
            this.playButton.setAttribute("src", "./buttons/pause.png");
        };

        this.switchToPlay = function() {
            this.playButton.setAttribute("src", "./buttons/play.png");
        };

        this.swtichOn = function() {
            this.volSwitch.setAttribute("src", "./buttons/vol_on.png");
        };

        this.switchOff = function() {
            this.volSwitch.setAttribute("src", "./buttons/vol_off.png");
        };

        this.updateTime = function(timeP) {
            this.timeButton.style.left = (timeP * 400) + "px";
        };

        this.updateVol = function(volX) {
            this.volButton.style.left = volX;
        };
    }
    ;

    function playController() {
        this.init = function() {
            this.musicList = new playList();
            this.musicPanel = new playPanel();
            this.currentVol = defaultVol;
            this.isPlay = defaultisPlay;
            this.isMuted = defaultisMuted;
            this.playMode = defaultplayMode;
            this.isLoop = defaultisLoop;

            this.musicList.init();
            this.musicPanel.init();
        };

        this.play = function() {
            if (this.musicPanel.audioPlayer.src === "")
                this.musicPanel.audioPlayer.src = this.musicList.getOne(defaultindex).src;
            this.musicPanel.audioPlayer.play();
            this.setisPlay();
            this.musicPanel.switchToPause();
        };

        this.pause = function() {
            this.musicPanel.audioPlayer.pause();
            this.musicPanel.switchToPlay();
            this.setisPlay();
        };

        this.playMusic = function(src) {
            this.musicPanel.audioPlayer.src = src;
            this.play();
        };

        this.playPrev = function() {
            switch (this.playMode) {
                case 1:
                    this.playMusic(this.musicList.getPrev().src);
                    break;
                case 2:
                    this.playMusic(this.musicList.getRandom().src);
                    break;
                default:
                    break;
            }
            ;
        };

        this.playNext = function() {
            switch (this.playMode) {
                case 1:
                    this.playMusic(this.musicList.getNext().src);
                    break;
                case 2:
                    this.playMusic(this.musicList.getRandom().src);
                    break;
                default:
                    break;
            }
            ;
        };

        this.playRandom = function() {
            this.playMusic(this.musicList.getRandom().src);
        };

        this.setisPlay = function() {
            this.isPlay = (!this.isPlay);
        };

        this.volOn = function() {
            this.musicPanel.audioPlayer.volume = this.currentVol;
            this.musicPanel.swtichOn();
            this.setisMuted();
        };

        this.volOff = function() {
            this.currentVol = this.musicPanel.audioPlayer.volume;
            this.musicPanel.audioPlayer.volume = 0;
            this.musicPanel.switchOff();
            this.setisMuted();
        };

        this.setisMuted = function() {
            this.isMuted = (!this.isMuted);
        };

        this.setTime = function(timex) {
            this.musicPanel.audioPlayer.currentTime = this.musicPanel.audioPlayer.duration * 400 / timex;
        };

        this.getTime = function() {
            return this.musicPanel.audioPlayer.currentTime / this.musicPanel.audioPlayer.duration;
        };

        this.setVol = function(volx) {
            this.currentVol = volx / 50;
            this.musicPanel.audioPlayer.volume = this.currentVol;
        };
    }
    ;

    var initEventListener = function() {
        myMusicPlayer.prevButton.addEventListener("click", function() {
            if (myMusicPlayer.loopMode === 2)
                myMusicPlayer.playPrev();
            else
                myMusicPlayer.playRandom();
        }, false);

        myMusicPlayer.playButton.addEventListener("click", function() {
            if (myMusicPlayer.isPlay === false)
                myMusicPlayer.playerPlay();
            else
                myMusicPlayer.playerPause();
            myMusicPlayer.setIsPlay();
        }, false);

        myMusicPlayer.nextButton.addEventListener("click", function() {
            if (myMusicPlayer.loopMode === 2)
                myMusicPlayer.playNext();
            else
                myMusicPlayer.playRandom();
        }, false);

        myMusicPlayer.volumeButton.addEventListener("click", function() {
            if (myMusicPlayer.isMuted)
                myMusicPlayer.volOn();
            else
                myMusicPlayer.volOff();
            myMusicPlayer.setIsMuted();
        }, false);

        myMusicPlayer.audioPlayer.addEventListener("timeupdate", function() {
            myMusicPlayer.drawTimeLine(this.currentTime * 400 / this.duration);
        }, false);

        myMusicPlayer.audioPlayer.addEventListener("ended", function() {
            myMusicPlayer.playNext();
        }, false);

        /*myMusicPlayer.timeLine.addEventListener("mousemove", function(event) {
         console.warn(event.layerX);
         var tarX = event.layerX > 410 ? 400 : (event.layerX - 10);
         console.warn(tarX);
         myMusicPlayer.setTime(tarX * myMusicPlayer.audioPlayer.duration / 400);
         myMusicPlayer.drawTimeLine(tarX);
         }, false);*/
    };

    window.onload = function() {
        myMusicList = new playList();
        myMusicList.init();
        myMusicPlayer = new musicPlayer(myMusicList);
        myMusicPlayer.init();
        initEventListener();
    };
})(window);