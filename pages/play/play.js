// pages/play/play.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        action:{
            "method":"play"  //两个值播放(play)/暂停(pause)
        },
        thismusicid:"",
        musicName:"",
        musicImage:"",
        musicsinger:"",

        //歌词数据
        LrcDate:[],
        //当前播放歌词的位置
        lrcindex:-1,
        //歌词滚动位置
        top:0,
        //初始位置
        playtime:"00：00",
        //总体时长
        sumtime:"00：00",
        //进度条最大值
        max:0,
        //进度条当前值
        move:0,
        //歌曲列表
        idlist:[],
        //播放模式
        mode:'loop'
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var mid=options.id
        var idliststr=options.idlist
        //把传过来的字符串进行拆分
        var idlist=idliststr.split(",")
        this.setData({
            thismusicid:mid,
            idlist:idlist
        })
        //歌曲详情的渲染(背景图片跟歌名)
        this.musicshow()
        //歌词的渲染
        this.lrcshow()
    },

    //歌曲详情渲染的方法
    musicshow:function(){
        var id = this.data.thismusicid
        //当进行网络请求时，this代表当前网络对象，不代表当前play.js的对象。所以先把this传过去，传到that当中
        //先存储当前对象
        var that = this
        //需要通过歌曲id来进行接口的数据拼接
        var url = "http://music.163.com/api/song/detail/?id="+id+"&ids=["+id+"]"
        // 网络请求
        wx.request({
          url: url,
          success: (result) => {
            //   var name = result.data.song[0].name
            var name = result.data.songs[0].name
            var pic = result.data.songs[0].album.blurPicUrl
            var singer = result.data.songs[0].artists[0].name
            that.setData({
                "musicImage":pic,
                "musicName":name,
                "musicsinger":singer
            })
         },
        })
    },

    //歌词的渲染方法
    lrcshow:function(){
       var id=this.data.thismusicid
       var that=this
       var url="http://music.163.com/api/song/lyric?os=pc&id="+id+"&lv=-1&kv=-1&tv=-1"
       wx.request({
         url: url,

         success: (result) => {
             var lrcStr=result.data.lrc.lyric
             //1.进行字符串拆分，把每一句拆开
             var lrclist=lrcStr.split("\n")  //拆分 见到换行就拆分
             //定义正则 [00:44.720]曾经有那一刻
             var re=/\[\d{2}:\d{2}\.\d{2,3}\]/
             //定义空列表进行数据集合的存储
             var lrcnewlist=[]
             for(var i=0;i<lrclist.length;i++){
                 //获取时间
                var itemdate=lrclist[i].match(re)
                //判断数据不为空
                if(itemdate!=null){
                    //时间和歌词的拆分
                    var itemdate = itemdate[0]
                    if(itemdate!=null){
                    //歌词获取的效果
                    var itemlrc=lrclist[i].replace(re,"")
                    // console.log(itemdate+" "+itemlrc)
                    //时间整理:要把[00:44.720]格式的时间整理成可以进行运算的秒为单位的数字
                    var itemdate=itemdate.slice(1,-1)
                    //进行时间的再次拆分 以:拆：拆分
                    var timelist=itemdate.split(":")
                    // console.log(timelist)
                    //进行分和秒的运算 统一成秒钟
                    var h=timelist[0]
                    var s=timelist[1]
                    var time=parseFloat(h)*60+parseFloat(s)
                    //[[0000,歌词],[0010,歌词]]
                    lrcnewlist.push([time,itemlrc])
                    }
                }
             }
            //  console.log(lrcnewlist)
             that.setData({
                LrcData:lrcnewlist,
            })
         },
       })
    },
    //歌曲进度改变方法
    timechange:function(result){
        //歌词滚动
        //思路:
        //匹配事件，拿到当前播放的事件和歌词时间进行比对，从而判断当前唱到的位置然后进行高亮显示和滚动
        var playtime=result.detail.currentTime
        var lrctimelist= this.data.LrcData
        //进行数据的遍历
        for(var i=0;i<lrctimelist.length-1;i++){
            // console.log(lrctimelist[i][0])
            //进行比对判断
            if(lrctimelist[i][0]<playtime&&playtime<lrctimelist[i+1][0])
            {
                this.setData({
                    lrcindex:i
                })
            }
        }
        //歌词滚动 拿到当前的歌词下标
        var index=this.data.lrcindex
        this.setData({
            top:(index-7)*30
        })
        //进度条动画执行和时间数据的改变
        //设置当前播放的时长
        // console.log(playtime)
        var m=playtime/60
        m=Math.floor(m)
        var s=playtime%60
        // console.log(s)
        s=Math.floor(s)
        // console.log(m+"："+s)
        if(m<10)
        {
            m="0"+m
        }
        if(s<10){
            s="0"+s
        }
        // console.log(m+"："+s)
        this.setData({
            "playtime":m+"："+s
        })
        //找总歌曲的时长
        var sum = result.detail.duration
        //进行总时长的格式化
        var sum_m=Math.floor(sum/60)
        var sum_s=Math.floor(sum%60)
        if(sum_m<10)
        {
            sum_m="0"+sum_m
        }
        if(sum_s<10)
        {
            sum_s="0"+sum_s
        }
        this.setData({
            "playtime":m+"："+s,
            "sumtime":sum_m+"："+sum_s,
            "max":sum,
            "move":playtime
        })
    },
    //拖动进度条的方法sliderchange
    sliderchange:function(even) {
        // console.log(even.detail.value)
        //覆盖当前的值
        var v=even.detail.value
        this.setData({
            move:v
        })
        //进行播放器的覆盖
        //进行播放器当前播放进度数据的修改
        this.setData({
            action:{
                method:"setCurrentTime",
                data:v
            }
        })
        //要进行播放按钮UI效果的修改
        this.setData({
            action:{
                method:"play"
            }
        })
    },
    //暂停按钮点击
    playdate:function(){
        //拿到当前状态值
        var date =this.data.action.method
        //判断当前状态
        if(date=="play"){
            // 正在播放时，让其暂停
            this.setData({
                action:{
                    "method":"pause"
                }
            })
            }else
            {
                //正在暂停时，继续播放
                this.setData({
                    action:{
                        "method":"play"
                    }
                })
            }
    },
    //下一首
    nextSong:function () {
        // console.log("下一首")
        //思路：通过id列表进行下一首的替换(1.图片 2.名称 3.歌词)
        //拿到id列表
        var ids=this.data.idlist
        //获取当前id
        var id=this.data.thismusicid
        //判断当前歌曲的位置
        var index=-1
        for(var i=0;i<ids.length;i++){
            if(ids[i]==id){
                index=i;
                break
            }
        }
        //更新歌曲 ，覆盖当前id
        //三元运算符判断当前歌曲是不是最后一首歌,如果是最后一首歌就回到第一首
        this.setData({
            thismusicid:index==ids.length-1?0:ids[index+1]
        })
        //重新进行赋值action
        this.setData({
            action:{
                "method":"play"
            }
        })
        //更新歌曲
        //歌曲详情更新
        this.musicshow()
        //歌词更新
        this.lrcshow()
    },

    //上一首
    prevSong:function () {
        // console.log("下一首")
        //思路：通过id列表进行下一首的替换(1.图片 2.名称 3.歌词)
        //拿到id列表
        var ids=this.data.idlist
        //获取当前id
        var id=this.data.thismusicid
        //判断当前歌曲的位置
        var index=-1
        for(var i=0;i<ids.length;i++){
            if(ids[i]==id){
                index=i;
                break
            }
        }
        //更新歌曲 ，覆盖当前id
        //三元运算符判断当前歌曲是不是最后一首歌,如果是最后一首歌就回到第一首
        this.setData({
            thismusicid:index==0?ids[length-1]:ids[index-1]
        })
        //重新进行赋值action
        this.setData({
            action:{
                "method":"play"
            }
        })
        //更新歌曲
        //歌曲详情更新
        this.musicshow()
        //歌词更新
        this.lrcshow()
    },
    //切换模式的方法 图标更改
    changemode:function(){
        // console.log("点击有效")
        if(this.data.mode=='loop'){
            this.setData({
                mode:'single'
            })
        }else{
            this.setData({
                mode:'loop'
            })
        }
    },

    //当歌曲播放完毕执行方法
    changeMusic:function(){
        var mode=this.data.mode
        //single 单曲 loop循环
        if(mode=='loop'){
            var ids=this.data.idlist
            //获取当前id
            var id=this.data.thismusicid
            //判断当前歌曲的位置
            var index=-1
            for(var i=0;i<ids.length;i++){
                if(ids[i]==id){
                    index=i;
                    break
                }
            }
            //更新歌曲 ，覆盖当前id
            //三元运算符判断当前歌曲是不是最后一首歌,如果是最后一首歌就回到第一首
            this.setData({
                thismusicid:index==ids.length-1?0:ids[index+1]
            }),
            this.setData({
                action:{
                    method:"play"
                }
            })
            //更新歌曲
            //歌曲详情更新
            this.musicshow()
            //歌词更新
            this.lrcshow()
        }
        else
        {
            this.setData({
                thismusicid:this.data.thismusicid
            })
            //刷新播放状态
            this.setData({
                action:{
                    method:"play"
                }
            })
        }
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})