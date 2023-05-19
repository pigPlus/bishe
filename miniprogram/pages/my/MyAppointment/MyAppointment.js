// pages/my/MyAppointment/MyAppointment.js
const app = getApp()
import Dialog from '@vant/weapp/dialog/dialog';
Page({
  data: {
    isShow: true,
    list: []
  },
  onLoad() {
    this.getApointmentList()
  },
  getApointmentList() {
    wx.cloud.callFunction({
      name: 'getApointment',
      data: {
        par: app.globalData.openid
      },
      success: res => {
        // console.log(res);
        if (res.result.data.length === 0) {
          this.setData({
            isShow: false
          })
        }
        this.setData({
          list: res.result.data
        })
      },
      fail: err => {
        console.log(err);
      }
    })
  },
  cancelApointment(e) {
    Dialog.confirm({
        title: '撤销',
        message: '确定撤销该申请吗?',
      })
      .then(() => {
        // on confirm
        wx.cloud.callFunction({
          name: 'removeApointment',
          data: {
            openid: app.globalData.openid,
            id: e.currentTarget.dataset.id
          },
          success: res => {
            // console.log(res);
            this.getApointmentList()
          },
          fail: err => {
            console.log(err);
          }
        })
      })
      .catch(() => {
        // on cancel
      });

  },
  apointmentDetail(e) {
    let data = JSON.stringify(e.currentTarget.dataset.item)
    wx.navigateTo({
      url: `/pages/my/MyAppointment/apointmentDetail/apointmentDetail?item=${data}`,
    })
  }
})