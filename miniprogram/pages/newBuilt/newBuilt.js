import Notify from '@vant/weapp/notify/notify';
const options = [{
    text: '浙江省',
    value: '330000',
    children: [{
      text: '杭州市',
      value: '330100'
    }],
  },
  {
    text: '江苏省',
    value: '320000',
    children: [{
      text: '南京市',
      value: '320100'
    }],
  },
];
const optionsWaistline = [{
    text: '50cm以下',
    value: '50cm以下'
  },
  {
    text: '50-60cm',
    value: '50-60cm'
  },
  {
    text: '61-70cm',
    value: '61-70cm'
  },
  {
    text: '71-80cm',
    value: '71-80cm'
  },
  {
    text: '81-90cm',
    value: '81-90cm'
  },
  {
    text: '91-100cm',
    value: '91-100cm'
  },
  {
    text: '101-110cm',
    value: '101-110cm'
  },
  {
    text: '111-120cm',
    value: '111-120cm'
  },
  {
    text: '121-130cm',
    value: '121-130cm'
  },
  {
    text: '130cm以上',
    value: '130cm以上'
  }
];
const optionsSmoke = [{
    text: '有',
    value: 1
  },
  {
    text: '无',
    value: 0
  }
];
const optionsDrink = [{
    text: '有',
    value: 1
  },
  {
    text: '无',
    value: 0
  }
];
const app = getApp();
const list_liver = ['正常', '异常'];
const marriage = ['未婚', '已婚'];
const giveBirth = ['未生育', '备孕期', '怀孕中', '已生育'];
Page({
  data: {
    username: '', //姓名(用户名)
    value: '',
    radio: '男', //性别
    date: '', //出生日期
    show: false, //canlender显示
    minDate: new Date(2022, 0, 1).getTime(), //日期最小日期
    fieldValue: '', //van-field
    cascaderValue: '', //cascader
    show2: false, //级联选择器显示
    options, //cascader
    weight: '', //体重
    high: '',
    fieldValueWaistline: '', //腰围(van-field)
    showWaistline: false, //腰围(级联显示)
    bmiValue: '', //BMI
    cascaderValueWaistline: '', //腰围级联
    optionsWaistline, //腰围级联数据,
    fieldValueSmoke: '', //吸烟
    showSmoke: false, //吸烟史(级联显示)
    cascaderValueSmoke: '', //吸烟史级联
    optionsSmoke, //吸烟史级联数据
    fieldValueDrink: '', //饮酒
    showDrink: false, //饮酒史级联
    cascaderValueDrink: '', //饮酒史级联
    optionsDrink, //饮酒史级联数据
    list_liver, //肝功能数据
    marriage, //婚姻状况数据
    giveBirth, //生育状态数据
    disease: [], //慢性病,
    famliyHistroy: [], //家族病史
    drugList: [], //药物过敏
    foodList: [], //食物过敏
    customList: [], //个人习惯
    readonly: true
  },
  onShow() {
    this.getMsg()
    this.getDiseaseList()
    this.getFamliyHistroyList()
    this.getDrugList()
    this.getFoodList()
    this.getCustomList()
  },
  getMsg() {
    let v = wx.getStorageSync('userMsg')
    if (v) {
      this.setData({
        username: v.username,
        radio: v.sex,
        date: v.birth,
        high: v.high,
        weight: v.weight[v.weight.length - 1],
        bmiValue: v.BMI,
        fieldValueWaistline: v.waistline,
        fieldValueSmoke: v.smoke,
        fieldValueDrink: v.drink
      })
    }
  },
  //选择性别
  onChange(event) {
    this.setData({
      radio: event.detail,
    });
  },
  //日历展示
  onDisplay() {
    this.setData({
      show: true
    });
  },
  //calendar关闭时回调
  onClose() {
    this.setData({
      show: false
    });
  },
  formatDate(date) {
    date = new Date(date);
    return `${date.getMonth() + 1}/${date.getDate()}`;
  },
  //日期选择完成后
  onConfirm(event) {
    this.setData({
      show: false,
      date: this.formatDate(event.detail),
    });
  },
  //van-field点击
  onClick() {
    this.setData({
      show2: true,
    });
  },
  //popup关闭
  onClose2() {
    this.setData({
      show2: false,
    });
  },
  //van-cascader
  onFinish(e) {
    const {
      selectedOptions,
      value
    } = e.detail;
    const fieldValue = selectedOptions
      .map((option) => option.text || option.name)
      .join('/');
    this.setData({
      fieldValue,
      cascaderValue: value,
      show2: false
    })
  },
  onCloseWaistline() {
    this.setData({
      showWaistline: false,
    });
  },
  onFinishWaistline(e) {
    const {
      selectedOptions,
      value
    } = e.detail;
    const fieldValue = selectedOptions
      .map((option) => option.text || option.name)
      .join('/');
    this.setData({
      fieldValueWaistline: fieldValue,
      cascaderValueWaistline: value,
      showWaistline: false
    })
  },
  onClickWaistline() {
    this.setData({
      showWaistline: true,
    });
  },
  // 吸烟史
  onClickSmoke() {
    this.setData({
      showSmoke: true,
    });
  },
  onCloseSmoke() {
    this.setData({
      showSmoke: false,
    });
  },
  onFinishSmoke(e) {
    const {
      selectedOptions,
      value
    } = e.detail;
    const fieldValue = selectedOptions
      .map((option) => option.text || option.name)
      .join('/');
    this.setData({
      fieldValueSmoke: fieldValue,
      cascaderValueSmoke: value,
      showSmoke: false
    })
  },
  // 饮酒史
  onClickDrink() {
    this.setData({
      showDrink: true,
    });
  },
  onCloseDrink() {
    this.setData({
      showDrink: false,
    });
  },
  onFinishDrink(e) {
    const {
      selectedOptions,
      value
    } = e.detail;
    const fieldValue = selectedOptions
      .map((option) => option.text || option.name)
      .join('/');
    this.setData({
      fieldValueDrink: fieldValue,
      cascaderValueDrink: value,
      showDrink: false
    })
  },
  getDiseaseList() {
    wx.cloud.callFunction({
      name: 'diseaseList',
      success: res => {
        this.setData({
          disease: res.result.data[0].item_arr
        })
      },
      fail: err => {
        console.log(err);
      }
    })
  },
  getFamliyHistroyList() {
    wx.cloud.callFunction({
      name: 'famliyHistroyList',
      success: res => {
        this.setData({
          famliyHistroy: res.result.data[0].item_name
        })
      },
      fail: err => {
        console.log(err);
      }
    })
  },
  getDrugList() {
    wx.cloud.callFunction({
      name: 'drugList',
      success: res => {
        this.setData({
          drugList: res.result.data[0].item_name
        })
      },
      fail: err => {
        console.log(err);
      }
    })
  },
  getFoodList() {
    wx.cloud.callFunction({
      name: 'foodList',
      success: res => {
        this.setData({
          foodList: res.result.data[0].item_name
        })
      },
      fail: err => {
        console.log(err);
      }
    })
  },
  getCustomList() {
    wx.cloud.callFunction({
      name: 'customList',
      success: res => {
        this.setData({
          customList: res.result.data[0].item_name
        })
      },
      fail: err => {
        console.log(err);
      }
    })
  },
  //保存用户名
  onChangeUsername(e) {
    this.setData({
      username: e.detail
    })
  },
  //保存体重
  onChangeWeight(e) {
    this.setData({
      weight: e.detail
    })
    this.onChangeBMI()
  },
  // 保存身高
  onChangeHigh(e) {
    this.setData({
      high: e.detail
    })
    this.onChangeBMI()
  },
  // 计算BMI
  onChangeBMI() {
    if (this.data.weight && this.data.high) {
      let bmi = this.data.weight / ((this.data.high / 100) * (this.data.high / 100))
      this.setData({
        bmiValue: bmi.toFixed(1)
      })
    }
  },
  validate() {
    if (!this.data.username || !this.data.date) {
      if (this.data.username === '') {
        Notify({
          type: 'success',
          message: '姓名为空'
        });
      } else {
        Notify({
          type: 'success',
          message: '出生日期为空'
        });
      }
      return 0
    } else {
      return 1
    }
  },
  //将用户信息保存到globalData
  saveUserMsg() {
    var currentDate = new Date();
    var month = currentDate.getMonth() + 1; //获取当前月份(0-11, 0代表1月)
    var day = currentDate.getDate(); //获取当前日(1-31)
    if (month.length === 1) {
      month = '0' + month
    }
    if (day.length === 1) {
      day = '0' + day
    }
    let _date = month + '-' + day
    if (wx.getStorageSync('userMsg')) {
      if (!this.validate()) {
        return
      } else {
        let v = wx.getStorageSync('userMsg')
        v.username = this.data.username
        v.sex = this.data.radio
        v.birth = this.data.date
        v.high = this.data.high
        v.BMI = this.data.bmiValue
        v.waistline = this.data.waistline
        v.smoke = this.data.fieldValueSmoke
        v.drink = this.data.fieldValueDrink
        // picker
        v.chronicDisease = app.globalData.userMsg.chronicDisease
        v.familialDisease = app.globalData.userMsg.familialDisease
        v.drug = app.globalData.userMsg.drug
        v.food = app.globalData.userMsg.food
        v.liver = app.globalData.userMsg.liver
        v.kidney = app.globalData.userMsg.kidney
        v.marriage = app.globalData.userMsg.marriage
        v.giveBirth = app.globalData.userMsg.giveBirth
        v.accustomed = app.globalData.userMsg.accustomed
        // _date是时间, wx.getStorageSync('date')是数组
        if (_date === wx.getStorageSync('date')[wx.getStorageSync('date').length - 1]) {
          v.weight[v.weight.length - 1] = this.data.weight
        } else {
          let dateArr = wx.getStorageSync('date')
          dateArr.push(_date)
          wx.setStorageSync('date', dateArr)
          v.weight.push(this.data.weight)
        }
        wx.setStorageSync('userMsg', v)

        wx.switchTab({
          url: '/pages/health/health',
        })
      }

    } else {
      if (!this.validate()) {
        return
      } else {
        app.globalData.userMsg.username = this.data.username
        app.globalData.userMsg.sex = this.data.radio
        app.globalData.userMsg.birth = this.data.date
        app.globalData.userMsg.high = this.data.high
        if (this.data.weight) {
          app.globalData.userMsg.weight.push(this.data.weight)
        }
        app.globalData.userMsg.BMI = this.data.bmiValue
        app.globalData.userMsg.waistline = this.data.fieldValueWaistline
        app.globalData.userMsg.smoke = this.data.fieldValueSmoke
        app.globalData.userMsg.drink = this.data.fieldValueDrink
        var currentDate = new Date();
        var month = currentDate.getMonth() + 1; //获取当前月份(0-11, 0代表1月)
        var day = currentDate.getDate(); //获取当前日(1-31)
        wx.setStorageSync('userMsg', app.globalData.userMsg)
        wx.setStorageSync('userOtherMsg', app.globalData.userOtherMsg)
        if (month.length === 1) {
          month = '0' + month
        }
        if (day.length === 1) {
          day = '0' + day
        }
        let _date = month + '-' + day
        if (this.data.bmiValue) {
          app.globalData.date.push(_date)
        }
        // 
        wx.setStorageSync('date', app.globalData.date)
        wx.setStorageSync('bloodSugarDate', app.globalData.bloodSugarDate)
        wx.setStorageSync('bloodPressureDate', app.globalData.bloodPressureDate)
        wx.setStorageSync('sleepTime', app.globalData.sleepTime)
        // const id1 = this.selectComponent('#id1')
        // id1.setData({
        //   _prop: 1,
        //   type: 'liver'
        // })
        wx.switchTab({
          url: '/pages/health/health',
        })
      }
    }


  }
});