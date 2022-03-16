// pages/songsheetlist/songsheetlist.js
let DB=wx.cloud.database().collection("gedan")
let DA=wx.cloud.database().collection("gequ")
Page({

    /**
     * 页面的初始数据
     */
    data: {
        dataList:[], //获取数据库里面的数据
        sum:[]
    },

    // //查询有多少首歌的方法
    // select:function(){
    //     var datalist = []
    //     var sum = []
    //     let that = this
    //     DB.get({
    //     success(res){
    //         for(var i=0;i<res.data.length;i++){
    //             //把列表当中的id存储到新的数组当中
    //             datalist.push(res.data[i].name)
    //           }
    //         //   console.log(datalist)
    //           for(var j=0;j<datalist.length;j++){
    //             DA.where({
    //                 name:datalist[j]
    //             }).get({
    //                 success(res){
    //                     var avg =  res.data.length
    //                     sum.push(avg)
    //                 },
    //                 fail(res){
    //                     console.log(res)
    //                 }
    //             })
    //           }
    //           console.log(sum)
    //           that.setData({
    //               sum:sum
    //           })
    //     },
    //     fail(){
    //         console.log("获取数据失败",res)
    //     }
    //     })
    // },

    //歌单详情跳转
    sheetlist:function(even){
        var mid=even.currentTarget.dataset.id
        wx.navigateTo({
            url: '/pages/sheetlist/sheetlist?id='+mid
        })
    },

    //新增歌单方法
    insertlist(){
        console.log('点击成功')
        wx.navigateTo({
            url: '/pages/insertsheet/insertsheet',
          })
    },

    //删除歌单方法
    deletelist:function(even){
        wx.showModal({
            content: '确定要删除此歌单吗？',
            success: (res) => {
                var mid=even.currentTarget.dataset.id
                // console.log(even)
                DB.doc(mid).remove({
                    success(res){
                        // console.log("删除成功",res)
                        wx.redirectTo({
                            url: '/pages/songsheetlist/songsheetlist'
                          })
                    },
                    fail(res){
                        console.log("删除失败",res)
                    }
                })
            }
        })
    },

    

    //修改歌单方法
    updatelist:function(even){
        // console.log('点击成功')
        var mid=even.currentTarget.dataset.id
        // console.log(mid)
        wx.navigateTo({
            url: '/pages/updatesheet/updatesheet?id='+mid,
        })
    },

    //页面渲染调用方法
    load(){
        let that = this
        DB.get({
        success(res){
            // console.log("获取数据成功",res)
            that.setData({
            datalist:res.data
            })
        },
        fail(){
            console.log("获取数据失败",res)
        }
        })
    },

    //查询方法

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.load()
        // this.select()
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