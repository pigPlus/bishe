// pages/index/doctorList/aiChat/aiChat.js
Page({
  data: {
    isLoading: false,
    msgList: [],
    value: ''
  },
  onLoad() {
    //this.getText()
  },
  getText(val) {
    this.setData({
      isLoading: true
    })
    console.log(val, 'val');
    wx.request({
      url: 'https://fbre8h.laf.dev/ai-chat',
      method: 'POST',
      data: {
        message: val,
        text: ''
      },
      success: res => {
        this.setData({
          isLoading: false
        })
        console.log(res, 'res');
        let arr = []
        let obj = {}
        obj.msg = res.data.text
        obj.id = '02'
        arr.push(obj)
        this.setData({
          isLoading: false,
          msgList: this.data.msgList.concat(arr)
        })
      },
      fail: err => {
        console.log(err);
      }
    })
  },
  onChange(e) {
    this.setData({
      value: e.detail
    })
  },
  send() {
    let val = this.data.value
    let arr = []
    let obj = {
      msg: val,
      id: '01'
    }
    arr.push(obj)
    this.setData({
      value: '',
      msgList: this.data.msgList.concat(arr)
    })
    this.getText(val)
  }
})