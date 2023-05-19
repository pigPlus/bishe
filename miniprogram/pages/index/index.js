Page({
  data: {
    type: [], //文章分类
    ch_type: [], //文章类型分类
    active: 1, //tabs激活索引
    title: '美容频道', //tabs激活标签
    list: [], //文章动态数据,
    content: {}, //当前点击的文章信息
    src1: 'https://6c78-lx-cloud-7g15zrsid49e161d-1316935110.tcb.qcloud.la/%E5%8C%BB%E9%99%A2.png?sign=d93deef69a98a5c1f8a663645af7ccaa&t=1682493217',
    src2: 'https://6c78-lx-cloud-7g15zrsid49e161d-1316935110.tcb.qcloud.la/%E8%8D%AF.png?sign=ed3181a4b159c66b76c2e095c255c0fd&t=1682491766',
    src3: 'https://6c78-lx-cloud-7g15zrsid49e161d-1316935110.tcb.qcloud.la/S_%E4%B8%AD%E5%8C%BB%E8%A7%86%E9%A2%91%E9%97%AE%E8%AF%8A.png?sign=86a0fa21186e90a3bf7cb2a2c05669b1&t=1682492354'
  },

  onChange(event) {
    this.setData({
      title: event.detail.title
    })
    const m = this.data.type[0]
    if (this.data.title === '美容频道') {
      this.callF(`get${m.type[0].type}News`)
    } else if (this.data.title === '育儿频道') {
      this.callF(`get${m.type[1].type}News`)
    } else if (this.data.title === '生活频道') {
      this.callF(`get${m.type[2].type}News`)
    } else if (this.data.title === '睡眠频道') {
      this.callF(`get${m.type[4].type}News`)
    } else {
      this.callF(`get${m.type[3].type}News`)
    }
  },
  onLoad() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 0
      })
    }
    this.getType()
  },

  getType() {
    wx.cloud.callFunction({
      name: 'getNewsType',
      success: res => {
        let arr = []
        res.result.data[0].type.forEach(item => {
          arr.push(item.ch)
        })
        this.setData({
          type: res.result.data,
          ch_type: arr
        })
      },
      fail: err => {
        console.log(err);
      }
    })

  },
  async callF(ty) {
    //ty:云函数名称
    let res = await wx.cloud.callFunction({
      name: ty
    })
    if (ty) {
      this.setData({
        list: res.result.data
      })
    }
    // console.log(this.data.list, '888');
  },
  newsContent(e) {
    this.data.list.forEach(item => {
      if (item._id === e.currentTarget.dataset.id) {
        this.setData({
          content: item
        })
      }
    })
    wx.navigateTo({
      url: `/pages/newsContent/newsContent?_id=${e.currentTarget.dataset.id}`,
      getContent() {},
      success: res => {
        wx.setStorageSync('shareUrl', `/pages/newsContent/newsContent?_id=${e.currentTarget.dataset.id}`)
        wx.setStorageSync('shareContent', this.data.content)
        res.eventChannel.emit('getContent', {
          data: {
            data: this.data.content
          }

        })
      }
    })
  },
  goToShop() {
    wx.switchTab({
      url: '/pages/shop/shop'
    })
  },
  toConsultation() {
    wx.navigateTo({
      url: '/pages/index/doctorList/doctorList',
    })
  },
  toReservation() {
    wx.navigateTo({
      url: '/pages/index/reservation/reservation',
    })
  }
})