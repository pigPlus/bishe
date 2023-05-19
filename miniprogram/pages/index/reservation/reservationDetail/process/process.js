// pages/index/reservation/reservationDetail/process/process.js
import Notify from '@vant/weapp/notify/notify';
const app = getApp()
Page({
  data: {
    item: {},
    date: '',
    fileList: [],
    value: '',
    phoneVal: '',
    userVal: ''
  },
  onLoad(options) {
    // console.log(options.item);
    this.setData({
      item: JSON.parse(options.item),
      date: options.date
    })
  },
  uploadImg(event) {
    // const {
    //   file
    // } = event.detail;
    wx.chooseMedia({
      success: res => {
        // console.log(res, 'res');
        // 选择图片成功后，调用云函数上传图片
        wx.cloud.uploadFile({
          cloudPath: 'example.png', // 云存储的文件名和路径
          filePath: res.tempFiles[0].tempFilePath, // 本地文件路径
          success: res => {
            // 文件上传成功后，返回文件的云文件ID
            console.log(res.fileID);
            let obj = {}
            console.log(1);
            obj.url = res.fileID
            console.log(2);
            this.setData({
              fileList: this.data.fileList.push(obj)
            })
            console.log(this.data.fileList);
            console.log('上传成功', res)
          },
          fail: console.error
        })
      },
      fail: console.error
    })

  },
  onPhoneValChange(event) {
    this.setData({
      phoneVal: event.detail
    })
  },
  onUserValChange(event) {
    this.setData({
      userVal: event.detail
    })
  },
  validate(phoneVal, userVal) {
    if (!phoneVal || !userVal) {
      return 0
    } else {
      return 1
    }
  },
  textareaValValidate(val) {
    if (!val) {
      return 0
    } else {
      return 1
    }
  },
  // 提交添加到数据库中(就诊记录)
  submit() {
    console.log(this.data.value)
    let res = this.validate(this.data.phoneVal, this.data.userVal)
    let textareaRes = this.textareaValValidate(this.data.value)
    if (textareaRes) {} else {
      Notify({
        type: 'success',
        message: '请先描述您的病情~'
      });
      return
    }
    if (res) {
      // 不为空, 提交
      console.log(app.globalData.openid);
      wx.cloud.callFunction({
        name: 'addApointment',
        data: {
          desVal: this.data.value,
          item: this.data.item,
          phoneVal: this.data.phoneVal,
          userVal: this.data.userVal,
          par: app.globalData.openid,
          date: this.data.date
        },
        success: res => {
          console.log(res);
          wx.navigateBack()
          Notify({
            type: 'success',
            message: '提交成功'
          });
        },
        fail: err => {
          console.log(err);
        }
      })
    } else {
      // 数据为空, 弹窗
      Notify({
        type: 'success',
        message: '手机号和就诊人不能为空'
      });
      return
    }
  },
  onTextareaInput(event) {
    this.setData({
      value: event.detail.value
    })
  }
})