// pages/bloodSugar/bloodSugar.js
// sportTime: 0, //运动时间
//   bloodSugar: 0, //血糖
//   bloodPressure: 0, //血压
//   heartRate: 0, //心率
//   sleepTime: 0, //睡眠时间
import Notify from '@vant/weapp/notify/notify';
import {
  getLastValue
} from "../../api/health";
const app = getApp()
Page({
  data: {
    otherUserMsg: {},
    lastSugar: 0,
    echartsVisible: false,
    dom_height: '3rem',
    dom_overflow: 'hidden',
    icon_visible: true,
    text: '',
    analyseRes: ''
  },

  onShow() {
    this.setData({
      echartsVisible: true
    })
    this.getData()
    this.analyseSugar(this.data.lastSugar)
  },
  onHide() {
    this.setData({
      echartsVisible: false
    })
  },
  async getData() {
    const res = await getLastValue('sugar')
    if (res.data.length > 0) {
      this.setData({
        lastSugar: res.data[0].data.bloodSugar
      })
    }
  },
  handleAddSugar() {
    if (wx.getStorageSync('userMsg')) {
      wx.navigateTo({
        url: '/pages/bloodSugar/addBloodSugar/addBloodSugar',
      })

    } else {
      Notify({
        type: 'success',
        message: '请先新建档案哦~'
      });
    }
  },
  handleDevelopBack() {
    this.setData({
      dom_height: '3rem',
      dom_overflow: 'hidden',
      icon_visible: true
    })
  },
  handleDevelop() {
    this.setData({
      dom_height: null,
      dom_overflow: 'visible',
      icon_visible: false
    })
  },
  ai_analyse(p) {
    this.setData({
      text: '正在生成~'
    })
    wx.request({
      url: 'https://fbre8h.laf.dev/ai-chat',
      method: 'POST',
      data: {
        message: `${p}的建议`
      },
      success: res => {
        // console.log(res);
        this.setData({
          text: res.data.text
        })
      },
      fail: err => {
        console.log(err);
      }
    })
  },
  analyseSugar(sugar) {
    if (sugar < 3.9) {
      this.setData({
        analyseRes: '血糖偏低'
      })
      this.ai_analyse('血糖偏低')
      return '血糖偏低'
    } else if (sugar >= 3.9 && sugar <= 6.1) {
      this.setData({
        analyseRes: '血糖正常'
      })
      this.ai_analyse('血糖正常')
      return '血糖正常'
    } else if (sugar > 6.1) {
      this.setData({
        analyseRes: '血糖偏高'
      })
      this.ai_analyse('血糖偏高')
      return '血糖偏高'
    }
  }
})