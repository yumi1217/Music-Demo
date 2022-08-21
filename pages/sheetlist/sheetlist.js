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
      sheetid:"", //歌单id
      dataList:[], //获取数据库里面的数据
      resultList:[],      //搜索到的结果
      idlist:[]           //歌曲id合集
    },

    //新增歌曲函数
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
        this.setData({
          sheetid:mid
        })
        //调用获取歌单名函数
        this.fun(mid)
    },

    //获取歌单名字
    fun:function(mid){
      let that = this
      let name = ''
        DB.where({
          _id:mid
      }).get({
          success(res){
              // console.log("条件查询成功",res)
              that.setData({
                  gename:res.data[0].name
              })
              name=res.data[0].name
              //调用根据歌名获取id函数，将获取到的歌单名作为实参传递
              that.sheetfun(name)
          },
          fail(res){
              console.log("条件查询失败",res)
          }
      })
    },

    //根据歌名存储idList函数
    sheetfun(name){
      var that = this
      var idlist=[]
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
          //调用获取歌曲详情函数
          that.music(idlist,idlist.length)
        },
        fail(){
            console.log("获取数据失败",res)
        }
        })
    },

    //根据歌曲id数组获取歌曲详情函数
    music:async function(idlist,length){
      var resultList = []
      for(var i = 0;i<length;i++){
          var result = await request('/song/detail?ids='+idlist[i])
          resultList.push(result.data.songs[0])
      }
      // console.log(resultList)
      this.setData({
        resultList:resultList
      })
    },

    //播放功能函数
    play:function(even){
      var mid=even.currentTarget.dataset.id
      // console.log(mid)
      var idlist = this.data.idlist
      // 页面路由
      wx.navigateTo({
        url: '/pages/play/play?id='+mid+"&idlist="+idlist
      })
  },

    //删除歌曲
    deletelist:function(even){
      var mid=even.currentTarget.dataset.id
      var sheetid =this.data.sheetid
      wx.showModal({
        content: '确定要删除此歌曲吗？',
        success(res) {
          if(res.confirm){
            DA.where({
              id:mid
            }).remove({
                success(res){
                    // console.log("删除成功",res)
                    wx.redirectTo({
                      url: '/pages/sheetlist/sheetlist?id='+sheetid,
                    })
                },
            })
          }else{
            return;
          }
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