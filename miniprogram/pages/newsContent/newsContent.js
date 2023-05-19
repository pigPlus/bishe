// pages/newsContent/newsContent.js
Page({
  data: {
    content: {},
    url: ''
  },
  onLoad() {
    // 在当前页面中获取页面栈信息
    const pages = getCurrentPages()
    // 判断是否存在上一页
    if (pages.length > 1) {
      // 存在上一页，即从上一页跳转而来
      this.getOpenerEventChannel().once('getContent', (params) => {
        this.setData({
          content: params.data.data
        })
      })
    } else {
      // 不存在上一页，即从其他入口进入
      let v = wx.getStorageSync('shareUrl')
      let shareContent = wx.getStorageSync('shareContent')
      this.setData({
        url: v.slice(1),
        content: shareContent
      })
    }
  },
  onShareAppMessage() {
    return {
      title: this.data.content['文章标题'],
      path: this.data.url
    }
  }
})