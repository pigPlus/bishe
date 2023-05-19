// pages/my/MyAppointment/apointmentDetail/apointmentDetail.js
Page({
  data: {
    item: {}
  },
  onLoad(options) {
    console.log(JSON.parse(options.item));
    this.setData({
      item: JSON.parse(options.item)
    })
  }
})