// pages/bindfb/index.js
var WxParse = require('../wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    // wx.request({
    //   url: 'https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzI3MDUwMzgyNw==#chat_redirect',
    //   method: 'GET',
    //   data:{
    //     action: 'home',
    //     __biz: "MzI3MDUwMzgyNw=="
    //   },
    //   header:{
    //     'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 11_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E302 MicroMessenger/6.7.1 NetType/4G Language/zh_CN',
    //     "Content-Type": "application/json",
    //     "Referer":"https://servicewechat.com/wxa2ae8810d8157e4b/0/page-frame.html"
    //   },
    //   success: function (res) {
    //     console.log('1_res=',res)
    //     // var article = res.data[0].post;
    //     // WxParse.wxParse('article', 'html', article, that, 5);
    //   }
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