const cloud = require('wx-server-sdk')
cloud.init({
  env: 'lx-cloud-7g15zrsid49e161d'
})
const db = cloud.database()
exports.main = async (event, context) => {
  let collectionName = event.par //购物车集合名称
  let listRes = await db.collection('goods_list').doc(event.id).get() //查询商品
  let r = await db.collection(collectionName).where({
    listRes: {
      data: {
        _id: listRes.data._id
      }
    },
    chooseOption: {
      price: event.chooseOption.price
    }
  }).get()
  const _ = db.command
  let f = false
  if (r.data[0]) {
    if (r.data[0].chooseOption.price) {
      if (r.data[0].chooseOption.price === event.chooseOption.price) {
        f = true
      }
    }
  }

  if (r.data.length === 1 && f) {
    await db.collection(collectionName).doc(r.data[0]._id).update({
      data: {
        listRes: {
          data: {
            cartNum: _.inc(1)
          }
        }
      }

    })
    return db.collection(event.par).get()
  } else {
    await db.collection(collectionName).add({
      data: {
        listRes,
        chooseOption: event.chooseOption
      }
    })
    return db.collection(event.par).get()
  }

}