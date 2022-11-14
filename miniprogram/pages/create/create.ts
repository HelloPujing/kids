// index.ts
// 获取应用实例
// Pupuu https://developers.weixin.qq.com/miniprogram/dev/framework/app-service/page.html

import { api, get, post, put } from "../../api/network";

// Page({}) register data、customer data、events
let tags = require('../../data/tags');

const GENDERS = [
  {
    value: 0,
    name: 'Girl'
  },
  {
    value: 1,
    name: 'Boy'
  }
];


Page({
  data: {
    kidId: '',
    nickname: '',
    builtinTagId: 1, // 默认tag
    theme: '#F1857B', // 默认tag色
    tags: tags,
    fullname: '',
    gender: 0,
    genders: GENDERS,
    birthday: '2020-01-01',
    remark: ''
  },
  // 生命周期
  onLoad(options){
    const {kidId} = options;
    console.log(kidId);
    !!kidId && get(`${api.kids}/${kidId}`)
    .then((res: any) => {
      const { id, fullname, nickname, builtinTagId, gender, birthday, remark } = res;
      const birthDate = new Date(birthday);
      this.setData({
        kidId: id,
        theme: ((tags || []).find(tag => tag.id === builtinTagId) || {}).color || 'fff',
        ...(nickname ? {nickname} : {}),
        ...(fullname ? {fullname} : {}),
        ...(builtinTagId? {builtinTagId} : {}),
        ...(gender ? {gender} : {}),
        ...(birthday ? {birthday: `${birthDate.getFullYear()}-${birthDate.getMonth()+1}-${birthDate.getDate()}` } : {}),
        ...(remark ? {remark} : {})
      })
    })
  },

  onReady(){
  },

  // 事件处理函数
  bindNicknameChange: function(e) {
    this.setData({ nickname: e.detail.value });
  },
  bindTagChange: function(e, v) {
    const {theme, value: builtinTagId} = e.target.dataset || {};
    this.setData({
      builtinTagId,
      theme
    });
  },
  bindFullnameChange: function(e) {
    this.setData({ fullname: e.detail.value });
  },
  bindGenderChange: function(e) {
    this.setData({ gender: Number(e.detail.value) });
  },
  bindDateChange: function(e) {
    this.setData({ birthday: e.detail.value })
  },
  bindRemarkChange: function(e) {
    this.setData({ remark: e.detail.value });
  },
  bindSubmit: function(){
    // let app = getApp();
    // app.globalData.tempKid = this.data;
    const {kidId, fullname, nickname, gender, birthday, remark, builtinTagId } = this.data;

    // TODO tag
    const data = {
      fullname, nickname, gender, birthday: (new Date(birthday)).getTime(), remark,
      builtinTagId,
    }

    const req = kidId? put(api.kids + `/${kidId}`, { data }) : post(api.kids, { data })
    req.then(res => {
      console.log('创建/修改成功', res);
      wx.navigateBack();
    })
  }
})
