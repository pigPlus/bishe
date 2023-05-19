// pages/address/editAddress/editAddress.js
import Notify from '@vant/weapp/notify/notify';
import Dialog from '@vant/weapp/dialog/dialog';

Page({
  data: {
    addressVal: '',
    nameVal: '',
    phoneVal: '',
    openid: '',
    id: ''
  },
  onLoad(options) {
    let item = JSON.parse(options.item)
    this.setData({
      addressVal: item.address,
      nameVal: item.name,
      phoneVal: item.phone,
      id: item._id
    })
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
    // update
    wx.cloud.callFunction({
      name: 'updateAddress',
      data: {
        openid: this.data.openid,
        address: this.data.addressVal,
        name: this.data.nameVal,
        phone: this.data.phoneVal,
        id: this.data.id
      },
      success: res => {
        if (res.errMsg === 'cloud.callFunction:ok') {
          wx.navigateBack()
        }
      },
      fail: err => {
        console.log(err);
      }
    })
  },
  delete() {
    Dialog.confirm({
        title: '删除',
        message: '确认删除该地址吗',
      })
      .then(() => {
        // on confirm
        wx.cloud.callFunction({
          name: 'deleteAddress',
          data: {
            openid: this.data.openid,
            id: this.data.id
          },
          success: res => {
            wx.navigateBack()
          }
        })
      })
      .catch(() => {
        // on cancel
      });

  }
})