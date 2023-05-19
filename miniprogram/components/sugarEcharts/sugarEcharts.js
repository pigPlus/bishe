import * as echarts from '../../ec-canvas/echarts.js'
import {
  listLastValue
} from "../../api/health";

var myChart = null

function initChart(canvas, width, height, dpr) {
  myChart = echarts.init(canvas, null, {
    width: width,
    height: height,
    devicePixelRatio: dpr
  });
  canvas.setChart(myChart);
  let option = {
    xAxis: {
      type: 'category'
    },
    yAxis: {},
    series: [{
      type: 'line'
    }],
    dataset: {
      source: []
    },
  };
  myChart.setOption(option);
  return myChart;
}
Component({
  properties: {},
  lifetimes: {
    created: async function () {
      const res = await listLastValue('sugar')
      const echartsData = res.data.map(item => [new Date(item.currentDate).toLocaleDateString(), parseInt(item.data.bloodSugar)])
      setTimeout(() => {
        myChart.setOption({
          dataset: {
            source: [
              ...echartsData
            ]
          }
        })
      }, 500);
    },
  },
  data: {
    ec: {
      onInit: initChart
    }
  },
  methods: {}
})