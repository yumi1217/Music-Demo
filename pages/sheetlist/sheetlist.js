// pages/sheetlist/sheetlist.js
import request from '../../utils/request'
let DB=wx.cloud.database().collection("gedan")
let DA=wx.cloud.database().collection("gequ")
Page({

    /**
     * 页面的初始数据
     */
    data: {
      gename:"",  //歌单名
      dataList:[], //获取数据库里面的数据
      resultList:[],      //搜索到的结果
      idlist:[]           //歌曲id合集
    },

    insertsongs(){
        var name = this.data.gename
        wx.navigateTo({
          url: '/pages/insertsongs/insertsongs?name='+name,
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let mid=options.id
        this.fun(mid)
        this.sheetfun(mid)
    },

    //获取歌单名字
    fun:function(mid){
      let that = this
        DB.where({
          _id:mid
      }).get({
          success(res){
              // console.log("条件查询成功",res)
              that.setData({
                  gename:res.data[0].name
              })
          },
          fail(res){
              console.log("条件查询失败",res)
          }
      })
    },

    //根据歌名查询数据库里歌单名为"的数据，并存放到idList里面。
    sheetfun(mid){
      var that = this
      var idlist=[]
      var name = ""
      DB.where({
        _id:mid
      }).get({
          success(res){
              console.log("条件查询成功",res)
              name=res.data[0].name
              // console.log(name)
              DA.where({
                name:name
              }).get({
                success(res){
                  for(var i=0;i<res.data.length;i++){
                    //把列表当中的id存储到新的数组当中
                    idlist.push(res.data[i].id)
                  }
                  that.setData({
                    idlist:idlist
                  })
                  that.music(idlist,idlist.length)
                },
                fail(){
                    console.log("获取数据失败",res)
                }
                })
          },
          fail(res){
              console.log("条件查询失败",res)
          }
      })
    },

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
      console.log(mid)
      var idlist = this.data.idlist
      // 页面路由
      wx:wx.navigateTo({
          //跳转路径
        url: '/pages/play/play?id='+mid+"&idlist="+idlist
      })
  },

    //删除歌曲
    deletelist:function(even){
      wx.showModal({
        content: '确定要删除此歌曲吗？',
        success(res) {
            var mid=even.currentTarget.dataset.id
            console.log(mid)
            DA.where({
              id:mid
            }).remove({
                success(res){
                    // console.log("删除成功",res)
                    wx.redirectTo({
                      url: '/pages/sheetlist/sheetlist'
                    })
                },
                fail(res){
                    console.log("删除失败",res)
                }
            })
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