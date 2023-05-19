// pages/order/addressList/addressList.js
import Dialog from '@vant/weapp/dialog/dialog';
const app = getApp()
Page({
  data: {
    addressList: []
  },
  onLoad() {
    this.getAddressList()
  },
  getAddressList() {
    wx.cloud.callFunction({
      name: 'getAddressList',
      data: {
        openid: app.globalData.openid
      },
      success: res => {
        //console.log(res.result.data);
        this.setData({
          addressList: res.result.data
        })
      }
    })
  },
  chooseAddress(e) {
    Dialog.confirm({
        title: '确认',
        message: '是否选择该地址',
      })
      .then(() => {
        // on confirm
        // 获取当前页面栈信息
        var pages = getCurrentPages();
        // 获取上一页实例对象
        var prevPage = pages[pages.length - 2];
        // 将参数设置到上一页实例对象中
        prevPage.setData({
          param: e.currentTarget.dataset.item
        });
        wx.navigateBack({
          delta: 1
        })
      })
      .catch(() => {
        // on cancel
      });

  }
})