// pages/insertsheet/insertsheet.js
const db=wx.cloud.database().collection("gedan")
let gename = ""
Page({
  
    //将用户输入的值赋值给全局变量gename
    addName(event){
        gename=event.detail.value
        // console.log(gename)
    },

    //添加数据
  addData(){
    db.add({
      data:{
        name:gename
      },
      success(res){
        console.log("添加成功",res)
        wx.reLaunch({
          url: '/pages/songsheetlist/songsheetlist',
        })
      },
      fail(res){
        console.log("添加失败",res)
      }
    })
  },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

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