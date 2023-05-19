// pages/my/ConsultationRecord/ConsultationRecord.js
import Dialog from '@vant/weapp/dialog/dialog';
const app = getApp()
Page({
  data: {
    msgList: []
  },
  onLoad() {
    this.getMsgList()
  },
  getMsgList() {
    wx.request({
      url: 'https://ngekun.laf.run/getSaveMsgList',
      method: 'GET',
      success: res => {
        //console.log(res.data.data);
        this.setData({
          msgList: res.data.data
        })
      },
      fail: err => {
        console.log(err);
      }
    })
  },
  deleteMsg(e) {
    Dialog.confirm({
      title: '确认',
      message: '确认删除该聊天记录吗?',
    })
      .then(() => {
        // on confirm
        let id = e.currentTarget.dataset.id
    wx.request({
      url: 'https://ngekun.laf.run/deleteSavaMsgList',
      method: 'POST',
      data: {
        id
      },
      success: res => {
        this.getMsgList()
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
  handleMsgDetail(e) {
    let id = e.currentTarget.dataset.id
    wx.request({
      url: 'https://ngekun.laf.run/getOneChat',
      method: 'POST',
      data: {
        id
      },
      success: res => {
        //console.log(res.data.data[0].msgList);
        let list = JSON.stringify(res.data.data[0].msgList)
        wx.navigateTo({
          url: `/pages/my/ConsultationRecord/ConsultationRecordDetail/ConsultationRecordDetail?list=${list}`,
        })
      },
      fail: err => {
        console.log(err);
      }
    })
  },

})