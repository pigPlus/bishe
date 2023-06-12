const app = getApp()
import Dialog from '@vant/weapp/dialog/dialog';
Page({
  data: {
    visible: true,
    userInfo: {},
    avatarUrlVisible: false
  },
  onLoad() {
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 3
      })
    }

  },
  onShow() {
    let v = wx.getStorageSync('userInfo')
    if (v) {
      this.setData({
        userInfo: v,
        avatarUrlVisible: true,
        visible: false
      })
    } else {
      this.setData({
        visible: true,
        avatarUrlVisible: false
      })
    }
  },
  getOpenId(userInfo) {
    wx.cloud.callFunction({
      name: 'getOpenId',
      data: {
        userInfo: userInfo
      },
      success: res => {
        app.globalData.openid = res.result.openid
        wx.cloud.callFunction({
          name: 'creatCart',
          data: {
            openid: res.result.openid
          },
        })
        wx.cloud.callFunction({
          name: 'creatAddress',
          data: {
            openid: res.result.openid
          }
        })
        wx.cloud.callFunction({
          name: 'creatOrder',
          data: {
            openid: res.result.openid
          }
        })
        wx.cloud.callFunction({
          name: 'creatApointment',
          data: {
            openid: res.result.openid
          }
        })
      },
      fail: err => {
        console.error(err)
      }
    })
  },
  login() {
    wx.getUserProfile({
      desc: '获取你的个人信息',
      success: res => {
        this.getOpenId(res.userInfo)
        wx.setStorageSync('userInfo', res.userInfo)
        this.setData({
          visible: false,
          userInfo: res.userInfo,
          avatarUrlVisible: true
        })
      },
      fail() {
        console.log('err');
      }
    })
  },
  signOut() {
    Dialog.confirm({
        title: '退出',
        message: '确认退出吗？',
      })
      .then(() => {
        // on confirm
        wx.removeStorageSync('userInfo')
        this.setData({
          avatarUrlVisible: false
        })
      })
      .catch(() => {
        // on cancel
      });
  }
})