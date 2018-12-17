//index.js
//获取应用实例
var util = require('../../utils/util.js');
var WxParse = require('../wxParse/wxParse.js');
const app = getApp()

var APP_ID = 'wxa2ae8810d8157e4b'
var APP_SECRET = 'c6c922883ae30ebe0b4c0c80c615f54d'
var that
var fId = ''

var qrcode = 'https://mini.adorado.top/adCreativePlus/image_0.jpg?fileName=image_0.jpg&filePath=files/tmp/creative/de226348632a40af886a905ec6c0c805/599679690213860/images/scimages/image_0.jpg'

const constBudgetArr = { name: [5, 10, 15, 20, '自定义'], value: [5, 10, 15, 2, '自定义']}

Page({
  data: {
    items: [
      { name: 'USA', value: '美国' },
      { name: 'CHN', value: '中国', checked: 'true' },
      { name: 'BRA', value: '巴西' },
      { name: 'JPN', value: '日本' },
      { name: 'ENG', value: '英国' },
      { name: 'TUR', value: '法国' },
    ],
    items1: {
      'USA':[
      { name: 'USA', value: '美国1' },
      { name: 'CHN', value: '中国1', checked: 'true' },
      { name: 'BRA', value: '巴西1' },
      { name: 'JPN', value: '日本1' },
      { name: 'ENG', value: '英国1' },
      { name: 'TUR', value: '法国1' },
    ],
    
      'CHN':[
      { name: 'USA', value: '美国2' },
      { name: 'CHN', value: '中国2', checked: 'true' },
      { name: 'BRA', value: '巴西2' },
      { name: 'JPN', value: '日本2' },
      { name: 'ENG', value: '英国2' },
      { name: 'TUR', value: '法国2' },
    ],
    },

    items1Index: 'USA',
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    isChecked: '',

    budgetArr: constBudgetArr.name,
    budgetRangeIndex: 1,
    budgetRange: constBudgetArr.name[1],
    budgetPickerDisable: false,
    budgetInputDisable: true,
    prevUrl: qrcode
  },
  checkboxChange: function (e) {
    console.log('checkbox发生change事件，携带value值为：', e.detail.value)
    this.setData({
      items1Index: e.detail.value[0]
    })
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    that = this
    var d = '2018-10-10 12:12:12'
    var d1 = new Date(d)
    console.log('d1=', d1)
    
    var dd = '2018-10-10     12:12:12'
    var d2 = new Date(dd)

    console.log('d2=', d2)
    console.log('d2>d1?', d2>d1)
    console.log('d2.getTime()=', d2.getTime())
    console.log('d2.getTime()=', d2.getTime())
    console.log('d1.getTime()=', d1.getTime())

    console.log('d2.getTime == d1.getTime?', d2.getTime() == d1.getTime())
    console.log('d2==d1?', d2 == d1)

    console.log('d2-d1==0?', d2.getTime() - d1.getTime())
    console.log('d2<d1?', d2<d1)

    d1.setDate(d1.getDate() + 30)
    console.log('d1+7=', d1)
    console.log('d2>d1+7?', d2>d1+7)

    var now = util.formatTime(new Date(d))
    console.log('now=', now)
    console.log('now=', now.split(' ')[0])
    console.log('now=', now.split(' ')[1])

    wx.getNetworkType({
      success: function(res) {
        console.log('network=', res)
        that.setData({
          networkStatus2: res.networkType
        })
      },
    })
    
   wx.getSystemInfo({
     success: function(res) {
      that.setData({
        mHeight: res.windowHeight + 'px',
        mWidth: res.windowWidth + 'px'
      })
     },
   })
   
  },
  onPullDownRefresh: function(){
    wx.startPullDownRefresh()
  },
  getUserInfo: function(e) {
    console.log("1_e=",e)
    wx.navigateTo({
      url: '../bindfb/index',
      
    })
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  switch1Change: function(e){
    console.log('switch1 发生 change 事件，携带值为', e.detail.value)
    var status = e.detail.value
    var c = that.data.isChecked
    wx.showToast({
      title: status == true ? 'Active' : 'Pause',
    })
    that.setData({
      isChecked: status == true ? 'checked' : ''
    })
    // wx.onNetworkStatusChange(function (res) {
    //   console.log('network21222=', res)
    //   that.setData({
    //     networkStatus: res.isConnected,
    //     networkType: res.networkType,
    //   })
    // })
  },
  onShareAppMessage: function(res) {
    console.log(res)
    return {
      title: '自定义转发标题'
      // path: '/page/user?id=123'
    }
  },
  formSubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e)
    fId = e.detail.formId
    sendTextMsg()
  },
  formReset: function () {
    console.log('form发生了reset事件')
  },
  toWx: function () {
    wx.navigateTo({
      // url: '/https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzI3MDUwMzgyNw==#chat_redirect',
      url: '../bindfb/index',
    })
  },
  scanCode: function (e) {
    wx.previewImage({
      current: qrcode, // 当前显示图片的http链接   
      urls: [qrcode] // 需要预览的图片http链接列表   
    })
    wx.getImageInfo({// 获取图片信息（此处可不要）
      src: qrcode,
      success: function (res) {
        console.log('1_scanCode-success=', res)
        console.log(res.width)
        console.log(res.height)
      },
      fail: (res) => {
        console.log('1_scanCode-fail=', res)
      }
    })
  },
  toUploadImage: function(e){
    wx.chooseImage({
      success: function(res) {
        console.log('1_chooseImage=', res)
        var tmpPath = res.tempFilePaths[0]
        wx.uploadFile({
          url: 'http://localhost:8085/adImage/upload',
          filePath: tmpPath,//图片路径，如tempFilePaths[0]
          name: 'file',
          header: {
            "Content-Type": "multipart/form-data"
          },
          formData:
            {
              accountId: '599679690213860',
              accessToken: 'EAAXZBwRbZCCloBAAFK5uXf3GYiIEzZBZBQnQ88ARoRvcFaFEVLst8aZA8KFrPOzk5t1N6T4VXcaNxZAKIZBhRRdNSh63V81YWO0QejFXs69AgQ16adIuyoUw11IjNk4YjlG2GbaLqLBZBYUrmw6PpEXNu0okQjVFUTUgB7ZBfnqStLfyved7HqxbZC'
            },
          success: function (res) {
            console.log('1_uploadFile-success',res);
          },
          fail: function (res) {
            console.log('1_uploadFile-fail', res);
          },
          complete: function (res) {
            console.log('1_uploadFile-complete', res);
          }
        })
      },
    })
  },
  /**
   * 选择预算值
   */
  budgetChange: function (e) {
    console.log('1_budgetChange-e=', e)
    var dataset = e.currentTarget.dataset
    // 当前选择时间范围数组索引
    var setVal = e.detail.value
    var n = constBudgetArr.name[setVal]
    if(n == '自定义'){
      that.setData({
        budgetPickerDisable: true,
        budgetInputDisable: false
      })
    }else{
      that.setData({
        budgetRange: n,
        budgetRangeIndex: setVal
      })
    }
  },
  getBudgetValue000000000: function(e){
    console.log(e)
    var setVal = e.detail.value
    if (setVal == '') {
      that.setData({
        budgetPickerDisable: false,
        budgetInputDisable: true
      })
    }
  },
  budgetReset: function(){
    that.setData({
      budgetRangeIndex: 1,
      budgetRange: constBudgetArr.name[1],
      budgetPickerDisable: false,
      budgetInputDisable: true
    })
  }
})


function sendTextMsg() {
  wx.login({
    success: res => {
      // 发送 res.code 到后台换取 openId, sessionKey, unionId
      var code = res.code
      console.log("1_res.code=", res.code)
      wx.request({
        url: 'https://api.weixin.qq.com/sns/jscode2session',
        data: {
          appId: APP_ID,
          secret: APP_SECRET,
          js_code: code,
          grant_type: 'authorization_code'
        },
        method: 'GET',
        success: function (res11) {
          console.log("1_11resssssss=", res11)
          var openid = res11.data.openid

          wx.request({
            url: 'https://api.weixin.qq.com/cgi-bin/token',
            data: {
              grant_type: 'client_credential',
              appid: APP_ID,
              secret: APP_SECRET
            },
            success: function (res1) {
              console.log('1success', res1)
              console.log('1success-res.data', res1.data)
              var data1 = {
                "touser": openid,
                "template_id": 'qTSfzWWUuXbeEX9Du_HdH8K4l02-ShAIMkomBLq44rA',
                "page": "index",
                "form_id": fId,
                "data": {
                  "keyword1": {
                    "value": "339208499"
                  },
                  "keyword2": {
                    "value": "2015年01月05日 12:30"
                  },
                  "keyword3": {
                    "value": "粤海喜来登酒店"
                  },
                  "keyword4": {
                    "value": "广州市天河区天河路208号"
                  }
                },
                "emphasis_keyword": "keyword1.DATA"
              }
              console.log("1_req data=", data1)
              wx.showToast({
                title: '1',
              })
              var token = res1.data.access_token
              // var token = 'da070e864dd6cd2b985321479e4df621'
              var url = 'https://api.weixin.qq.com/cgi-bin/message/custom/send?access_token=' + token
              wx.request({
                url: url,
                data: data1,
                method: 'POST',
                header: { 'content-type': 'application/json' },
                success: function (res) {
                  wx.showToast({
                    title: '2',
                  })
                  console.log('2success', res)
                  console.log('2success-res.data', res.data)
                },
                fail: function (res) {
                  wx.showToast({
                    title: '3',
                  })
                  console.log('2fail', res)
                },
                complete: function (res) {
                  // console.log('2complete', res)
                }

              })
            },
            fail: function (res) {
              console.log('1fail', res)
            },
            complete: function (res) {
              // console.log('1complete', res)
            }
          })
        }
      })
    }
  })
}