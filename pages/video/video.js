// page/video/video.js
import request from "../../utils/request";

let videoContext = null;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        navList: [],    //导航标签数据
        videoList: [],  //视频栏数据
        navId: '',      //用户点击导航的标识
        pid: '',        //用户上一次点击对象的id
        videoId: '',    //当前点击的视频id
        isTriggered: false //下拉属性的状态
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        //获取导航标签数据
        this.getNavList();
    },

    // 获取导航列表
    async getNavList() {
        let navData = await request("/video/group/list");
        let navList = navData.data.data.slice(0, 10)
        console.log(navList)
        //更新数据源
        this.setData({
            navList,
            navId: navList[0].id    //将第一个标签设置赋值
        })
        //获取视频数据
        this.getVideoList(this.data.navId);
    },
    // 点击切换导航的回调
    changeNav(event) {
        this.setData({
            //将用户点击的id更新到data中
            navId: event.currentTarget.id,
            videoList: []   //清空之前的视频数据
        })
        wx.showLoading({
            title: '正在加载'
        })
        //动态获取当前导航对应的导航数据
        this.getVideoList(this.data.navId)
    },
    /**
     * 播放Video
     * 关闭上一个正在播放的video
     * 点击播放/继续的回调
     * 1.在点击播放的事件中,需要找到上一个播放的视频
     * 2.在播放新的视频之前关闭上一个视频
     * 关键:
     * 1.如何找到上个视频的实例对象
     * 2.如何确认点击播放的视频和正在播放的视频不是同一个视频
     * JS设计模式:
     * 单例模式:
     * 需要创建多个对象的场景下，通过一个变量接收，始终保持一个对象.
     * 节省内存空间
     */
    playVideo(event) {
        //接收用户当前点击的视频id
        let pid = event.currentTarget.id;
        //1.这次不等于上次时 2.创建当前点击实例对象 3.暂停上一个实例对象
        pid !== this.data.pid && this.videoContext && this.videoContext.stop();
        //创建实例化对象
        this.videoContext = wx.createVideoContext(pid, this)
        //播放视频
        this.videoContext.play();
        //数据更新
        this.setData({
            pid
        })
    },
    //当点击图片时,将视频id数据更新
    play(event) {
        let videoId = event.currentTarget.id;
        this.setData({
            videoId
        })
    },
    // 自定义下拉刷新回调
    handlerRefresh() {
        this.setData({
            isTriggered: true
        });
        this.getVideoList(this.data.navId);
    },
    
    // 获取视频列表
    async getVideoList(navId) {
      if(!navId){ // 判断navId为空串的情况
        return;
      }
        let videoData = await request("/video/group", {id: navId})
        wx.hideLoading();   //查询到结果值得时候关闭提示框
        let index = 0;
        let videoList = videoData.data.datas.map(item => {
            item.id = index++;
            return item;
        })
        this.setData({
            videoList,
            isTriggered: false
        });
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
