//app.js
const APP_ID = 'wxa2ae8810d8157e4b';//输入小程序appid  
const APP_SECRET = 'c6c922883ae30ebe0b4c0c80c615f54d';//输入小程序app_secret  
var OPEN_ID = ''//储存获取到openid  
var SESSION_KEY = ''//储存获取到session_key  
App({
  onLaunch: function () {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    }
    else {
      console.log('use cloud function...')
      wx.cloud.init({
        traceUser: true,
      })
    }
    wx.cloud.callFunction({
      name:"add",
      data:{
        a:1,
        b:2
      },
      success: function(res){
        console.log('1-success',res)
      },
      fail: function(res){
        console.log('1-fail', res)
      }
    })
    wx.onNetworkStatusChange(function (res) {
      console.log('network21222=', res)
      wx.showToast({
        title: res.isConnected +'-'+ res.networkType,
      })
      that.setData({
        networkStatus: res.isConnected,
        networkType: res.networkType,
      })
    })
    // var that = this;
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        // console.log("1_res=" , res)
        // console.log("1_res.code=" + res.code)
        // wx.request({
        //   //获取openid接口  
        //   // url: 'http://localhost:8080/getOpenId',
        //   url: 'https://api.weixin.qq.com/sns/jscode2session',
        //   data: {
        //     appid: APP_ID,
        //     secret: APP_SECRET,
        //     js_code: res.code,
        //     grant_type: 'authorization_code'
        //   },
        //   method: 'GET',
        //   success: function (res) {
        //     console.log("1_res.data=",res.data)
        //     OPEN_ID = res.data.openid;//获取到的openid  
        //     SESSION_KEY = res.data.session_key;//获取到session_key  
        //     console.log(OPEN_ID.length)
        //     console.log("SESSION_KEY=",SESSION_KEY)
            
        //   },
        //   fail: function (e) {
        //     console.log("1_11-" , e);
        //   }
        // })
      }
    })
    
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              console.log("1_2-res=", res)
              console.log("1_2-res.encryptedData=", res.encryptedData)
              console.log("1_2-res.iv=", res.iv)
              console.log("1_2-res.signature=", res.signature)
              console.log("1_2-SESSION_KEY=", SESSION_KEY)
              this.globalData.userInfo = res.userInfo
              // wx.request({
              //   //获取openid接口  
              //   url: 'http://localhost:8080/decodeUserInfo',
              //   data: {
              //     encryptedData: res.encryptedData,
              //     iv: res.iv,
              //     sessionKey: SESSION_KEY
              //   },
              //   method: 'GET',
              //   success: function (res) {
              //     console.log("1_1-res=", res)
                  
              //   },
              //   fail: function (e) {
              //     console.log("1_11-", e);
              //   }
              // })
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null
  }
})