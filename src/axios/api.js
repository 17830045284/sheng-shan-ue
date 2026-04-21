import { request } from './index'

/** 获取报警记录
 * @param {any} params:{}
 * @returns {any}
 */
export function getWarnList(params = {}) {
  return request(`/warnList`, params, 'post')
}

/** 获取测点数据
 * @date 2023-07-11
 * @param {any} params:{}
 * @returns {any}
 */
export function getTagData(params = { "deviceCode": "201561293" }) {
  return request(`/tagData`, params, 'post')
}
