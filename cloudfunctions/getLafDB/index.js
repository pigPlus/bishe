const {
  Cloud
} = require('../../node_modules/laf-client-sdk')
const cloud = new Cloud({
  baseUrl: "https://ngekun.laf.run",
  getAccessToken: () => "",
})
async function res() {
  const res = await cloud.invoke('getMsgList')
  return res
}
res().then(res => {
  console.log(res, 'res');
})