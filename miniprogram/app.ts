// app.ts
// Pupuu https://developers.weixin.qq.com/miniprogram/dev/framework/app-service/app.html
// App({}) reigister global data and funcs
// getApp() get instance

const { post, api } = require("./api/network");
const { LOCAL_STORAGE } = require("./storage/localStorage");

App<IAppOption>({
  globalData: {
    cookie: '',
    hostApi: 'https://kid-book-api.metahmo.com/api',
    hostCdnImage: 'kid-cdn.metahmo.com/image/sys'
  },
  onLaunch() {
    // 展示本地存储能力
    const userSession = wx.getStorageSync(LOCAL_STORAGE.USER_SESSION)
   
    // 登录
    !userSession && wx.login({
      success: res => {
        console.log("-----------")
        console.log(res.code)
        // code5分钟时效，是微信生成的获取用户id的凭证
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        const options = {
          data: { code: res.code }
        }
        post(api.accountSigninWechat, options)
          .then((res: any) => {
            console.log('成功', res);
            wx.switchTab({
              url: '/pages/list/list',
            })
            // const { userSession } = res || {};
            // !!userSession && wx.setStorageSync(LOCAL_STORAGE.USER_SESSION, `USER_SESSION=${userSession}`)
          })
          .catch((err: any) => {
            console.log('失败')
            console.log(err)
          });
      },
    })
  },
})

