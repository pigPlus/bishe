// pages/weight/weight.js
import Notify from '@vant/weapp/notify/notify';
const app = getApp()
import {
  getLastValue
} from "../../api/health";
Page({
  data: {
    BMI: '--',
    weight: '--',
    analyseWeightRes: '', //分析BMI结果: 偏瘦/肥胖..
    text: '还没有获取到您的体重',
    dom_height: '3rem',
    dom_overflow: 'hidden',
    icon_visible: true,
    echartsVisible: false
  },
  onShow() {
    this.getData()
    this.setData({
      echartsVisible: true
    })
    setTimeout(() => {
      this.toAnalyseWeight(this.data.BMI)
    }, 500);

  },
  async getData() {
    const res = await getLastValue('weight')
    if (res.data.length > 0) {
      this.setData({
        weight: res.data[0].data.weight,
        BMI: res.data[0].data.bmi,
      })
    }

  },
  toAnalyseWeight(BMI) {
    let res = this.analyseWeight(BMI)
    this.setData({
      analyseWeightRes: res
    })
    wx.cloud.callFunction({
      name: 'analyseWeight',
      data: {
        analyseValue: res
      },
      success: result => {
        if (this.data.analyseWeightRes === '偏瘦') {
          this.ai_analyseWeight('偏瘦')
        } else if (this.data.analyseWeightRes === '正常') {
          this.ai_analyseWeight('正常')
        } else if (this.data.analyseWeightRes === '超重') {
          this.ai_analyseWeight('超重')
        } else if (this.data.analyseWeightRes === '肥胖') {
          this.ai_analyseWeight('肥胖')
        }
      }
    })
  },
  ai_analyseWeight(p) {
    this.setData({
      text: '正在生成~'
    })
    wx.request({
      url: 'https://fbre8h.laf.dev/ai-chat',
      method: 'POST',
      data: {
        message: `体重${p}怎么办`
      },
      success: res => {
        this.setData({
          text: res.data.text
        })
      },
      fail: err => {
        console.log(err);
      }
    })
  },
  // 分析体重
  analyseWeight(w) {
    if (w < 18.5) {
      return '偏瘦'
    } else if (w >= 18.5 && w <= 24.9) {
      return '正常'
    } else if (w >= 25 && w <= 29.9) {
      return '超重'
    } else if (w >= 30) {
      return '肥胖'
    }
  },
  handleDevelop() {
    this.setData({
      dom_height: null,
      dom_overflow: 'visible',
      icon_visible: false
    })
  },
  handleDevelopBack() {
    this.setData({
      dom_height: '3rem',
      dom_overflow: 'hidden',
      icon_visible: true
    })
  },
  // 录入体重
  addWeight() {
    // 向storage的userMsg.weight数组添加体重数据, 注意同时向app里的date添加对应日期
    if (wx.getStorageSync('userMsg')) {
      wx.navigateTo({
        url: '/pages/weight/addWeight/addWeight',
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

  }
})