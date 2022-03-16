// pages/find/find.js
import request from '../../utils/request'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        recommendList: [], // 推荐歌单
        topList: [], // 排行榜数据,
    },


    //跳转至搜索界面
    btn:function (res) {
        wx:wx.navigateTo({
          url:'/pages/search/search'
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: async function (options) {
        // 获取推荐歌单数据
        let recommendListData = await request('/personalized', {limit: 10});
        this.setData({
        recommendList: recommendListData.data.result
        })

        let index = 0;
        let resultArr = [];
        let idList = [];
        while (index < 5){
        let topListData = await request('/top/list', {idx: index++});
        let topListItem = {name: topListData.data.playlist.name, tracks: topListData.data.playlist.tracks.slice(0, 3)};
        resultArr.push(topListItem);
        this.setData({
            topList: resultArr
        })
        }
    },

    gedanxiangqing:function(even){
        let id = even.currentTarget.dataset.id
        wx.navigateTo({
            //跳转路径
          url: '/pages/Songlistdetails/Songlistdetails?id='+id
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