// pages/index/doctorList/doctorList.js
Page({
  data: {
    mainActiveIndex: 0,
    activeId: null,
    items: []

  },
  onLoad() {
    //this.getDoctorList()
    this.getDpartment()
  },
  getDpartment() {
    wx.cloud.callFunction({
      name: 'getDpartment',
      success: res => {
        console.log(res);
        this.setData({
          items: res.result.data
        })
      },
      fail: err => {
        console.log(err);
      }
    })
  },
  getDoctorList(type) {
    wx.cloud.callFunction({
      name: 'getDoctorList',
      data: {
        type
      },
      success: res => {
        //console.log(res.result.data);
        res.result.data.forEach(item => {
          let len = item.doctor.length
          for (let i = 0; i < len; i++) {
            this.setData({

            })
          }
        })
      },
      fail: err => {
        console.log(err);
      }
    })
  },
  onClickNav({
    detail = {}
  }) {
    this.setData({
      mainActiveIndex: detail.index || 0,
    });
    //console.log(detail, 'left');
  },

  onClickItem({
    detail = {}
  }) {
    const activeId = this.data.activeId === detail.id ? null : detail.id;

    this.setData({
      activeId
    });
    wx.navigateTo({
      url: `/pages/index/consultation/consultation?doctor=${detail.text}`,
    })
    //console.log(detail.text, 'activeId');
  },
  toAiChat() {
    wx.navigateTo({
      url: '/pages/index/doctorList/aiChat/aiChat',
    })
  }
})