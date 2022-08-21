// pages/updatesheet/updatesheet.js
let DB=wx.cloud.database().collection("gedan")
Page({
    /**
     * 页面的初始数据
     */
    data:{
        id:"",      //接收到的歌单id
        gename:""   //根据歌单id查询到的歌单名
    },
    
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        // console.log(options)
        let mid=options.id
        let that = this
        that.setData({
            id:mid
        })
        DB.where({
            _id:mid
        }).get({
            success(res){
                console.log("条件查询成功",res)
                that.setData({
                    gename:res.data[0].name
                })
            },
            fail(res){
                console.log("条件查询失败",res)
            }
        })
        // console.log(mid)
    },

    //要更新的名字
    updName(event){
    // gename=event.detail.value
    this.setData({
        gename:event.detail.value
    })
  },

    //修改函数
    updData(){
        let user = this.data.id
        let gename = this.data.gename
        DB.doc(user).update({
            data:{
              name:gename
            },
            success(res){
              console.log("修改成功",res)
                wx.reLaunch({
                url: '/pages/songsheetlist/songsheetlist',
                })
            },
            fail(res){
              console.log("修改失败",res)
            }
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