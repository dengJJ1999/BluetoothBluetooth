// pages/aaa/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    fast: false,
    bleType: false,
    buff: [0x6d, 0xb6, 0x43, 0x5f, 0x6e, 0x7f, 0x37, 0xa1, 0xe7, 0x0f, 0xb4],
    index: 3,
    orderArr: [{
        name: '亮',
        buff: [0x6d, 0xb6, 0x43, 0x5f, 0x6e, 0x7f, 0x37, 0xa1, 0xe5, 0x1d, 0x97]
      },
      {
        name: '暗',
        buff: [0x6d, 0xb6, 0x43, 0x5f, 0x6e, 0x7f, 0x37, 0xa1, 0xe4, 0x94, 0x86]
      },
      {
        name: '关',
        buff: [0x6d, 0xb6, 0x43, 0x5f, 0x6e, 0x7f, 0x37, 0xa1, 0xe7, 0x0f, 0xb4]
      },
      {
        name: '开',
        buff: [0x6d, 0xb6, 0x43, 0x5f, 0x6e, 0x7f, 0x37, 0xa1, 0xe6, 0x86, 0xa5]
      },
      {
        name: '红',
        buff: [0x6d, 0xb6, 0x43, 0x5f, 0x6e, 0x7f, 0x37, 0xa1, 0xe1, 0x39, 0xd1]
      },
      {
        name: '绿',
        buff: [0x6d, 0xb6, 0x43, 0x5f, 0x6e, 0x7f, 0x37, 0xa1, 0xe0, 0xb0, 0xc0]
      },
      {
        name: '蓝',
        buff: [0x6d, 0xb6, 0x43, 0x5f, 0x6e, 0x7f, 0x37, 0xa1, 0xe3, 0x2b, 0xf2]
      },
      {
        name: '白',
        buff: [0x6d, 0xb6, 0x43, 0x5f, 0x6e, 0x7f, 0x37, 0xa1, 0xe2, 0xa2, 0xe3]
      },
      {
        name: '3-1',
        buff: [0x6d, 0xb6, 0x43, 0x5f, 0x6e, 0x7f, 0x37, 0xa1, 0xed, 0x55, 0x1b]
      },
      {
        name: '3-2',
        buff: [0x6d, 0xb6, 0x43, 0x5f, 0x6e, 0x7f, 0x37, 0xa1, 0xec, 0xdc, 0x0a]
      },
      {
        name: '3-3',
        buff: [0x6d, 0xb6, 0x43, 0x5f, 0x6e, 0x7f, 0x37, 0xa1, 0xef, 0x47, 0x38]
      },
      {
        name: '3-4',
        buff: [0x6d, 0xb6, 0x43, 0x5f, 0x6e, 0x7f, 0x37, 0xa1, 0xee, 0xce, 0x29]
      },
      {
        name: '4-1',
        buff: [0x6d, 0xb6, 0x43, 0x5f, 0x6e, 0x7f, 0x37, 0xa1, 0xe9, 0x71, 0x5d]
      },
      {
        name: '4-2',
        buff: [0x6d, 0xb6, 0x43, 0x5f, 0x6e, 0x7f, 0x37, 0xa1, 0xe8, 0xf8, 0x4c]
      },
      {
        name: '4-3',
        buff: [0x6d, 0xb6, 0x43, 0x5f, 0x6e, 0x7f, 0x37, 0xa1, 0xeb, 0x63, 0x7e]
      },
      {
        name: '4-4',
        buff: [0x6d, 0xb6, 0x43, 0x5f, 0x6e, 0x7f, 0x37, 0xa1, 0xea, 0xea, 0x6f]
      },
      {
        name: '5-1',
        buff: [0x6d, 0xb6, 0x43, 0x5f, 0x6e, 0x7f, 0x37, 0xa1, 0xf5, 0x9c, 0x87]
      },
      {
        name: '5-2',
        buff: [0x6d, 0xb6, 0x43, 0x5f, 0x6e, 0x7f, 0x37, 0xa1, 0xf4, 0x15, 0x96]
      },
      {
        name: '5-3',
        buff: [0x6d, 0xb6, 0x43, 0x5f, 0x6e, 0x7f, 0x37, 0xa1, 0xf7, 0x8e, 0xa4]
      },
      {
        name: '5-4',
        buff: [0x6d, 0xb6, 0x43, 0x5f, 0x6e, 0x7f, 0x37, 0xa1, 0xf6, 0x07, 0xb5]
      },
      {
        name: '6-1',
        buff: [0x6d, 0xb6, 0x43, 0x5f, 0x6e, 0x7f, 0x37, 0xa1, 0xf1, 0xb8, 0xc1]
      },
      {
        name: '6-2',
        buff: [0x6d, 0xb6, 0x43, 0x5f, 0x6e, 0x7f, 0x37, 0xa1, 0xf0, 0x31, 0xd0]
      },
      {
        name: '6-3',
        buff: [0x6d, 0xb6, 0x43, 0x5f, 0x6e, 0x7f, 0x37, 0xa1, 0xf3, 0xaa, 0xe2]
      },
      {
        name: '6-4',
        buff: [0x6d, 0xb6, 0x43, 0x5f, 0x6e, 0x7f, 0x37, 0xa1, 0xf2, 0x23, 0xf3]
      },
    ],
    lampColor: [{
        name: '红',
        buff: [0x6d, 0xb6, 0x43, 0x5f, 0x6e, 0x7f, 0x37, 0xa1, 0xe1, 0x39, 0xd1]
      },
      {
        name: '绿',
        buff: [0x6d, 0xb6, 0x43, 0x5f, 0x6e, 0x7f, 0x37, 0xa1, 0xe0, 0xb0, 0xc0]
      },
      {
        name: '蓝',
        buff: [0x6d, 0xb6, 0x43, 0x5f, 0x6e, 0x7f, 0x37, 0xa1, 0xe3, 0x2b, 0xf2]
      },
      {
        name: '白',
        buff: [0x6d, 0xb6, 0x43, 0x5f, 0x6e, 0x7f, 0x37, 0xa1, 0xe2, 0xa2, 0xe3]
      },
      {
        name: '3-1',
        buff: [0x6d, 0xb6, 0x43, 0x5f, 0x6e, 0x7f, 0x37, 0xa1, 0xed, 0x55, 0x1b]
      },
      {
        name: '3-2',
        buff: [0x6d, 0xb6, 0x43, 0x5f, 0x6e, 0x7f, 0x37, 0xa1, 0xec, 0xdc, 0x0a]
      },
      {
        name: '3-3',
        buff: [0x6d, 0xb6, 0x43, 0x5f, 0x6e, 0x7f, 0x37, 0xa1, 0xef, 0x47, 0x38]
      },
      {
        name: '4-1',
        buff: [0x6d, 0xb6, 0x43, 0x5f, 0x6e, 0x7f, 0x37, 0xa1, 0xe9, 0x71, 0x5d]
      },
      {
        name: '4-2',
        buff: [0x6d, 0xb6, 0x43, 0x5f, 0x6e, 0x7f, 0x37, 0xa1, 0xe8, 0xf8, 0x4c]
      },
      {
        name: '4-3',
        buff: [0x6d, 0xb6, 0x43, 0x5f, 0x6e, 0x7f, 0x37, 0xa1, 0xeb, 0x63, 0x7e]
      },
      {
        name: '5-1',
        buff: [0x6d, 0xb6, 0x43, 0x5f, 0x6e, 0x7f, 0x37, 0xa1, 0xf5, 0x9c, 0x87]
      },
      {
        name: '5-2',
        buff: [0x6d, 0xb6, 0x43, 0x5f, 0x6e, 0x7f, 0x37, 0xa1, 0xf4, 0x15, 0x96]
      },
      {
        name: '5-3',
        buff: [0x6d, 0xb6, 0x43, 0x5f, 0x6e, 0x7f, 0x37, 0xa1, 0xf7, 0x8e, 0xa4]
      },
      {
        name: '6-1',
        buff: [0x6d, 0xb6, 0x43, 0x5f, 0x6e, 0x7f, 0x37, 0xa1, 0xf1, 0xb8, 0xc1]
      },
      {
        name: '6-2',
        buff: [0x6d, 0xb6, 0x43, 0x5f, 0x6e, 0x7f, 0x37, 0xa1, 0xf0, 0x31, 0xd0]
      },
      {
        name: '6-3',
        buff: [0x6d, 0xb6, 0x43, 0x5f, 0x6e, 0x7f, 0x37, 0xa1, 0xf3, 0xaa, 0xe2]
      }
    ],
    lampColorIndex: 0,
    status: false,
    isIOS: false,
  },

  onClice() {
    let that = this;
    wx.openBluetoothAdapter({ //调用微信小程序api 打开蓝牙适配器接口
      success: function (res) {
        that.setData({
          bleType: true
        })
        console.log('成功', res)
        wx.showToast({
          title: '初始化成功',
          icon: 'success',
          mask: true,
          duration: 800
        })
        that.openBle(); //2.0
        // if (that.data.isIOS) {
        //   that.openBle(); //2.0
        // } else {
        //   that.openBle(); //2.0
        // }
      },
      fail: function (res) { //如果手机上的蓝牙没有打开，可以提醒用户
        that.setData({
          bleType: false
        })
        console.log('蓝牙不可用', res)
        wx.showToast({
          title: '未检测到蓝牙开启',
          icon: 'none',
          duration: 2000,
          mask: true
        })
      }
    })
  },
  /**
   * ios 广播测试
   */

  // openBle() {
  //   const that = this
  //   wx.openBluetoothAdapter({
  //     mode: 'central',
  //     // mode: 'peripheral',
  //     success: (res) => {
  //       console.log('219--res', res);
  //       wx.createBLEPeripheralServer({
  //         success: (res) => {
  //           console.log('223--res', res)
  //           this.setData({
  //             server: res.server
  //           })
  //         },
  //         fail: (res) => {
  //           console.warn('341--fail', res);
  //         },
  //         complete: (res) => {
  //           console.debug('344*****complete', res);
  //         }
  //       });
  //     },
  //     fail: (res) => {
  //       console.log('285 --fail', res);
  //     },
  //     complete: (res) => {
  //       console.log('288--complete', res)
  //     },
  //   });
  // },
  // string2buffer(str) {
  //   // 将16进制转化为ArrayBuffer
  //   var hex = str
  //   var arrayBuffer = new Uint8Array(hex.match(/[\da-f]{2}/gi).map(function (h) {
  //     return parseInt(h, 16)
  //   }))
  //   arrayBuffer = arrayBuffer.buffer;
  //   return arrayBuffer
  // },
  // order(data) {
  //   wx.showLoading({
  //     title: '发送中...',
  //     mask: true
  //   })
  //   const that = this
  //   // let uuid1 = '0000af8e-0000-1000-8000-00805f9b34fb';
  //   let uuid1 = this.string2buffer();
  //   let id = [0xf0, 0xff]
  //   let buff = data;
  //   that.data.server.addService({
  //     service: {
  //       uuid: uuid1,
  //       characteristics: []
  //     },
  //     success(e) {
  //       console.log('addService 成功', e)
  //       that.data.server.startAdvertising({
  //         advertiseRequest: {
  //           // connectable: false, // 当前Service是否可连接
  //           connectable: true, // 当前Service是否可连接
  //           serviceUuids: [ // 要广播的serviceUuid列表
  //             uuid1
  //           ],
  //           // serviceUuids: data,
  //           manufacturerData: [{ // 广播的制造商信息, 仅安卓支持
  //             manufacturerId: id,
  //             manufacturerSpecificData: buff
  //           }]
  //           // manufacturerData: [{ // 广播的制造商信息, 仅安卓支持
  //           //   manufacturerId: id,
  //           //   manufacturerSpecificData: buff
  //           // }]
  //         }
  //       }).then(
  //         (res) => {},
  //         (res) => {});
  //       setTimeout(() => {
  //         that.data.server.stopAdvertising({
  //           success() {
  //             // wx.hideLoading()
  //             setTimeout(function () {
  //               wx.hideLoading()
  //             }, 200)
  //           }
  //         })
  //       }, 400);
  //     },
  //     fail(e) {
  //       console.log('订阅失败', e)
  //     },
  //   })

  // },


  /**
   * ios 广播测试 结束
   */

  //
  openBle() {
    const that = this
    wx.openBluetoothAdapter({
      // mode: 'central',
      mode: 'peripheral',
      success: (res) => {
        console.log('219--res', res);
        wx.createBLEPeripheralServer({
          success: (res) => {
            console.log('223--res', res)
            // let server = res.server;
            this.setData({
              server: res.server
            })
          },
          fail: (res) => {
            console.warn('341--fail', res);
          },
          complete: (res) => {
            console.debug('344*****complete', res);
          }
        });
      },
      fail: (res) => {
        console.log('285 --fail', res);
      },
      complete: (res) => {
        console.log('288--complete', res)
      },
    });
  },
  order(data) {
    wx.showLoading({
      title: '发送中...',
      mask: true
    })
    const that = this
    let uuid1 = '0000af8e-0000-1000-8000-00805f9b34fb';
    let uuid2 = '0000ae8f-0000-1000-8000-00805f9b34fb';
    let id = [0xf0, 0xff]
    let buff = data;
    that.data.server.startAdvertising({
      advertiseRequest: {
        // connectable: false, // 当前Service是否可连接
        connectable: true, // 当前Service是否可连接
        serviceUuids: [ // 要广播的serviceUuid列表
          uuid1,
          uuid2
        ],
        // manufacturerData: [{ // 广播的制造商信息, 仅安卓支持
        // }]
        manufacturerData: [{ // 广播的制造商信息, 仅安卓支持
          manufacturerId: id,
          manufacturerSpecificData: buff
        }]
      }
    }).then(
      (res) => {
      },
      (res) => {
      });
    setTimeout(() => {
      that.data.server.stopAdvertising({
        success() {
          // wx.hideLoading()
          setTimeout(function () {
            wx.hideLoading()
          }, 200)
        }
      })
    }, 400);
  },

  /**
   *  按钮方法
   * 
   */

  // 关
  closeBtn() {
    // this.data.server.stopAdvertising()
    // wx.BLEPeripheralServer.stopAdvertising()
    // let data = [0x6d, 0xb6, 0x43, 0x5f, 0x6e, 0x7f, 0x37, 0xa1, 0xe7, 0x0f, 0xb4]
    let data = [0xf0, 0xff, 0x6d, 0xb6, 0x43, 0x5f, 0x6e, 0x7f, 0x37, 0xa1, 0xe7, 0x0f, 0xb4]
    this.order(data)
    this.setData({
      status: false
    })
    // this.openBle(data)
  },
  // 开
  openBtn() {
    // this.data.server.stopAdvertising()
    // let data = [0x6d, 0xb6, 0x43, 0x5f, 0x6e, 0x7f, 0x37, 0xa1, 0xe6, 0x86, 0xa5]
    let data = [0xf0, 0xff, 0x6d, 0xb6, 0x43, 0x5f, 0x6e, 0x7f, 0x37, 0xa1, 0xe6, 0x86, 0xa5]
    // this.openBle(data)
    if (this.data.bleType) {
      this.order(data)
      this.setData({
        status: true
      })
    } else {
      this.onClice()
      setTimeout(() => {
        if (this.data.bleType) {
          this.order(data)
          // this.order(data)
          this.setData({
            status: true
          })
        }
      }, 400);

    }
  },
  // 亮
  brightBtn() {
    let data = [0x6d, 0xb6, 0x43, 0x5f, 0x6e, 0x7f, 0x37, 0xa1, 0xe5, 0x1d, 0x97]
    this.order(data)
  },
  // 暗
  darkBtn() {
    let data = [0x6d, 0xb6, 0x43, 0x5f, 0x6e, 0x7f, 0x37, 0xa1, 0xe4, 0x94, 0x86]
    this.order(data)
  },
  // 色溫
  colorBtn() {
    let data = this.data.lampColor[this.data.lampColorIndex].buff
    let lampColorIndex = this.data.lampColorIndex + 1
    if (lampColorIndex == this.data.lampColor.length) {
      lampColorIndex = 0
    }
    console.log('色溫', data)
    this.setData({
      lampColorIndex: lampColorIndex
    })
    this.order(data)
  },
  // 闪烁
  flash() {
    // this.data.server.stopAdvertising()
    let data
    if (this.data.fast) {
      data = [0x6d, 0xb6, 0x43, 0x5f, 0x6e, 0x7f, 0x37, 0xa1, 0xea, 0xea, 0x6f]
    } else {
      data = [0x6d, 0xb6, 0x43, 0x5f, 0x6e, 0x7f, 0x37, 0xa1, 0xee, 0xce, 0x29]
    }
    this.setData({
      fast: !this.data.fast
    })
    this.order(data)
    // this.openBle(data)
    // this.data.server.stopAdvertising()
  },
  // 渐变
  fade() {
    // this.data.server.stopAdvertising()
    let data = [0x6d, 0xb6, 0x43, 0x5f, 0x6e, 0x7f, 0x37, 0xa1, 0xf6, 0x07, 0xb5]
    this.order(data)
    // this.openBle(data)
    // this.data.server.stopAdvertising()
  },
  // 平滑
  smooth() {
    // this.data.server.stopAdvertising()
    let data = [0x6d, 0xb6, 0x43, 0x5f, 0x6e, 0x7f, 0x37, 0xa1, 0xf2, 0x23, 0xf3]
    this.order(data)
    // this.openBle(data)
    // this.data.server.stopAdvertising()
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this
    wx.getSystemInfo({
      success: (e) => {
        console.log('手机', e)
        if (e.brand === 'iPhone') {
          console.log('i')
          wx.showModal({
            title: '提示',
            content: '目前仅支持安卓系统',
            showCancel: false,
            success (res) {
              if (res.confirm) {
                console.log('用户点击确定')
                wx.reLaunch({
                  url: '../home/index',
                })
              }
            }
          })
        } else {
          console.log('A')
          this.onClice()
          // that.setData({
          //   isIOS: false
          // })
        }
      },
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

  },
  //跳转桌子 ， 空调
  goDesk: function () {
    wx.reLaunch({
      url: "/pages/aiUpAndDownDesk/index",
    })
  },
  goConditioner: function () {
    wx.reLaunch({
      url: "/pages/AirConditioner/index",
    })
  }
})