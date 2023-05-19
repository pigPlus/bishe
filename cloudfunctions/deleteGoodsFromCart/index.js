const cloud = require('wx-server-sdk')
cloud.init({
  env: 'lx-cloud-7g15zrsid49e161d'
})
const db = cloud.database()
const _ = db.command
exports.main = async (event, context) => {
  console.log(event.optionName);
  let collectionName = 'CART' + event.openid
  try {
    let res = await db.collection(collectionName).where({
      listRes: {
        data: {
          name: event.name
        }
      },
      chooseOption: {
        name: event.optionName
      }
    }).remove()
    console.log(res);
  } catch (e) {
    console.error(e)
  }
}