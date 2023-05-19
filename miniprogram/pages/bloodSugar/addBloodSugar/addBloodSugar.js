 import {
   addUserEchartsData
 } from "../../../api/health";
 Page({
   data: {
     bloodSugar: '',
     currentDate: ""
   },

   onChangeSugar(event) {
     this.setData({
       bloodSugar: event.detail
     })
   },
   onDatePickerChange(e) {
     this.setData({
       currentDate: e.detail.currentDate
     })
   },
   async handleAddData() {
     const res = await addUserEchartsData('sugar', {
       bloodSugar: this.data.bloodSugar
     }, this.data.currentDate)
     wx.navigateBack()
   }
 });