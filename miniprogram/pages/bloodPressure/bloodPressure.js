const app = getApp()
import Notify from '@vant/weapp/notify/notify';
import {
  getLastValue
} from "../../api/health";
Page({
  data: {
    lastBloodPressureLow: '--',
    lastBloodPressureHigh: '--',
    lastHeartRate: '--',
    echartsVisible: false,
    dom_height: '3rem',
    dom_overflow: 'hidden',
    icon_visible: true,
    text: '',
    analyseRes: '',
    isShow: ''
  },
  onShow() {
    this.getData()
    this.setData({
      echartsVisible: true
    })
    this.analyseSugar(this.data.lastBloodPressureLow, this.data.lastBloodPressureHigh, this.data.lastHeartRate)
  },
  async getData() {
    const res = await getLastValue('pressure')
    this.setData({
      lastBloodPressureLow: res.data[0].data.low,
      lastBloodPressureHigh: res.data[0].data.high,
      lastHeartRate: res.data[0].data.rate
    })
  },
  addPressure() {
    if (wx.getStorageSync('userMsg')) {
      wx.navigateTo({
        url: '/pages/bloodPressure/addBloodPressure/addBloodPressure',
      })
      this.setData({
        echartsVisible: false
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
  analyseSugar(low, high, rate) {
    if (low <= 140 && high <= 90 && (rate >= 60 || rate <= 100)) {
      this.setData({
        analyseRes: '收缩压, 舒张压, 心率均正常'
      })
      this.ai_analyse('收缩压, 舒张压, 心率均正常')
      return '收缩压, 舒张压, 心率均正常'
    } else if (low > 140 && high > 90 && rate > 100) {
      this.setData({
        analyseRes: '收缩压, 舒张压, 心率均偏高'
      })
      this.ai_analyse('收缩压, 舒张压, 心率均偏高')
    } else {
      this.setData({
        analyseRes: '数值不在正常范围内'
      })
      this.ai_analyse('收缩压, 舒张压, 心率不在正常范围内')
    }
  }
})