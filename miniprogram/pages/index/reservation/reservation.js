Page({
  data: {
    itemTitle: '根据科室',
    itemTitle2: '根据地区',
    option1: [{
        text: '全部商品',
        value: 0
      },
      {
        text: '新款商品',
        value: 1
      },
      {
        text: '活动商品',
        value: 2
      },
    ],
    value1: 0,
    items: [],
    addressItems: [],
    mainActiveIndex: 0,
    activeId: null,
    mainActiveIndex2: 0,
    activeId2: null,
    doctorDetail: [],
    isShow: false
  },
  onLoad() {
    this.getDpartment()
    this.getAddress()
    this.getDoctorDetail('', '')
  },
  getDoctorDetail(area, department) {
    wx.cloud.callFunction({
      name: 'getDoctorListByArea',
      data: {
        area: area,
        department: department
      },
      success: res => {
        console.log(res.result.data, 'detail');
        if (res.result.data.length === 0) {
          this.setData({
            isShow: true,
            doctorDetail: []
          })
        } else {
          this.setData({
            isShow: false,
            doctorDetail: res.result.data
          })
        }

      },
      fail: err => {
        console.log(err);
      }
    })
  },
  getDpartment() {
    wx.cloud.callFunction({
      name: 'getDpartment',
      success: res => {
        //console.log(res);
        this.setData({
          items: res.result.data
        })
      },
      fail: err => {
        console.log(err);
      }
    })
  },
  getAddress() {
    wx.cloud.callFunction({
      name: 'getAddress',
      success: res => {
        //console.log(res, 'res');
        this.setData({
          addressItems: res.result.data
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
      activeId,
      itemTitle: detail.text
    });
    //console.log(detail.text, 'activeId科室');
    if (this.data.itemTitle2 === '根据地区') {
      this.getDoctorDetail('', this.data.itemTitle)
    } else {
      this.getDoctorDetail(this.data.itemTitle2, this.data.itemTitle)
    }

  },
  onClickNav2({
    detail = {}
  }) {
    this.setData({
      mainActiveIndex2: detail.index || 0,
    });
    console.log(detail, 'left');
  },
  onClickItem2({
    detail = {}
  }) {
    const activeId = this.data.activeId === detail.id ? null : detail.id;

    this.setData({
      activeId2: activeId,
      itemTitle2: detail.text
    });
    //console.log(detail.text, 'activeId地区');
    if (this.data.itemTitle === '根据科室') {
      this.getDoctorDetail(this.data.itemTitle2, '')
    } else {
      this.getDoctorDetail(this.data.itemTitle2, this.data.itemTitle)
    }

  },
  toReservation(e) {
    let item = JSON.stringify(e.currentTarget.dataset.item)
    //console.log(item, 'item');
    wx.navigateTo({
      url: `/pages/index/reservation/reservationDetail/reservationDetail?item=${item}`,
    })
  }
});