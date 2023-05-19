import {
  addUserEchartsData
} from "../../../api/health";
Page({
  data: {
    weight: '',
    high: '',
    currentDate: ""
  },
  onDatePickerChange(e) {
    this.setData({
      currentDate: e.detail.currentDate
    })
  },
  onChangeWeight(event) {
    this.setData({
      weight: event.detail
    })
  },
  onChangeHigh(event) {
    this.setData({
      high: event.detail
    })
  },
  async handleAddData() {
    let newBMI = (this.data.weight / ((this.data.high / 100) * (this.data.high / 100))).toFixed(1)
    const res = await addUserEchartsData('weight', {
      weight: this.data.weight,
      high: this.data.high,
      bmi: newBMI
    }, this.data.currentDate)
    wx.navigateBack()
  }
});