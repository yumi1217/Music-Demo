// pages/songlist/songlist.js
import request from '../../utils/request'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        bannerList:[],
        keyWord:"邓紫棋",
        resultmusiclist:[],
        //定义存储封面的数组
        musicPiclist:[],
        idlist:[]
    },
    //播放按钮
    play:function(even){
        var mid=even.currentTarget.dataset.id
        var idlist = this.data.idlist
        // 页面路由
        wx.navigateTo({
            //跳转路径
          url: '/pages/play/play?id='+mid+"&idlist="+idlist
        })
    },

    //改变输入框的值
    changeWord:function(evens){
        //获取当前输入框的值
        var w=evens.detail.value
        //进行输入值存储
        this.setData({
            keyWord:w
        })
    },

    //搜索按钮
    search:function () {
        var w=this.data.keyWord
        var url = "https://music.163.com/api/search/get?s="+w+"&type=1&limit=10"
        var that =this
        //定义专门进行id存储的数组
        var idlist=[]
        //网络请求
        wx.request({
          url: url,
          success: (result) =>{
              //解析结果值
              // console.log(result.data.result.songs)
            // console.log(result)
              var songlist=result.data.result.songs
              //把数据进行存储到data当中
              // console.log(songlist)
              that.setData({
                resultmusiclist:songlist
              })
              //获取到id以后进行数组存储
              for(var i=0;i<songlist.length;i++){
                  //把列表当中的id存储到新的数组当中
                  idlist.push(songlist[i].id)
              }
            //   console.log(idlist)
              //把id列表进行data数据的存储
              that.setData({
                idlist:idlist
              })
              //覆盖之前封面
              this.setData({
                  "musicPiclist":[]
              })
              that.getMusicImage(idlist,0,idlist.length)        
            },
        })
    },

    getMusicImage:function(idlist,i,length){
        //获取当前数组
        var musicPiclist=this.data.musicPiclist
        var that=this
        var url="http://music.163.com/api/song/detail/?id="+idlist[i]+"&ids=["+idlist[i]+"]"
        wx.request({
          url: url,
          success: (result) => {
              //通过id值获取到对应封面的数据
              var picitem=result.data.songs[0].album.blurPicUrl
              //把当前封面追加到数组当中
              musicPiclist.push(picitem)
            that.setData({
                musicPiclist:musicPiclist
            })
             //判断条件来进行调用
            if(++i<length){
            that.getMusicImage(idlist,i,length)
            }
          }
        })
    },

    //跳转到每日推荐
    recommendSong(){
      wx.navigateTo({
        url: '/pages/recommendSong/recommendSong',
      })
    },

    //跳转到最热门歌单
    hotsheetlist(){
      wx.navigateTo({
        url: '/pages/hotsheetlist/hotsheetlist',
      })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: async function (options) {
      let bannerListData= await request('/banner',{type:2})
      // console.log("结果数据",bannerListData)
      this.setData({
        bannerList:bannerListData.data.banners
      })
      this.search();
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