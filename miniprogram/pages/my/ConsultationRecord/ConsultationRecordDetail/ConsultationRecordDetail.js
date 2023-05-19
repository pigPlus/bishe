// pages/my/ConsultationRecord/ConsultationRecordDetail/ConsultationRecordDetail.js
Page({
  data: {
    list: []
  },
  onLoad(options) {
    this.setData({
      list: JSON.parse(options.list)
    })
  }
})