// pages/aaa/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isIOS: false,
    deviceId: '', // 例：Android是MAC地址 ‘78:9C:E7:7E:AA:64’ IOS是uuid'631512C9-7DC7-FDD3-A05C-9309DCCF68B1'
    services: '', // 获取这个蓝牙设备的服务uuid
    characteristicId: '', // 当前蓝牙设备的特征值
    order: '', // 指令
    openBTooth: false, // 蓝牙是否打开
    typeBTooth: '', // 展示的文案
    connectBTooth: false, // 蓝牙是否连接
    sendOutOrder: false, // 指令是否发送成功
    buttonH: [{
        text: "站立",
        imgUrl: "../../img/desk/pic_1@2x.png",
      },
      {
        text: "坐立",
        imgUrl: "../../img/desk/pic_2@2x.png",
      },
      {
        text: "记忆1",
        imgUrl: "../../img/desk/pic_3@2x.png",
      },
      {
        text: "记忆2",
        imgUrl: "../../img/desk/pic_4@2x.png",
      },
      {
        text: "记忆3",
        imgUrl: "../../img/desk/pic_5@2x.png",
      }
    ],
    isBuleType: false, // 校验
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
          that.setData({
            isIOS: true
          })
        } else {
          that.setData({
            isIOS: false
          })
        }
      },
    })
    this.onClice()
  },

  onClice() {
    let that = this;
    wx.openBluetoothAdapter({ //调用微信小程序api 打开蓝牙适配器接口
      success: function (res) {
        console.log('成功', res)
        that.setData({
          typeBTooth: '蓝牙未连接！请点击搜索蓝牙',
          isBuleType: true
        })
        wx.showToast({
          title: '初始化成功',
          icon: 'success',
          duration: 1000,
          mask: true
        })
        // that.openBle(); //2.0
      },
      fail: function (res) { //如果手机上的蓝牙没有打开，可以提醒用户
        console.log('蓝牙不可用', res)
        that.setData({
          typeBTooth: '手机需开启蓝牙与定位',
          isBuleType: false
        })
        wx.showToast({
          title: '手机需开启蓝牙与定位',
          icon: 'none',
          duration: 2000,
          mask: true
        })
      }
    })
  },
  /**
   *开始搜索蓝牙设备
   */
  findBlue() {
    var that = this
    if(that.data.isBuleType) {
      wx.startBluetoothDevicesDiscovery({
        allowDuplicatesKey: false,
        interval: 0,
        powerLevel: 'low',
        success: function (res) {
          console.log('开始搜索蓝牙设备', res)
          wx.showLoading({
            title: '正在搜索设备',
          })
          that.getBlue() //3.0
          // if (!that.data.isIOS) {
          //   that.getBlue() //3.0 非ios系统调用
          // } else if (that.data.isIOS) {
          //   that.getBlue() //3.0 ios系统调用
          // }
        },
        fail: function () {
          wx.showToast({
            title: '请重新进入小程序',
            icon: 'none',
            mask: true
          })
        }
      })
    } else {
      this.onClice()
      if(that.data.isBuleType) {
        wx.startBluetoothDevicesDiscovery({
          allowDuplicatesKey: false,
          interval: 0,
          powerLevel: 'low',
          success: function (res) {
            console.log('开始搜索蓝牙设备', res)
            wx.showLoading({
              title: '正在搜索设备',
            })
            that.getBlue() //3.0
            // if (!that.data.isIOS) {
            //   that.getBlue() //3.0 非ios系统调用
            // } else if (that.data.isIOS) {
            //   that.getBlue() //3.0 ios系统调用
            // }
          },
          fail: function () {
            wx.showToast({
              title: '请重新进入小程序',
              icon: 'none',
              mask: true
            })
          }
        })
      }
    }
    
  },
  /**
   * 获取搜索到的设备信息
   */
  getBlue() {
    var that = this
    wx.getBluetoothDevices({
      success: function (res) {
        wx.hideLoading();
        for (var i = 0; i < res.devices.length; i++) {
          //that.data.inputValue：
          /**表示的是需要连接的蓝牙设备ID，简单点来说就是我想要连接这个蓝牙设备，
          所以我去遍历我搜索到的蓝牙设备中是否有这个ID
          */
          if (res.devices[i].name == 'BLE103U') {
            wx.showLoading({
              title: '正在连接设备',
            })
            console.log('name', res.devices[i].name)
            console.log('deviceId', res.devices[i])
            console.log('devices', res.devices[i].deviceId)
            that.setData({
              deviceId: res.devices[i].deviceId,
            })
            that.connetBlue(res.devices[i].deviceId); //4.0
            return;
          } else if (i == (res.devices.length - 1)) {
            wx.showToast({
              title: '搜索不到设备蓝牙，请重试',
              icon: 'none',
              duration: 1500
            })
          }
        }
      },
      fail: function () {
        console.log("搜索蓝牙设备失败")
      }
    })
  },
  /**
   * 获取到设备之后连接蓝牙设备
   */
  connetBlue(deviceId) {
    var that = this;
    wx.createBLEConnection({
      // 这里的 deviceId 需要已经通过 createBLEConnection 与对应设备建立链接
      deviceId: deviceId, //设备id
      success: function (res) {
        wx.hideLoading();
        console.log('获取到设备之后连接蓝牙设备', res)
        wx.showToast({
          title: '连接成功',
          icon: 'fails',
          duration: 1500
        })
        that.setData({
          typeBTooth: '蓝牙已连接', // 展示的文案
        })
        console.log("连接蓝牙成功!")
        wx.stopBluetoothDevicesDiscovery({
          success: function (res) {
            console.log('连接蓝牙成功之后关闭蓝牙搜索');
          }
        })
        that.getServiceId() //5.0
      }
    })
  },
  /**
   * 连接上需要的蓝牙设备之后，获取这个蓝牙设备的服务uuid:
   */
  getServiceId() {
    var that = this
    wx.getBLEDeviceServices({
      // 这里的 deviceId 需要已经通过 createBLEConnection 与对应设备建立链接
      deviceId: that.data.deviceId,
      success: function (res) {
        console.log('获取这个蓝牙设备的服务uuid:', res)
        var model = res.services[3]
        that.setData({
          services: model.uuid
        })
        that.getCharacteId() //6.0
      }
    })
  },

  /**
   * 如果一个蓝牙设备需要进行数据的写入以及数据传输，就必须具有某些特征值，所以通过上面步骤获取的id可以查看当前蓝牙设备的特征值
   */
  getCharacteId() {
    var that = this
    wx.getBLEDeviceCharacteristics({
      // 这里的 deviceId 需要已经通过 createBLEConnection 与对应设备建立链接
      deviceId: that.data.deviceId,
      // 这里的 serviceId 需要在上面的 getBLEDeviceServices 接口中获取
      serviceId: that.data.services,
      // serviceId: '0000180A-0000-1000-8000-00805F9B34FB',
      success: function (res) {
        console.log('查看当前蓝牙设备的特征值', res)
        console.log('查看当前蓝牙设备的特征值 deviceId', that.data.deviceId)
        for (var i = 0; i < res.characteristics.length; i++) { //2个值
          var model = res.characteristics[i]
          if (model.properties.notify == true) {
            that.setData({
              notifyId: model.uuid //监听的值
            })
            console.log('notifyId zhixing -监听')
            that.startNotice(model.uuid) //7.0
            // that.startNotice() //7.0
          }
          if (model.properties.write == true) {
            that.setData({
              writeId: model.uuid //用来写入的值
            })
            console.log('notifyId zhixing -用来写入的值')
            // that.startNotice(model.uuid) //7.0
          }
        }
      }
    })
  },
  /**
   * 创建连接，发送指令
   */
  startNotice(uuid) {
    console.log('点击 创建连接，发送指令')
    var that = this;
    wx.notifyBLECharacteristicValueChange({
      state: true, // 启用 notify 功能
      // 这里的 deviceId 需要已经通过 createBLEConnection 与对应设备建立链接 
      deviceId: that.data.deviceId,
      // deviceId: '78:9C:E7:7E:AA:64',
      // 这里的 serviceId 需要在上面的 getBLEDeviceServices 接口中获取
      serviceId: that.data.services,
      // serviceId: '0000ffe0-0000-1000-8000-00805F9B34FB',
      // 这里的 characteristicId 需要在上面的 getBLEDeviceCharacteristics 接口中获取
      characteristicId: uuid, //第一步 开启监听 notityid  第二步发送指令 write
      // characteristicId: '0000ffe1-0000-1000-8000-00805F9B34FB', //第一步 开启监听 notityid  第二步发送指令 write

      success(res) {
        console.log('创建连接，发送指令', res)
        // that.sendMy() //8.0
      },
      fail(res) {
        console.log('错误', res)
      },
      complete(res) {
        console.log('接口调用结束的回调函数', res)
      }
    })
  },
  /**
   * 将从后台服务获取的指令写入到蓝牙设备当中
   */
  sendMy_1(e) {
    let type = parseInt(e.currentTarget.dataset.type)
    let order
    if (type == 1) {
      console.log('1')
      order = '0x66'
    } else if (type == 2) {
      console.log('2')
      order = '0x88'
    }
    var that = this
    if (that.data.isIOS) {
      wx.getBLEDeviceServices({
        deviceId: that.data.deviceId,
        success(res) {
          wx.getBLEDeviceCharacteristics({
            deviceId: that.data.deviceId,
            // 这里的 serviceId 需要在 getBLEDeviceServices 接口中获取
            serviceId: res.services[1].uuid, //
            success(res) {
              console.log('ios 重写', res)
            },
            fail(res) {
              console.error('getBLEDeviceCharacteristics===', res)
            }
          })
        },
        fail(e) {
          console.log('fail services:', res)
        }
      })
    }
    wx.writeBLECharacteristicValue({
      // state: true,
      // 这里的 deviceId 需要在上面的 getBluetoothDevices 或 onBluetoothDeviceFound 接口中获取
      // deviceId: that.data.deviceId,
      deviceId: that.data.deviceId,
      // 这里的 serviceId 需要在上面的 getBLEDeviceServices 接口中获取
      serviceId: that.data.services,
      // serviceId: '0000ffe0-0000-1000-8000-00805F9B34FB',
      // 这里的 characteristicId 需要在上面的 getBLEDeviceCharacteristics 接口中获取
      characteristicId: that.data.writeId, //第二步写入的特征值
      // characteristicId: '0000ffe1-0000-1000-8000-00805F9B34FB', //第二步写入的特征值
      // 这里的value是ArrayBuffer类型
      value: this.string2buffer(order),
      success: function (res) {
        console.log("写入成功", res)
        wx.onBLECharacteristicValueChange(function (res) {
          console.log('onBLECharacteristicValueChange -执行', res)
        })
      },
      fail: function (res) {
        console.log('写入失败', res)
      },
      complete: function (res) {
        console.log("调用结束", res);
      }
    })
  },
  resetBle() {
    wx.stopBluetoothDevicesDiscovery()
    this.findBlue()
  },

  /**
   * ********************** 封裝方法 ***********************************************************
   */
  /**
   * 将字符串转换成ArrayBufer
   */
  string2buffer(str) {
    // 将16进制转化为ArrayBuffer
    var hex = str
    var arrayBuffer = new Uint8Array(hex.match(/[\da-f]{2}/gi).map(function (h) {
      return parseInt(h, 16)
    }))
    arrayBuffer = arrayBuffer.buffer;
    return arrayBuffer
  },
  /**
   * 将ArrayBuffer转换成字符串
   */
  ab2hex(buffer) {
    var hexArr = Array.prototype.map.call(
      new Uint8Array(buffer),
      function (bit) {
        return ('00' + bit.toString(16)).slice(-2)
      }
    )
    return hexArr.join('');
  },

  // 返回
  goBack: function () {
    wx.reLaunch({
      url: '../home/index',
    })
  },
  goConditioner: function () {
    wx.reLaunch({
      url: "/pages/AirConditioner/index",
    })
  },
  goLight:function(){
    wx.reLaunch({
      url:  "/pages/aiLighting/index",
      // url:  "/pages/aiNetworkingControl/index",
    })
  }
})