import * as echarts from 'echarts'
import { axisLabel, axisLine, grid, splitLine, tooltip } from './chartOpt'
import { getImg } from '@/utils/assets'

export function alertPie(data, opt = {}) {
  const color1 = new echarts.graphic.LinearGradient(0, 0, 0, 1, [
    { offset: 0.5, color: '#f5f895' },
    { offset: 1, color: '#f5f89510' },
  ])
  const color2 = new echarts.graphic.LinearGradient(0, 0, 0, 1, [
    { offset: 0.5, color: '#665bc2' },
    { offset: 1, color: '#665bc210' },
  ])
  const color3 =  new echarts.graphic.LinearGradient(0, 0, 1, 0, [
    { offset: 0.2, color: '#e63639' },
    { offset: 1, color: '#e6363910' },
  ])
  const color4 = new echarts.graphic.LinearGradient(0, 0, 0, 1, [
    { offset: 0, color: '#2a95f9' },
    { offset: 1, color: '#2a95f910' },
  ])
  const color5 = new echarts.graphic.LinearGradient(0, 0, 0, 1, [
    { offset: 0, color: '#f38622' },
    { offset: 1, color: '#f3862210' },
  ])
  const colorList = [color3, color5, color1, color2, color4]
  const echartData = []
  for(let i = 0; i < data.length; i++) {
    echartData.push({
      ...data[i],
      itemStyle: {
        normal: {
          color: colorList[i],
        }
      }
    })
  }
  const option = {
    tooltip: {
      show: true,
      extraCssText: 'cursor: default;',
      formatter: function (value) {
        let data = value.data
        return `${data.name} ${data.value} (${data.percent})`
      },
    },
    series: [
      {
        name: '智能告警',
        type: 'pie',
        labelLine: {
          show: false,
        },
        label: {
          show: false,
        },
        radius: ['75%', '90%'],
        center: ['23%', '49%'],
        hoverAnimation: false,
        itemStyle: {
          borderWidth: 5,
          borderColor: '#53687eFF',
        },
        color: [
          '#c487ee',
          '#deb140',
          '#49dff0',
          '#034079',
          '#6f81da',
          '#00ffb4',
        ],
        data: echartData,
      }
    ],
  }
  return option
}

export function horizontalBar(data, opt = {}) {
  const { defaultData, defaultName} = data
  let maxYaxis = defaultData.map((item) => 1)
  const option = {
    grid: {
      containLabel: true,
      left: '0',
      right: '5%',
      bottom: '5%',
      top: '3%',
    },
    tooltip,
    xAxis: {
      name: '',
      show: true,
      type: 'value',
      splitLine: {
        show: false,
        lineStyle: {
          color: '#61738C',
          type: 'dashed',
        },
      },
      axisLabel: {
        textStyle: {
          color: '#b3c7c9',
          fontSize: 12,
        },
        padding: [-12, 0, 0, 10],
      },
      axisLine: {
        show: false, //不显示x轴
        lineStyle: {
          color: '#15588b',
        },
      },
      axisTick: {
        show: false, //不显示刻度
      },
    },
    yAxis: [
      {
        type: 'category',
        inverse: true,
        axisLabel: {
          margin: 5,
          color: '#b3c7c9',
          fontWeight: 500,
          fontSize: 12,
          interval: 0,
          formatter: function (value) {
            let str = ''
            let num = 4 //每行显示字数
            let valLength = value.length //该项x轴字数
            let rowNum = Math.ceil(valLength / num) // 行数
            if (rowNum > 1) {
              for (let i = 0; i < rowNum; i++) {
                let temp = ''
                let start = i * num
                let end = start + num
                temp = value.substring(start, end) + ''
                str += temp
              }
              return str
            } else {
              return value
            }
          },
        },
        splitLine: {
          show: false,
          lineStyle: {
            color: '#61738C',
            type: 'dashed',
          },
        },
        axisLine: {
          show: false, //不显示x轴
          lineStyle: {
            color: '#15588b',
          },
        },
        axisTick: {
          show: false, //不显示刻度
        },
        data: defaultName,
      },
    ],
    series: [
      {
        type: 'bar',
        // showBackground: true,
        backgroundStyle: {
          opacity: 1,
          color: '#1f4365',
        },
        yAxisIndex: 0,
        data: defaultData,
        barWidth: 6,
        // align: left,
        stack: '2',
        itemStyle: {
          normal: {
            //颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
            color: function (params) {
              return params.dataIndex
                ? new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                    {
                      offset: 0,
                      color: '#00d5fc',
                    },
                    {
                      offset: 1,
                      color: '#1280eb',
                    },
                  ])
                : new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                    {
                      offset: 0,
                      color: '#FFC700',
                    },
                    {
                      offset: 1,
                      color: '#FFE500',
                    },
                  ])
            },
          },
        },
      },
      {
        type: 'pictorialBar',
        data: defaultData,
        xAxisIndex: 0,
        yAxisIndex: 0,
        zlevel: 99,
        symbol: `image://${getImg('icon.webp')}`,
        symbolRotate: 0,
        symbolSize: [10, 10],
        symbolPosition: 'end',
        symbolOffset: [4, 0],
        itemStyle: {
          color: '#ffffff',
          shadowColor: '#ffffff',
          shadowBlur: 10,
        },
        tooltip: {
          show: false,
          extraCssText: 'cursor: default;',
        },
      },
      {
        barWidth: 6,
        name: '',
        type: 'bar',
        barGap: '-100%',
        itemStyle: {
          barBorderRadius: [0, 0, 0, 0],
          shadowColor: '#3892FF',
          opacity: 0.2,
        },
        data: maxYaxis,
        zlevel: -1,
        global: false, // 缺省为 false
        tooltip: {
          show: false,
          extraCssText: 'cursor: default;',
        },
      },
    ],
  }
  return option
}

export function payloadLine(dataObj, opt = {}) {
  const {waterData, payLoadData, xPointData} = dataObj
  const totalWater = waterData.reduce((sum,cur) => sum + cur.value, 0)
  const totalPayLoad = payLoadData.reduce((sum,cur) => sum + cur.value, 0)
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
      right: '30%',
      top: '0',
      // icon: 'circle',
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
      top: '30%',
      bottom: '0%',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      name: '(时)',
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
          const step = 6;
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
        name: '负荷(kW)',
        nameTextStyle: {
          color: 'rgba(255, 255, 255, 0.80)',
          fontSize: 10,
        },
        scale: true,
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
        name: '水位(m)',
        scale: true,
        nameTextStyle: {
          color: 'rgba(255, 255, 255, 0.80)',
          fontSize: 10,
        },
        axisLabel: {
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
        yAxisIndex: 1,
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
                  color: 'rgba(255, 238, 148, 0.78)',
                },
                {
                  offset: 1,
                  color: 'rgba(254, 224, 69, 0.06)',
                },
              ],
              false
            ),
          },
        },
        itemStyle: {
          normal: {
            color: '#F2CD48',
          },
        },
        lineStyle: {
          normal: {
            width: 1,
          },
        },
      },
      {
        name: '负荷',
        type: 'line',
        smooth: true,
        showSymbol: false,
        symbol: 'circle',
        symbolSize: 6,
        data: payLoadData,
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
                  color: 'rgba(34, 135, 245, 1)',
                },
                {
                  offset: 1,
                  color: 'rgba(71, 172, 229, 0.06)',
                },
              ],
              false
            ),
          },
        },
        itemStyle: {
          normal: {
            color: '#118DFF',
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

export function predictLine(data, opt = {}) {
  const yAxisTotalData = data.plan
  const yAxisWaterWorks = data.real
  const yAxisOwned = data.predict
  const option = {
    // backgroundColor: "#000000",
    tooltip,
    grid: {
      top: '25%',
      right: '10%',
      left: '3%',
      bottom: '0',
      containLabel: true,
    },
    legend: {
      right: '5%',
      top: '5%',
      itemWidth: 15,
      itemHeight: 10,
      textStyle: {
        color: '#ffffff',
      },
      data: ['计划发电量', '实际发电量', '预测发电量'],
      selectedMode: false,
    },
    xAxis: [
      {
        name: '(月)',
        nameTextStyle: {
          color: '#fff',
        },
        type: 'category',
        data: ["01","02","03", "04", "05", "06", "07" ,"08","09","10","11", "12"],
        boundaryGap: false, //x轴顶头显示
        axisLine: {
          lineStyle: {
            color: 'rgba(255,255,255,0.12)',
          },
        },
        axisLabel: {
          interval: 0,
          formatter: function (value, index) {
            const step = 6;
            if ((index + 1) % step === 0 || index === 0) {
              return value;
            } else {
              return '';
            }
          },
          color: '#e2e9ff',
        },
      },
    ],
    yAxis: [
      {
        name: '万(kWh)',
        boundaryGap: ['0%', '12%'],
        nameTextStyle: {
          padding: [0, 0, 0, 0]
        },
        axisLabel: {
          formatter: '{value}',
          color: '#e2e9ff',
        },
        axisLine: {
          show: false,
          lineStyle: {
            color: 'rgba(255,255,255,1)',
          },
        },
        splitLine: {
          lineStyle: {
            type: 'dashed',
            color: 'rgba(255,255,255,0.12)',
          },
        },
      },
    ],
    series: [
      {
        name: '计划发电量',
        type: 'line',
        smooth: true,
        showSymbol: false,
        symbol: 'circle',
        symbolSize: 5,
        color: 'rgba(0, 255, 0, 1)',
        data: yAxisTotalData,
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: 'rgba(0, 255, 0, 1)',
            },
            {
              offset: 1,
              color: 'rgba(0, 173, 253, 0)',
            },
          ]),
        },
      },
      {
        name: '实际发电量',
        type: 'line',
        smooth: true,
        showSymbol: false,
        symbol: 'circle',
        symbolSize: 5,
        color: 'rgba(255, 255, 0, 1)',
        data: yAxisWaterWorks,
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: 'rgba(255, 255, 0, 1)',
            },
            {
              offset: 1,
              color: 'rgba(0, 173, 253, 0)',
            },
          ]),
        },
      },
      {
        name: '预测发电量',
        showSymbol: false,
        type: 'line',
        smooth: true,
        symbol: 'circle',
        symbolSize: 5,
        color: 'rgba(0, 160, 233, 1)',
        data: yAxisOwned,
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: 'rgba(0, 160, 233, 1)',
            },
            {
              offset: 1,
              color: 'rgba(0, 173, 253, 0)',
            },
          ]),
        },
      },
    ],
  }
  return option
}

export function electricityBar(data, opt = {} ) {
  const { xAxisData, seriesData } = data
  return {
    tooltip,
    grid: {
      left: '10%',
      top: '20%',
      right: '10%',
      bottom: '18%'
    },
    xAxis: {
      name: '(年)',
      nameTextStyle: {
        color: 'rgba(255, 255, 255, 0.80)'
      },
      axisLine: {
        show: true,
        lineStyle: {
          color: 'rgba(255, 255, 255, 0.20)'
        }
      },
      axisLabel: {
        color: '#FFFFFF'
      },
      axisTick: {
        show: false
      },
      data: xAxisData
    },
    yAxis: [
      {
        name: '万(kWh)',
        nameTextStyle: {
          color: 'rgba(255, 255, 255, 0.80)'
        },
        type: 'value',
        splitLine: {
          show: true,
          lineStyle: {
            type: 'dashed',
            color: 'rgba(255, 255, 255, 0.20)'
          }
        },
        axisLine: { show: false },
        axisLabel: {
          color: '#FFFFFF'
        },
        offset: -5
      }
    ],
    series: [
      {
        name: '发电统计',
        type: 'bar',
        barWidth: 15,
        itemStyle: {
          color: {
            type: 'linear',
            x: 0, //右
            y: 0, //下
            x2: 0, //左
            y2: 1, //上
            colorStops: [
              {
                offset: 0.1,
                color: 'rgba(3, 141, 247, 1)' // 0% 处的颜色
              },
              {
                offset: 1,
                color: 'rgba(3, 141, 247, 0)' // 100% 处的颜色
              }
            ]
          }
        },
        data: seriesData
      },
      {
        type: 'scatter',
        tooltip: {
          show: false,
          extraCssText: 'cursor: default;',
        },
        symbol: 'rect',
        itemStyle: {
          barBorderRadius: [30, 0, 0, 30],
          color: '#FFF',
          shadowColor: '#FFF',
          shadowBlur: 1,
          borderWidth: 1,
          opacity: 1
        },
        symbolSize: [15, 4], // 进度条白点的大小
        z: 2,
        data: seriesData,
        animationDelay: 500,
        symbolOffset: [0, 0]
      }
    ]
  };
  
}

export function waterLine(data) {
  const { xAxisData, seriesData } = data
  return {
    tooltip: {
      trigger: 'axis',
      extraCssText: 'cursor: default;',
    },
    xAxis: {
      name: '(时)',
      nameTextStyle: {
        color: 'rgba(255,255,255,0.8)',
        padding: [0,0,-5,-10]
      },
      data: xAxisData,
      type: 'category',
      boundaryGap: true,
      itemStyle: {
        borderColor: 'blue',
        color: '#ffffff'
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        interval: 0,
        formatter: function (value, index) {
          const step = 4;
          if (index % step === 0) {
            return value;
          } else {
            return '';
          }
        },
        textStyle: {
          show: true,
          color: '#fff',
          fontSize: '12'
        }
      },
      axisLine: {
        lineStyle: {
          width: 2,
          color: 'rgba(255,255,255,0.6)'
        }
      },
    },
    yAxis: {
      name: 'm',
      nameTextStyle: {
        color: 'rgba(255, 255, 255, 0.80)',
        padding: [0, 20, 0, 0]
      },
      type: 'value',
      splitLine: {
        show: true,
        lineStyle: {
          type: 'dashed',
          color: 'rgba(255,255,255,0.2)'
        }
      },
      axisLabel: {
        textStyle: {
          show: true,
          color: '#fff',
          fontSize: '12'
        }
      },
    },
    grid: {
      left: '3%',
      top: '20%',
      right: '10%',
      bottom: '5%',
      containLabel: true
    },
    series: [{
      data: seriesData,
      name: '',
      type: 'line',
      symbol: 'circle',
      smooth: true,
      symbolSize: 0,//不需要点就设置0
      lineStyle: {
        width:2,
        type: 'solid',
        shadowColor: 'rgba(0, 0, 0, 0.25)',
        shadowBlur:5,
        shadowOffsetY: 10
      },
      itemStyle: {
        borderWidth: 5,
        borderColor: '#118DFF',
        color: '#118DFF',
      },
      areaStyle: {
        // color: '#118DFF',
        normal: {
          //线性渐变，前4个参数分别是x0,y0,x2,y2(范围0~1);
          color: new echarts.graphic.LinearGradient(
            0,
            0,
            0,
            1,
            [{
              offset: 0,
              color: 'rgba(34, 135, 245, 1)'
            },
            {
              offset: 1,
              color: 'rgba(71, 172, 229, 0.06)'
            }
            ],
            false
          ),
        }
      }
    }]
  }
}

export function waterChangeLine(dataObj, opt = {}) {
  const {waterData, flowRateData, maxTime} = dataObj
  const option = {
    tooltip: {
      trigger: 'axis',
      extraCssText: 'cursor: default;',
      appendToBody: true,
      axisPointer: {
        type: 'shadow'
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
      formatter: (params) => {
        let tooltipHtml = `
        <div>
        <span style="display:inline-block;margin-right:4px;border-radius:10px;width:10px;height:10px;background-color:#ec808d;"></span>
        峰现时间: ${maxTime}
        </div>`;
        params.forEach(param => {
          let seriesIndex= param.seriesIndex;
          tooltipHtml += '<div>'
          let formattedValue
          if (seriesIndex) { // 流量
            formattedValue = param.marker + " 洪峰流量: " + param.value + 'm³/s'
          } else {
            formattedValue = param.marker + " 最高水位: " + param.value + 'm'
          }
          tooltipHtml +=`${formattedValue}</div>`
        });
        return tooltipHtml;
      },
    },
    legend: {
      show: true,
      right: '30%',
      top: '0',
      itemWidth: 20,
      itemHeight: 10,
      textStyle: {
        color: '#fff',
      },
      selectedMode: false,
    },
    grid: {
      left: '2%',
      right: '0%',
      top: '15%',
      bottom: '0%',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      boundaryGap: true,
      data: [0, 4, 8, 12, 16, 20, 24 ,28, 32, 36, 40, 44, 48],
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
          padding: [0, 20, 0, 0]
        },
        scale: true,
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
        scale: true,
        nameTextStyle: {
          color: 'rgba(255, 255, 255, 0.80)',
          fontSize: 10,
          padding: [0,0, 0, 50]
        },
        axisLabel: {
          textStyle: {
            color: '#fff',
          },
          formatter: (value) => {
            return value.toFixed(2)
          }
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
        },
      },
    ],
    series: [
      {
        name: '水位',
        type: 'line',
        yAxisIndex: 1,
        smooth: true,
        showSymbol: false,
        symbol: 'circle',
        symbolSize: 6,
        data: waterData,
        // areaStyle: {
        //   normal: {
        //     color: new echarts.graphic.LinearGradient(
        //       0,
        //       0,
        //       0,
        //       1,
        //       [
        //         {
        //           offset: 0,
        //           color: 'rgba(255, 238, 148, 0.78)',
        //         },
        //         {
        //           offset: 1,
        //           color: 'rgba(254, 224, 69, 0.06)',
        //         },
        //       ],
        //       false
        //     ),
        //   },
        // },
        itemStyle: {
          normal: {
            color: '#F2CD48',
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
                  color: 'rgba(34, 135, 245, 1)',
                },
                {
                  offset: 1,
                  color: 'rgba(71, 172, 229, 0.06)',
                },
              ],
              false
            ),
          },
        },
        itemStyle: {
          normal: {
            color: '#118DFF',
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