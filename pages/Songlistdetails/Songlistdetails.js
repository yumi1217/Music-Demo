// pages/Songlistdetails/Songlistdetails.js
import request from '../../utils/request'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        gename:[],  //歌单名
        idList:[],   //存放歌单所有id
        resultList:[],   //搜搜结果
        musicPic:[]     //歌曲照片
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad:  function (options) {
        let id = options.id
        this.sheetfun(id)
    },

    //根据歌单id查询歌单内所有的歌单并存放到idList
     async sheetfun(id){
        let idlist = []
        let recommendListData = await request('/playlist/detail', {id: id});
        this.setData({
            gename:recommendListData.data.playlist.name,
            musicPic:recommendListData.data.playlist.backgroundCoverUrl
        })
        // console.log(recommendListData.data.privileges)
        for(var i=0;i<recommendListData.data.privileges.length;i++){
            //把列表当中的id存储到新的数组当中
            idlist.push(recommendListData.data.privileges[i].id)
          }
        //   console.log(idlist)
        this.setData({
            idList:idlist
        })
        this.music(idlist,idlist.length)
    },

    //根据歌曲id获取歌曲详情
    music:async function(idlist,length){
        // console.log(idlist,length)
        var resultList = []
        for(var i = 0;i<length;i++){
            var result = await request('/song/detail?ids='+idlist[i])
            resultList.push(result.data.songs[0])
        }
        console.log(resultList)
        this.setData({
          resultList:resultList
        })
      },

       //播放按钮
    play:function(even){
        var mid=even.currentTarget.dataset.id
        var idlist = this.data.idList
        // console.log(idlist)
        wx:wx.navigateTo({
            //跳转路径
          url: '/pages/play/play?id='+mid+"&idlist="+idlist
        })
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