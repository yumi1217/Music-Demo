// pages/User/User.js
import request from '../../utils/request'
Page({

    /**
     * 页面的初始数据
     */
    data: {
      userInfo:"",  //微信登录验证
      phone: '17683819202', // 手机号
      password: 'Lr991217' // 用户密码
    },
    //微信授权登录
    toLogin(){
      let phone  = this.data.phone
      let password = this.data.password
        wx.getUserProfile({
          desc: '必须授权才可以使用',
          success:res =>{
            let user = res.userInfo
            console.log("授权成功",user)
            this.setData({
              userInfo: user
            })
            this.wangyiyun(phone,password);
          },
          fail:res=>{
            // console.log("授权失败")
            this.setData({
              userInfo:""
            })
          }
        }) 
      },

      //网易云音乐登录函数
      async wangyiyun(phone,password){
        // console.log(phone,password)
        let result = await request('/login/cellphone', {phone, password, isLogin: true})
        console.log(result)
      },
    
      //跳转到歌单页面函数
    songsheetlist(){
      wx.navigateTo({
        url: '/pages/songsheetlist/songsheetlist',
      })
    },
    //退出登录
    logout(){
      wx.showModal({
        content: '确定要退出微信授权登录吗',
        success: (res) => {
          if(res.confirm){
            this.setData({
              userInfo:""
            })
          }else
          {
            return;
          }
        },
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