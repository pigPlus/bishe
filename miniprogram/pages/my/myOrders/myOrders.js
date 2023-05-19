// pages/my/myOrders/myOrders.js
import Dialog from '@vant/weapp/dialog/dialog';
const app = getApp()
Page({
  data: {
    orderList: []
  },
  onLoad() {
    this.getOrders()
    console.log(this.data.orderList.length);
  },
  getOrders() {
    wx.cloud.callFunction({
      name: 'getOrder',
      data: {
        openid: app.globalData.openid
      },
      success: res => {
        //console.log(res.result.data);
        this.setData({
          orderList: res.result.data
        })
      },
      fail: err => {
        console.log(err);
      }
    })
  },
  deleteOrder(e) {
    Dialog.confirm({
        title: '确认',
        message: '确认删除该订单吗',
      })
      .then(() => {
        // on confirm
        wx.cloud.callFunction({
          name: 'deleteOrder',
          data: {
            openid: app.globalData.openid,
            id: e.currentTarget.dataset.id
          },
          success: res => {
            if (res.errMsg === 'cloud.callFunction:ok') {
              this.getOrders()
              console.log('删除成功');
            }
          },
          fail: err => {
            console.log(err);
          }
        })
      })
      .catch(() => {
        // on cancel
      });

  }
})