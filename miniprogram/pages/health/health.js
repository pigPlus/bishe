const app = getApp()
import {
  getLastValue
} from "../../api/health";
Page({
  data: {
    toLoginVisible: true,
    newMsgShow: true,
    userOtherMsg: {},
    storageValue: {},
    lastWeight: 0, //最后一次体重
    lastSugar: 0,
    lastBloodPressureLow: 0,
    lastBloodPressureHigh: 0,
    bmi: 0,
    lastSleepTime: 0,
    postList: [],
    isInputShow: false,
    inputValue: '',
    InputPostsShow: false,
    InputPostsValue: ''
  },
  onLoad() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 2
      })
    }
  },
  onShow() {
    this.getPosts()
    this.initUserInfo()
    this.getEchartsData()
  },
  async getEchartsData() {
    const res1 = await getLastValue('sleep')
    const res2 = await getLastValue('pressure')
    const res3 = await getLastValue('weight')
    const sugar = await getLastValue('sugar')
    this.setData({
      lastSleepTime: res1.data.length > 0 ? res1.data[0].data.sleepTime : 0,
      lastWeight: res3.data.length > 0 ? res3.data[0].data.weight : 0,
      bmi: res3.data.length > 0 ? res3.data[0].data.bmi : 0,
      lastSugar: res2.data.length > 0 ? res2.data[0].data.bloodSugar : 0,
      lastBloodPressureLow: res2.data.length > 0 ? res2.data[0].data.low : 0,
      lastBloodPressureHigh: res2.data.length > 0 ? res2.data[0].data.high : 0,
      lastSugar: sugar.data.length > 0 ? sugar.data[0].data.bloodSugar : 0
    })
  },
  initUserInfo() {
    let userInfo = wx.getStorageSync('userInfo')
    if (userInfo) {
      this.setData({
        toLoginVisible: false
      })
    }
    let v = wx.getStorageSync('userMsg')
    if (v) {
      this.setData({
        newMsgShow: false,
        storageValue: v
      })
    }
  },
  getPosts() {
    wx.cloud.callFunction({
      name: 'getPosts',
      success: res => {
         //console.log(res.result.data);
        this.setData({
          postList: res.result.data
        })
      },
      fail: err => {
        console.log(err);
      }
    })
  },
  handleBuilt() {
    wx.navigateTo({
      url: '/pages/newBuilt/newBuilt',
    })
  },
  toBloodSugarPage() {
    wx.navigateTo({
      url: '/pages/bloodSugar/bloodSugar',
    })
  },
  toBloodPressurePage() {
    wx.navigateTo({
      url: '/pages/bloodPressure/bloodPressure',
    })
  },
  toheartRatePage() {
    wx.navigateTo({
      url: '/pages/heartRate/heartRate',
    })
  },
  tosleepPage() {
    wx.navigateTo({
      url: '/pages/sleep/sleep',
    })
  },
  toweightPage() {
    wx.navigateTo({
      url: '/pages/weight/weight',
    })
  },
  tosportPage() {
    wx.navigateTo({
      url: '/pages/sports/sports',
    })
  },
  toEdit() {
    wx.navigateTo({
      url: '/pages/newBuilt/newBuilt',
    })
  },
  toLogin() {
    wx.switchTab({
      url: '/pages/my/my',
    })
  },
  onInputChange(e) {
    this.setData({
      inputValue: e.detail
    })
  },
  toCommit() {
    this.setData({
      isInputShow: true
    })
    // console.log(e.currentTarget.dataset.item);

  },
  cancelCommit() {
    this.setData({
      isInputShow: false
    })
  },
  Commit(e) {
    let follows = e.currentTarget.dataset.item.follows
    follows.push({
      order: '2',
      posts: this.data.inputValue
    })
    wx.cloud.callFunction({
      name: 'addCommit',
      data: {
        follows: follows,
        _id: e.currentTarget.dataset.item._id
      },
      success: res => {
        console.log(res);
        this.setData({
          inputValue: '',
          isInputShow: false
        })
        this.getPosts()
      },
      fail: err => {
        console.log(err);
      }
    })
  },
  putPosts() {
    this.setData({
      InputPostsShow: true
    })
  },
  onInputPostsValueChange(e) {
    this.setData({
      InputPostsValue: e.detail
    })
  },
  cancel() {
    this.setData({
      InputPostsShow: false
    })
  },
  put() {
    wx.cloud.callFunction({
      name: 'addPost',
      data: {
        value: this.data.InputPostsValue
      },
      success: res => {
        this.getPosts()
        this.setData({
          InputPostsShow: false
        })
      },
      fail: err => {
        console.log(err);
      }
    })
  }
})