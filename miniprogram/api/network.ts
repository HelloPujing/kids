const { LOCAL_STORAGE } = require("../storage/localStorage");

type OptionsType = {
  method: 'POST' | 'GET',
  data: any
}
type ResDataType = {
  code: number,
  message: string,
  data: any
}

export type RejectType = {
  code: number,
  message: string
}

export function request(api: string, options: OptionsType){
    // const cookie = wx.getStorageSync(LOCAL_STORAGE.USER_SESSION) || '';
    const cookie = (getApp()).globalData.cookie;
    const header = !!cookie ? { cookie } : {};

  return new Promise((resolve, reject) => {
    wx.request({
      url: (getApp()).globalData.hostApi + api,
      method: options.method,
      header,
      data: options.method === 'GET' ? options.data : JSON.stringify(options.data),
      success: (res) => {
        const {cookies, data: resData, errMsg, statusCode} = res || {};
        const cookie = (cookies || []).find(i => i.indexOf("USER_SESSION") >= 0);
        if(cookie) (getApp()).globalData.cookie = cookie;
  
        if(statusCode == 200) {
          const {code, message, data} = resData as ResDataType; // 业务自定义
          if(code < 0) reject({ code, message });
          resolve(data);
        };

        // console.log('非200请求', res)
        reject({ code: statusCode, message: errMsg || '请求失败，请稍后再试' });
      },
      fail: (res) => {
        // console.log('请求失败', res);
        reject({ code: -9999, message: '请求失败，请稍后再试' });
      },
      complete: () => {
        // wx.hideLoading();
      }
    });
  })
}

export function get(api: string, options: OptionsType) {
  return request(api, {...options, method: 'GET'})
} 

export function post(api: string, options: OptionsType) {
  return request(api, {...options, method: 'POST'})
} 

export { api } from './api';