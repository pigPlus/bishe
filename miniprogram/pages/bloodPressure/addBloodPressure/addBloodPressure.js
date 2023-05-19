import {
  addUserEchartsData
} from "../../../api/health";
Page({
  data: {
    low: '',
    high: '',
    rate: ''
  },

  onChangeLow(event) {
    this.setData({
      low: event.detail
    })
  },
  onChangeHigh(event) {
    this.setData({
      high: event.detail
    })
  },
  onChangeRate(event) {
    this.setData({
      rate: event.detail
    })
  },
  onDatePickerChange(e) {
    this.setData({
      currentDate: e.detail.currentDate
    })
  },
  async handleAddData() {
    const res = await addUserEchartsData('pressure', {
      low: this.data.low,
      high: this.data.high,
      rate: this.data.rate
    }, this.data.currentDate)
    wx.navigateBack()
  }
});