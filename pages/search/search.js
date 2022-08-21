// pages/search/search.js
import request from '../../utils/request'
let isSend = false; // 函数节流使用
Page({

    /**
     * 页面的初始数据
     */
    data: {
        placeholderContent:'', //placeholder的内容
        hotList:[],            //热搜榜数据
        searchContent:'',      //用户输入表单项数据
        searchList:[],         //关键字模糊匹配数据
        idlist:[],             //存放id的数组
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        //获取初始化数据
        this.getInitData();
    },
    //获取初始化的数据
    async getInitData(){
        let placeholderData = await request('/search/default');
        let hotListData = await request('/search/hot/detail');
        this.setData({
            placeholderContent:placeholderData.data.data.showKeyword,
            hotList:hotListData.data.data
        })
    },

    //将用户点击数据同步到表单
    toSearch(even){
        this.setData({
            searchContent: even.currentTarget.dataset.keyword
        })
        this.getSearchList();
      },

    //跳转到播放界面
        async play (even) {
        // console.log(even)
        let mid=even.currentTarget.dataset.id
        let idlist=[]
        let songList= await request('/search',{keywords:this.data.searchContent,limit:10})
        // console.log(songList)
        let list=songList.data.result.songs
        // console.log(list)
        //获取到id以后进行数组存储
        for(var i=0;i<list.length;i++){
            //把列表当中的id存储到新的数组当中
            idlist.push(list[i].id)
        }
        // console.log(idlist)
        this.setData({
            idlist:idlist
          })
        // 页面路由
        wx.navigateTo({
            url: '/pages/play/play?id='+mid+"&idlist="+idlist
        })
    },
    
    //表单项内容发生改变的回调
    handleInputChange(event){
        // console.log(event)
        //更新searchContent的状态数据
        this.setData({
            searchContent:event.detail.value.trim()
        })
        if(isSend){
            return
        }
        isSend=true;
        this.getSearchList();
        //函数节流
        setTimeout( () => {
        isSend=false;
        }, 300)
    },
    //获取搜索数据的功能函数
    async getSearchList(){
        if(!this.data.searchContent){
            this.setData({
                searchList:[]
            })
            return;
        }
        //发请求获取关键字模糊匹配数据
        let searchListData = await request('/search',{keywords:this.data.searchContent,limit:10})
        // console.log(searchListData)
        this.setData({
            searchList:searchListData.data.result.songs
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