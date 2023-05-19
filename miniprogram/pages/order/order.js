// pages/order/order.js
const app = getApp()
Page({
  data: {
    list: [],
    addressList: [],
    param: [],
    total: 0
  },
  onLoad(options) {
    //console.log(JSON.parse(options.list), '1');
    this.setData({
      list: JSON.parse(options.list),
      total: options.total
    })
    this.getAddressList()
    console.log(this.data.list);
  },
  getAddressList() {
    wx.cloud.callFunction({
      name: 'getAddressList',
      data: {
        openid: app.globalData.openid
      },
      success: res => {
        //console.log(res.result.data, '2');
        this.setData({
          addressList: res.result.data,
          param: res.result.data[0]
        })
        //console.log(res.result.data[0], 'res.result.data[0]');
      }
    })
  },
  onSubmit() {
    //调接口加入订单数据库
    wx.cloud.callFunction({
      name: 'addOrder',
      data: {
        openid: app.globalData.openid,
        list: this.data.list,
        total: this.data.total
      },
      success: res => {
        if (res.errMsg === 'cloud.callFunction:ok') {
          console.log('支付成功');
        }
      },
      fail: err => {
        console.log(err);
      }
    })
  },
  handleAddress() {
    wx.navigateTo({
      url: '/pages/order/addressList/addressList',
    })
  }
})