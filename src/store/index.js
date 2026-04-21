import { defineStore } from 'pinia'

export const useStore = defineStore('store', {
  state: () => ({
    currentFeature: JSON.parse(sessionStorage.getItem('currentFeature')) || {},
    isHidePopup: false, // UE传过来的事件
    isClickAlarm: false, // 报警点击事件
    isCollapsePanel: false, // 侧边栏是否收起
    isShowFeatureButton: true,
    isShowBackButton: true,
    isShowDiagnosticReport: false, // 诊断报告弹窗
    isShowAlarm: true, //报警弹窗
    showStatus: 1, // 1:拆分 2:组装
    isShowSplitButton: false, // 拆分按钮是否显示
    isShowHeadButton: true, // 顶部按钮是否显示
    isShowBootButton: false, // 开机流程按钮是否显示
    isShowVideo: false, // 视频播放器是否显示
    curBootId: 0, // 当前开机流程或停机流程id
    bootStatus: 0, // 0： 未选中 1:开机 2:关机
    showStart: false, // 开始按钮是否显示
    reportInfo: {}, // 诊断信息
    alarmData: [], // 报警数据信息
    previewDataObj: { // 预演数据信息
      index: 0,
      waterData: [],
      flowRateData: []
    },
    excelData: [], // excel数据信息
    curPath: '/home', // 当前路径
    isOpenRehearsal: false, // 是否开启预演
  }),
  actions: {
    setCurPath(path) {
      this.curPath = path
    },
    setDiagnosticReport(isShow) {
      this.isShowDiagnosticReport = isShow
    },
    setCurrentFeature(feature) {
      this.currentFeature = feature
      sessionStorage.setItem('currentFeature', JSON.stringify(feature))
    },
    setShowStatus(status) {
      this.showStatus = status
    },
    clearCurrentFeature() {
      this.currentFeature = {}
    },
    setCollapsePanel(isCollapse) {
      this.isCollapsePanel = isCollapse
    },
    initAllData() {
      this.currentFeature = {},
      this.isCollapsePanel = false, 
      this.isShowFeatureButton = true
      this.isShowBackButton =  true
      this.isShowDiagnosticReport = false 
      this.isShowAlarm = true 
      this.showStatus = 1 
      this.isShowSplitButton =  false 
      this.isShowHeadButton =  true 
      this.isShowBootButton = false 
      this.isShowVideo =  false 
      this.curBootId = 0
      this.bootStatus = 0
      this.showStart = false
      this.isHidePopup = false
      this.isClickAlarm = false
    },
    clearPreviewDataObj() {
      this.previewDataObj = {
        index: 0,
        waterData: [],
        flowRateData: []
      }
    }
  },
})
