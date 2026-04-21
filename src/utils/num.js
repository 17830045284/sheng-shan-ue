export function formatNumber(num) {
  if (Number.isInteger(num)) {
    return Math.round(num)
  } else {
    return num.toFixed(1)
  }
}

// 保留小数后两位，不四舍五入
export function truncatedNumber(number) {
  return Math.floor(number * 100) / 100
}

// 最小值和最大值之间取随机数
export function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

// 最小值和最大值之间取随机数小数,保留三位小数
export function randomDecimal(min, max, length = 3) {
  // 确保 min 和 max 是数字
  if (typeof min !== 'number' || typeof max !== 'number') {
    throw new Error('参数必须是数字')
  }

  // 确保 min 小于 max
  if (min >= max) {
    throw new Error('最小值必须小于最大值')
  }

  // 生成范围内的随机数并保留三位小数
  const randomNum = Math.random() * (max - min) + min
  return parseFloat(randomNum.toFixed(length))
}
