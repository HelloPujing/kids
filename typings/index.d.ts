/// <reference path="./types/index.d.ts" />

interface IAppOption {
  globalData: {
    userInfo?: WechatMiniprogram.UserInfo,
    tempKid?: Kid
  }
  userInfoReadyCallback?: WechatMiniprogram.GetUserInfoSuccessCallback,
}