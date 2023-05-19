// pages/address/addAddress/addAddress.js
// import {
//   areaList
// } from '../../../../node_modules/@vant/area-data';
import Notify from '@vant/weapp/notify/notify';
Page({
  data: {
    addressVal: '',
    nameVal: '',
    phoneVal: '',
    openid: ''
  },
  onLoad(options) {
    this.setData({
      openid: options.openid
    })
  },
  onaddressValChange(event) {
    this.setData({
      addressVal: event.detail
    })
  },
  onnameValChange(event) {
    this.setData({
      nameVal: event.detail
    })
  },
  onphoneValChange(event) {
    this.setData({
      phoneVal: event.detail
    })
  },
  validate() {
    if (!this.data.addressVal) {
      Notify({
        type: 'success',
        message: '地址不能为空'
      });
      return 0
    }
    if (!this.data.nameVal) {
      Notify({
        type: 'success',
        message: '收件人姓名不能为空'
      });
      return 0
    }
    if (!this.data.phoneVal) {
      Notify({
        type: 'success',
        message: '电话不能为空'
      });
      return 0
    }
    if (this.data.phoneVal.length < 6 || this.data.phoneVal.length > 11) {
      Notify({
        type: 'success',
        message: '电话应该为6到11位数字'
      });
      return 0
    }
    return 1
  },
  submit() {
    let res = this.validate()
    if (!res) {
      return
    }
    wx.cloud.callFunction({
      name: 'addAddress',
      data: {
        openid: this.data.openid,
        address: this.data.addressVal,
        name: this.data.nameVal,
        phone: this.data.phoneVal
      },
      success: res => {
        if (res.errMsg === 'cloud.callFunction:ok') {
          wx.navigateBack()
        }
      }
    })
  }
})