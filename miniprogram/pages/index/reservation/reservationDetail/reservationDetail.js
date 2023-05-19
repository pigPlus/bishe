// pages/index/reservation/reservationDetail/reservationDetail.js
Page({
  data: {
    item: {}
  },
  onLoad(options) {
    this.setData({
      item: JSON.parse(options.item)
    })
  },
  toReservation(e) {
    let date = e.currentTarget.dataset.date
    wx.navigateTo({
      url: `/pages/index/reservation/reservationDetail/process/process?item=${JSON.stringify(this.data.item)}&date=${date}`,
    })
  }
})