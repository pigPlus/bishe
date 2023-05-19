// pages/address/address.js
const app = getApp()
Page({
  data: {
    address: '',
    message: {},
    addressList: []
  },
  onShow() {
    this.getAddressList()
  },
  getAddressList() {
    wx.cloud.callFunction({
      name: 'getAddressList',
      data: {
        openid: app.globalData.openid
      },
      success: res => {
        this.setData({
          addressList: res.result.data
        })
      }
    })
  },
  addAddress() {
    let openid = app.globalData.openid
    wx.navigateTo({
      url: `/pages/address/addAddress/addAddress?openid=${openid}`,
    })


  },
  handleAddress(e) {
    let item = JSON.stringify(e.currentTarget.dataset.item)
    let openid = app.globalData.openid
    // 地址编辑
    wx.navigateTo({
      url: `/pages/address/editAddress/editAddress?item=${item}&openid=${openid}`,
    })
  }
})