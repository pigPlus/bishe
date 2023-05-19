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
    legend: {
      data: ['收缩压', '舒张压', '心率']
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    yAxis: {},
    series: [{
      name: '收缩压',
      type: 'line'
    }, {
      name: '舒张压',
      type: 'line'
    }, {
      name: '心率',
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
      const res = await listLastValue('pressure')
      const echartsData = res.data.map(item => [new Date(item.currentDate).toLocaleDateString(), parseInt(item.data.low), parseInt(item.data.high), parseInt(item.data.rate)])
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