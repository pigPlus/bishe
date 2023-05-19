// pages/goodsDetail/goodsDetail.js
import Dialog from '@vant/weapp/dialog/dialog';
const app = getApp()
Page({
  data: {
    id: '', //商品id
    goodsDetail: {}, //数据
    options: [], //参数
    chooseOption: [], //已经选择的商品参数
    cartGoods: [], //弹框选中的购物车商品
    imgUrlArr: [], //详情图
    show: false,
    cartShow: false,
    cartActions: [],
    cost: '',
    inCartGoods: [], //购物车商品
    inCartOptions: [],
    goodsNum: 0,
    totalPrice: 0,
    loading: false,
    immediateShow: false,
    singleprice: 0,
    toBuyNum: 0,
    toMoveId: '',
    optionName: ''
  },
  onLoad(options) {
    this.setData({
      id: options.id
    })
  },
  onShow() {
    this.getOneGoods()
    this.getCart()
  },
  getOneGoods() {
    wx.cloud.callFunction({
      name: 'getOneGood',
      data: {
        id: this.data.id
      },
      success: res => {
        // console.log(res.result.data.detailImage);
        if (res.result.data.cost === '免运费') {
          this.setData({
            cost: res.result.data.cost,
          })
        } else {
          this.setData({
            cost: '运费' + res.result.data.cost + '元',
          })
        }
        this.setData({
          goodsDetail: res.result.data,
          options: res.result.data.options,
          imgUrlArr: res.result.data.detailImage,
          chooseOption: res.result.data.options[0]
        })
        // console.log(this.data.chooseOption, 'chooseOption');
      },
      fail: err => {
        console.log(err);
      }
    })
  },
  handleChoose() {
    this.setData({
      show: true
    })
  },
  onClose() {
    this.setData({
      show: false
    });
  },

  onSelect(event) {
    this.setData({
      chooseOption: event.detail
    })
  },
  toCart() {
    this.setData({
      cartShow: true
    })
  },
  onCartClose() {
    this.setData({
      cartShow: false
    });
  },
  onCartSelect(event) {
    this.setData({
      cartGoods: event.detail
    })
  },
  addGoodsToCart() {
    let par = 'CART' + app.globalData.openid
    wx.cloud.callFunction({
      name: 'addCart',
      data: {
        par,
        id: this.data.id,
        chooseOption: this.data.chooseOption
      },
      success: res => {
        //console.log(res.result.data, 'add');
        this.setData({
          inCartGoods: res.result.data
        })
        this.getCart()
      },
      fail: err => {
        console.log(err);
      }
    })
  },
  getCart() {
    let par = 'CART' + app.globalData.openid
    wx.cloud.callFunction({
      name: 'getCart',
      data: {
        dbname: par
      },
      success: res => {
        // console.log(res.result.data, '0000000789');
        this.setData({
          goodsNum: res.result.data.length
        })
        let arr = []
        let total = 0
        res.result.data.forEach(item => {
          if (item.listRes.data.name) {
            let obj = {}
            obj.name = item.listRes.data.name,
              obj.id = item.listRes.data._id,
              obj.option = item.chooseOption
            obj.num = item.listRes.data.cartNum
            arr.push(obj)
            total += (item.chooseOption.price * item.listRes.data.cartNum)
          }
        })
        this.setData({
          inCartOptions: arr,
          totalPrice: total
        })
        //  console.log(this.data.inCartOptions, 'inCartOptions');
      }
    })
  },
  onSubmit() {
    this.setData({
      loading: true
    })
    // console.log(this.data.inCartOptions);
    // 把当前订单数据传给order
    let list = JSON.stringify(this.data.inCartOptions)
    let total = this.data.totalPrice
    wx.navigateTo({
      url: `/pages/order/order?list=${list}&total=${total}`,
    })
    // wx.cloud.callFunction({
    //   name: 'addOrde',
    //   data: {

    //   }
    // })
    this.setData({
      loading: false
    })
  },
  onimmediateClose() {
    this.setData({
      immediateShow: false
    })
  },
  onimmediateSelect(event) {
    this.setData({
      immediateActions: event.detail
    })
  },
  immediate() {
    this.setData({
      immediateShow: true
    })
  },
  onStepperChange(event) {
    //console.log(event.currentTarget.dataset.optionname.name, 'detail');
    this.setData({
      toBuyNum: event.detail,
      toMoveId: event.currentTarget.dataset.name,
      optionName: event.currentTarget.dataset.optionname.name,
    })
    let _singleprice = event.currentTarget.dataset.singleprice
    this.setData({
      singleprice: _singleprice
    })
  },
  handleAdd() {
    let total = this.data.totalPrice + this.data.singleprice
    this.setData({
      totalPrice: total
    })
  },
  handleReduce() {
    let total = this.data.totalPrice - this.data.singleprice
    this.setData({
      totalPrice: total
    })
  },
  handleLimit() {
    this.setData({
      cartShow: false
    })
    Dialog.confirm({
        title: '删除',
        message: '确认从购物车删除该商品吗',
      })
      .then(() => {
        // on confirm
        wx.cloud.callFunction({
          name: 'deleteGoodsFromCart',
          data: {
            name: this.data.toMoveId,
            openid: app.globalData.openid,
            optionName: this.data.optionName
          },
          success: res => {
            console.log(res);
            this.getCart()
            this.setData({
              cartShow: true
            })
          },
          fail: err => {
            console.log(err);
          }
        })

      })
      .catch(() => {
        // on cancel
      });
  },
  customerService() {
    wx.openCustomerServiceChat({
      extInfo: {
        url: ''
      },
      corpId: '',
      success(res) {}
    })
  }
})