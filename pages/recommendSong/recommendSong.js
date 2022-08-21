import request from '../../utils/request'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    day: '', // 天
    month: '', // 月
    recommendList: [], // 推荐列表数据
    index: 0, // 点击音乐的下标
    idList:[]   //歌曲id
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 更新日期的状态数据
    this.setData({
      day: new Date().getDate(),
      month: new Date().getMonth() + 1
    })
    // 获取每日推荐的数据
    this.getRecommendList();
},
  
  // 获取用户每日推荐数据
  async getRecommendList(){
    let recommendListData = await request('/recommend/songs');
    // console.log(recommendListData.data.recommend[0].id)
    let idlist = []
    for(var i=0;i<recommendListData.data.data.dailySongs.length;i++){
        //把列表当中的id存储到新的数组当中
        idlist.push(recommendListData.data.recommend[i].id)
      }
    this.setData({
      recommendList: recommendListData.data.recommend,
      idList:idlist
    })
  },

  //跳转到播放页面函数
  play(event){
    var mid=event.currentTarget.dataset.id
    var idlist = this.data.idList
    // console.log(idlist)
    wx.navigateTo({
        //跳转路径
      url: '/pages/play/play?id='+mid+"&idlist="+idlist
    })
  },

  allplay(){
    var idlist = this.data.idList
    var mid = idlist[0]
    // console.log(idlist,"111")
    // console.log(mid,"222")
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
