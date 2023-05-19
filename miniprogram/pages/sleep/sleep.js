// pages/sleep/sleep.js
import Notify from '@vant/weapp/notify/notify';
import {
  getLastValue
} from "../../api/health";
Page({
  data: {
    lastSleepTime: 0,
    echartsVisible: false,
    text: '',
    dom_height: '3rem',
    dom_overflow: 'hidden',
    icon_visible: true,
    analyseRes: ''
  },
  onShow() {
    this.getData()
    this.setData({
      echartsVisible: true
    })
  },
  async getData() {
    const res = await getLastValue('sleep')
    if (res.data.length > 0) {
      this.setData({
        lastSleepTime: res.data[0].data.sleepTime || 0
      })
    }
    this.analyseSleepTime(this.data.lastSleepTime)
  },
  // 新增记录
  handleAddSleepTime() {
    if (wx.getStorageSync('userMsg')) {
      wx.navigateTo({
        url: '/pages/sleep/addSleepTime/addSleepTime',
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
  // 内容收起
  handleDevelopBack() {
    this.setData({
      dom_height: '3rem',
      dom_overflow: 'hidden',
      icon_visible: true
    })
  },
  // 打开内容
  handleDevelop() {
    this.setData({
      dom_height: null,
      dom_overflow: 'visible',
      icon_visible: false
    })
  },
  // ai 分析
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
        this.setData({
          text: res.data.text
        })
      },
      fail: err => {
        console.log(err);
      }
    })
  },
  // 分析睡觉时间
  analyseSleepTime(time) {
    if (time < 7) {
      this.setData({
        analyseRes: '睡眠时间不足'
      })
      this.ai_analyse('睡眠时间不足')
      return '睡眠时间不足'
    } else if (time >= 7 && time <= 9) {
      this.setData({
        analyseRes: '睡眠时间正常'
      })
      this.ai_analyse('睡眠时间正常')
      return '睡眠时间正常'
    } else if (time > 9) {
      this.setData({
        analyseRes: '睡眠时间太长'
      })
      this.ai_analyse('睡眠时间太长')
      return '睡眠时间太长'
    }
  }
})