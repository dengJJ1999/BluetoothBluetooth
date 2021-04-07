// pages/login/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isLogin: false,
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
  async getUserInfo(e) {
    console.log(e)
    const that = this
    if (e.detail.userInfo) {
      console.log('成功')
      wx.login({
        success(res) {
          console.log('成功', res)
          if (res.code) {
            console.log('成')
            //发起网络请求
            wx.request({
              url: 'https://test.com/onLogin',
              data: {
                code: res.code
              }
            })
          wx.setStorageSync('isLogin', true)
            wx.reLaunch({
              url: '../home/index'
            })
          } else {
            console.log('登录失败！' + res.errMsg)
          }
          // wx.setStorageSync('isLogin', true)
          // wx.navigateBack({
          //   delta: 1,
          // })
          // wx.reLaunch({
          //   url: '../home/index'
          // })
          // wx.request({
          //   url: app.globalData.globalReqUrl + '/login/login', // 仅为示例，并非真实的接口地址
          //   method: 'post',
          //   data: {
          //     username: that.data.username,
          //     password: that.data.password
          //   },
          //   header: {
          //     'content-type': 'application/x-www-form-urlencoded' // 默认值
          //   },
          //   success(res) {
          //     if (res.data.code == "OK") {
          //       var unitName = res.data.data.User.unitName;
          //       var unitId = res.data.data.User.unitId;
          //       wx.setStorageSync('unitId', unitId);
          //       wx.setStorageSync('unitName', unitName);
          //       wx.switchTab({
          //         url: '../overviewData/realTimeData'
          //       })
          //     } else {
          //       wx.showToast({
          //         title: res.data.message,
          //         icon: 'none',
          //         duration: 2000
          //       })
          //     }
          //   }
          // })
        },
        fail(res) {
          console.log('失败', res)
        }
      })
    } else {
      console.log('拒绝')
      wx.showToast({
        title: '拒绝授权无法进入',
      })
    }

  },
})