/**
 * 音乐查询
 * 歌曲播放
 * 歌曲封面
 * 歌曲评论
 * 播放动画
 * 播放MV
 */
/**
 * 歌曲搜索：
 * 请求地址：https://autumnfish.cn/search
 * 请求方法：get
 * 参数：keywords(查询的关键字)
 */
/**
 * 获取歌曲：
 * ://autumnfish.cn/song/url
 * 请求方法：get
 * 请求参数：id
 */
/**
 * 获取封面：
 * 请求地址：https://autumnfish.cn/song/detail
 * 请求方法：get
 * 请求参数：ids
 */
/**
 * 歌曲评论：
 * 请求地址：https://autumnfish.cn/comment/hot?type=0
 * 请求方法：get
 * 请求参数：id
 */
/**
 * MV播放
 * 请求地址：https://autumnfish.cn/mv/url
 * 请求方法：get
 * 请求参数：id（0为没有）
 */
let demo = new Vue({
    el: "#demo",
    data: {
        musicList: [],
        query: '',
        musicUrl: '',
        coverUrl: "",
        peopleSay: [],
        isPlay: false,
        isPause: true,
        mvUrl: "",
        mvShow: false,
        isMask: false
    },
    methods: {
        getMusic() {
            var that = this;
            axios.get(`https://autumnfish.cn/search?keywords=${this.query}`)
                .then(function(succeed) {
                    // console.log(succeed);
                    that.musicList = succeed.data.result.songs
                        // console.log(that.musicList);
                }, function(error) {
                    console.log(error);
                })
        },
        playMusic(songId) {
            // console.log(songId);
            //  歌曲获取
            var that = this;
            axios.get(`https://autumnfish.cn/song/url?id=${songId}`)
                .then(function(succeed) {
                    // console.log(succeed);
                    // console.log(succeed.data.data[0].url);
                    that.musicUrl = succeed.data.data[0].url
                }, function(error) {
                    console.log(error);
                });
            //  封面获取
            axios.get(`https://autumnfish.cn/song/detail?ids=${songId}`)
                .then(function(succeed) {
                    // console.log(succeed);
                    // console.log(succeed.data.songs[0].al.picUrl);
                    that.coverUrl = succeed.data.songs[0].al.picUrl

                }, function(error) {
                    console.log(error);
                });

            // 评论获取              
            axios.get(`https://autumnfish.cn/comment/hot?type=0&id=${songId}`)
                .then(function(succeed) {
                    // console.log(succeed);
                    // console.log(succeed.data.hotComments);
                    that.peopleSay = succeed.data.hotComments
                }, function() {
                    console.log(error);
                })
        },
        /** 
         *  audio标签的play事件会在音频播放的时候触发audio
         * 标签的pause事件会在音频暂停的时候触发
         * 通过对象的方式设置类名，类名生效与否取决于后面值的真假
         *
         */
        //  播放动画
        play() {
            this.isPlay = true;
            this.isPause = false;
        },
        // 暂停动画
        pause() {
            this.isPlay = true;
            this.isPause = true;
        },
        // 播放MV
        playMV(mvid) {
            var that = this;
            this.mvShow = true;
            this.isMask = true;
            axios.get(`https://autumnfish.cn/mv/url?id=${mvid}`)
                .then(function(succeed) {
                    // console.log(succeed);
                    // console.log(succeed.data.data.url);
                    that.mvUrl = succeed.data.data.url
                        // console.log(that.mvUrl);
                }, function(error) {
                    console.log(error);
                })
        },

        //  隐藏遮罩层
        disappear() {
            this.isMask = false;
            this.mvShow = false;
        },
        clear() {
            this.query = ''
        }

    }
})