// pages/environmentalManagement/androidAppDms/index.js
// import { http } from '../../../utils/http.js'
// import {
//   domain
//   , api
// } from '../../../api/api'
const plugin = requirePlugin('tuya-ap-plugin')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    againText: '点击进入配网',
    uid: '', // 涂鸦用户ID ‘ay1582981255622T****’
    homeId: '',
    pageState: '',
    clientId: '', // 第三方唯一标识，对应 IoT 工作台上的 小程序 SDK AccessID
    ticket: '', // 用户配网票据
    // uuid: wx.getStorageSync('uuid') ? wx.getStorageSync('uuid') : '', // 设备Id
    // BrandArr: wx.getStorageSync('BrandArr') ? wx.getStorageSync('BrandArr') : [], // 空调品牌
    // BrandArr2: wx.getStorageSync('BrandArr') ? wx.getStorageSync('BrandArr') : [], // 空调品牌
    // category_id: wx.getStorageSync('category_id') ? wx.getStorageSync('category_id') : '', // 设备类型ID
    uuid: '', // 设备Id
    BrandArr: [], // 空调品牌
    BrandArr2: [], // 空调品牌
    category_id: '', // 设备类型ID
    remote_indexArr: '', // 遥控器索引数组
    // remote_indexShow: '', // 遥控器索引弹窗
    sta_index: 1, // 测试的第一个
    brand_id: 1, // 品牌ID
    brand_name: 1, // 品牌名称
    value: 0,
    remote_indexShow: false,
    isOpenBtn: true,

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.cloud.init()
    this.getTuYaUid()
    const that = this
    wx.showLoading({
      title: '正在初始化...',
      mask: true
    })
    setTimeout(function () {
      wx.hideLoading({
        success() {
          that.jumpUrl()
        }
      })
    }, 5000)
    // if (!this.data.uuid) {
    //   wx.showLoading({
    //     title: '加载中',
    //     mask: true
    //   })
    //   setTimeout(function () {
    //     wx.hideLoading({
    //       success(){
    //         that.jumpUrl()
    //       }
    //     })
    //   }, 2000)
    // }
    //  else {
    //   this.setData({
    //     uuid: requirePlugin('tuya-ap-plugin').getNetworkConnect().deviceInfo.id,
    //   })
    //   // wx.setStorageSync('uuid', requirePlugin('tuya-ap-plugin').getNetworkConnect().deviceInfo.id)
    //   this.deviceSupportType()
    // }
  },

  // 返回 ,跳转桌子
  goBack() {
    wx.reLaunch({
      url: '../home/index',
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
    const that = this
    this.setData({
      uuid: requirePlugin('tuya-ap-plugin').getNetworkConnect().deviceInfo.id,
    })
    // wx.setStorageSync('uuid', requirePlugin('tuya-ap-plugin').getNetworkConnect().deviceInfo.id)
    this.deviceSupportType()

    // if (!uid) {
    //   console.log('!')

    //   wx.setStorageSync('uid', uid)
    //   this.queryUserInfo(uid)
    //   this.deviceSupportType()
    // } else {
    //   console.log('=')
    //   this.setData({
    //     againText: '点击重新配网',
    //   })
    //   this.queryUserInfo(uid)
    //   this.deviceSupportType()
    // }
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

  // 涂鸦查询用户信息
  queryUserInfo(uid) {
    const params = {
      // name 云函数的名称  建议使用 ty-service
      name: "ty-service",
      data: {
        // action 对应的接口名  具体接口可以参数 API 文档
        action: "user.infos",
        // params 接口参数
        params: {
          uid: uid,
        },
      },
    };
    // 调用接口
    wx.cloud.callFunction(params).then(res => {
      console.log('涂鸦查询用户信息 res', res);
    }).catch(err => console.log('err', err))
  },

  // 搜索
  searchData(e) {
    const data = this.data
    const that = this
    console.log('查询', e.detail.value)
    this.setData({
      searchValue: e.detail.value
    })
    if (data.searchValue === '') {
      this.setData({
        BrandArr: this.data.BrandArr2,
        isShow: true,
        // sta_index: 1
      })
    } else if (data.searchValue !== '') {
      const BrandArr = []
      for (const k in this.data.BrandArr2) {
        if (this.data.BrandArr2[k].brand_name.indexOf(data.searchValue) >= 0) {
          BrandArr.push(this.data.BrandArr2[k])
          console.log('查看 BrandArr', BrandArr)
          that.setData({
            BrandArr: BrandArr,
            isShow: true
          })
          console.log('查看 airConditioner', data.airConditioner)
        }
      }
    }
  },
  /**
   *******************   ***************** 绑定设备  ***************** 绑定设备  ***************** 绑定设备
   */
  // 设备支持设备类型
  deviceSupportType() {
    wx.showLoading({
      title: '加载中...',
      mask: true
    })
    const params = {
      // name 云函数的名称  建议使用 ty-service
      name: "ty-service",
      data: {
        // action 对应的接口名  具体接口可以参数 API 文档
        action: "infrared.category",
        // params 接口参数
        params: {
          // infrared_id: "vdevo157924607038167"
          infrared_id: this.data.uuid,
        },
      },
    };
    // 调用接口
    wx.cloud.callFunction(params).then(res => {
      console.log('107 res', res);
      for (let i in res.result.data) {
        // console.log('---147', res.result.data[i].category_name)
        let data = res.result.data[i].category_name
        if (data == '空调') {
          this.setData({
            category_id: res.result.data[i].category_id
          })
          // wx.setStorageSync('category_id', res.result.data[i].category_id)
          this.deviceSupportBrand()
        }
      }
    }).catch(err => console.log('err', err))
  },

  // 设备支持设备品牌
  deviceSupportBrand() {
    const params = {
      // name 云函数的名称  建议使用 ty-service
      name: "ty-service",
      data: {
        // action 对应的接口名  具体接口可以参数 API 文档
        action: "infrared.categoryBrand",
        // params 接口参数
        params: {
          infrared_id: this.data.uuid,
          category_id: this.data.category_id,
        },
      },
    };
    console.log('设备支持设备品牌 params', params)
    // 调用接口
    wx.cloud.callFunction(params).then(res => {
      console.log('空调品牌', res);
      for (let i in res.result.data) {
        console.log('所有空调', res.result.data[i])
      }
      this.setData({
        BrandArr: res.result.data,
        BrandArr2: res.result.data,
      })
      setTimeout(function () {
        wx.hideLoading()
      }, 1000)      
      // wx.setStorageSync('BrandArr', res.result.data)
    }).catch(err => console.log('err', err))
  },

  // 选择空调品牌遥控器索引遥控器索引
  gotoIndex(e) {
    console.log('e', e.currentTarget.dataset.brandid)
    console.log('空调名', e.currentTarget.dataset.name)
    // console.log('BrandArr', this.data.BrandArr)
    let index = e.currentTarget.dataset.brandid
    for (let i in this.data.BrandArr) {
      let data = this.data.BrandArr[i]
      if (data.brand_id == index) {
        // console.log('空调名',data.brand_name)
        this.setData({
          brand_id: data.brand_id,
          brand_name: data.brand_name,
          isShow: false,
          sta_index: 1
        })
      }
    }

    const params = {
      // name 云函数的名称  建议使用 ty-service
      name: "ty-service",
      data: {
        // action 对应的接口名  具体接口可以参数 API 文档
        action: "infrared.categoryBrandRemote",
        // params 接口参数
        params: {
          infrared_id: this.data.uuid,
          category_id: this.data.category_id,
          brand_id: index,
        },
      },
    };
    console.log('选择空调品牌遥控器索引遥控器索引 params', params)
    // 调用接口
    wx.cloud.callFunction(params).then(res => {
      // console.log('遥控器索引  index', res);
      this.setData({
        remote_indexArr: res.result.data,
        remote_indexShow: true,
      })
      // this.AddBtn()
    }).catch(err => console.log('err', err))
  },
  // 下一个
  nextIndex(e) {
    // console.log('下一个 e', e.currentTarget.dataset.value)
    let index = parseInt(e.currentTarget.dataset.value)
    let arrIndex = this.data.remote_indexArr.length
    if (index + 1 == arrIndex + 1) {
      this.setData({
        sta_index: 1
      })
    }
    if (index < arrIndex) {
      this.setData({
        sta_index: index + 1
      })
    }
  },

  testBtn(e) {
    let value
    // console.log('testBtn的e', e.currentTarget.dataset.value)
    if (this.data.isOpenBtn) {
      value = 1
    } else if (!this.data.isOpenBtn) {
      value = 0
    }
    console.log(this.data.uuid, '设备id，遥控id')
    const params = {
      // name 云函数的名称  建议使用 ty-service
      name: "ty-service",
      data: {
        // action 对应的接口名  具体接口可以参数 API 文档
        action: "infrared.acTestCommand",
        // params 接口参数
        params: {
          infrared_id: this.data.uuid,
          remote_index: parseInt(this.data.remote_indexArr[this.data.sta_index - 1].remote_index),
          category_id: parseInt(this.data.category_id),
          code: 'power',
          value: value
        },
      },
    };
    console.log('测试按钮 params', params)
    // 调用接口
    wx.cloud.callFunction(params).then(res => {
      this.setData({
        isOpenBtn: !this.data.isOpenBtn
      })
      console.log('遥控器索引 测试', res);
      console.log('测试-2', res.result.data);
      console.log('测试-3', res.result.success);

    }).catch(err => console.log('err', err))
  },

  gotoAir() {
    let uid, uuid, category_id, remote_index, BrandArr
    uid = this.data.uid // 用户ID
    uuid = this.data.uuid // 设备ID
    category_id = this.data.category_id // 设备类型ID
    remote_index = parseInt(this.data.remote_indexArr[this.data.sta_index - 1].remote_index) // 遥控器索引数组index的值
    BrandArr = this.data.BrandArr2 // 空调组
    let netWorkInfo = {
      uid,
      uuid,
      category_id,
      remote_index,
      BrandArr
    }
    console.log('查看', netWorkInfo)
    wx.setStorageSync('netWorkInfo', netWorkInfo)
    wx.redirectTo({
      url: '../AirConditioner/index',
    })
  },
  /**
   ******************* 重新配网  ***************** 重新配网  ***************** 重新配网  ***************** 重新配网
   */
  // // 测试芸函数
  // testfu() {
  //   const params = {
  //     // name 云函数的名称，建议使用 ty-service
  //     name: "ty-service",
  //     data: {
  //       // action 为对应的接口名，具体接口可以参考 API 文档
  //       action: "hello",
  //       // params 接口参数
  //       params: {
  //         hello: 'world'
  //       }
  //     }
  //   };
  //   // 调用接口
  //   wx.cloud.callFunction(params).then(res => {
  //     console.log('res', res);
  //   }).catch(err => console.log('err', err))
  // },
  async jumpUrl(e) {
    const ticket = this.data.ticket
    const clientId = 'hthnsukru793wkng9uww'
    const homeId = this.data.homeId
    const userId = this.data.uid
    wx.showModal({
      title: '提示',
      content: '配网需要开启手机的定位以及WiFi,配网过程请不要退出页面,否则将会数据错误导致配网失败',
      confirmText: '开始配网',
      confirmColor: '#bccc43',
      success(res) {
        if (res.confirm) {
          wx.navigateTo({
            // url: `plugin://tuya-ap-plugin/step1?ticket=${ticket}&clientId=${clientId}`
            url: `plugin://tuya-ap-plugin/step1?ticket=${ticket}&clientId=${clientId}&uiMode="lime"`
          })
        } else if (res.cancel) {
          wx.reLaunch({
            url: '../home/index',
          })
        }
      }
    })
  },
  getTuYaUid(e) {
    const that = this
    const params = {
      // name 云函数的名称  建议使用 ty-service
      name: 'ty-service',
      data: {
        // action 对应的接口名  具体接口可以参数 API 文档
        action: 'user.wx-applet.synchronization',
        // params 接口参数
        params: {
          open_id: 'cloud',
          app_schema: 'cloud'
        }
      }
    }
    // 调用接口
    wx.cloud
      .callFunction(params)
      .then((res) => {
        console.log('124 ---res', res)
        that.setData({
          uid: res.result.data.uid
        })
        // wx.setStorageSync('uid', res.result.data.uid)
        this.queryUserInfo(res.result.data.uid)
        that.getTuYaTicket(res.result.data.uid)
        that.getTuYaHomeId(res.result.data.uid)
      })
      .catch((err) => console.log('131 ---err', err))
    // that.getTuYaTicket(that.data.uid)
    // that.getTuYaHomeId(that.data.uid)
  },
  getTuYaTicket(uid) {
    const that = this
    const params = {
      // name 云函数的名称  建议使用 ty-service
      name: 'ty-service',
      data: {
        // action 对应的接口名  具体接口可以参数 API 文档
        action: 'system.userTicket',
        // params 接口参数
        params: {
          uid: uid
        }
      }
    }

    // 调用接口
    wx.cloud
      .callFunction(params)
      .then((res) => {
        console.log('154 ----res', res)
        that.setData({
          ticket: res.result.data.ticket
        })
      })
      .catch((err) => console.log('159 -----err', err))
  },
  getTuYaHomeId(uid) {
    // console.log('333')
    const that = this
    const params = {
      // name 云函数的名称  建议使用 ty-service
      name: 'ty-service',
      data: {
        // action 对应的接口名  具体接口可以参数 API 文档
        action: 'home.memberHomeList',
        // params 接口参数
        params: {
          uid: uid
        }
      }
    }

    // 调用接口
    wx.cloud
      .callFunction(params)
      .then((res) => {
        console.log('181 ----res', res)
        that.setData({
          homeId: res.result.data[0].home_id
        })
      })
      .catch((err) => console.log('186 ----err', err))
  },
  // 添加普通遥控器
  AddBtn() {
    console.log('检查索引A', this.data.remote_indexArr)
    console.log('检查索引B', this.data.remote_indexArr[this.data.sta_index - 1])
    console.log('检查索引C', this.data.remote_indexArr[this.data.sta_index - 1].remote_index)
    const params = {
      // name 云函数的名称  建议使用 ty-service
      name: "ty-service",
      data: {
        // action 对应的接口名  具体接口可以参数 API 文档
        action: "infrared.addNormalRemote",
        // params 接口参数
        params: {
          infrared_id: this.data.uuid,
          category_id: this.data.category_id,
          brand_id: this.data.brand_id,
          brand_name: this.data.brand_name,
          remote_index: this.data.remote_indexArr[this.data.sta_index - 1].remote_index,
          remote_name: 'k称',
          isOpenBtn: parseInt(this.data.isOpenBtn) === 1 ? 0 : 1
        },
      },
    };

    // 调用接口
    wx.cloud.callFunction(params).then(res => {
      console.log('遥控器索引 AddBtn', res);
      console.log('遥控器索引 校验', res.result.data.remote_id);
      this.setData({
        remote_id: res.result.data.remote_id
      })
    }).catch(err => console.log('err', err))
  },
})