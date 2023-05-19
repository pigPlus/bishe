import {
  formatTimestamp
} from "../utils/index";
export async function getLastValue(type) {
  const app = getApp()
  const openid = app.globalData.openid
  const db = wx.cloud.database()
  const res = await db.collection("user_echarts_data").where({
    _openid: openid,
    type: type
  }).orderBy('currentDate', 'desc').limit(1).get()
  return res
}

export async function addUserEchartsData(type, data, time) {
  time = formatTimestamp(time, 'yyyy/MM/dd')
  const db = wx.cloud.database()
  const res = await db.collection('user_echarts_data').where({
    type: type,
    currentDate: time
  }).get()
  if (res.data.length > 0) {
    // 如果存在相同日期的数据，则更新数据
    const updateRes = await db.collection('user_echarts_data').where({
      type: type,
      currentDate: time
    }).update({
      data: {
        type: type,
        data: data,
        currentDate: time
      }
    })
    return updateRes
  } else {
    // 如果不存在相同日期的数据，则添加新数据
    const addRes = await db.collection('user_echarts_data').add({
      data: {
        type: type,
        data: data,
        currentDate: time
      }
    })
    return addRes
  }
}

export async function listLastValue(type) {
  const app = getApp()
  const openid = app.globalData.openid
  const db = wx.cloud.database()
  const res = await db.collection("user_echarts_data").where({
    _openid: openid,
    type: type
  }).orderBy('currentDate', 'asc').get()
  return res
}