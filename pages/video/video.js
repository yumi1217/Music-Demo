// pages/video/video.js
import request from '../../utils/request'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        videoGroupList:[], //导航标签数据
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.geiVideoGroupListData();
    },

    //获取导航数据
    async geiVideoGroupListData(){
        let videoGroupListData = await request('/video/group/list');
        let a = videoGroupListData.data.slice(0, 10)
        console.log(a)
        // this.setData({
        //     videoGroupList:videoGroupListData.data.slice(0,14)
        // })
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