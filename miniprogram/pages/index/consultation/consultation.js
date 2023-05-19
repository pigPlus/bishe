// pages/index/consultation/consultation.js
const app = getApp()
Page({
  data: {
    msgList: [],
    SocketTask: {},
    msg: [],
    value: '',
    id: '01',
    lastMsgList: [], //当前消息列表
    currentMsg: {}, //当前新消息
    isLeft: true,
    currentDoctor: ''
  },
  onLoad(options) {
    this.setData({
      currentDoctor: options.doctor
    })
    this.getWebsocket()
  },
  onUnload() {
    this.close()
  },
  updateMsgList() {
    wx.request({
      url: 'https://ngekun.laf.run/addMsgList',
      method: 'POST',
      data: {
        msgList: this.data.msgList
      },
      success(res) {
        //console.log(res);
      },
      fail(error) {
        console.log(error);
      }
    });
  },
  getMsgList(SocketTask, params) {
    //console.log('getMsgList');
    let that = this
    wx.request({
      url: 'https://ngekun.laf.run/getMsgList',
      method: 'GET',
      success(res) {
        console.log(res, 'getMsgList');
        let obj = {
          msg: params,
          id: '01'
        }
        //console.log(res.data.data[0].msgList, '789789');
        that.setData({
          msgList: res.data.data[0].msgList
        })
        that.data.msgList.push(obj)
        console.log(that.data.msgList, 'that.data.msgList');
        SocketTask.send({
          data: params,
          success: function (res) {
            //console.log('send');
            //console.log(res, '发送成功了')
            that.updateMsgList()
            that.setData({
              value: ''
            })
            return res
          },
          fail: function (err) {
            console.log(err, '发送失败了')
          }
        })

      },
      fail(error) {
        console.log(error);
      }
    });
  },
  getList() {
    wx.request({
      url: 'https://ngekun.laf.run/getMsgList',
      success: res => {
        console.log(res, 'lastMsgList');
        let len = res.data.data[0].msgList.length
        // if (res.data.data[0].msgList[len - 1]) {
        //   if (res.data.data[0].msgList[len - 1].id === '01') {
        //     this.setData({
        //       isLeft: true
        //     })
        //   } else {
        //     this.setData({
        //       isLeft: false
        //     })
        //   }
        // }
        //console.log(res.data.data[0].msgList[len - 1]);
        this.setData({
          lastMsgList: res.data.data[0].msgList,
          currentMsg: res.data.data[0].msgList[len - 1]
        })
        // console.log(this.data.lastMsgList, 'lastMsgList');
        // console.log(this.data.currentMsg, 'currentMsg');
      }
    })
  },
  getWebsocket() {
    this.setData({
      msgList: [],
      value: ''
    })
    this.updateMsgList()
    let SocketTask = wx.connectSocket({
      url: 'wss://ngekun.laf.run/__websocket__',
      success: function (res) {
        //console.log(res)
      },
      fail: function (err) {
        console.log(err)
      }
    })
    this.setData({
      SocketTask: SocketTask
    })
    this.firstSendMsg(SocketTask)
  },
  firstSendMsg(SocketTask, params) {
    SocketTask.onOpen((res) => {
      // 收消息
      SocketTask.onMessage((res) => {
        // console.log(res);
        this.getList()
      })
    })
  },
  // 发消息
  // sendMsg(SocketTask, params) {
  //   let that = this
  //   that.getMsgList()
  //   console.log(that.data.msgList, 'before');

  //   let obj = {
  //     msg: params,
  //     id: '01'
  //   }
  //   that.data.msgList.push(obj)
  //   console.log(that.data.msgList, 'after');
  //   SocketTask.send({
  //     data: params,
  //     success: function (res) {
  //       //console.log('send');
  //       //console.log(res, '发送成功了')
  //       that.updateMsgList()
  //       that.setData({
  //         value: ''
  //       })
  //     },
  //     fail: function (err) {
  //       console.log(err, '发送失败了')
  //     }
  //   })

  // },
  send() {
    this.getMsgList(this.data.SocketTask, this.data.value)
  },
  close() {
    let that = this
    wx.request({
      url: 'https://ngekun.laf.run/getMsgList',
      success: res => {
        // console.log(res.data.data[0].msgList);
        if (res.data.data[0].msgList.length) {
          // console.log(res.data.data[0].msgList, '789');
          // console.log(that.data.currentDoctor, 'that.data.currentDoctor');
          wx.request({
            url: 'https://ngekun.laf.run/saveMsgList',
            method: 'POST',
            data: {
              msgList: res.data.data[0].msgList,
              doctor: that.data.currentDoctor
            },
            success: res => {
              // console.log(res);
            },
            fail: err => {
              console.log(err);
            }
          })
        }

      },
      fail: err => {
        console.log(err);
      }
    })
    wx.nextTick(() => {
      this.data.SocketTask.close({
        success: function (res) {
          console.log(res, '离开页面关闭socket')
          that.setData({
            msgList: [],
            value: ''
          })
          that.updateMsgList()
        },
      })
    })

  },
  onChange(event) {
    // event.detail 为当前输入的值
    this.setData({
      value: event.detail
    })
  },
})