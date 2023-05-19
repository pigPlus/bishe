const app = getApp()
Page({
  data: {
    goodsList: [],
    value: '',
    isShow: false
  },
  onLoad() {
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 1
      })
    }
    this.getGoodsList()
  },
  getGoodsList() {
    wx.cloud.callFunction({
      name: 'getGoodsList',
      success: res => {
        this.setData({
          goodsList: res.result.data
        })
      },
      fail: err => {
        console.log(err);
      }
    })
  },
  handleGoods(e) {
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/goodsDetail/goodsDetail?id=${id}`,
    })
  },
  onChange(e) {
    this.setData({
      value: e.detail
    })
  },
  onClick() {
    wx.cloud.callFunction({
      name: 'searchGoods',
      data: {
        keyword: this.data.value
      },
      success: res => {
        if (res.result.data.length === 0) {
          this.setData({
            goodsList: [],
            isShow: true
          })
        } else {
          this.setData({
            goodsList: res.result.data,
            isShow: false
          })
        }

      },
      fail: err => {
        console.log(err);
      }
    })
  }
})