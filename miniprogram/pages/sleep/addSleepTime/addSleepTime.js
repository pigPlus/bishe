import {
  addUserEchartsData
} from "../../../api/health";

Page({
  data: {
    sleepTime: '',
    currentDate: ''
  },
  onChangeSleepTime(event) {
    this.setData({
      sleepTime: event.detail
    })
  },
  onDatePickerChange(e) {
    this.setData({
      currentDate: e.detail.currentDate
    })
  },
  async handleAddData() {
    const res = await addUserEchartsData('sleep', {
      sleepTime: this.data.sleepTime
    }, this.data.currentDate)
    wx.navigateBack()
  }
})