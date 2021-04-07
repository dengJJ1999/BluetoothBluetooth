// pages/aaa/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isIOS: false,
    deviceId: '', // 例：Android是MAC地址 ‘78:9C:E7:7E:AA:64’ IOS是uuid'631512C9-7DC7-FDD3-A05C-9309DCCF68B1'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.onClice()
  },

  onClice() {
    let that = this;
    wx.openBluetoothAdapter({ //调用微信小程序api 打开蓝牙适配器接口
      success: function (res) {
        console.log('成功', res)
        wx.showToast({
          title: '初始化成功',
          icon: 'success',
          duration: 800
        })
        // that.openBle(); //2.0
      },
      fail: function (res) { //如果手机上的蓝牙没有打开，可以提醒用户
        console.log('蓝牙不可用', res)
        wx.showToast({
          title: '蓝牙不可用',
          icon: 'fails',
          duration: 1000,
        })
      }
    })
  },
  /**
   *开始搜索蓝牙设备
   */
  findBlue() {
    var that = this
    wx.startBluetoothDevicesDiscovery({
      allowDuplicatesKey: false,
      interval: 0,
      powerLevel: 'low',
      success: function (res) {
        console.log('开始搜索蓝牙设备',res)
        wx.showLoading({
          title: '正在搜索设备',
        })
        that.getBlue() //3.0
      }
    })
  },
  /**
   * 获取搜索到的设备信息
   */
  getBlue() {
    var that = this
    wx.getBluetoothDevices({
      success: function (res) {
        console.log('获取搜索到的设备信息', res)
        wx.hideLoading();
        for (var i = 0; i < res.devices.length; i++) {
          //that.data.inputValue：
          /**表示的是需要连接的蓝牙设备ID，简单点来说就是我想要连接这个蓝牙设备，
          所以我去遍历我搜索到的蓝牙设备中是否有这个ID
          */
          
          if (res.devices[i].name == 'BLE103U'){
            console.log('name', res.devices[i].name)
            console.log('deviceId', res.devices[i])
            console.log('devices', res.devices[i].deviceId)
            that.setData({
              deviceId: res.devices[i].deviceId,
              consoleLog: "设备：" + res.devices[i].deviceId,
            })
            that.connetBlue(res.devices[i].deviceId); //4.0
            return;
          } else if (i == (res.devices.length-1)) {
            wx.showToast({
              title: '匹配失败',
              icon: 'error',
              duration: 800
            })
          }
          // if (res.devices[i].name == that.data.inputValue ||
          //   res.devices[i].localName == that.data.inputValue) {
          //   that.setData({
          //     deviceId: res.devices[i].deviceId,
          //     consoleLog: "设备：" + res.devices[i].deviceId,
          //   })
          //   that.connetBlue(res.devices[i].deviceId); //4.0
          //   return;
          // }
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
        console.log('获取到设备之后连接蓝牙设备', res)
        wx.showToast({
          title: '连接成功',
          icon: 'fails',
          duration: 800
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
        console.log('创建连接，发送指令',res)
        // that.sendMy() //8.0
        // 设备返回的方法
        // wx.onBLECharacteristicValueChange(function(res) {
        //   console.log('onBLECharacteristicValueChange -执行',res)
        //   // 此时可以拿到蓝牙设备返回来的数据是一个ArrayBuffer类型数据，
        //   //所以需要通过一个方法转换成字符串
        //   var nonceId = that.ab2hex(res.value)
        //   //拿到这个值后，肯定要去后台请求服务（当前步骤根据当前需求自己书写），
        //   that.sendMy() //8.0
        //   // that.sendMy(that.string2buffer('a1832d91')) //8.0
        //   // //获取下一步操作指令写入到蓝牙设备上去
        //   // wx.request({
        //   //   method: "POST",
        //   //   data: {
        //   //     xx: nonceId
        //   //   },
        //   //   url: url,
        //   //   success: (res) => {
        //   //     //res.data.data.ciphertext：我这边服务返回来的是16进制的字符串，
        //   //     //蓝牙设备是接收不到当前格式的数据的，需要转换成ArrayBuffer
        //   //     // that.sendMy(that.string2buffer(res.data.data.ciphertext)) //8.0
        //   //     // that.sendMy([0x66]) //8.0
        //   //     that.sendMy(that.string2buffer([0x66])) //8.0
        //   //     // 服务器返回一个命令  我们要把这个命令写入蓝牙设备
        //   //   }
        //   // })
        // })
      },
      fail (res) {
        console.log('错误', res)
      },
      complete (res) {
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
    } else if (type == 2){
      console.log('2')
      order = '0x88'
    }
    var that = this
    wx.getBLEDeviceServices({
      // deviceId: '78:9C:E7:7E:AA:64',
      deviceId: '631512C9-7DC7-FDD3-A05C-9309DCCF68B1',
      success (res) {
        console.log('272----getBLEDeviceServices--成功',res)
        wx.getBLEDeviceCharacteristics({
          // deviceId: '78:9C:E7:7E:AA:64',
          deviceId: '631512C9-7DC7-FDD3-A05C-9309DCCF68B1',
          // serviceId: '0000FFE0-0000-1000-8000-00805F9B34FB',
          serviceId: res.services[1].uuid,
          success (res) {
            console.log('276----getBLEDeviceCharacteristics--成功',res)
          },
          fail (res) {
            console.log('276----getBLEDeviceCharacteristics--失败',res)
          }
        })
      },
      fail (e) {
        console.log('284--- getBLEDeviceServices--失败', e)
      }
    })
    wx.writeBLECharacteristicValue({
      // state: true,
      // 这里的 deviceId 需要在上面的 getBluetoothDevices 或 onBluetoothDeviceFound 接口中获取
      // deviceId: that.data.deviceId,
      // deviceId: '78:9C:E7:7E:AA:64',
      deviceId: '631512C9-7DC7-FDD3-A05C-9309DCCF68B1',
      // 这里的 serviceId 需要在上面的 getBLEDeviceServices 接口中获取
      // serviceId: that.data.services,
      serviceId: '0000FFE0-0000-1000-8000-00805F9B34FB',
      // 这里的 characteristicId 需要在上面的 getBLEDeviceCharacteristics 接口中获取
      // characteristicId: that.data.writeId, //第二步写入的特征值
      characteristicId: '0000FFE1-0000-1000-8000-00805F9B34FB', //第二步写入的特征值
      // 这里的value是ArrayBuffer类型
      // value: [0x55,0x00,0x04,0x01,0x00,0xff,0x66],
      // value: this.string2buffer('5500040100ff66'),
      // value: this.string2buffer('0x550x000x040x010x000xff0x66'),
      value: this.string2buffer(order),
      success: function (res) {
        console.log("写入成功",res)
        wx.onBLECharacteristicValueChange(function(res) {
          console.log('onBLECharacteristicValueChange -执行',res)
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

  sendMy_2(e) {
    var that = this
    wx.writeBLECharacteristicValue({
      // state: true,
      // 这里的 deviceId 需要在上面的 getBluetoothDevices 或 onBluetoothDeviceFound 接口中获取
      // deviceId: that.data.deviceId,
      deviceId: '78:9C:E7:7E:AA:64',
      // 这里的 serviceId 需要在上面的 getBLEDeviceServices 接口中获取
      // serviceId: that.data.services,
      serviceId: '0000ffe0-0000-1000-8000-00805F9B34FB',
      // 这里的 characteristicId 需要在上面的 getBLEDeviceCharacteristics 接口中获取
      // characteristicId: that.data.writeId, //第二步写入的特征值
      characteristicId: '0000ffe1-0000-1000-8000-00805F9B34FB', //第二步写入的特征值
      // 这里的value是ArrayBuffer类型
      value: this.string2buffer('0x88'),
      success: function (res) {
        console.log("写入成功",res)
        wx.onBLECharacteristicValueChange(function(res) {
          console.log('onBLECharacteristicValueChange -执行',res)
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

  openBle() {
    // console.log('e', e.detail.value)
    // let command = e.detail.value
    wx.openBluetoothAdapter({
      // mode: 'central',
      mode: 'peripheral',
      success: (res) => {
        console.info('Bluetooth adapter opened');
        console.log('Creating BLEPeripheralServer');
        // this.isNew()
        wx.createBLEPeripheralServer({
          success: (res) => {
            console.info('createBLEPeripheralServer successed', res);
            let server = res.server;
            console.log(server);
            console.log('成功1')
            let uuid1 = '0000af8e-0000-1000-8000-00805f9b34fb';
            let uuid2 = '0000ae8f-0000-1000-8000-00805f9b34fb';
            // let uuid1 = '';
            // let uuid2 = '0xcccccccccc';
            let ip = [0x55]
            // let buff = [0x6d,0xb6,0x43,0x5f,0x6e,0x7f,0x37,0xa1,0xe7,0x0f,0xb4];
            let order = [0x84, 0x12, 0xdd, 0xf0, 0x1a, 0x01, 0x10, 0x00]; // 命令：
            server.startAdvertising({
              advertiseRequest: {
                // connectable: false, // 当前Service是否可连接
                connectable: true, // 当前Service是否可连接
                serviceUuids: [ // 要广播的serviceUuid列表
                  uuid1,
                  uuid2
                ],
                // serviceUuids:[uuid2],
                // serviceUuids:[],
                // manufacturerData: [{ // 广播的制造商信息, 仅安卓支持
                // }]
                manufacturerData: [{ // 广播的制造商信息, 仅安卓支持
                  manufacturerId: ip,
                  manufacturerSpecificData: order
                }]
              }
            }).then(
              (res) => {
                console.log('334*****Adverstising.. ', res);
              },
              (res) => {
                console.warn('337*****Advertising failed', res);
              });
          },
          fail: (res) => {
            console.warn('341*****createBLEPeripheralServer failed');
          },
          complete: (res) => {
            console.debug('344*****createBLEPeripheralServer completed');
          }
        });
      },
      fail: (res) => {
        console.log('openBluetoothAdapter failed');
        console.warn(res);
      },
      complete: (res) => {
        console.debug('openBluetoothAdapter completed');
      },
    });
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

})