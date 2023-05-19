// components/picker/picker.js
const app = getApp()
Component({
  properties: {
    sum: {
      type: Number,
      value: ''
    },
    list: {
      type: Array,
      value: ''
    },
    type: {
      type: String,
      value: ''
    }
  },
  data: {
    //复选框
    result: [],
  },
  attached: function () {
    // 在组件实例进入页面节点树时执行
    if (this.properties.type === '慢性病') {
      let res = wx.getStorageSync('userMsg').chronicDisease
      this.setData({
        result: res
      })
    } else if (this.properties.type === '家族病史') {
      let res = wx.getStorageSync('userMsg').familialDisease
      this.setData({
        result: res
      })
    } else if (this.properties.type === '药物过敏') {
      let res = wx.getStorageSync('userMsg').drug
      this.setData({
        result: res
      })
    } else if (this.properties.type === '食物过敏') {
      let res = wx.getStorageSync('userMsg').food
      this.setData({
        result: res
      })
    } else if (this.properties.type === '个人习惯') {
      let res = wx.getStorageSync('userMsg').accustomed
      this.setData({
        result: res
      })
    } else if (this.properties.type === '肝功能') {
      let res = wx.getStorageSync('userMsg').liver
      this.setData({
        result: res
      })
    } else if (this.properties.type === '肾功能') {
      let res = wx.getStorageSync('userMsg').kidney
      this.setData({
        result: res
      })
    } else if (this.properties.type === '婚姻状况') {
      let res = wx.getStorageSync('userMsg').marriage
      this.setData({
        result: res
      })
    } else if (this.properties.type === '生育状态') {
      let res = wx.getStorageSync('userMsg').giveBirth
      this.setData({
        result: res
      })
    }

  },
  methods: {
    onChangeLiver(e) {
      this.setData({
        result: e.detail,
      });
      if (this.properties.type === '慢性病') {
        app.globalData.userMsg.chronicDisease = this.data.result
      } else if (this.properties.type === '家族病史') {
        app.globalData.userMsg.familialDisease = this.data.result
      } else if (this.properties.type === '药物过敏') {
        app.globalData.userMsg.drug = this.data.result
      } else if (this.properties.type === '食物过敏') {
        app.globalData.userMsg.food = this.data.result
      } else if (this.properties.type === '个人习惯') {
        app.globalData.userMsg.accustomed = this.data.result
      } else if (this.properties.type === '肝功能') {
        app.globalData.userMsg.liver = this.data.result
      } else if (this.properties.type === '肾功能') {
        app.globalData.userMsg.kidney = this.data.result
      } else if (this.properties.type === '婚姻状况') {
        app.globalData.userMsg.marriage = this.data.result
      } else if (this.properties.type === '生育状态') {
        app.globalData.userMsg.giveBirth = this.data.result
      }

    },
  }
})