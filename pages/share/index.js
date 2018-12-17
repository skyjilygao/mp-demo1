// pages/share/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    width: wx.getSystemInfoSync().windowWidth,
    height: wx.getSystemInfoSync().windowHeight
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
    var width = wx.getSystemInfoSync().windowWidth
    var height = wx.getSystemInfoSync().windowHeight
    var fontSize = wx.getSystemInfoSync().fontSizeSetting
    var context = wx.createCanvasContext('share')
    // context.setStrokeStyle("#00ff00")
    // context.setLineWidth(5)
    context.setFillStyle('red')
    context.fillRect(0, 0, width, height)
    // context.stroke()
    // context.fill()
    var str = 'sdfsddddddd'
    console.log(width + '----' + height + ",fontSize=" + fontSize)
    context.setFontSize(21)
    context.setTextAlign('center')
    context.setFillStyle('#000')
    context.fillText(str, width / 2, 100)

    // context.draw(false, this.getTempFilePath)
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

  },
  //获取临时路径
  getTempFilePath: function () {
    var width = wx.getSystemInfoSync().windowWidth
    var height = wx.getSystemInfoSync().windowHeight
    wx.canvasToTempFilePath({
      x: 0,
      y: 0,
      // width: width,
      // height: height,
      destWidth: width,
      destHeight: height,
      canvasId: 'share',
      success: (res) => {
        this.setData({
          shareTempFilePath: res.tempFilePath
        })
      }
    })
  },
  //保存至相册
  saveImageToPhotosAlbum: function () {
    console.log('1_', this.data.shareTempFilePath)
    if (!this.data.shareTempFilePath) {
      wx.showModal({
        title: '提示',
        content: '图片绘制中，请稍后重试',
        showCancel: false
      })
    }
    wx.saveImageToPhotosAlbum({

      filePath: this.data.shareTempFilePath,
      success: (res) => {
        console.log(res)
        wx.showToast({
          title: '保存成功',
        })
      },
      fail: (err) => {
        wx.showToast({
          title: '保存失败',
        })
        console.log(err)
      }
    })
  },

  //保存至相册
  saveImageToPhotosAlbum1: function () {
    console.log('1_')
    var width = wx.getSystemInfoSync().windowWidth
    var height = wx.getSystemInfoSync().windowHeight
    var fontSize = wx.getSystemInfoSync().fontSizeSetting

    const ctx = wx.createCanvasContext('share')
    ctx.setFillStyle('#fff')
    ctx.fillRect(0, 0, width, height)
    var image = '../../image/ad_warn_icon.png'
    var imgWidth = ''
    var imgHeight = ''
    wx.getImageInfo({
      src: image,
      success: function (res) {
        console.log('1_----', res)
        imgWidth = res.width
        imgHeight = res.height
      
    console.log('1_233333-width-', width)
    console.log('1_233333-imgWidth-', imgWidth)
    console.log('1_233333-', width / 2 - 25)
    ctx.drawImage(image, (width / 2) - 25, 0, 50, 50)
    ctx.setTextAlign('center')
    ctx.setFillStyle('#000')
    ctx.fillText('222', width / 2, 80)
    ctx.setFontSize(21)
    // return
    ctx.draw(true, setTimeout(function () {
      wx.canvasToTempFilePath({
        x: 0,
        y: 0,
        width: width,
        height: height,
        destWidth: width,
        destHeight: height,
        canvasId: 'share',
        success: function (res) {
          console.log('1_path-res', res)
          wx.saveImageToPhotosAlbum({
            filePath: res.tempFilePath,
            success: (res) => {
              wx.showToast({
                title: '保存成功',
              })
              console.log(res)
            },
            fail: (err) => {
              console.log(err)
              wx.showToast({
                title: '保存失败',
              })
            }
          })
        }
      })
    }, 100))
      },
      fail: function (res) {
        console.log('1_222-', res)
      }
    })
    
  },
  scanCode: function(e){
    wx.previewImage({
      current: 'http://test.adorado.top/theme/adorado_l/images/qrcode.jpg', // 当前显示图片的http链接   
      urls: ['http://test.adorado.top/theme/adorado_l/images/qrcode.jpg'] // 需要预览的图片http链接列表   
    }) 
    wx.getImageInfo({// 获取图片信息（此处可不要）
      src: 'http://test.adorado.top/theme/adorado_l/images/qrcode.jpg',
      success: function (res) {
        console.log('1_scanCode-success=', res)
        console.log(res.width)
        console.log(res.height)
      },
      fail: (res)=>{
        console.log('1_scanCode-fail=', res)
      }
    })
    // wx.scanCode({
    //   success: (res) => {
    //     console.log('1_scanCode-success=',res)
    //   },
    //   fail: (res)=>{
    //     console.log('1_scanCode-fail=', res)
    //   }
    // })
  }
})