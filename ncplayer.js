/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

(function(window, undefined) {
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
    }
    ;
    function musicPlayer(list) {
        this.musicList = list;
        this.loopMode = 0;
        this.isPlay = false;
        this.isLoop = false;
        this.isMuted = false;
        this.currentVolume = 0.5;

        this.playMusic = function(src) {
            this.audioPlayer.src = src;
            this.playerPlay();
        };

        this.playerPlay = function() {
            if (this.audioPlayer.src === "")
                this.audioPlayer.src = this.musicList.getOne(0).src;
            this.audioPlayer.play();
            this.playButton.setAttribute("src", "./buttons/pause.png");
        };

        this.playerPause = function() {
            this.audioPlayer.pause();
            this.playButton.setAttribute("src", "./buttons/play.png");
        };

        this.setIsPlay = function() {
            this.isPlay = !(this.isPlay);
        };

        this.setTime = function(time) {
            this.audioPlayer.currentTime = time;
            if (time < this.audioPlayer.duration)
                this.audioPlayer.play();
        };

        this.setVol = function(vol) {
            this.audioPlayer.volume = vol;
        };

        this.volOff = function() {
            this.currentVolume = this.audioPlayer.volume;
            this.audioPlayer.volume = 0;
            this.volumeButton.setAttribute("src", "./buttons/volume_off.png");
        };

        this.volOn = function() {
            this.audioPlayer.volume = this.currentVolume;
            this.volumeButton.setAttribute("src", "./buttons/volume_on.png");
        };

        this.setIsMuted = function() {
            this.isMuted = !(this.isMuted);
        };

        this.playNext = function() {
            this.playMusic(this.musicList.getNext().src);
        };

        this.playPrev = function() {
            this.playMusic(this.musicList.getPrev().src);
        };

        this.playRandom = function() {
            this.playMusic(this.musicList.getRandom().src);
        };

        this.drawTimeLine = function(currentTime) {
            var timeLineCtx = this.timeLine.getContext('2d');
            timeLineCtx.clearRect(0, 0, this.timeLine.width, this.timeLine.height);

            timeLineCtx.beginPath();
            timeLineCtx.moveTo(10, this.timeLine.height / 2);
            timeLineCtx.lineTo(this.timeLine.width - 10, this.timeLine.height / 2);
            timeLineCtx.closePath();
            timeLineCtx.stroke();

            timeLineCtx.fillStyle = "#000000";
            timeLineCtx.beginPath();
            timeLineCtx.arc(currentTime + 10, this.timeLine.height / 2, 5, 0, Math.PI * 2, true);
            timeLineCtx.closePath();
            timeLineCtx.fill();
        };

        this.drawVolumeBar = function(currentVol) {
            var volumeBarCtx = this.volumeBar.getContext('2d');
            volumeBarCtx.clearRect(0, 0, this.volumeBar.width, this.volumeBar.height);

            volumeBarCtx.beginPath();
            volumeBarCtx.moveTo(5, this.volumeBar.height / 2);
            volumeBarCtx.lineTo(this.volumeBar.width - 5, this.volumeBar.height / 2);
            volumeBarCtx.closePath();
            volumeBarCtx.stroke();

            volumeBarCtx.fillStyle = "#000000";
            volumeBarCtx.beginPath();
            volumeBarCtx.arc(currentVol + 5, this.volumeBar.height / 2, 5, 0, Math.PI * 2, true);
            volumeBarCtx.closePath();
            volumeBarCtx.fill();
        };

        this.initBar = function() {
            this.drawTimeLine(0);
            this.drawVolumeBar(this.currentVolume * 50);
        };

        this.init = function() {
            this.playerFrame = document.createElement("div");
            this.audioPlayer = document.createElement("audio");
            this.prevButton = document.createElement("img");
            this.nextButton = document.createElement("img");
            this.playButton = document.createElement("img");
            this.timeLine = document.createElement("canvas");
            this.volumeButton = document.createElement("img");
            this.volumeBar = document.createElement("canvas");
            this.playerFrame.setAttribute("style", "text-align: center;position: fixed;left: 0px;bottom: 0px;border: 1px solid black;border-radius: 10px;");

            this.audioPlayer.autoplay = false;
            this.audioPlayer.controls = false;
            this.audioPlayer.volume = this.currentVolume;

            this.prevButton.setAttribute("src", "./buttons/prev.png");
            this.prevButton.setAttribute("style", "cursor: pointer");
            this.playButton.setAttribute("src", "./buttons/play.png");
            this.playButton.setAttribute("style", "cursor: pointer");
            this.nextButton.setAttribute("src", "./buttons/next.png");
            this.nextButton.setAttribute("style", "cursor: pointer");
            this.volumeButton.setAttribute("src", "./buttons/volume_on.png");
            this.volumeButton.setAttribute("style", "margin-bottom: 16px;cursor: pointer;");

            this.timeLine.setAttribute("width", 420);
            this.timeLine.setAttribute("height", 20);
            this.timeLine.setAttribute("style", "margin-bottom: 22px;cursor: pointer;");
            this.volumeBar.setAttribute("width", 60);
            this.volumeBar.setAttribute("height", 20);
            this.volumeBar.setAttribute("style", "margin-bottom: 22px;cursor: pointer;");
            this.playerFrame.appendChild(this.audioPlayer);
            this.playerFrame.appendChild(this.prevButton);
            this.playerFrame.appendChild(this.playButton);
            this.playerFrame.appendChild(this.nextButton);
            this.playerFrame.appendChild(this.timeLine);
            this.playerFrame.appendChild(this.volumeButton);
            this.playerFrame.appendChild(this.volumeBar);

            document.body.appendChild(this.playerFrame);

            this.initBar();
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