// pages/home/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    status: true, //开关状态
    tips: true, //遥控数量 可用状态
    total: 22, //遥控总数量
    size: 1, //遥控第几个
    uid: '', // 用户ID
    uuid: '', // 设备ID
    category_id: '', // 设备类型ID
    remote_index: '', // 遥控器索引数组index
    BrandArr: [], // 空调品牌数组
    buttonH: [{
        text: "模式",
        imgUrl: "../../img/desk/pic_1@2x.png",
      },
      {
        text: "风速",
        imgUrl: "../../img/desk/pic_2@2x.png",
      },
      {
        text: "定时",
        imgUrl: "../../img/desk/pic_3@2x.png",
      },
      {
        text: "节能",
        imgUrl: "../../img/desk/pic_4@2x.png",
      },
      {
        text: "睡眠",
        imgUrl: "../../img/desk/pic_5@2x.png",
      }
    ],
    temp: 25,
    modeValue: 0,
    windValue: 0,
    // modeArr: ['制冷','制热','自动','通风','除湿'],
    modeArr: '制冷',
    windArr: ['自动','低速','中速','高速'],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.cloud.init()
    let netWorkInfo = wx.getStorageSync('netWorkInfo')
    if (netWorkInfo) {
      console.log('本地缓存', netWorkInfo)
      this.setData({
        uid: netWorkInfo.uid,
        uuid: netWorkInfo.uuid,
        category_id: netWorkInfo.category_id,
        remote_index: netWorkInfo.remote_index,
        BrandArr: netWorkInfo.BrandArr,
      })
      let a = this.data
      console.log('本地缓存获取到data', a.uid, a.uuid, a.category_id, a.remote_index, a.BrandArr)
    } else {
      wx.redirectTo({
        url: '../aiNetworkingControl/index',
      })

      // wx.navigateTo({
      //   url: '../aiNetworkingControl/index',
      // })
    }

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

  openBtn() {
    const params = {
      // name 云函数的名称  建议使用 ty-service
      name: "ty-service",
      data: {
        // action 对应的接口名  具体接口可以参数 API 文档
        action: "infrared.acTestCommand",
        // params 接口参数
        params: {
          infrared_id: this.data.uuid,
          remote_index: this.data.remote_index,
          category_id: parseInt(this.data.category_id),
          code: 'power',
          value: 0
        },
      },
    };
    console.log('测试按钮 params', params)
    // 调用接口
    wx.cloud.callFunction(params).then(res => {
      this.setData({
        status: !this.data.status,
        temp: 25,
        modeValue: 0,
        windValue: 0,
        modeValue2: 1,
      })
      console.log('遥控器索引 测试', res);
    }).catch(err => console.log('err', err))
  },
  closeBtn() {
    const params = {
      // name 云函数的名称  建议使用 ty-service
      name: "ty-service",
      data: {
        // action 对应的接口名  具体接口可以参数 API 文档
        action: "infrared.acTestCommand",
        // params 接口参数
        params: {
          infrared_id: this.data.uuid,
          remote_index: this.data.remote_index,
          category_id: parseInt(this.data.category_id),
          code: 'power',
          value: 1
        },
      },
    };
    console.log('测试按钮 params', params)
    // 调用接口
    wx.cloud.callFunction(params).then(res => {
      this.setData({
        status: !this.data.status
      })
      console.log('遥控器索引 测试', res);
    }).catch(err => console.log('err', err))
  },
  shangBtn() {
    const params = {
      // name 云函数的名称  建议使用 ty-service
      name: "ty-service",
      data: {
        // action 对应的接口名  具体接口可以参数 API 文档
        action: "infrared.acTestCommand",
        // params 接口参数
        params: {
          infrared_id: this.data.uuid,
          remote_index: this.data.remote_index,
          category_id: parseInt(this.data.category_id),
          code: 'temp',
          value: this.data.temp < 30 ? this.data.temp + 1 : 30
        },
      },
    };
    console.log('测试按钮 params', params)
    // 调用接口
    wx.cloud.callFunction(params).then(res => {
      this.setData({
        temp: this.data.temp < 30 ? this.data.temp + 1 : 30
      })
      console.log('遥控器索引 测试', res);
    }).catch(err => console.log('err', err))
  },
  xiaBtn() {
    const params = {
      // name 云函数的名称  建议使用 ty-service
      name: "ty-service",
      data: {
        // action 对应的接口名  具体接口可以参数 API 文档
        action: "infrared.acTestCommand",
        // params 接口参数
        params: {
          infrared_id: this.data.uuid,
          remote_index: this.data.remote_index,
          category_id: parseInt(this.data.category_id),
          code: 'temp',
          value: this.data.temp > 16 ? this.data.temp - 1 : 16
        },
      },
    };
    console.log('测试按钮 params', params)
    // 调用接口
    this.setData({
      temp: this.data.temp > 16 ? this.data.temp - 1 : 16
    })
    wx.cloud.callFunction(params).then(res => {
      console.log('遥控器索引 测试', res);
    }).catch(err => console.log('err', err))
  },
  // 模式
  modeBtn(e) {
    console.log('dd',e.currentTarget.dataset.i)
    let modeValue = this.data.modeValue + 1
    if (modeValue == 5) {
      modeValue = 0
    }
    const params = {
      // name 云函数的名称  建议使用 ty-service
      name: "ty-service",
      data: {
        // action 对应的接口名  具体接口可以参数 API 文档
        action: "infrared.acTestCommand",
        // params 接口参数
        params: {
          infrared_id: this.data.uuid,
          remote_index: this.data.remote_index,
          category_id: parseInt(this.data.category_id),
          code: 'mode',
          // value: modeValue == 0 ? modeValue : modeValue - 1
          value: 0
          // value: modeValue
        },
      },
    };
    console.log('测试按钮 params', params)
    // 调用接口
    this.setData({
      modeValue: modeValue,
      temp: 16
    })
    wx.cloud.callFunction(params).then(res => {
      console.log('遥控器索引 测试', res);
    }).catch(err => console.log('err', err))
  },
  windBtn() {
    let windValue = this.data.windValue + 1
    if (windValue == 4) {
      windValue = 0
    }
    const params = {
      // name 云函数的名称  建议使用 ty-service
      name: "ty-service",
      data: {
        // action 对应的接口名  具体接口可以参数 API 文档
        action: "infrared.acTestCommand",
        // params 接口参数
        params: {
          infrared_id: this.data.uuid,
          remote_index: this.data.remote_index,
          category_id: parseInt(this.data.category_id),
          code: 'wind',
          value: windValue
          // value: windValue == 0 ? windValue : windValue - 1
        },
      },
    };
    console.log('测试按钮 params', params)
    // 调用接口
    this.setData({
      windValue: windValue,
      temp: 16
    })
    wx.cloud.callFunction(params).then(res => {
      console.log('遥控器索引 测试', res);
    }).catch(err => console.log('err', err))
  },

  // 返回 ,跳转桌子，灯
  goBack: function () {
    wx.reLaunch({
      url: '../home/index',
    })
  },
  goDesk: function () {
    wx.reLaunch({
      url: "/pages/aiUpAndDownDesk/index",
    })
  },
  goLight:function(){
    wx.reLaunch({
      url:  "/pages/aiLighting/index",
      // url:  "/pages/aiNetworkingControl/index",
    })
  },


  again () {
    wx.showModal({
      title: '提示',
      content: '重新配网将会把现有配置信息清除',
      confirmColor: '#bccc43',
      confirmText: '重置',
      success (res) {
        if (res.confirm) {
          wx.removeStorageSync('netWorkInfo')
          wx.redirectTo({
            url: '../aiNetworkingControl/index',
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },

  //底部切换遥控 框
  //隐藏底部切换遥控
  closeTips: function () {
    this.setData({
      tips: false
    })
  },
  //下一个遥控按钮
  next: function () {
    this.setData({

    })
  },
})