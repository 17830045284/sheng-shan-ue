export const tooltip = {
  trigger: 'axis',
  appendToBody: true,
  extraCssText: 'cursor: default;',
  axisPointer: {
    // 坐标轴指示器，坐标轴触发有效
    type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
  }
}

export const grid = {
  left: '6%',
  right: '6%',
  bottom: '5%',
  top: "10%",
  containLabel: true
}

export const axisLine = {
  show: true,
  lineStyle: {
    color: "rgba(102, 104, 105,.5)"
  },
}

export const axisLabel = {
  color: "rgba(230, 247, 255, 0.50)",
  fontSize: 12
}

export const splitLine = {
  show: true,
  lineStyle: {
    type: 'dashed',
    color: 'rgba(230, 247, 255, 0.20)',

  }
}