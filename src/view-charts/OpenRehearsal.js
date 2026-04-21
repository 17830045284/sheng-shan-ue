import * as echarts from 'echarts'
import { axisLabel, axisLine, grid, splitLine, tooltip } from './chartOpt'
import { getImg } from '@/utils/assets'

//  渗透量变化
export function penetrationLine(dataObj, opt = {}) {
  const {waterData, xPointData} = dataObj
  const option = {
    tooltip: {
      trigger: 'axis',
      extraCssText: 'cursor: default;',
      appendToBody: true,
      axisPointer: {
        lineStyle: {
          type: 'solid',
          color: '#fff',
        },
      },
      borderColor: '#0989FF',
      backgroundColor: 'rgba(9, 137, 255, 0.34)',
      padding: [5, 10],
      extraCssText: 'box-shadow: 0 0 5px rgba(0,0,0,0.3)',
      textStyle: {
        color: '#FFFFFF', // 文字的颜色
        fontStyle: 'normal',
        fontWeight: 'normal',
      },
    },
    legend: {
      show: true,
      left: '40%',
      top: '5%',
      icon: 'path://M10.3551 2.5H13C13.5522 2.5 14 2.94775 14 3.5C14 3.7251 13.9255 3.93311 13.7999 4.1001C13.6174 4.34277 13.327 4.5 13 4.5H10.3551C9.9248 5.9458 8.58557 7 7 7C5.41443 7 4.0752 5.9458 3.6449 4.5H1C0.447754 4.5 0 4.05225 0 3.5C0 2.94775 0.447754 2.5 1 2.5H3.6449C4.0752 1.0542 5.41443 0 7 0C8.58557 0 9.9248 1.0542 10.3551 2.5Z',
      itemWidth: 20,
      itemHeight: 10,
      textStyle: {
        color: '#fff',
      },
      selectedMode: false,
    },
    grid: {
      left: '2%',
      right: '5%',
      top: '20%',
      bottom: '0',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      name: '',
      nameLocation: 'end',
      nameGap: 15,
      nameTextStyle: {
        color: '#fff',
        padding: [30, 0, 0, 0]
      },
      data: xPointData,
      boundaryGap: true,
      splitLine: {
        show: false,
        interval: 'auto',
        lineStyle: {
          color: ['#D4DFF5'],
        },
      },
      axisTick: {
        show: false,
      },
      axisLine: {
        lineStyle: {
          color: 'rgba(255, 255, 255, 0.20)',
        },
      },
      axisLabel: {
        interval: 0,
        formatter: function (value, index) {
          const step = 1;
          if ((index + 1) % step === 0 || index === 0) {
            return value;
          } else {
            return '';
          }
        },
        textStyle: {
          fontSize: 12,
          color: '#fff',
        },
      },
    },
    yAxis: [
      {
        type: 'value',
        name: '流量m³/s',
        nameTextStyle: {
          color: 'rgba(255, 255, 255, 0.80)',
          fontSize: 10,
        },
        // min: 0,
        // max: 110,
        axisLabel: {
          show: true,
          textStyle: {
            color: '#fff',
          },
        },
        axisLine: {
          show: false,
          lineStyle: {
            color: '#007F69',
          },
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          show: true,
          lineStyle: {
            type: 'dashed',
            color: 'rgba(255, 255, 255, 0.20)',
          },
        },
      },
      {
        type: 'value',
        name: '水位m',
        min: 0,
        max: 5,
        interval: 1,
        nameTextStyle: {
          color: 'rgba(255, 255, 255, 0.80)',
          fontSize: 10,
          padding: [0, 0, 0, 40]
        },
        axisLabel: {
          formatter: function (value) {
            return value.toFixed(2);
          },
          textStyle: {
            color: '#fff',
          },
        },
        axisLine: {
          show: false,
          lineStyle: {
            color: '#007F69',
          },
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          show: false,
          // lineStyle: {
          //   color: "#11366e",
          // },
        },
      },
    ],
    series: [
      {
        name: '消力池集水廊道',
        type: 'line',
        smooth: true,
        showSymbol: false,
        yAxisIndex: 0,
        data: waterData,
        areaStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(
              0,
              0,
              0,
              1,
              [
                {
                  offset: 0,
                  color: 'rgba(0, 170, 255, 0.78)',
                },
                {
                  offset: 1,
                  color: 'rgba(0, 170, 255, 0.06)',
                },
              ],
              false
            ),
          },
        },
        itemStyle: {
          normal: {
            color: '#00AAFF',
          },
        },
        lineStyle: {
          normal: {
            width: 1,
          },
        },
      }
    ],
  }
  return option
}

//  水位变化
export function waterDobLine(dataObj, opt = {}) {
  const {waterData, flowRateData, xPointData} = dataObj
  const option = {
    tooltip: {
      trigger: 'axis',
      extraCssText: 'cursor: default;',
      appendToBody: true,
      axisPointer: {
        lineStyle: {
          type: 'solid',
          color: '#fff',
        },
      },
      borderColor: '#0989FF',
      backgroundColor: 'rgba(9, 137, 255, 0.34)',
      padding: [5, 10],
      extraCssText: 'box-shadow: 0 0 5px rgba(0,0,0,0.3)',
      textStyle: {
        color: '#FFFFFF', // 文字的颜色
        fontStyle: 'normal',
        fontWeight: 'normal',
      },
    },
    legend: {
      show: true,
      left: '35%',
      top: '5%',
      icon: 'path://M10.3551 2.5H13C13.5522 2.5 14 2.94775 14 3.5C14 3.7251 13.9255 3.93311 13.7999 4.1001C13.6174 4.34277 13.327 4.5 13 4.5H10.3551C9.9248 5.9458 8.58557 7 7 7C5.41443 7 4.0752 5.9458 3.6449 4.5H1C0.447754 4.5 0 4.05225 0 3.5C0 2.94775 0.447754 2.5 1 2.5H3.6449C4.0752 1.0542 5.41443 0 7 0C8.58557 0 9.9248 1.0542 10.3551 2.5Z',
      itemWidth: 20,
      itemHeight: 10,
      textStyle: {
        color: '#fff',
      },
      selectedMode: false,
    },
    grid: {
      left: '2%',
      right: '5%',
      top: '20%',
      bottom: '0',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      name: '',
      nameLocation: 'end',
      nameGap: 15,
      nameTextStyle: {
        color: '#fff',
      },
      data: xPointData,
      boundaryGap: true,
      splitLine: {
        show: false,
        interval: 'auto',
        lineStyle: {
          color: ['#D4DFF5'],
        },
      },
      axisTick: {
        show: false,
      },
      axisLine: {
        lineStyle: {
          color: 'rgba(255, 255, 255, 0.20)',
        },
      },
      axisLabel: {
        interval: 0,
        formatter: function (value, index) {
          const step = 1;
          if ((index + 1) % step === 0 || index === 0) {
            return value;
          } else {
            return '';
          }
        },
        textStyle: {
          fontSize: 12,
          color: '#fff',
        },
      },
    },
    yAxis: [
      {
        type: 'value',
        name: '流量m³/h',
        nameTextStyle: {
          color: 'rgba(255, 255, 255, 0.80)',
          fontSize: 10,
        },
        min: 0,
        max: 120,
        axisLabel: {
          show: true,
          textStyle: {
            color: '#fff',
          },
        },
        axisLine: {
          show: false,
          lineStyle: {
            color: '#007F69',
          },
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          show: true,
          lineStyle: {
            type: 'dashed',
            color: 'rgba(255, 255, 255, 0.20)',
          },
        },
      },
      {
        type: 'value',
        name: '水位m',
        // min: 0,
        // max: 5,
        // interval: 1,
        nameTextStyle: {
          color: 'rgba(255, 255, 255, 0.80)',
          fontSize: 10,
          padding: [0, 0, 0, 40]
        },
        axisLabel: {
          formatter: function (value) {
            return value.toFixed(2);
          },
          textStyle: {
            color: '#fff',
          },
        },
        axisLine: {
          show: false,
          lineStyle: {
            color: '#007F69',
          },
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          show: false,
          // lineStyle: {
          //   color: "#11366e",
          // },
        },
      },
    ],
    series: [
      {
        name: '水库水位',
        type: 'line',
        smooth: true,
        showSymbol: false,
        symbol: 'circle',
        symbolSize: 6,
        yAxisIndex: 1,
        data: waterData,
        areaStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(
              0,
              0,
              0,
              1,
              [
                {
                  offset: 0,
                  color: 'rgba(255, 239, 91, 0.78)',
                },
                {
                  offset: 1,
                  color: 'rgba(255, 239, 91, 0.06)',
                },
              ],
              false
            ),
          },
        },
        itemStyle: {
          normal: {
            color: '#FFEF5B',
          },
        },
        lineStyle: {
          normal: {
            width: 1,
          },
        },
      },
      {
        name: '生态水位',
        type: 'line',
        smooth: true,
        showSymbol: false,
        symbol: 'circle',
        yAxisIndex: 1,
        symbolSize: 6,
        data: flowRateData,
        areaStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(
              0,
              0,
              0,
              1,
              [
                {
                  offset: 0,
                  color: 'rgba(0, 170, 255, 0.78)',
                },
                {
                  offset: 1,
                  color: 'rgba(0, 170, 255, 0.06)',
                },
              ],
              false
            ),
          },
        },
        itemStyle: {
          normal: {
            color: '#00AAFF',
          },
        },
        lineStyle: {
          normal: {
            width: 1,
          },
        },
      },
    ],
  }
  return option
}

//  流量变化
export function trafficLine(dataObj, opt = {}) {
  const {waterData, flowRateData, xPointData} = dataObj
  const option = {
    tooltip: {
      trigger: 'axis',
      extraCssText: 'cursor: default;',
      appendToBody: true,
      axisPointer: {
        lineStyle: {
          type: 'solid',
          color: '#fff',
        },
      },
      borderColor: '#0989FF',
      backgroundColor: 'rgba(9, 137, 255, 0.34)',
      padding: [5, 10],
      extraCssText: 'box-shadow: 0 0 5px rgba(0,0,0,0.3)',
      textStyle: {
        color: '#FFFFFF', // 文字的颜色
        fontStyle: 'normal',
        fontWeight: 'normal',
      },
    },
    legend: {
      show: true,
      left: '35%',
      top: '5%',
      icon: 'path://M10.3551 2.5H13C13.5522 2.5 14 2.94775 14 3.5C14 3.7251 13.9255 3.93311 13.7999 4.1001C13.6174 4.34277 13.327 4.5 13 4.5H10.3551C9.9248 5.9458 8.58557 7 7 7C5.41443 7 4.0752 5.9458 3.6449 4.5H1C0.447754 4.5 0 4.05225 0 3.5C0 2.94775 0.447754 2.5 1 2.5H3.6449C4.0752 1.0542 5.41443 0 7 0C8.58557 0 9.9248 1.0542 10.3551 2.5Z',
      itemWidth: 20,
      itemHeight: 10,
      textStyle: {
        color: '#fff',
      },
      selectedMode: false,
    },
    grid: {
      left: '2%',
      right: '5%',
      top: '20%',
      bottom: '0',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      name: '',
      nameLocation: 'end',
      nameGap: 15,
      nameTextStyle: {
        color: '#fff',
      },
      data: xPointData,
      boundaryGap: true,
      splitLine: {
        show: false,
        interval: 'auto',
        lineStyle: {
          color: ['#D4DFF5'],
        },
      },
      axisTick: {
        show: false,
      },
      axisLine: {
        lineStyle: {
          color: 'rgba(255, 255, 255, 0.20)',
        },
      },
      axisLabel: {
        interval: 0,
        formatter: function (value, index) {
          const step = 1;
          if ((index + 1) % step === 0 || index === 0) {
            return value;
          } else {
            return '';
          }
        },
        textStyle: {
          fontSize: 12,
          color: '#fff',
        },
      },
    },
    yAxis: [
      {
        type: 'value',
        name: '流量m³/h',
        nameTextStyle: {
          color: 'rgba(255, 255, 255, 0.80)',
          fontSize: 10,
        },
        // min: 0,
        // max: 120,
        axisLabel: {
          show: true,
          textStyle: {
            color: '#fff',
          },
        },
        axisLine: {
          show: false,
          lineStyle: {
            color: '#007F69',
          },
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          show: true,
          lineStyle: {
            type: 'dashed',
            color: 'rgba(255, 255, 255, 0.20)',
          },
        },
      },
      {
        type: 'value',
        name: '水位m',
        min: 0,
        max: 5,
        interval: 1,
        nameTextStyle: {
          color: 'rgba(255, 255, 255, 0.80)',
          fontSize: 10,
          padding: [0, 0, 0, 40],
        },
        axisLabel: {
          formatter: function (value) {
            return value.toFixed(2);
          },
          textStyle: {
            color: '#fff',
          },
        },
        axisLine: {
          show: false,
          lineStyle: {
            color: '#007F69',
          },
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          show: false,
          // lineStyle: {
          //   color: "#11366e",
          // },
        },
      },
    ],
    series: [
      {
        name: '出库流量',
        type: 'line',
        smooth: true,
        showSymbol: false,
        symbol: 'circle',
        symbolSize: 6,
        data: waterData,
        areaStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(
              0,
              0,
              0,
              1,
              [
                {
                  offset: 0,
                  color: 'rgba(255, 239, 91, 0.78)',
                },
                {
                  offset: 1,
                  color: 'rgba(255, 239, 91, 0.06)',
                },
              ],
              false
            ),
          },
        },
        itemStyle: {
          normal: {
            color: '#FFEF5B',
          },
        },
        lineStyle: {
          normal: {
            width: 1,
          },
        },
      },
      {
        name: '生态流量',
        type: 'line',
        smooth: true,
        showSymbol: false,
        symbol: 'circle',
        symbolSize: 6,
        data: flowRateData,
        areaStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(
              0,
              0,
              0,
              1,
              [
                {
                  offset: 0,
                  color: 'rgba(0, 170, 255, 0.78)',
                },
                {
                  offset: 1,
                  color: 'rgba(0, 170, 255, 0.06)',
                },
              ],
              false
            ),
          },
        },
        itemStyle: {
          normal: {
            color: '#00AAFF',
          },
        },
        lineStyle: {
          normal: {
            width: 1,
          },
        },
      },
    ],
  }
  return option
}

//  水情变化
export function waterRegimeLine(dataObj, opt = {}) {
  const {waterData, flowRateData, xPointData} = dataObj
  const option = {
    tooltip: {
      trigger: 'axis',
      extraCssText: 'cursor: default;',
      appendToBody: true,
      axisPointer: {
        lineStyle: {
          type: 'solid',
          color: '#fff',
        },
      },
      borderColor: '#0989FF',
      backgroundColor: 'rgba(9, 137, 255, 0.34)',
      padding: [5, 10],
      extraCssText: 'box-shadow: 0 0 5px rgba(0,0,0,0.3)',
      textStyle: {
        color: '#FFFFFF', // 文字的颜色
        fontStyle: 'normal',
        fontWeight: 'normal',
      },
    },
    legend: {
      show: true,
      left: '35%',
      top: '5%',
      icon: 'path://M10.3551 2.5H13C13.5522 2.5 14 2.94775 14 3.5C14 3.7251 13.9255 3.93311 13.7999 4.1001C13.6174 4.34277 13.327 4.5 13 4.5H10.3551C9.9248 5.9458 8.58557 7 7 7C5.41443 7 4.0752 5.9458 3.6449 4.5H1C0.447754 4.5 0 4.05225 0 3.5C0 2.94775 0.447754 2.5 1 2.5H3.6449C4.0752 1.0542 5.41443 0 7 0C8.58557 0 9.9248 1.0542 10.3551 2.5Z',
      itemWidth: 20,
      itemHeight: 10,
      textStyle: {
        color: '#fff',
      },
      selectedMode: false,
    },
    grid: {
      left: '2%',
      right: '5%',
      top: '20%',
      bottom: '0',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      name: '',
      nameLocation: 'end',
      nameGap: 15,
      nameTextStyle: {
        color: '#fff',
      },
      data: xPointData,
      boundaryGap: true,
      splitLine: {
        show: false,
        interval: 'auto',
        lineStyle: {
          color: ['#D4DFF5'],
        },
      },
      axisTick: {
        show: false,
      },
      axisLine: {
        lineStyle: {
          color: 'rgba(255, 255, 255, 0.20)',
        },
      },
      axisLabel: {
        interval: 0,
        formatter: function (value, index) {
          const step = 1;
          if ((index + 1) % step === 0 || index === 0) {
            return value;
          } else {
            return '';
          }
        },
        textStyle: {
          fontSize: 12,
          color: '#fff',
        },
      },
    },
    yAxis: [
      {
        type: 'value',
        name: '流量m³/h',
        nameTextStyle: {
          color: 'rgba(255, 255, 255, 0.80)',
          fontSize: 10,
          padding: [0, 0, 0, -30],
        },
        // min: 0,
        // max: 120,
        axisLabel: {
          show: true,
          textStyle: {
            color: '#fff',
          },
        },
        axisLine: {
          show: false,
          lineStyle: {
            color: '#007F69',
          },
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          show: true,
          lineStyle: {
            type: 'dashed',
            color: 'rgba(255, 255, 255, 0.20)',
          },
        },
      },
      {
        type: 'value',
        name: '水位m',
        // min: 0,
        // max: 5,
        // interval: 1,
        nameTextStyle: {
          color: 'rgba(255, 255, 255, 0.80)',
          fontSize: 10,
          padding: [0, 0, 0, 35],
        },
        axisLabel: {
          formatter: function (value) {
            return value.toFixed(2);
          },
          textStyle: {
            color: '#fff',
          },
        },
        axisLine: {
          show: false,
          lineStyle: {
            color: '#007F69',
          },
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          show: false,
          // lineStyle: {
          //   color: "#11366e",
          // },
        },
      },
    ],
    series: [
      {
        name: '水位',
        type: 'line',
        smooth: true,
        showSymbol: false,
        symbol: 'circle',
        symbolSize: 6,
        yAxisIndex: 1,
        data: waterData,
        areaStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(
              0,
              0,
              0,
              1,
              [
                {
                  offset: 0,
                  color: 'rgba(255, 239, 91, 0.78)',
                },
                {
                  offset: 1,
                  color: 'rgba(255, 239, 91, 0.06)',
                },
              ],
              false
            ),
          },
        },
        itemStyle: {
          normal: {
            color: '#FFEF5B',
          },
        },
        lineStyle: {
          normal: {
            width: 1,
          },
        },
      },
      {
        name: '流量',
        type: 'line',
        smooth: true,
        showSymbol: false,
        symbol: 'circle',
        symbolSize: 6,
        yAxisIndex: 0,
        data: flowRateData,
        areaStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(
              0,
              0,
              0,
              1,
              [
                {
                  offset: 0,
                  color: 'rgba(0, 170, 255, 0.78)',
                },
                {
                  offset: 1,
                  color: 'rgba(0, 170, 255, 0.06)',
                },
              ],
              false
            ),
          },
        },
        itemStyle: {
          normal: {
            color: '#00AAFF',
          },
        },
        lineStyle: {
          normal: {
            width: 1,
          },
        },
      },
    ],
  }
  return option
}

//  负荷变化
export function loadLine(dataObj, opt = {}) {
  const {waterData, flowRateData, xPointData} = dataObj
  const option = {
    tooltip: {
      trigger: 'axis',
      extraCssText: 'cursor: default;',
      appendToBody: true,
      axisPointer: {
        lineStyle: {
          type: 'solid',
          color: '#fff',
        },
      },
      borderColor: '#0989FF',
      backgroundColor: 'rgba(9, 137, 255, 0.34)',
      padding: [5, 10],
      extraCssText: 'box-shadow: 0 0 5px rgba(0,0,0,0.3)',
      textStyle: {
        color: '#FFFFFF', // 文字的颜色
        fontStyle: 'normal',
        fontWeight: 'normal',
      },
    },
    legend: {
      show: true,
      left: '30%',
      top: '5%',
      icon: 'path://M10.3551 2.5H13C13.5522 2.5 14 2.94775 14 3.5C14 3.7251 13.9255 3.93311 13.7999 4.1001C13.6174 4.34277 13.327 4.5 13 4.5H10.3551C9.9248 5.9458 8.58557 7 7 7C5.41443 7 4.0752 5.9458 3.6449 4.5H1C0.447754 4.5 0 4.05225 0 3.5C0 2.94775 0.447754 2.5 1 2.5H3.6449C4.0752 1.0542 5.41443 0 7 0C8.58557 0 9.9248 1.0542 10.3551 2.5Z',
      itemWidth: 20,
      itemHeight: 10,
      textStyle: {
        color: '#fff',
      },
      selectedMode: false,
    },
    grid: {
      left: '2%',
      right: '5%',
      top: '20%',
      bottom: '0',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      name: '',
      nameLocation: 'end',
      nameGap: 15,
      nameTextStyle: {
        color: '#fff',
      },
      data: xPointData,
      boundaryGap: true,
      splitLine: {
        show: false,
        interval: 'auto',
        lineStyle: {
          color: ['#D4DFF5'],
        },
      },
      axisTick: {
        show: false,
      },
      axisLine: {
        lineStyle: {
          color: 'rgba(255, 255, 255, 0.20)',
        },
      },
      axisLabel: {
        interval: 0,
        formatter: function (value, index) {
          const step = 1;
          if ((index + 1) % step === 0 || index === 0) {
            return value;
          } else {
            return '';
          }
        },
        textStyle: {
          fontSize: 12,
          color: '#fff',
        },
      },
    },
    yAxis: [
      {
        type: 'value',
        name: 'kw',
        nameTextStyle: {
          color: 'rgba(255, 255, 255, 0.80)',
          fontSize: 10,
          padding: [0, 0, 0, -35],
        },
        // min: 0,
        // max: 120,
        axisLabel: {
          show: true,
          textStyle: {
            color: '#fff',
          },
        },
        axisLine: {
          show: false,
          lineStyle: {
            color: '#007F69',
          },
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          show: true,
          lineStyle: {
            type: 'dashed',
            color: 'rgba(255, 255, 255, 0.20)',
          },
        },
      },
    ],
    series: [
      {
        name: '电网负荷',
        type: 'line',
        smooth: true,
        showSymbol: false,
        symbol: 'circle',
        symbolSize: 6,
        data: waterData,
        areaStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(
              0,
              0,
              0,
              1,
              [
                {
                  offset: 0,
                  color: 'rgba(255, 239, 91, 0.78)',
                },
                {
                  offset: 1,
                  color: 'rgba(255, 239, 91, 0.06)',
                },
              ],
              false
            ),
          },
        },
        itemStyle: {
          normal: {
            color: '#FFEF5B',
          },
        },
        lineStyle: {
          normal: {
            width: 1,
          },
        },
      },
      {
        name: '总发电负荷',
        type: 'line',
        smooth: true,
        showSymbol: false,
        symbol: 'circle',
        symbolSize: 6,
        data: flowRateData,
        areaStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(
              0,
              0,
              0,
              1,
              [
                {
                  offset: 0,
                  color: 'rgba(0, 170, 255, 0.78)',
                },
                {
                  offset: 1,
                  color: 'rgba(0, 170, 255, 0.06)',
                },
              ],
              false
            ),
          },
        },
        itemStyle: {
          normal: {
            color: '#00AAFF',
          },
        },
        lineStyle: {
          normal: {
            width: 1,
          },
        },
      },
    ],
  }
  return option
}

//  发电变化
export function powerLine(dataObj, opt = {}) {
  const {waterData, xPointData} = dataObj
  const option = {
    tooltip: {
      trigger: 'axis',
      extraCssText: 'cursor: default;',
      appendToBody: true,
      axisPointer: {
        lineStyle: {
          type: 'solid',
          color: '#fff',
        },
      },
      borderColor: '#0989FF',
      backgroundColor: 'rgba(9, 137, 255, 0.34)',
      padding: [5, 10],
      extraCssText: 'box-shadow: 0 0 5px rgba(0,0,0,0.3)',
      textStyle: {
        color: '#FFFFFF', // 文字的颜色
        fontStyle: 'normal',
        fontWeight: 'normal',
      },
    },
    legend: {
      show: false,
      left: '35%',
      top: '10%',
      icon: 'path://M10.3551 2.5H13C13.5522 2.5 14 2.94775 14 3.5C14 3.7251 13.9255 3.93311 13.7999 4.1001C13.6174 4.34277 13.327 4.5 13 4.5H10.3551C9.9248 5.9458 8.58557 7 7 7C5.41443 7 4.0752 5.9458 3.6449 4.5H1C0.447754 4.5 0 4.05225 0 3.5C0 2.94775 0.447754 2.5 1 2.5H3.6449C4.0752 1.0542 5.41443 0 7 0C8.58557 0 9.9248 1.0542 10.3551 2.5Z',
      itemWidth: 20,
      itemHeight: 10,
      textStyle: {
        color: '#fff',
      },
      selectedMode: false,
    },
    grid: {
      left: '2%',
      right: '5%',
      top: '15%',
      bottom: '0',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      name: '',
      nameLocation: 'end',
      nameGap: 15,
      nameTextStyle: {
        color: '#fff',
      },
      data: xPointData,
      boundaryGap: true,
      splitLine: {
        show: false,
        interval: 'auto',
        lineStyle: {
          color: ['#D4DFF5'],
        },
      },
      axisTick: {
        show: false,
      },
      axisLine: {
        lineStyle: {
          color: 'rgba(255, 255, 255, 0.20)',
        },
      },
      axisLabel: {
        interval: 0,
        formatter: function (value, index) {
          const step = 1;
          if ((index + 1) % step === 0 || index === 0) {
            return value;
          } else {
            return '';
          }
        },
        textStyle: {
          fontSize: 12,
          color: '#fff',
        },
      },
    },
    yAxis: [
      {
        type: 'value',
        name: '发电量(万kWh)',
        nameTextStyle: {
          color: 'rgba(255, 255, 255, 0.80)',
          fontSize: 10,
          padding: [0, 0, 0, 8],
        },
        // min: 0,
        // max: 120,
        axisLabel: {
          show: true,
          textStyle: {
            color: '#fff',
          },
        },
        axisLine: {
          show: false,
          lineStyle: {
            color: '#007F69',
          },
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          show: true,
          lineStyle: {
            type: 'dashed',
            color: 'rgba(255, 255, 255, 0.20)',
          },
        },
      },
    ],
    series: [
      {
        name: '总发电负荷',
        type: 'line',
        smooth: true,
        showSymbol: false,
        symbol: 'circle',
        symbolSize: 6,
        data: waterData,
        areaStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(
              0,
              0,
              0,
              1,
              [
                {
                  offset: 0,
                  color: 'rgba(0, 170, 255, 0.78)',
                },
                {
                  offset: 1,
                  color: 'rgba(0, 170, 255, 0.06)',
                },
              ],
              false
            ),
          },
        },
        itemStyle: {
          normal: {
            color: '#00AAFF',
          },
        },
        lineStyle: {
          normal: {
            width: 1,
          },
        },
      },
    ],
  }
  return option
}

//  振动变化
export function vibrationLine(dataObj, opt = {}) {
  const {waterData, xPointData} = dataObj
  const option = {
    tooltip: {
      trigger: 'axis',
      extraCssText: 'cursor: default;',
      appendToBody: true,
      axisPointer: {
        lineStyle: {
          type: 'solid',
          color: '#fff',
        },
      },
      borderColor: '#0989FF',
      backgroundColor: 'rgba(9, 137, 255, 0.34)',
      padding: [5, 10],
      extraCssText: 'box-shadow: 0 0 5px rgba(0,0,0,0.3)',
      textStyle: {
        color: '#FFFFFF', // 文字的颜色
        fontStyle: 'normal',
        fontWeight: 'normal',
      },
    },
    legend: {
      show: false,
      left: '35%',
      top: '10%',
      icon: 'path://M10.3551 2.5H13C13.5522 2.5 14 2.94775 14 3.5C14 3.7251 13.9255 3.93311 13.7999 4.1001C13.6174 4.34277 13.327 4.5 13 4.5H10.3551C9.9248 5.9458 8.58557 7 7 7C5.41443 7 4.0752 5.9458 3.6449 4.5H1C0.447754 4.5 0 4.05225 0 3.5C0 2.94775 0.447754 2.5 1 2.5H3.6449C4.0752 1.0542 5.41443 0 7 0C8.58557 0 9.9248 1.0542 10.3551 2.5Z',
      itemWidth: 20,
      itemHeight: 10,
      textStyle: {
        color: '#fff',
      },
      selectedMode: false,
    },
    grid: {
      left: '2%',
      right: '5%',
      top: '15%',
      bottom: '0',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      name: '',
      nameLocation: 'end',
      nameGap: 15,
      nameTextStyle: {
        color: '#fff',
      },
      data: xPointData,
      boundaryGap: true,
      splitLine: {
        show: false,
        interval: 'auto',
        lineStyle: {
          color: ['#D4DFF5'],
        },
      },
      axisTick: {
        show: false,
      },
      axisLine: {
        lineStyle: {
          color: 'rgba(255, 255, 255, 0.20)',
        },
      },
      axisLabel: {
        interval: 0,
        formatter: function (value, index) {
          const step = 1;
          if ((index + 1) % step === 0 || index === 0) {
            return value;
          } else {
            return '';
          }
        },
        textStyle: {
          fontSize: 12,
          color: '#fff',
        },
      },
    },
    yAxis: [
      {
        type: 'value',
        name: 'mm/s',
        nameTextStyle: {
          color: 'rgba(255, 255, 255, 0.80)',
          fontSize: 10,
          padding: [0, 0, 0, 8],
        },
        // min: 0,
        // max: 120,
        axisLabel: {
          show: true,
          textStyle: {
            color: '#fff',
          },
        },
        axisLine: {
          show: false,
          lineStyle: {
            color: '#007F69',
          },
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          show: true,
          lineStyle: {
            type: 'dashed',
            color: 'rgba(255, 255, 255, 0.20)',
          },
        },
      },
    ],
    series: [
      {
        name: '',
        type: 'line',
        smooth: true,
        showSymbol: false,
        symbol: 'circle',
        symbolSize: 6,
        data: waterData,
        areaStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(
              0,
              0,
              0,
              1,
              [
                {
                  offset: 0,
                  color: 'rgba(0, 170, 255, 0.78)',
                },
                {
                  offset: 1,
                  color: 'rgba(0, 170, 255, 0.06)',
                },
              ],
              false
            ),
          },
        },
        itemStyle: {
          normal: {
            color: '#00AAFF',
          },
        },
        lineStyle: {
          normal: {
            width: 1,
          },
        },
      },
    ],
  }
  return option
}

//  效率变化
export function efficiencyLine(dataObj, opt = {}) {
  const {waterData, xPointData} = dataObj
  const option = {
    tooltip: {
      trigger: 'axis',
      extraCssText: 'cursor: default;',
      appendToBody: true,
      axisPointer: {
        lineStyle: {
          type: 'solid',
          color: '#fff',
        },
      },
      borderColor: '#0989FF',
      backgroundColor: 'rgba(9, 137, 255, 0.34)',
      padding: [5, 10],
      extraCssText: 'box-shadow: 0 0 5px rgba(0,0,0,0.3)',
      textStyle: {
        color: '#FFFFFF', // 文字的颜色
        fontStyle: 'normal',
        fontWeight: 'normal',
      },
    },
    legend: {
      show: false,
      left: '35%',
      top: '10%',
      icon: 'path://M10.3551 2.5H13C13.5522 2.5 14 2.94775 14 3.5C14 3.7251 13.9255 3.93311 13.7999 4.1001C13.6174 4.34277 13.327 4.5 13 4.5H10.3551C9.9248 5.9458 8.58557 7 7 7C5.41443 7 4.0752 5.9458 3.6449 4.5H1C0.447754 4.5 0 4.05225 0 3.5C0 2.94775 0.447754 2.5 1 2.5H3.6449C4.0752 1.0542 5.41443 0 7 0C8.58557 0 9.9248 1.0542 10.3551 2.5Z',
      itemWidth: 20,
      itemHeight: 10,
      textStyle: {
        color: '#fff',
      },
      selectedMode: false,
    },
    grid: {
      left: '2%',
      right: '5%',
      top: '15%',
      bottom: '0',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      name: '',
      nameLocation: 'end',
      nameGap: 15,
      nameTextStyle: {
        color: '#fff',
      },
      data: xPointData,
      boundaryGap: true,
      splitLine: {
        show: false,
        interval: 'auto',
        lineStyle: {
          color: ['#D4DFF5'],
        },
      },
      axisTick: {
        show: false,
      },
      axisLine: {
        lineStyle: {
          color: 'rgba(255, 255, 255, 0.20)',
        },
      },
      axisLabel: {
        interval: 0,
        formatter: function (value, index) {
          const step = 1;
          if ((index + 1) % step === 0 || index === 0) {
            return value;
          } else {
            return '';
          }
        },
        textStyle: {
          fontSize: 12,
          color: '#fff',
        },
      },
    },
    yAxis: [
      {
        type: 'value',
        name: '%',
        nameTextStyle: {
          color: 'rgba(255, 255, 255, 0.80)',
          fontSize: 10,
          padding: [0, 0, 0, 8],
        },
        // min: 0,
        // max: 120,
        axisLabel: {
          show: true,
          textStyle: {
            color: '#fff',
          },
        },
        axisLine: {
          show: false,
          lineStyle: {
            color: '#007F69',
          },
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          show: true,
          lineStyle: {
            type: 'dashed',
            color: 'rgba(255, 255, 255, 0.20)',
          },
        },
      },
    ],
    series: [
      {
        name: '',
        type: 'line',
        smooth: true,
        showSymbol: false,
        symbol: 'circle',
        symbolSize: 6,
        data: waterData,
        areaStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(
              0,
              0,
              0,
              1,
              [
                {
                  offset: 0,
                  color: 'rgba(0, 170, 255, 0.78)',
                },
                {
                  offset: 1,
                  color: 'rgba(0, 170, 255, 0.06)',
                },
              ],
              false
            ),
          },
        },
        itemStyle: {
          normal: {
            color: '#00AAFF',
          },
        },
        lineStyle: {
          normal: {
            width: 1,
          },
        },
      },
    ],
  }
  return option
}

//  防淹曲线
export function floodLine(dataObj, opt = {}) {
  const {waterData, flowRateData, xPointData} = dataObj
  const option = {
    tooltip: {
      trigger: 'axis',
      extraCssText: 'cursor: default;',
      appendToBody: true,
      axisPointer: {
        lineStyle: {
          type: 'solid',
          color: '#fff',
        },
      },
      borderColor: '#0989FF',
      backgroundColor: 'rgba(9, 137, 255, 0.34)',
      padding: [5, 10],
      extraCssText: 'box-shadow: 0 0 5px rgba(0,0,0,0.3)',
      textStyle: {
        color: '#FFFFFF', // 文字的颜色
        fontStyle: 'normal',
        fontWeight: 'normal',
      },
    },
    legend: {
      show: false,
    },
    grid: {
      left: '2%',
      right: '7%',
      top: '15%',
      bottom: '5%',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      name: '',
      nameLocation: 'end',
      nameGap: 15,
      nameTextStyle: {
        color: '#fff',
      },
      data: xPointData,
      boundaryGap: false,
      splitLine: {
        show: false,
        interval: 'auto',
        lineStyle: {
          color: ['#D4DFF5'],
        },
      },
      axisTick: {
        show: false,
      },
      axisLine: {
        lineStyle: {
          color: 'rgba(255, 255, 255, 0.20)',
        },
      },
      axisLabel: {
        interval: 0,
        formatter: function (value, index) {
          const step = 4;
          if (index === 0 || (index + 1) % step === 0 || index === xPointData.length - 1) {
            return value;
          } else {
            return '';
          }
        },
        textStyle: {
          fontSize: 12,
          color: '#fff',
        },
      },
    },
    yAxis: [
      {
        type: 'value',
        name: 'm',
        nameTextStyle: {
          color: 'rgba(255, 255, 255, 0.80)',
          fontSize: 10,
          padding: [0, 0, 0, -30],
        },
        // min: 0,
        // max: 120,
        axisLabel: {
          show: true,
          formatter: function (value) {
            return Number(value).toFixed(2)
          },
          textStyle: {
            color: '#fff',
          },
        },
        axisLine: {
          show: false,
          lineStyle: {
            color: '#007F69',
          },
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          show: true,
          lineStyle: {
            type: 'dashed',
            color: 'rgba(255, 255, 255, 0.20)',
          },
        },
      },
    ],
    series: [
      {
        name: '',
        type: 'line',
        smooth: true,
        showSymbol: false,
        symbol: 'circle',
        symbolSize: 6,
        zIndex: 10,
        data: waterData,
        areaStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(
              0,
              0,
              0,
              1,
              [
                {
                  offset: 0,
                  color: 'rgba(0, 170, 255, 0.78)',
                },
                {
                  offset: 1,
                  color: 'rgba(0, 170, 255, 0.06)',
                },
              ],
              false
            ),
          },
        },
        itemStyle: {
          normal: {
            color: '#00AAFF',
          },
        },
        lineStyle: {
          normal: {
            width: 1,
          },
        },
      },
      {
        name: '',
        type: 'line',
        smooth: true,
        showSymbol: false,
        symbol: 'circle',
        symbolSize: 6,
        data: flowRateData,
        areaStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(
              0,
              0,
              0,
              1,
              [
                {
                  offset: 0,
                  color: 'rgba(255, 0, 0, 0.78)',
                },
                {
                  offset: 1,
                  color: 'rgba(255, 0, 0, 0.06)',
                },
              ],
              false
            ),
          },
        },
        itemStyle: {
          normal: {
            color: '#ff0000',
          },
        },
        lineStyle: {
          normal: {
            width: 1,
            type: 'dashed',
          },
        },
      },
    ],
  }
  return option
}
