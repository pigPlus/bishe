// app.js
App({
  globalData: {
    userMsg: {
      username: '',
      sex: '',
      birth: '',
      high: '', //身高
      weight: [], //体重
      BMI: '',
      waistline: '', //腰围
      smoke: '', //吸烟史
      drink: '', //饮酒史
      liver: [], //肝
      kidney: [], //肾
      marriage: [], //婚姻
      giveBirth: [], //生育
      chronicDisease: [], //慢性病
      familialDisease: [], //家族病
      drug: [], //药物过敏
      food: [], //食物过敏
      accustomed: [], //个人习惯
    },
    userOtherMsg: {
      sportTime: 0, //运动时间
      bloodSugar: [], //血糖
      bloodPressureLow: [], //收缩压
      bloodPressureHigh: [], //舒张压
      heartRate: [], //心率
      sleepTime: [], //睡眠时间,
    },
    date: [], //体重
    bloodSugarDate: [], //记录血糖时间
    bloodPressureDate: [], //记录血压时间
    sleepTime: [], //记录睡眠时间
    goodsList: [],
    openid: 'otyV_5DqcH8ORHk4YwhrbIDmTrKs'
  },
  onLaunch: function () {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力');
    } else {
      wx.cloud.init({
        env: 'lx-cloud-7g15zrsid49e161d',
        traceUser: true,
      });
    }
  }
});