import * as echarts from "echarts";
import { axisLabel, axisLine, grid, splitLine, tooltip } from "./chartOpt";
import { getImg } from "@/utils/assets";

//  水平位移预报
export function horizontalPrediction(dataObj, opt = {}) {
  const { YIPData, ZIPData, ZPL1Data, xPointData } = dataObj;
  const option = {
    tooltip: {
      trigger: "axis",
      extraCssText: "cursor: default;",
      appendToBody: true,
      axisPointer: {
        lineStyle: {
          type: "solid",
          color: "#fff",
        },
      },
      borderColor: "#0989FF",
      backgroundColor: "rgba(9, 137, 255, 0.34)",
      padding: [5, 10],
      extraCssText: "box-shadow: 0 0 5px rgba(0,0,0,0.3)",
      textStyle: {
        color: "#FFFFFF", // 文字的颜色
        fontStyle: "normal",
        fontWeight: "normal",
      },
    },
    legend: {
      show: true,
      left: "26%",
      top: "0%",
      icon: "path://M10.3551 2.5H13C13.5522 2.5 14 2.94775 14 3.5C14 3.7251 13.9255 3.93311 13.7999 4.1001C13.6174 4.34277 13.327 4.5 13 4.5H10.3551C9.9248 5.9458 8.58557 7 7 7C5.41443 7 4.0752 5.9458 3.6449 4.5H1C0.447754 4.5 0 4.05225 0 3.5C0 2.94775 0.447754 2.5 1 2.5H3.6449C4.0752 1.0542 5.41443 0 7 0C8.58557 0 9.9248 1.0542 10.3551 2.5Z",
      itemWidth: 20,
      itemHeight: 10,
      textStyle: {
        color: "#fff",
      },
      selectedMode: false,
    },
    grid: {
      left: "5%",
      right: "5%",
      top: "20%",
      bottom: "5%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      name: "",
      nameLocation: "end",
      nameGap: 15,
      nameTextStyle: {
        color: "#fff",
        padding: [30, 0, 0, 0],
      },
      data: xPointData,
      boundaryGap: true,
      splitLine: {
        show: false,
        interval: "auto",
        lineStyle: {
          color: ["#D4DFF5"],
        },
      },
      axisTick: {
        show: false,
      },
      axisLine: {
        lineStyle: {
          color: "rgba(255, 255, 255, 0.20)",
        },
      },
      axisLabel: {
        interval: 0,
        rotate: 30,
        textStyle: {
          fontSize: 12,
          color: "#fff",
        },
      },
    },
    yAxis: [
      {
        type: "value",
        name: "mm",
        nameTextStyle: {
          color: "rgba(255, 255, 255, 0.80)",
          padding: [0, 0, 0, -30],
          fontSize: 10,
        },
        // min: 0,
        // max: 110,
        axisLabel: {
          show: true,
          textStyle: {
            color: "#fff",
          },
        },
        axisLine: {
          show: false,
          lineStyle: {
            color: "#007F69",
          },
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          show: true,
          lineStyle: {
            type: "dashed",
            color: "rgba(255, 255, 255, 0.20)",
          },
        },
      },
    ],
    series: [
      {
        name: "YIP1",
        type: "line",
        smooth: false,
        showSymbol: false,
        yAxisIndex: 0,
        data: YIPData,
        itemStyle: {
          show: false,
          normal: {
            color: "#1BCEBF",
          },
        },
        lineStyle: {
          normal: {
            width: 2,
          },
        },
      },
      {
        name: "ZIP1",
        type: "line",
        smooth: false,
        showSymbol: false,
        yAxisIndex: 0,
        data: ZIPData,
        itemStyle: {
          show: false,
          normal: {
            color: "#3370EB",
          },
        },
        lineStyle: {
          normal: {
            width: 2,
          },
        },
      },
      {
        name: "ZPL1",
        type: "line",
        smooth: false,
        showSymbol: false,
        yAxisIndex: 0,
        data: ZPL1Data,
        itemStyle: {
          show: false,
          normal: {
            color: "#DEF655",
          },
        },
        lineStyle: {
          normal: {
            width: 2,
          },
        },
      },
    ],
  };
  return option;
}

//  垂直位移预报
export function verticalPrediction(dataObj, opt = {}) {
  const { YIPData, ZIPData, ZPL1Data, xPointData } = dataObj;
  const option = {
    tooltip: {
      trigger: "axis",
      extraCssText: "cursor: default;",
      appendToBody: true,
      axisPointer: {
        lineStyle: {
          type: "solid",
          color: "#fff",
        },
      },
      borderColor: "#0989FF",
      backgroundColor: "rgba(9, 137, 255, 0.34)",
      padding: [5, 10],
      extraCssText: "box-shadow: 0 0 5px rgba(0,0,0,0.3)",
      textStyle: {
        color: "#FFFFFF", // 文字的颜色
        fontStyle: "normal",
        fontWeight: "normal",
      },
    },
    legend: {
      show: true,
      left: "26%",
      top: "0%",
      icon: "path://M10.3551 2.5H13C13.5522 2.5 14 2.94775 14 3.5C14 3.7251 13.9255 3.93311 13.7999 4.1001C13.6174 4.34277 13.327 4.5 13 4.5H10.3551C9.9248 5.9458 8.58557 7 7 7C5.41443 7 4.0752 5.9458 3.6449 4.5H1C0.447754 4.5 0 4.05225 0 3.5C0 2.94775 0.447754 2.5 1 2.5H3.6449C4.0752 1.0542 5.41443 0 7 0C8.58557 0 9.9248 1.0542 10.3551 2.5Z",
      itemWidth: 20,
      itemHeight: 10,
      textStyle: {
        color: "#fff",
      },
      selectedMode: false,
    },
    grid: {
      left: "5%",
      right: "5%",
      top: "20%",
      bottom: "5%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      name: "",
      nameLocation: "end",
      nameGap: 15,
      nameTextStyle: {
        color: "#fff",
        padding: [30, 0, 0, 0],
      },
      data: xPointData,
      boundaryGap: true,
      splitLine: {
        show: false,
        interval: "auto",
        lineStyle: {
          color: ["#D4DFF5"],
        },
      },
      axisTick: {
        show: false,
      },
      axisLine: {
        lineStyle: {
          color: "rgba(255, 255, 255, 0.20)",
        },
      },
      axisLabel: {
        interval: 0,
        rotate: 30,
        textStyle: {
          fontSize: 12,
          color: "#fff",
        },
      },
    },
    yAxis: [
      {
        type: "value",
        name: "mm",
        nameTextStyle: {
          color: "rgba(255, 255, 255, 0.80)",
          padding: [0, 0, 0, -30],
          fontSize: 10,
        },
        // min: 0,
        // max: 110,
        axisLabel: {
          show: true,
          textStyle: {
            color: "#fff",
          },
        },
        axisLine: {
          show: false,
          lineStyle: {
            color: "#007F69",
          },
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          show: true,
          lineStyle: {
            type: "dashed",
            color: "rgba(255, 255, 255, 0.20)",
          },
        },
      },
    ],
    series: [
      {
        name: "YIP1",
        type: "line",
        smooth: false,
        showSymbol: false,
        yAxisIndex: 0,
        data: YIPData,
        itemStyle: {
          show: false,
          normal: {
            color: "#1BCEBF",
          },
        },
        lineStyle: {
          normal: {
            width: 2,
          },
        },
      },
      {
        name: "ZIP1",
        type: "line",
        smooth: false,
        showSymbol: false,
        yAxisIndex: 0,
        data: ZIPData,
        itemStyle: {
          show: false,
          normal: {
            color: "#3370EB",
          },
        },
        lineStyle: {
          normal: {
            width: 2,
          },
        },
      },
      {
        name: "ZPL1",
        type: "line",
        smooth: false,
        showSymbol: false,
        yAxisIndex: 0,
        data: ZPL1Data,
        itemStyle: {
          show: false,
          normal: {
            color: "#DEF655",
          },
        },
        lineStyle: {
          normal: {
            width: 2,
          },
        },
      },
    ],
  };
  return option;
}

//  裂缝预报
export function crackPrediction(dataObj, opt = {}) {
  const { LF11Data, LF16Data, LF8Data, WBH1Data, xPointData } = dataObj;
  const option = {
    tooltip: {
      trigger: "axis",
      extraCssText: "cursor: default;",
      appendToBody: true,
      axisPointer: {
        lineStyle: {
          type: "solid",
          color: "#fff",
        },
      },
      borderColor: "#0989FF",
      backgroundColor: "rgba(9, 137, 255, 0.34)",
      padding: [5, 10],
      extraCssText: "box-shadow: 0 0 5px rgba(0,0,0,0.3)",
      textStyle: {
        color: "#FFFFFF", // 文字的颜色
        fontStyle: "normal",
        fontWeight: "normal",
      },
    },
    legend: {
      show: true,
      left: "12%",
      top: "0%",
      icon: "path://M10.3551 2.5H13C13.5522 2.5 14 2.94775 14 3.5C14 3.7251 13.9255 3.93311 13.7999 4.1001C13.6174 4.34277 13.327 4.5 13 4.5H10.3551C9.9248 5.9458 8.58557 7 7 7C5.41443 7 4.0752 5.9458 3.6449 4.5H1C0.447754 4.5 0 4.05225 0 3.5C0 2.94775 0.447754 2.5 1 2.5H3.6449C4.0752 1.0542 5.41443 0 7 0C8.58557 0 9.9248 1.0542 10.3551 2.5Z",
      itemWidth: 20,
      itemHeight: 10,
      textStyle: {
        color: "#fff",
      },
      selectedMode: false,
    },
    grid: {
      left: "5%",
      right: "5%",
      top: "20%",
      bottom: "5%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      name: "",
      nameLocation: "end",
      nameGap: 15,
      nameTextStyle: {
        color: "#fff",
        padding: [30, 0, 0, 0],
      },
      data: xPointData,
      boundaryGap: true,
      splitLine: {
        show: false,
        interval: "auto",
        lineStyle: {
          color: ["#D4DFF5"],
        },
      },
      axisTick: {
        show: false,
      },
      axisLine: {
        lineStyle: {
          color: "rgba(255, 255, 255, 0.20)",
        },
      },
      axisLabel: {
        interval: 0,
        rotate: 30,
        textStyle: {
          fontSize: 12,
          color: "#fff",
        },
      },
    },
    yAxis: [
      {
        type: "value",
        name: "mm",
        nameTextStyle: {
          color: "rgba(255, 255, 255, 0.80)",
          padding: [0, 0, 0, -30],
          fontSize: 10,
        },
        // min: 0,
        // max: 110,
        axisLabel: {
          show: true,
          textStyle: {
            color: "#fff",
          },
        },
        axisLine: {
          show: false,
          lineStyle: {
            color: "#007F69",
          },
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          show: true,
          lineStyle: {
            type: "dashed",
            color: "rgba(255, 255, 255, 0.20)",
          },
        },
      },
    ],
    series: [
      {
        name: "LF-11",
        type: "line",
        smooth: false,
        showSymbol: false,
        yAxisIndex: 0,
        data: LF11Data,
        itemStyle: {
          show: false,
          normal: {
            color: "#1BCEBF",
          },
        },
        lineStyle: {
          normal: {
            width: 2,
          },
        },
      },
      {
        name: "LF-16",
        type: "line",
        smooth: false,
        showSymbol: false,
        yAxisIndex: 0,
        data: LF16Data,
        itemStyle: {
          show: false,
          normal: {
            color: "#3370EB",
          },
        },
        lineStyle: {
          normal: {
            width: 2,
          },
        },
      },
      {
        name: "LF-8",
        type: "line",
        smooth: false,
        showSymbol: false,
        yAxisIndex: 0,
        data: LF8Data,
        itemStyle: {
          show: false,
          normal: {
            color: "#DEF655",
          },
        },
        lineStyle: {
          normal: {
            width: 2,
          },
        },
      },
      {
        name: "WBH-1",
        type: "line",
        smooth: false,
        showSymbol: false,
        yAxisIndex: 0,
        data: WBH1Data,
        itemStyle: {
          show: false,
          normal: {
            color: "#F0F0F1",
          },
        },
        lineStyle: {
          normal: {
            width: 2,
          },
        },
      },
    ],
  };
  return option;
}

//  渗流量预报
export function seepagePrediction(dataObj, opt = {}) {
  const { line1Data, line2Data, xPointData } = dataObj;
  const option = {
    tooltip: {
      trigger: "axis",
      extraCssText: "cursor: default;",
      appendToBody: true,
      axisPointer: {
        lineStyle: {
          type: "solid",
          color: "#fff",
        },
      },
      borderColor: "#0989FF",
      backgroundColor: "rgba(9, 137, 255, 0.34)",
      padding: [5, 10],
      extraCssText: "box-shadow: 0 0 5px rgba(0,0,0,0.3)",
      textStyle: {
        color: "#FFFFFF", // 文字的颜色
        fontStyle: "normal",
        fontWeight: "normal",
      },
    },
    legend: {
      show: true,
      left: "30%",
      top: "0%",
      icon: "path://M10.3551 2.5H13C13.5522 2.5 14 2.94775 14 3.5C14 3.7251 13.9255 3.93311 13.7999 4.1001C13.6174 4.34277 13.327 4.5 13 4.5H10.3551C9.9248 5.9458 8.58557 7 7 7C5.41443 7 4.0752 5.9458 3.6449 4.5H1C0.447754 4.5 0 4.05225 0 3.5C0 2.94775 0.447754 2.5 1 2.5H3.6449C4.0752 1.0542 5.41443 0 7 0C8.58557 0 9.9248 1.0542 10.3551 2.5Z",
      itemWidth: 20,
      itemHeight: 10,
      textStyle: {
        color: "#fff",
      },
      selectedMode: false,
    },
    grid: {
      left: "5%",
      right: "5%",
      top: "20%",
      bottom: "5%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      name: "",
      nameLocation: "end",
      nameGap: 15,
      nameTextStyle: {
        color: "#fff",
        padding: [30, 0, 0, 0],
      },
      data: xPointData,
      boundaryGap: true,
      splitLine: {
        show: false,
        interval: "auto",
        lineStyle: {
          color: ["#D4DFF5"],
        },
      },
      axisTick: {
        show: false,
      },
      axisLine: {
        lineStyle: {
          color: "rgba(255, 255, 255, 0.20)",
        },
      },
      axisLabel: {
        interval: 0,
        rotate: 30,
        textStyle: {
          fontSize: 12,
          color: "#fff",
        },
      },
    },
    yAxis: [
      {
        type: "value",
        name: "m³/d",
        nameTextStyle: {
          color: "rgba(255, 255, 255, 0.80)",
          padding: [0, 0, 0, -30],
          fontSize: 10,
        },
        // min: 0,
        // max: 110,
        axisLabel: {
          show: true,
          textStyle: {
            color: "#fff",
          },
        },
        axisLine: {
          show: false,
          lineStyle: {
            color: "#007F69",
          },
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          show: true,
          lineStyle: {
            type: "dashed",
            color: "rgba(255, 255, 255, 0.20)",
          },
        },
      },
    ],
    series: [
      {
        name: "总渗流量",
        type: "line",
        smooth: false,
        showSymbol: false,
        yAxisIndex: 0,
        data: line1Data,
        itemStyle: {
          show: false,
          normal: {
            color: "#1BCEBF",
          },
        },
        lineStyle: {
          normal: {
            width: 2,
          },
        },
      },
      {
        name: "坝基渗流",
        type: "line",
        smooth: false,
        showSymbol: false,
        yAxisIndex: 0,
        data: line2Data,
        itemStyle: {
          show: false,
          normal: {
            color: "#3370EB",
          },
        },
        lineStyle: {
          normal: {
            width: 2,
          },
        },
      },
    ],
  };
  return option;
}

//  应力预报
export function stressPrediction(dataObj, opt = {}) {
  const { line1Data, line2Data, line3Data, line4Data, line5Data, xPointData } =
    dataObj;
  const option = {
    tooltip: {
      trigger: "axis",
      extraCssText: "cursor: default;",
      appendToBody: true,
      axisPointer: {
        lineStyle: {
          type: "solid",
          color: "#fff",
        },
      },
      borderColor: "#0989FF",
      backgroundColor: "rgba(9, 137, 255, 0.34)",
      padding: [5, 10],
      extraCssText: "box-shadow: 0 0 5px rgba(0,0,0,0.3)",
      textStyle: {
        color: "#FFFFFF", // 文字的颜色
        fontStyle: "normal",
        fontWeight: "normal",
      },
    },
    legend: {
      show: true,
      left: "5%",
      top: "0%",
      icon: "path://M10.3551 2.5H13C13.5522 2.5 14 2.94775 14 3.5C14 3.7251 13.9255 3.93311 13.7999 4.1001C13.6174 4.34277 13.327 4.5 13 4.5H10.3551C9.9248 5.9458 8.58557 7 7 7C5.41443 7 4.0752 5.9458 3.6449 4.5H1C0.447754 4.5 0 4.05225 0 3.5C0 2.94775 0.447754 2.5 1 2.5H3.6449C4.0752 1.0542 5.41443 0 7 0C8.58557 0 9.9248 1.0542 10.3551 2.5Z",
      itemWidth: 20,
      itemHeight: 10,
      textStyle: {
        color: "#fff",
      },
      selectedMode: false,
    },
    grid: {
      left: "5%",
      right: "5%",
      top: "20%",
      bottom: "5%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      name: "",
      nameLocation: "end",
      nameGap: 15,
      nameTextStyle: {
        color: "#fff",
        padding: [30, 0, 0, 0],
      },
      data: xPointData,
      boundaryGap: true,
      splitLine: {
        show: false,
        interval: "auto",
        lineStyle: {
          color: ["#D4DFF5"],
        },
      },
      axisTick: {
        show: false,
      },
      axisLine: {
        lineStyle: {
          color: "rgba(255, 255, 255, 0.20)",
        },
      },
      axisLabel: {
        interval: 0,
        rotate: 30,
        textStyle: {
          fontSize: 12,
          color: "#fff",
        },
      },
    },
    yAxis: [
      {
        type: "value",
        name: "kPa",
        nameTextStyle: {
          color: "rgba(255, 255, 255, 0.80)",
          padding: [0, 0, 0, -30],
          fontSize: 10,
        },
        // min: 0,
        // max: 110,
        axisLabel: {
          show: true,
          textStyle: {
            color: "#fff",
          },
        },
        axisLine: {
          show: false,
          lineStyle: {
            color: "#007F69",
          },
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          show: true,
          lineStyle: {
            type: "dashed",
            color: "rgba(255, 255, 255, 0.20)",
          },
        },
      },
    ],
    series: [
      {
        name: "右30.2",
        type: "line",
        smooth: false,
        showSymbol: false,
        yAxisIndex: 0,
        data: line1Data,
        itemStyle: {
          show: false,
          normal: {
            color: "#1BCEBF",
          },
        },
        lineStyle: {
          normal: {
            width: 2,
          },
        },
      },
      {
        name: "YL-7",
        type: "line",
        smooth: false,
        showSymbol: false,
        yAxisIndex: 0,
        data: line2Data,
        itemStyle: {
          show: false,
          normal: {
            color: "#3370EB",
          },
        },
        lineStyle: {
          normal: {
            width: 2,
          },
        },
      },
      {
        name: "右64.5",
        type: "line",
        smooth: false,
        showSymbol: false,
        yAxisIndex: 0,
        data: line3Data,
        itemStyle: {
          show: false,
          normal: {
            color: "#DEF655",
          },
        },
        lineStyle: {
          normal: {
            width: 2,
          },
        },
      },
      {
        name: "右40",
        type: "line",
        smooth: false,
        showSymbol: false,
        yAxisIndex: 0,
        data: line4Data,
        itemStyle: {
          show: false,
          normal: {
            color: "#F49F54",
          },
        },
        lineStyle: {
          normal: {
            width: 2,
          },
        },
      },
      {
        name: "YL-14",
        type: "line",
        smooth: false,
        showSymbol: false,
        yAxisIndex: 0,
        data: line5Data,
        itemStyle: {
          show: false,
          normal: {
            color: "#F0F0F1",
          },
        },
        lineStyle: {
          normal: {
            width: 2,
          },
        },
      },
    ],
  };
  return option;
}

// 应变预报
export function strainPrediction(dataObj, opt = {}) {
  const { SY1Data, SY2Data, xPointData } = dataObj;
  const option = {
    tooltip: {
      trigger: "axis",
      extraCssText: "cursor: default;",
      appendToBody: true,
      axisPointer: {
        lineStyle: {
          type: "solid",
          color: "#fff",
        },
      },
      borderColor: "#0989FF",
      backgroundColor: "rgba(9, 137, 255, 0.34)",
      padding: [5, 10],
      extraCssText: "box-shadow: 0 0 5px rgba(0,0,0,0.3)",
      textStyle: {
        color: "#FFFFFF", // 文字的颜色
        fontStyle: "normal",
        fontWeight: "normal",
      },
    },
    legend: {
      show: true,
      left: "40%",
      top: "0%",
      icon: "path://M10.3551 2.5H13C13.5522 2.5 14 2.94775 14 3.5C14 3.7251 13.9255 3.93311 13.7999 4.1001C13.6174 4.34277 13.327 4.5 13 4.5H10.3551C9.9248 5.9458 8.58557 7 7 7C5.41443 7 4.0752 5.9458 3.6449 4.5H1C0.447754 4.5 0 4.05225 0 3.5C0 2.94775 0.447754 2.5 1 2.5H3.6449C4.0752 1.0542 5.41443 0 7 0C8.58557 0 9.9248 1.0542 10.3551 2.5Z",
      itemWidth: 20,
      itemHeight: 10,
      textStyle: {
        color: "#fff",
      },
      selectedMode: false,
    },
    grid: {
      left: "5%",
      right: "5%",
      top: "20%",
      bottom: "5%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      name: "",
      nameLocation: "end",
      nameGap: 15,
      nameTextStyle: {
        color: "#fff",
        padding: [30, 0, 0, 0],
      },
      data: xPointData,
      boundaryGap: true,
      splitLine: {
        show: false,
        interval: "auto",
        lineStyle: {
          color: ["#D4DFF5"],
        },
      },
      axisTick: {
        show: false,
      },
      axisLine: {
        lineStyle: {
          color: "rgba(255, 255, 255, 0.20)",
        },
      },
      axisLabel: {
        interval: 0,
        rotate: 30,
        textStyle: {
          fontSize: 12,
          color: "#fff",
        },
      },
    },
    yAxis: [
      {
        type: "value",
        name: "με",
        nameTextStyle: {
          color: "rgba(255, 255, 255, 0.80)",
          padding: [0, 0, 0, -30],
          fontSize: 10,
        },
        // min: 0,
        // max: 110,
        axisLabel: {
          show: true,
          textStyle: {
            color: "#fff",
          },
        },
        axisLine: {
          show: false,
          lineStyle: {
            color: "#007F69",
          },
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          show: true,
          lineStyle: {
            type: "dashed",
            color: "rgba(255, 255, 255, 0.20)",
          },
        },
      },
    ],
    series: [
      {
        name: "SY1",
        type: "line",
        smooth: false,
        showSymbol: false,
        yAxisIndex: 0,
        data: SY1Data,
        itemStyle: {
          show: false,
          normal: {
            color: "#1BCEBF",
          },
        },
        lineStyle: {
          normal: {
            width: 2,
          },
        },
      },
      {
        name: "SY2",
        type: "line",
        smooth: false,
        showSymbol: false,
        yAxisIndex: 0,
        data: SY2Data,
        itemStyle: {
          show: false,
          normal: {
            color: "#3370EB",
          },
        },
        lineStyle: {
          normal: {
            width: 2,
          },
        },
      },
    ],
  };
  return option;
}

// 水位预报
export function waterLevelPrediction(dataObj, opt = {}) {
  const { line1Data, line2Data, xPointData } = dataObj;
  const option = {
    tooltip: {
      trigger: "axis",
      extraCssText: "cursor: default;",
      appendToBody: true,
      axisPointer: {
        lineStyle: {
          type: "solid",
          color: "#fff",
        },
      },
      borderColor: "#0989FF",
      backgroundColor: "rgba(9, 137, 255, 0.34)",
      padding: [5, 10],
      extraCssText: "box-shadow: 0 0 5px rgba(0,0,0,0.3)",
      textStyle: {
        color: "#FFFFFF", // 文字的颜色
        fontStyle: "normal",
        fontWeight: "normal",
      },
    },
    legend: {
      show: true,
      left: "30%",
      top: "0%",
      icon: "path://M10.3551 2.5H13C13.5522 2.5 14 2.94775 14 3.5C14 3.7251 13.9255 3.93311 13.7999 4.1001C13.6174 4.34277 13.327 4.5 13 4.5H10.3551C9.9248 5.9458 8.58557 7 7 7C5.41443 7 4.0752 5.9458 3.6449 4.5H1C0.447754 4.5 0 4.05225 0 3.5C0 2.94775 0.447754 2.5 1 2.5H3.6449C4.0752 1.0542 5.41443 0 7 0C8.58557 0 9.9248 1.0542 10.3551 2.5Z",
      itemWidth: 20,
      itemHeight: 10,
      textStyle: {
        color: "#fff",
      },
      selectedMode: false,
    },
    grid: {
      left: "5%",
      right: "5%",
      top: "20%",
      bottom: "5%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      name: "",
      nameLocation: "end",
      nameGap: 15,
      nameTextStyle: {
        color: "#fff",
        padding: [30, 0, 0, 0],
      },
      data: xPointData,
      boundaryGap: true,
      splitLine: {
        show: false,
        interval: "auto",
        lineStyle: {
          color: ["#D4DFF5"],
        },
      },
      axisTick: {
        show: false,
      },
      axisLine: {
        lineStyle: {
          color: "rgba(255, 255, 255, 0.20)",
        },
      },
      axisLabel: {
        interval: 0,
        rotate: 30,
        textStyle: {
          fontSize: 12,
          color: "#fff",
        },
      },
    },
    yAxis: [
      {
        type: "value",
        name: "m",
        nameTextStyle: {
          color: "rgba(255, 255, 255, 0.80)",
          padding: [0, 0, 0, -30],
          fontSize: 10,
        },
        // min: 0,
        // max: 110,
        axisLabel: {
          show: true,
          textStyle: {
            color: "#fff",
          },
        },
        axisLine: {
          show: false,
          lineStyle: {
            color: "#007F69",
          },
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          show: true,
          lineStyle: {
            type: "dashed",
            color: "rgba(255, 255, 255, 0.20)",
          },
        },
      },
    ],
    series: [
      {
        name: "库水位",
        type: "line",
        smooth: false,
        showSymbol: false,
        yAxisIndex: 0,
        data: line1Data,
        itemStyle: {
          show: false,
          normal: {
            color: "#1BCEBF",
          },
        },
        lineStyle: {
          normal: {
            width: 2,
          },
        },
      },
      {
        name: "生态水位",
        type: "line",
        smooth: false,
        showSymbol: false,
        yAxisIndex: 0,
        data: line2Data,
        itemStyle: {
          show: false,
          normal: {
            color: "#3370EB",
          },
        },
        lineStyle: {
          normal: {
            width: 2,
          },
        },
      },
    ],
  };
  return option;
}

// 流量预报
export function flowPrediction(dataObj, opt = {}) {
  const { line1Data, line2Data, xPointData } = dataObj;
  const option = {
    tooltip: {
      trigger: "axis",
      extraCssText: "cursor: default;",
      appendToBody: true,
      axisPointer: {
        lineStyle: {
          type: "solid",
          color: "#fff",
        },
      },
      borderColor: "#0989FF",
      backgroundColor: "rgba(9, 137, 255, 0.34)",
      padding: [5, 10],
      extraCssText: "box-shadow: 0 0 5px rgba(0,0,0,0.3)",
      textStyle: {
        color: "#FFFFFF", // 文字的颜色
        fontStyle: "normal",
        fontWeight: "normal",
      },
    },
    legend: {
      show: true,
      left: "30%",
      top: "0%",
      icon: "path://M10.3551 2.5H13C13.5522 2.5 14 2.94775 14 3.5C14 3.7251 13.9255 3.93311 13.7999 4.1001C13.6174 4.34277 13.327 4.5 13 4.5H10.3551C9.9248 5.9458 8.58557 7 7 7C5.41443 7 4.0752 5.9458 3.6449 4.5H1C0.447754 4.5 0 4.05225 0 3.5C0 2.94775 0.447754 2.5 1 2.5H3.6449C4.0752 1.0542 5.41443 0 7 0C8.58557 0 9.9248 1.0542 10.3551 2.5Z",
      itemWidth: 20,
      itemHeight: 10,
      textStyle: {
        color: "#fff",
      },
      selectedMode: false,
    },
    grid: {
      left: "5%",
      right: "5%",
      top: "20%",
      bottom: "5%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      name: "",
      nameLocation: "end",
      nameGap: 15,
      nameTextStyle: {
        color: "#fff",
        padding: [30, 0, 0, 0],
      },
      data: xPointData,
      boundaryGap: true,
      splitLine: {
        show: false,
        interval: "auto",
        lineStyle: {
          color: ["#D4DFF5"],
        },
      },
      axisTick: {
        show: false,
      },
      axisLine: {
        lineStyle: {
          color: "rgba(255, 255, 255, 0.20)",
        },
      },
      axisLabel: {
        interval: 0,
        rotate: 30,
        textStyle: {
          fontSize: 12,
          color: "#fff",
        },
      },
    },
    yAxis: [
      {
        type: "value",
        name: "m³/s",
        nameTextStyle: {
          color: "rgba(255, 255, 255, 0.80)",
          padding: [0, 0, 0, -30],
          fontSize: 10,
        },
        // min: 0,
        // max: 110,
        axisLabel: {
          show: true,
          textStyle: {
            color: "#fff",
          },
        },
        axisLine: {
          show: false,
          lineStyle: {
            color: "#007F69",
          },
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          show: true,
          lineStyle: {
            type: "dashed",
            color: "rgba(255, 255, 255, 0.20)",
          },
        },
      },
    ],
    series: [
      {
        name: "入库流量",
        type: "line",
        smooth: false,
        showSymbol: false,
        yAxisIndex: 0,
        data: line1Data,
        itemStyle: {
          show: false,
          normal: {
            color: "#1BCEBF",
          },
        },
        lineStyle: {
          normal: {
            width: 2,
          },
        },
      },
      {
        name: "生态流量",
        type: "line",
        smooth: false,
        showSymbol: false,
        yAxisIndex: 0,
        data: line2Data,
        itemStyle: {
          show: false,
          normal: {
            color: "#3370EB",
          },
        },
        lineStyle: {
          normal: {
            width: 2,
          },
        },
      },
    ],
  };
  return option;
}

// 水质预报
export function qualityPrediction(dataObj, opt = {}) {
  const { line1Data, line2Data, xPointData } = dataObj;
  const option = {
    tooltip: {
      trigger: "axis",
      extraCssText: "cursor: default;",
      appendToBody: true,
      axisPointer: {
        lineStyle: {
          type: "solid",
          color: "#fff",
        },
      },
      borderColor: "#0989FF",
      backgroundColor: "rgba(9, 137, 255, 0.34)",
      padding: [5, 10],
      extraCssText: "box-shadow: 0 0 5px rgba(0,0,0,0.3)",
      textStyle: {
        color: "#FFFFFF", // 文字的颜色
        fontStyle: "normal",
        fontWeight: "normal",
      },
    },
    legend: {
      show: true,
      left: "30%",
      top: "0%",
      icon: "path://M10.3551 2.5H13C13.5522 2.5 14 2.94775 14 3.5C14 3.7251 13.9255 3.93311 13.7999 4.1001C13.6174 4.34277 13.327 4.5 13 4.5H10.3551C9.9248 5.9458 8.58557 7 7 7C5.41443 7 4.0752 5.9458 3.6449 4.5H1C0.447754 4.5 0 4.05225 0 3.5C0 2.94775 0.447754 2.5 1 2.5H3.6449C4.0752 1.0542 5.41443 0 7 0C8.58557 0 9.9248 1.0542 10.3551 2.5Z",
      itemWidth: 20,
      itemHeight: 10,
      textStyle: {
        color: "#fff",
      },
      selectedMode: false,
    },
    grid: {
      left: "5%",
      right: "5%",
      top: "20%",
      bottom: "5%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      name: "",
      nameLocation: "end",
      nameGap: 15,
      nameTextStyle: {
        color: "#fff",
        padding: [30, 0, 0, 0],
      },
      data: xPointData,
      boundaryGap: true,
      splitLine: {
        show: false,
        interval: "auto",
        lineStyle: {
          color: ["#D4DFF5"],
        },
      },
      axisTick: {
        show: false,
      },
      axisLine: {
        lineStyle: {
          color: "rgba(255, 255, 255, 0.20)",
        },
      },
      axisLabel: {
        interval: 0,
        rotate: 30,
        textStyle: {
          fontSize: 12,
          color: "#fff",
        },
      },
    },
    yAxis: [
      {
        type: "value",
        name: "mg/L",
        nameTextStyle: {
          color: "rgba(255, 255, 255, 0.80)",
          padding: [0, 0, 0, -30],
          fontSize: 10,
        },
        // min: 0,
        // max: 110,
        axisLabel: {
          show: true,
          textStyle: {
            color: "#fff",
          },
        },
        axisLine: {
          show: false,
          lineStyle: {
            color: "#007F69",
          },
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          show: true,
          lineStyle: {
            type: "dashed",
            color: "rgba(255, 255, 255, 0.20)",
          },
        },
      },
    ],
    series: [
      {
        name: "溶解氧",
        type: "line",
        smooth: false,
        showSymbol: false,
        yAxisIndex: 0,
        data: line1Data,
        itemStyle: {
          show: false,
          normal: {
            color: "#1BCEBF",
          },
        },
        lineStyle: {
          normal: {
            width: 2,
          },
        },
      },
      {
        name: "PH",
        type: "line",
        smooth: false,
        showSymbol: false,
        yAxisIndex: 0,
        data: line2Data,
        itemStyle: {
          show: false,
          normal: {
            color: "#3370EB",
          },
        },
        lineStyle: {
          normal: {
            width: 2,
          },
        },
      },
    ],
  };
  return option;
}

// 库水位预报
export function reservoirPrediction(dataObj, opt = {}) {
  const { line1Data, line2Data, xPointData } = dataObj;
  const option = {
    tooltip: {
      trigger: "axis",
      extraCssText: "cursor: default;",
      appendToBody: true,
      axisPointer: {
        lineStyle: {
          type: "solid",
          color: "#fff",
        },
      },
      borderColor: "#0989FF",
      backgroundColor: "rgba(9, 137, 255, 0.34)",
      padding: [5, 10],
      extraCssText: "box-shadow: 0 0 5px rgba(0,0,0,0.3)",
      textStyle: {
        color: "#FFFFFF", // 文字的颜色
        fontStyle: "normal",
        fontWeight: "normal",
      },
    },
    legend: {
      show: true,
      left: "25%",
      top: "0%",
      icon: "path://M10.3551 2.5H13C13.5522 2.5 14 2.94775 14 3.5C14 3.7251 13.9255 3.93311 13.7999 4.1001C13.6174 4.34277 13.327 4.5 13 4.5H10.3551C9.9248 5.9458 8.58557 7 7 7C5.41443 7 4.0752 5.9458 3.6449 4.5H1C0.447754 4.5 0 4.05225 0 3.5C0 2.94775 0.447754 2.5 1 2.5H3.6449C4.0752 1.0542 5.41443 0 7 0C8.58557 0 9.9248 1.0542 10.3551 2.5Z",
      itemWidth: 20,
      itemHeight: 10,
      textStyle: {
        color: "#fff",
      },
      selectedMode: false,
    },
    grid: {
      left: "5%",
      right: "5%",
      top: "20%",
      bottom: "5%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      name: "",
      nameLocation: "end",
      nameGap: 15,
      nameTextStyle: {
        color: "#fff",
        padding: [30, 0, 0, 0],
      },
      data: xPointData,
      boundaryGap: true,
      splitLine: {
        show: false,
        interval: "auto",
        lineStyle: {
          color: ["#D4DFF5"],
        },
      },
      axisTick: {
        show: false,
      },
      axisLine: {
        lineStyle: {
          color: "rgba(255, 255, 255, 0.20)",
        },
      },
      axisLabel: {
        interval: 0,
        rotate: 30,
        textStyle: {
          fontSize: 12,
          color: "#fff",
        },
      },
    },
    yAxis: [
      {
        type: "value",
        name: "m",
        nameTextStyle: {
          color: "rgba(255, 255, 255, 0.80)",
          padding: [0, 0, 0, -30],
          fontSize: 10,
        },
        // min: 0,
        // max: 110,
        axisLabel: {
          show: true,
          textStyle: {
            color: "#fff",
          },
        },
        axisLine: {
          show: false,
          lineStyle: {
            color: "#007F69",
          },
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          show: true,
          lineStyle: {
            type: "dashed",
            color: "rgba(255, 255, 255, 0.20)",
          },
        },
      },
    ],
    series: [
      {
        name: "实时库水位",
        type: "line",
        smooth: false,
        showSymbol: false,
        yAxisIndex: 0,
        data: line1Data,
        itemStyle: {
          show: false,
          normal: {
            color: "#1BCEBF",
          },
        },
        lineStyle: {
          normal: {
            width: 2,
          },
        },
      },
      {
        name: "预报库水位",
        type: "line",
        smooth: false,
        showSymbol: false,
        yAxisIndex: 0,
        data: line2Data,
        itemStyle: {
          show: false,
          normal: {
            color: "#3370EB",
          },
        },
        lineStyle: {
          normal: {
            width: 2,
          },
        },
      },
    ],
  };
  return option;
}

// 入库流量预报
export function inflowPrediction(dataObj, opt = {}) {
  const { line1Data, line2Data, xPointData } = dataObj;
  const option = {
    tooltip: {
      trigger: "axis",
      extraCssText: "cursor: default;",
      appendToBody: true,
      axisPointer: {
        lineStyle: {
          type: "solid",
          color: "#fff",
        },
      },
      borderColor: "#0989FF",
      backgroundColor: "rgba(9, 137, 255, 0.34)",
      padding: [5, 10],
      extraCssText: "box-shadow: 0 0 5px rgba(0,0,0,0.3)",
      textStyle: {
        color: "#FFFFFF", // 文字的颜色
        fontStyle: "normal",
        fontWeight: "normal",
      },
    },
    legend: {
      show: true,
      left: "25%",
      top: "0%",
      icon: "path://M10.3551 2.5H13C13.5522 2.5 14 2.94775 14 3.5C14 3.7251 13.9255 3.93311 13.7999 4.1001C13.6174 4.34277 13.327 4.5 13 4.5H10.3551C9.9248 5.9458 8.58557 7 7 7C5.41443 7 4.0752 5.9458 3.6449 4.5H1C0.447754 4.5 0 4.05225 0 3.5C0 2.94775 0.447754 2.5 1 2.5H3.6449C4.0752 1.0542 5.41443 0 7 0C8.58557 0 9.9248 1.0542 10.3551 2.5Z",
      itemWidth: 20,
      itemHeight: 10,
      textStyle: {
        color: "#fff",
      },
      selectedMode: false,
    },
    grid: {
      left: "5%",
      right: "5%",
      top: "20%",
      bottom: "5%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      name: "",
      nameLocation: "end",
      nameGap: 15,
      nameTextStyle: {
        color: "#fff",
        padding: [30, 0, 0, 0],
      },
      data: xPointData,
      boundaryGap: true,
      splitLine: {
        show: false,
        interval: "auto",
        lineStyle: {
          color: ["#D4DFF5"],
        },
      },
      axisTick: {
        show: false,
      },
      axisLine: {
        lineStyle: {
          color: "rgba(255, 255, 255, 0.20)",
        },
      },
      axisLabel: {
        interval: 0,
        rotate: 30,
        textStyle: {
          fontSize: 12,
          color: "#fff",
        },
      },
    },
    yAxis: [
      {
        type: "value",
        name: "m³/s",
        nameTextStyle: {
          color: "rgba(255, 255, 255, 0.80)",
          padding: [0, 0, 0, -30],
          fontSize: 10,
        },
        // min: 0,
        // max: 110,
        axisLabel: {
          show: true,
          textStyle: {
            color: "#fff",
          },
        },
        axisLine: {
          show: false,
          lineStyle: {
            color: "#007F69",
          },
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          show: true,
          lineStyle: {
            type: "dashed",
            color: "rgba(255, 255, 255, 0.20)",
          },
        },
      },
    ],
    series: [
      {
        name: "实时入库流量",
        type: "line",
        smooth: false,
        showSymbol: false,
        yAxisIndex: 0,
        data: line1Data,
        itemStyle: {
          show: false,
          normal: {
            color: "#1BCEBF",
          },
        },
        lineStyle: {
          normal: {
            width: 2,
          },
        },
      },
      {
        name: "预报入库流量",
        type: "line",
        smooth: false,
        showSymbol: false,
        yAxisIndex: 0,
        data: line2Data,
        itemStyle: {
          show: false,
          normal: {
            color: "#3370EB",
          },
        },
        lineStyle: {
          normal: {
            width: 2,
          },
        },
      },
    ],
  };
  return option;
}

// 效率预报
export function efficiencyPrediction(dataObj, opt = {}) {
  const { line1Data, line2Data, line3Data, xPointData } = dataObj;
  const option = {
    tooltip: {
      trigger: "axis",
      extraCssText: "cursor: default;",
      appendToBody: true,
      axisPointer: {
        lineStyle: {
          type: "solid",
          color: "#fff",
        },
      },
      borderColor: "#0989FF",
      backgroundColor: "rgba(9, 137, 255, 0.34)",
      padding: [5, 10],
      extraCssText: "box-shadow: 0 0 5px rgba(0,0,0,0.3)",
      textStyle: {
        color: "#FFFFFF", // 文字的颜色
        fontStyle: "normal",
        fontWeight: "normal",
      },
    },
    legend: {
      show: true,
      left: "25%",
      top: "0%",
      icon: "path://M10.3551 2.5H13C13.5522 2.5 14 2.94775 14 3.5C14 3.7251 13.9255 3.93311 13.7999 4.1001C13.6174 4.34277 13.327 4.5 13 4.5H10.3551C9.9248 5.9458 8.58557 7 7 7C5.41443 7 4.0752 5.9458 3.6449 4.5H1C0.447754 4.5 0 4.05225 0 3.5C0 2.94775 0.447754 2.5 1 2.5H3.6449C4.0752 1.0542 5.41443 0 7 0C8.58557 0 9.9248 1.0542 10.3551 2.5Z",
      itemWidth: 20,
      itemHeight: 10,
      textStyle: {
        color: "#fff",
      },
      selectedMode: false,
    },
    grid: {
      left: "5%",
      right: "5%",
      top: "20%",
      bottom: "5%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      name: "",
      nameLocation: "end",
      nameGap: 15,
      nameTextStyle: {
        color: "#fff",
        padding: [30, 0, 0, 0],
      },
      data: xPointData,
      boundaryGap: true,
      splitLine: {
        show: false,
        interval: "auto",
        lineStyle: {
          color: ["#D4DFF5"],
        },
      },
      axisTick: {
        show: false,
      },
      axisLine: {
        lineStyle: {
          color: "rgba(255, 255, 255, 0.20)",
        },
      },
      axisLabel: {
        interval: 0,
        rotate: 30,
        textStyle: {
          fontSize: 12,
          color: "#fff",
        },
      },
    },
    yAxis: [
      {
        type: "value",
        name: "%",
        nameTextStyle: {
          color: "rgba(255, 255, 255, 0.80)",
          padding: [0, 0, 0, -30],
          fontSize: 10,
        },
        // min: 0,
        // max: 110,
        axisLabel: {
          show: true,
          textStyle: {
            color: "#fff",
          },
        },
        axisLine: {
          show: false,
          lineStyle: {
            color: "#007F69",
          },
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          show: true,
          lineStyle: {
            type: "dashed",
            color: "rgba(255, 255, 255, 0.20)",
          },
        },
      },
    ],
    series: [
      {
        name: "1#机组",
        type: "line",
        smooth: false,
        showSymbol: false,
        yAxisIndex: 0,
        data: line1Data,
        itemStyle: {
          show: false,
          normal: {
            color: "#1BCEBF",
          },
        },
        lineStyle: {
          normal: {
            width: 2,
          },
        },
      },
      {
        name: "2#机组",
        type: "line",
        smooth: false,
        showSymbol: false,
        yAxisIndex: 0,
        data: line2Data,
        itemStyle: {
          show: false,
          normal: {
            color: "#3370EB",
          },
        },
        lineStyle: {
          normal: {
            width: 2,
          },
        },
      },
      {
        name: "总效率",
        type: "line",
        smooth: false,
        showSymbol: false,
        yAxisIndex: 0,
        data: line3Data,
        itemStyle: {
          show: false,
          normal: {
            color: "#DEF655",
          },
        },
        lineStyle: {
          normal: {
            width: 2,
          },
        },
      },
    ],
  };
  return option;
}

// 负荷预报
export function loadPrediction(dataObj, opt = {}) {
  const { line1Data, line2Data, line3Data, xPointData } = dataObj;
  const option = {
    tooltip: {
      trigger: "axis",
      extraCssText: "cursor: default;",
      appendToBody: true,
      axisPointer: {
        lineStyle: {
          type: "solid",
          color: "#fff",
        },
      },
      borderColor: "#0989FF",
      backgroundColor: "rgba(9, 137, 255, 0.34)",
      padding: [5, 10],
      extraCssText: "box-shadow: 0 0 5px rgba(0,0,0,0.3)",
      textStyle: {
        color: "#FFFFFF", // 文字的颜色
        fontStyle: "normal",
        fontWeight: "normal",
      },
    },
    legend: {
      show: true,
      left: "20%",
      top: "0%",
      icon: "path://M10.3551 2.5H13C13.5522 2.5 14 2.94775 14 3.5C14 3.7251 13.9255 3.93311 13.7999 4.1001C13.6174 4.34277 13.327 4.5 13 4.5H10.3551C9.9248 5.9458 8.58557 7 7 7C5.41443 7 4.0752 5.9458 3.6449 4.5H1C0.447754 4.5 0 4.05225 0 3.5C0 2.94775 0.447754 2.5 1 2.5H3.6449C4.0752 1.0542 5.41443 0 7 0C8.58557 0 9.9248 1.0542 10.3551 2.5Z",
      itemWidth: 20,
      itemHeight: 10,
      textStyle: {
        color: "#fff",
      },
      selectedMode: false,
    },
    grid: {
      left: "5%",
      right: "5%",
      top: "20%",
      bottom: "5%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      name: "",
      nameLocation: "end",
      nameGap: 15,
      nameTextStyle: {
        color: "#fff",
        padding: [30, 0, 0, 0],
      },
      data: xPointData,
      boundaryGap: true,
      splitLine: {
        show: false,
        interval: "auto",
        lineStyle: {
          color: ["#D4DFF5"],
        },
      },
      axisTick: {
        show: false,
      },
      axisLine: {
        lineStyle: {
          color: "rgba(255, 255, 255, 0.20)",
        },
      },
      axisLabel: {
        interval: 0,
        rotate: 30,
        textStyle: {
          fontSize: 12,
          color: "#fff",
        },
      },
    },
    yAxis: [
      {
        type: "value",
        name: "kW",
        nameTextStyle: {
          color: "rgba(255, 255, 255, 0.80)",
          padding: [0, 0, 0, -30],
          fontSize: 10,
        },
        // min: 0,
        // max: 110,
        axisLabel: {
          show: true,
          textStyle: {
            color: "#fff",
          },
        },
        axisLine: {
          show: false,
          lineStyle: {
            color: "#007F69",
          },
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          show: true,
          lineStyle: {
            type: "dashed",
            color: "rgba(255, 255, 255, 0.20)",
          },
        },
      },
    ],
    series: [
      {
        name: "实际负荷",
        type: "line",
        smooth: false,
        showSymbol: false,
        yAxisIndex: 0,
        data: line1Data,
        itemStyle: {
          show: false,
          normal: {
            color: "#1BCEBF",
          },
        },
        lineStyle: {
          normal: {
            width: 2,
          },
        },
      },
      {
        name: "计划负荷",
        type: "line",
        smooth: false,
        showSymbol: false,
        yAxisIndex: 0,
        data: line2Data,
        itemStyle: {
          show: false,
          normal: {
            color: "#3370EB",
          },
        },
        lineStyle: {
          normal: {
            width: 2,
          },
        },
      },
      {
        name: "预报负荷",
        type: "line",
        smooth: false,
        showSymbol: false,
        yAxisIndex: 0,
        data: line3Data,
        itemStyle: {
          show: false,
          normal: {
            color: "#DEF655",
          },
        },
        lineStyle: {
          normal: {
            width: 2,
          },
        },
      },
    ],
  };
  return option;
}

// 发电预报
export function powerPrediction(dataObj, opt = {}) {
  const { line1Data, line2Data, line3Data, xPointData } = dataObj;
  const option = {
    tooltip: {
      trigger: "axis",
      extraCssText: "cursor: default;",
      appendToBody: true,
      axisPointer: {
        lineStyle: {
          type: "solid",
          color: "#fff",
        },
      },
      borderColor: "#0989FF",
      backgroundColor: "rgba(9, 137, 255, 0.34)",
      padding: [5, 10],
      extraCssText: "box-shadow: 0 0 5px rgba(0,0,0,0.3)",
      textStyle: {
        color: "#FFFFFF", // 文字的颜色
        fontStyle: "normal",
        fontWeight: "normal",
      },
    },
    legend: {
      show: true,
      left: "15%",
      top: "0%",
      icon: "path://M10.3551 2.5H13C13.5522 2.5 14 2.94775 14 3.5C14 3.7251 13.9255 3.93311 13.7999 4.1001C13.6174 4.34277 13.327 4.5 13 4.5H10.3551C9.9248 5.9458 8.58557 7 7 7C5.41443 7 4.0752 5.9458 3.6449 4.5H1C0.447754 4.5 0 4.05225 0 3.5C0 2.94775 0.447754 2.5 1 2.5H3.6449C4.0752 1.0542 5.41443 0 7 0C8.58557 0 9.9248 1.0542 10.3551 2.5Z",
      itemWidth: 20,
      itemHeight: 10,
      textStyle: {
        color: "#fff",
      },
      selectedMode: false,
    },
    grid: {
      left: "5%",
      right: "5%",
      top: "20%",
      bottom: "5%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      name: "",
      nameLocation: "end",
      nameGap: 15,
      nameTextStyle: {
        color: "#fff",
        padding: [30, 0, 0, 0],
      },
      data: xPointData,
      boundaryGap: true,
      splitLine: {
        show: false,
        interval: "auto",
        lineStyle: {
          color: ["#D4DFF5"],
        },
      },
      axisTick: {
        show: false,
      },
      axisLine: {
        lineStyle: {
          color: "rgba(255, 255, 255, 0.20)",
        },
      },
      axisLabel: {
        interval: 0,
        // rotate: 30,
        textStyle: {
          fontSize: 12,
          color: "#fff",
        },
      },
    },
    yAxis: [
      {
        type: "value",
        name: "发电量(万kWh)",
        nameTextStyle: {
          color: "rgba(255, 255, 255, 0.80)",
          padding: [0, 0, 0, -10],
          fontSize: 10,
        },
        // min: 0,
        // max: 110,
        axisLabel: {
          show: true,
          textStyle: {
            color: "#fff",
          },
        },
        axisLine: {
          show: false,
          lineStyle: {
            color: "#007F69",
          },
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          show: true,
          lineStyle: {
            type: "dashed",
            color: "rgba(255, 255, 255, 0.20)",
          },
        },
      },
    ],
    series: [
      {
        name: "计划发电量",
        type: "line",
        smooth: true,
        showSymbol: false,
        yAxisIndex: 0,
        data: line1Data,
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
                  color: "rgba(46, 224, 85, 0.78)",
                },
                {
                  offset: 1,
                  color: "rgba(46, 224, 85, 0.06)",
                },
              ],
              false,
            ),
          },
        },
        itemStyle: {
          show: false,
          normal: {
            color: "#2EE055",
          },
        },
        lineStyle: {
          normal: {
            width: 2,
          },
        },
      },
      {
        name: "实际发电量",
        type: "line",
        smooth: true,
        showSymbol: false,
        yAxisIndex: 0,
        data: line2Data,
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
                  color: "rgba(255, 239, 91, 0.78)",
                },
                {
                  offset: 1,
                  color: "rgba(255, 239, 91, 0.06)",
                },
              ],
              false,
            ),
          },
        },
        itemStyle: {
          show: false,
          normal: {
            color: "#FFEF5B",
          },
        },
        lineStyle: {
          normal: {
            width: 2,
          },
        },
      },
      {
        name: "预测发电量",
        type: "line",
        smooth: true,
        showSymbol: false,
        yAxisIndex: 0,
        data: line3Data,
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
                  color: "rgba(0, 170, 255, 0.78)",
                },
                {
                  offset: 1,
                  color: "rgba(0, 170, 255, 0.06)",
                },
              ],
              false,
            ),
          },
        },
        itemStyle: {
          show: false,
          normal: {
            color: "#00AAFF",
          },
        },
        lineStyle: {
          normal: {
            width: 2,
          },
        },
      },
    ],
  };
  return option;
}

// 振动预报
export function vibrationPrediction(dataObj, opt = {}) {
  const { line1Data, line2Data, line3Data, xPointData } = dataObj;
  const option = {
    tooltip: {
      trigger: "axis",
      extraCssText: "cursor: default;",
      appendToBody: true,
      axisPointer: {
        lineStyle: {
          type: "solid",
          color: "#fff",
        },
      },
      borderColor: "#0989FF",
      backgroundColor: "rgba(9, 137, 255, 0.34)",
      padding: [5, 10],
      extraCssText: "box-shadow: 0 0 5px rgba(0,0,0,0.3)",
      textStyle: {
        color: "#FFFFFF", // 文字的颜色
        fontStyle: "normal",
        fontWeight: "normal",
      },
    },
    legend: {
      show: true,
      left: "2%",
      top: "0%",
      icon: "path://M10.3551 2.5H13C13.5522 2.5 14 2.94775 14 3.5C14 3.7251 13.9255 3.93311 13.7999 4.1001C13.6174 4.34277 13.327 4.5 13 4.5H10.3551C9.9248 5.9458 8.58557 7 7 7C5.41443 7 4.0752 5.9458 3.6449 4.5H1C0.447754 4.5 0 4.05225 0 3.5C0 2.94775 0.447754 2.5 1 2.5H3.6449C4.0752 1.0542 5.41443 0 7 0C8.58557 0 9.9248 1.0542 10.3551 2.5Z",
      itemWidth: 20,
      itemHeight: 10,
      textStyle: {
        color: "#fff",
        fontSize: 11,
      },
      selectedMode: false,
    },
    grid: {
      left: "5%",
      right: "5%",
      top: "20%",
      bottom: "5%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      name: "",
      nameLocation: "end",
      nameGap: 15,
      nameTextStyle: {
        color: "#fff",
        padding: [30, 0, 0, 0],
      },
      data: xPointData,
      boundaryGap: true,
      splitLine: {
        show: false,
        interval: "auto",
        lineStyle: {
          color: ["#D4DFF5"],
        },
      },
      axisTick: {
        show: false,
      },
      axisLine: {
        lineStyle: {
          color: "rgba(255, 255, 255, 0.20)",
        },
      },
      axisLabel: {
        interval: 0,
        rotate: 30,
        textStyle: {
          fontSize: 12,
          color: "#fff",
        },
      },
    },
    yAxis: [
      {
        type: "value",
        name: "mm/s",
        nameTextStyle: {
          color: "rgba(255, 255, 255, 0.80)",
          padding: [0, 0, 0, -30],
          fontSize: 10,
        },
        // min: 0,
        // max: 110,
        axisLabel: {
          show: true,
          textStyle: {
            color: "#fff",
          },
        },
        axisLine: {
          show: false,
          lineStyle: {
            color: "#007F69",
          },
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          show: true,
          lineStyle: {
            type: "dashed",
            color: "rgba(255, 255, 255, 0.20)",
          },
        },
      },
    ],
    series: [
      {
        name: "1#水轮机径向振动",
        type: "line",
        smooth: false,
        showSymbol: false,
        yAxisIndex: 0,
        data: line1Data,
        itemStyle: {
          show: false,
          normal: {
            color: "#1BCEBF",
          },
        },
        lineStyle: {
          normal: {
            width: 2,
          },
        },
      },
      {
        name: "1#发电机径向振动",
        type: "line",
        smooth: false,
        showSymbol: false,
        yAxisIndex: 0,
        data: line2Data,
        itemStyle: {
          show: false,
          normal: {
            color: "#3370EB",
          },
        },
        lineStyle: {
          normal: {
            width: 2,
          },
        },
      },
      {
        name: "1#机架振动",
        type: "line",
        smooth: false,
        showSymbol: false,
        yAxisIndex: 0,
        data: line3Data,
        itemStyle: {
          show: false,
          normal: {
            color: "#DEF655",
          },
        },
        lineStyle: {
          normal: {
            width: 2,
          },
        },
      },
    ],
  };
  return option;
}

// 温度预报
export function temperaturePrediction(dataObj, opt = {}) {
  const { line1Data, line2Data, line3Data, xPointData } = dataObj;
  const option = {
    tooltip: {
      trigger: "axis",
      extraCssText: "cursor: default;",
      appendToBody: true,
      axisPointer: {
        lineStyle: {
          type: "solid",
          color: "#fff",
        },
      },
      borderColor: "#0989FF",
      backgroundColor: "rgba(9, 137, 255, 0.34)",
      padding: [5, 10],
      extraCssText: "box-shadow: 0 0 5px rgba(0,0,0,0.3)",
      textStyle: {
        color: "#FFFFFF", // 文字的颜色
        fontStyle: "normal",
        fontWeight: "normal",
      },
    },
    legend: {
      show: true,
      left: "10%",
      top: "0%",
      icon: "path://M10.3551 2.5H13C13.5522 2.5 14 2.94775 14 3.5C14 3.7251 13.9255 3.93311 13.7999 4.1001C13.6174 4.34277 13.327 4.5 13 4.5H10.3551C9.9248 5.9458 8.58557 7 7 7C5.41443 7 4.0752 5.9458 3.6449 4.5H1C0.447754 4.5 0 4.05225 0 3.5C0 2.94775 0.447754 2.5 1 2.5H3.6449C4.0752 1.0542 5.41443 0 7 0C8.58557 0 9.9248 1.0542 10.3551 2.5Z",
      itemWidth: 20,
      itemHeight: 10,
      textStyle: {
        color: "#fff",
      },
      selectedMode: false,
    },
    grid: {
      left: "5%",
      right: "5%",
      top: "20%",
      bottom: "5%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      name: "",
      nameLocation: "end",
      nameGap: 15,
      nameTextStyle: {
        color: "#fff",
        padding: [30, 0, 0, 0],
      },
      data: xPointData,
      boundaryGap: true,
      splitLine: {
        show: false,
        interval: "auto",
        lineStyle: {
          color: ["#D4DFF5"],
        },
      },
      axisTick: {
        show: false,
      },
      axisLine: {
        lineStyle: {
          color: "rgba(255, 255, 255, 0.20)",
        },
      },
      axisLabel: {
        interval: 0,
        rotate: 30,
        textStyle: {
          fontSize: 12,
          color: "#fff",
        },
      },
    },
    yAxis: [
      {
        type: "value",
        name: "mm",
        nameTextStyle: {
          color: "rgba(255, 255, 255, 0.80)",
          padding: [0, 0, 0, -30],
          fontSize: 10,
        },
        // min: 0,
        // max: 110,
        axisLabel: {
          show: true,
          textStyle: {
            color: "#fff",
          },
        },
        axisLine: {
          show: false,
          lineStyle: {
            color: "#007F69",
          },
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          show: true,
          lineStyle: {
            type: "dashed",
            color: "rgba(255, 255, 255, 0.20)",
          },
        },
      },
    ],
    series: [
      {
        name: "1#上导轴承",
        type: "line",
        smooth: false,
        showSymbol: false,
        yAxisIndex: 0,
        data: line1Data,
        itemStyle: {
          show: false,
          normal: {
            color: "#1BCEBF",
          },
        },
        lineStyle: {
          normal: {
            width: 2,
          },
        },
      },
      {
        name: "1#下导轴承",
        type: "line",
        smooth: false,
        showSymbol: false,
        yAxisIndex: 0,
        data: line2Data,
        itemStyle: {
          show: false,
          normal: {
            color: "#3370EB",
          },
        },
        lineStyle: {
          normal: {
            width: 2,
          },
        },
      },
      {
        name: "1#定子绕组",
        type: "line",
        smooth: false,
        showSymbol: false,
        yAxisIndex: 0,
        data: line3Data,
        itemStyle: {
          show: false,
          normal: {
            color: "#DEF655",
          },
        },
        lineStyle: {
          normal: {
            width: 2,
          },
        },
      },
    ],
  };
  return option;
}

// 压力预报
export function pressPrediction(dataObj, opt = {}) {
  const { line1Data, line2Data, xPointData } = dataObj;
  const option = {
    tooltip: {
      trigger: "axis",
      extraCssText: "cursor: default;",
      appendToBody: true,
      axisPointer: {
        lineStyle: {
          type: "solid",
          color: "#fff",
        },
      },
      borderColor: "#0989FF",
      backgroundColor: "rgba(9, 137, 255, 0.34)",
      padding: [5, 10],
      extraCssText: "box-shadow: 0 0 5px rgba(0,0,0,0.3)",
      textStyle: {
        color: "#FFFFFF", // 文字的颜色
        fontStyle: "normal",
        fontWeight: "normal",
      },
    },
    legend: {
      show: true,
      left: "20%",
      top: "0%",
      icon: "path://M10.3551 2.5H13C13.5522 2.5 14 2.94775 14 3.5C14 3.7251 13.9255 3.93311 13.7999 4.1001C13.6174 4.34277 13.327 4.5 13 4.5H10.3551C9.9248 5.9458 8.58557 7 7 7C5.41443 7 4.0752 5.9458 3.6449 4.5H1C0.447754 4.5 0 4.05225 0 3.5C0 2.94775 0.447754 2.5 1 2.5H3.6449C4.0752 1.0542 5.41443 0 7 0C8.58557 0 9.9248 1.0542 10.3551 2.5Z",
      itemWidth: 20,
      itemHeight: 10,
      textStyle: {
        color: "#fff",
      },
      selectedMode: false,
    },
    grid: {
      left: "5%",
      right: "5%",
      top: "20%",
      bottom: "5%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      name: "",
      nameLocation: "end",
      nameGap: 15,
      nameTextStyle: {
        color: "#fff",
        padding: [30, 0, 0, 0],
      },
      data: xPointData,
      boundaryGap: true,
      splitLine: {
        show: false,
        interval: "auto",
        lineStyle: {
          color: ["#D4DFF5"],
        },
      },
      axisTick: {
        show: false,
      },
      axisLine: {
        lineStyle: {
          color: "rgba(255, 255, 255, 0.20)",
        },
      },
      axisLabel: {
        interval: 0,
        rotate: 30,
        textStyle: {
          fontSize: 12,
          color: "#fff",
        },
      },
    },
    yAxis: [
      {
        type: "value",
        name: "m³/s",
        nameTextStyle: {
          color: "rgba(255, 255, 255, 0.80)",
          padding: [0, 0, 0, -30],
          fontSize: 10,
        },
        // min: 0,
        // max: 110,
        axisLabel: {
          show: true,
          textStyle: {
            color: "#fff",
          },
        },
        axisLine: {
          show: false,
          lineStyle: {
            color: "#007F69",
          },
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          show: true,
          lineStyle: {
            type: "dashed",
            color: "rgba(255, 255, 255, 0.20)",
          },
        },
      },
    ],
    series: [
      {
        name: "1#蜗壳压力",
        type: "line",
        smooth: false,
        showSymbol: false,
        yAxisIndex: 0,
        data: line1Data,
        itemStyle: {
          show: false,
          normal: {
            color: "#1BCEBF",
          },
        },
        lineStyle: {
          normal: {
            width: 2,
          },
        },
      },
      {
        name: "1#顶盖压力",
        type: "line",
        smooth: false,
        showSymbol: false,
        yAxisIndex: 0,
        data: line2Data,
        itemStyle: {
          show: false,
          normal: {
            color: "#3370EB",
          },
        },
        lineStyle: {
          normal: {
            width: 2,
          },
        },
      },
    ],
  };
  return option;
}

// 磨损预报
export function wearPrediction(dataObj, opt = {}) {
  const { line1Data, line2Data, xPointData } = dataObj;
  const option = {
    tooltip: {
      trigger: "axis",
      extraCssText: "cursor: default;",
      appendToBody: true,
      axisPointer: {
        lineStyle: {
          type: "solid",
          color: "#fff",
        },
      },
      borderColor: "#0989FF",
      backgroundColor: "rgba(9, 137, 255, 0.34)",
      padding: [5, 10],
      extraCssText: "box-shadow: 0 0 5px rgba(0,0,0,0.3)",
      textStyle: {
        color: "#FFFFFF", // 文字的颜色
        fontStyle: "normal",
        fontWeight: "normal",
      },
    },
    legend: {
      show: true,
      left: "20%",
      top: "0%",
      icon: "path://M10.3551 2.5H13C13.5522 2.5 14 2.94775 14 3.5C14 3.7251 13.9255 3.93311 13.7999 4.1001C13.6174 4.34277 13.327 4.5 13 4.5H10.3551C9.9248 5.9458 8.58557 7 7 7C5.41443 7 4.0752 5.9458 3.6449 4.5H1C0.447754 4.5 0 4.05225 0 3.5C0 2.94775 0.447754 2.5 1 2.5H3.6449C4.0752 1.0542 5.41443 0 7 0C8.58557 0 9.9248 1.0542 10.3551 2.5Z",
      itemWidth: 20,
      itemHeight: 10,
      textStyle: {
        color: "#fff",
      },
      selectedMode: false,
    },
    grid: {
      left: "5%",
      right: "5%",
      top: "20%",
      bottom: "5%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      name: "",
      nameLocation: "end",
      nameGap: 15,
      nameTextStyle: {
        color: "#fff",
        padding: [30, 0, 0, 0],
      },
      data: xPointData,
      boundaryGap: true,
      splitLine: {
        show: false,
        interval: "auto",
        lineStyle: {
          color: ["#D4DFF5"],
        },
      },
      axisTick: {
        show: false,
      },
      axisLine: {
        lineStyle: {
          color: "rgba(255, 255, 255, 0.20)",
        },
      },
      axisLabel: {
        interval: 0,
        rotate: 30,
        textStyle: {
          fontSize: 12,
          color: "#fff",
        },
      },
    },
    yAxis: [
      {
        type: "value",
        name: "%",
        nameTextStyle: {
          color: "rgba(255, 255, 255, 0.80)",
          padding: [0, 0, 0, -30],
          fontSize: 10,
        },
        // min: 0,
        // max: 110,
        axisLabel: {
          show: true,
          textStyle: {
            color: "#fff",
          },
        },
        axisLine: {
          show: false,
          lineStyle: {
            color: "#007F69",
          },
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          show: true,
          lineStyle: {
            type: "dashed",
            color: "rgba(255, 255, 255, 0.20)",
          },
        },
      },
    ],
    series: [
      {
        name: "1#转轮叶片磨损",
        type: "line",
        smooth: false,
        showSymbol: false,
        yAxisIndex: 0,
        data: line1Data,
        itemStyle: {
          show: false,
          normal: {
            color: "#1BCEBF",
          },
        },
        lineStyle: {
          normal: {
            width: 2,
          },
        },
      },
      {
        name: "1#蜗壳内壁磨损",
        type: "line",
        smooth: false,
        showSymbol: false,
        yAxisIndex: 0,
        data: line2Data,
        itemStyle: {
          show: false,
          normal: {
            color: "#3370EB",
          },
        },
        lineStyle: {
          normal: {
            width: 2,
          },
        },
      },
    ],
  };
  return option;
}

// 效率预报
export function efficientPrediction(dataObj, opt = {}) {
  const { line1Data, line2Data,line3Data, xPointData } = dataObj;
  const option = {
    tooltip: {
      trigger: "axis",
      extraCssText: "cursor: default;",
      appendToBody: true,
      axisPointer: {
        lineStyle: {
          type: "solid",
          color: "#fff",
        },
      },
      borderColor: "#0989FF",
      backgroundColor: "rgba(9, 137, 255, 0.34)",
      padding: [5, 10],
      extraCssText: "box-shadow: 0 0 5px rgba(0,0,0,0.3)",
      textStyle: {
        color: "#FFFFFF", // 文字的颜色
        fontStyle: "normal",
        fontWeight: "normal",
      },
    },
    legend: {
      show: true,
      left: "10%",
      top: "0%",
      icon: "path://M10.3551 2.5H13C13.5522 2.5 14 2.94775 14 3.5C14 3.7251 13.9255 3.93311 13.7999 4.1001C13.6174 4.34277 13.327 4.5 13 4.5H10.3551C9.9248 5.9458 8.58557 7 7 7C5.41443 7 4.0752 5.9458 3.6449 4.5H1C0.447754 4.5 0 4.05225 0 3.5C0 2.94775 0.447754 2.5 1 2.5H3.6449C4.0752 1.0542 5.41443 0 7 0C8.58557 0 9.9248 1.0542 10.3551 2.5Z",
      itemWidth: 20,
      itemHeight: 10,
      textStyle: {
        color: "#fff",
      },
      selectedMode: false,
    },
    grid: {
      left: "5%",
      right: "5%",
      top: "20%",
      bottom: "5%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      name: "",
      nameLocation: "end",
      nameGap: 15,
      nameTextStyle: {
        color: "#fff",
        padding: [30, 0, 0, 0],
      },
      data: xPointData,
      boundaryGap: true,
      splitLine: {
        show: false,
        interval: "auto",
        lineStyle: {
          color: ["#D4DFF5"],
        },
      },
      axisTick: {
        show: false,
      },
      axisLine: {
        lineStyle: {
          color: "rgba(255, 255, 255, 0.20)",
        },
      },
      axisLabel: {
        interval: 0,
        rotate: 30,
        textStyle: {
          fontSize: 12,
          color: "#fff",
        },
      },
    },
    yAxis: [
      {
        type: "value",
        name: "m³/s",
        nameTextStyle: {
          color: "rgba(255, 255, 255, 0.80)",
          padding: [0, 0, 0, -30],
          fontSize: 10,
        },
        // min: 0,
        // max: 110,
        axisLabel: {
          show: true,
          textStyle: {
            color: "#fff",
          },
        },
        axisLine: {
          show: false,
          lineStyle: {
            color: "#007F69",
          },
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          show: true,
          lineStyle: {
            type: "dashed",
            color: "rgba(255, 255, 255, 0.20)",
          },
        },
      },
    ],
    series: [
      {
        name: "1#机组效率",
        type: "line",
        smooth: false,
        showSymbol: false,
        yAxisIndex: 0,
        data: line1Data,
        itemStyle: {
          show: false,
          normal: {
            color: "#1BCEBF",
          },
        },
        lineStyle: {
          normal: {
            width: 2,
          },
        },
      },
      {
        name: "2#机组效率",
        type: "line",
        smooth: false,
        showSymbol: false,
        yAxisIndex: 0,
        data: line2Data,
        itemStyle: {
          show: false,
          normal: {
            color: "#3370EB",
          },
        },
        lineStyle: {
          normal: {
            width: 2,
          },
        },
      },
      {
        name: "3#机组效率",
        type: "line",
        smooth: false,
        showSymbol: false,
        yAxisIndex: 0,
        data: line3Data,
        itemStyle: {
          show: false,
          normal: {
            color: "#DEF655",
          },
        },
        lineStyle: {
          normal: {
            width: 2,
          },
        },
      },
    ],
  };
  return option;
}
