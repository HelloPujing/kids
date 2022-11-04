// app.ts
// Pupuu https://developers.weixin.qq.com/miniprogram/dev/framework/app-service/app.html
// App({}) reigister global data and funcs
// getApp() get instance

App<IAppOption>({
  globalData: {
    tempKid: undefined,
    hostApi: 'https://kid-book-api.metahmo.com/api',
    hostCdnImage: 'kid-cdn.metahmo.com/image/sys'
  },
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        console.log("-----------")
        console.log(res.code)
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      },
    })
  },
})