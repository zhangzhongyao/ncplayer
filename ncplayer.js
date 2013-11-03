/**
 * ncplayer简介：
 *     ncplayer是一个纯js实现的网络音频播放器，使用时只需将js文件引入页面即可，它会自动将当前页面的音频文件加载到播放列表里以供播放。
 *
 * ncplayer项目地址：
 *     https://github.com/zhangzhongyao/ncplayer/
 *
 * ncplayer开发人员邮箱：
 *     zzyupc@gmail.com
 */

(function(window, undefined) {
    var defaultindex = 0;// 默认播放的音频文件索引序号
    var defaultVol = 0.5;// 默认音量值
    var defaultisMuted = false;// 默认不静音
    var defaultisPlay = false;// 默认不播放
    var defaultplayMode = 1;// 默认为单曲播放，1：单曲；2：列表；3：随机
    var defaultisLoop = false;// 默认不循环

    /**
     * 播放列表类，包含播放列表数据和对播放列表的基本操作
     */
    function PlayList() {
        this.srcList = new Array();// 音频文件url地址数组
        this.playList = new Array();// 音频文件名称数组
        this.currentMusic = new Object();// 当前（将要）播放的音频

        // 初始化方法
        this.init = function() {
            var aList = document.getElementsByTagName("a");
            var checker = new RegExp("\.mp3$");// 此处功能缺失，应对浏览器进行判断然后确定匹配何种格式的文件
            for (var eIndex in aList) {
                if (checker.exec(aList[eIndex].href)) {
                    this.srcList.push(aList[eIndex].href);
                    this.playList.push(aList[eIndex].href);
                }
            }
            ;
            this.currentMusic.index = defaultindex;
            this.currentMusic.name = this.playList[defaultindex];
            this.currentMusic.src = this.srcList[defaultindex];
        };

        // 获取播放列表里的指定索引的音频文件
        this.getOne = function(index) {
            this.currentMusic.index = index;
            this.currentMusic.name = this.playList[index];
            this.currentMusic.src = this.srcList[index];
            return this.currentMusic;
        };

        // 获取播放列表里的下一个音频
        this.getNext = function() {
            this.currentMusic.index = (this.currentMusic.index + 1) % this.playList.length;
            this.currentMusic.name = this.playList[this.currentMusic.index];
            this.currentMusic.src = this.srcList[this.currentMusic.index];
            return this.currentMusic;
        };

        // 获取播放列表里的上一个音频
        this.getPrev = function() {
            this.currentMusic.index = (this.currentMusic.index + this.playList.length) % this.playList.length;
            this.currentMusic.name = this.playList[this.currentMusic.index];
            this.currentMusic.src = this.srcList[this.currentMusic.index];
            return this.currentMusic;
        };

        // 获取播放列表里随机一个音频文件，但非当前音频
        this.getRandom = function() {
            var tmpIndex = parseInt(Math.random() * this.playList.length);
            while (tmpIndex === this.currentMusic.index)
                tmpIndex = parseInt(Math.random() * this.playList.length);
            this.currentMusic.index = tmpIndex;
            this.currentMusic.name = this.playList[tmpIndex];
            this.currentMusic.src = this.srcList[tmpIndex];
            return this.currentMusic;
        };

        // 当前音频是否播放列表的第一个音频
        this.isFirst = function() {
            return this.currentMusic.index === 0;
        };

        // 当前音频是否播放列表的末一个音频
        this.isLast = function() {
            return (this.currentMusic.index + 1) === this.srcList.length;
        };
    }
    ;

    /**
     * -----------------尚未完成-----------------------
     * 播放界面类，包含界面元素和针对这些元素的基本操作
     * -----------------尚未完成-----------------------
     */
    function PlayPanel() {
        this.init = function() {
            this.initElement();
            this.initStyle();
            return this.audiPlayer;
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

    /**
     * -------------------------尚未完成-----------------------------------
     * 播放器类，将播放列表和播放器界面各元素联系起来，定义播放器的各项功能
     * -------------------------尚未完成-----------------------------------
     */
    function NCPlayer() {
        // 初始化方法
        this.init = function(c) {
            this.playList = new PlayList();// 播放列表
            this.playPanel = new PlayPanel();// 播放器界面
            this.currentVol = defaultVol;// 当前音量
            this.isPlay = defaultisPlay;// 是否播放中
            this.isMuted = defaultisMuted;// 是否静音中
            this.playMode = defaultplayMode;// 播放模式
            this.isLoop = defaultisLoop;// 是否循环

            this.playList.init();
            this.playPanel.init();
            this.initEventListener(c);
        };

        // 播放
        this.play = function() {
            if (this.playPanel.audioPlayer.src === "")
                this.playPanel.audioPlayer.src = this.playList.getOne(defaultindex).src;
            this.playPanel.audioPlayer.play();
			if(!this.isPlay)
                this.setisPlay();
            this.playPanel.switchToPause();
        };

        // 暂停
        this.pause = function() {
            this.playPanel.audioPlayer.pause();
            this.setisPlay();
            this.playPanel.switchToPlay();
        };

        // 播放指定音乐
        this.playMusic = function(src) {
            this.playPanel.audioPlayer.src = src;
            this.play();
        };

        // 播放开关
        this.playSwitch = function() {
            if(this.isPlay)
                this.pause();
            else
                this.play();
			this.setisPlay();
		};

        // 播放前一首
        this.playPrev = function() {
            if(this.playMode == 3)// 仅随机播放的模式下获取随机文件，其它模式均获取前一个文件
                this.playMusic(this.playList.getRandom().src);
            else if(this.isLoop)
                this.playMusic(this.playList.getPrev().src);
        };

        // 播放下一首
        this.playNext = function() {
            if(this.playMode == 3)// 仅岁末播放的模式下获取随机文件，其它模式均获取下一个文件
                this.playMusic(this.playList.getRandom().src);
            else if(this.isLoop)
                this.playMusic(this.playList.gerNext().src);
        };
        
        // 修改当前播放状态
        this.setisPlay = function() {
            this.isPlay = (!this.isPlay);
        };

        // 音量开关
        this.volSwitch = function() {
            if(this.isMuted)
                this.volOn();
            else
                this.volOff();
		};

        // 音量开
        this.volOn = function() {
            this.playPanel.audioPlayer.volume = this.currentVol;
            this.setisMuted();
            this.playPanel.swtichOn();
        };

        // 音量关
        this.volOff = function() {
            this.currentVol = this.playPanel.audioPlayer.volume;
            this.playPanel.audioPlayer.volume = 0;
            this.setisMuted();
            this.playPanel.switchOff();
        };

        // 静音状态设置
        this.setisMuted = function() {
            this.isMuted = (!this.isMuted);
        };

        // 更新时间轴
        this.updateTimeLine = function() {
            this.playPanel.updateTimeLine(this.getTime());
		};

        // 更新音量轴
        this.updateVolLine = function() {
            this.playPanel.updateVolLine(this.getVol());
		};

        // 设置当前播放的时间点，用于拖动调整进度条时改变当前播放位置和页面显示
        this.setTime = function(timePercent) {
            this.playPanel.audioPlayer.currentTime = this.playPanel.audioPlayer.duration * timePercent;
            this.updateTimeLine();
        };

        // 获取当前播放的时间点
        this.getTime = function() {
            return this.playPanel.audioPlayer.currentTime / this.playPanel.audioPlayer.duration;
        };

        // 设置音量
        this.setVol = function(volPercent) {
            this.playPanel.audioPlayer.volume = this.currentVol = volPercent;
            this.updateVolLine();
        };

        // 获取当前音量
        this.getVol = function() {
            return this.playerPanel.audioPlayer.volume;
        };

        // 初始化监听器
        this.initEventListener = function(c) {
            this.playPanel.prevButton.addEventListener("click", c.playPrev, false);
            this.playPanel.playButton.addEventListener("click", c.playSwitch, false);
            this.playPanel.nextButton.addEventListener("click", c.playNext, false);
            this.playPanel.volSwitcher.addEventListener("click", c.volSwitch, false);
            this.playPanel.audioPlayer.addEventListener("timeupdate", c.updateTimeLine, false);
            this.playPanel.audioPlayer.addEventListener("ended", c.playNext, false);
		};
    }
    ;

    /**
     * 当页面完成加载后，启动播放器
     */
    window.onload = function() {
        ncplayer = new NCPlayer();
        ncplayer.init(ncplayer);
    };
})(window);
