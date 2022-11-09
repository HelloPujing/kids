// index.ts
// 获取应用实例
// Pupuu https://developers.weixin.qq.com/miniprogram/dev/framework/app-service/page.html

import { api, post } from "../../api/network";

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
    nickname: '',
    tagId: '1',
    theme: '',
    tags: tags,
    category: '',
    categories: [
      {
        name: '亲戚家',
        color: '#'
      }
    ],
    fullname: '',
    gender: 0,
    genders: GENDERS,
    birthday: '2020-01-01',
    remark: ''
  },
  // 生命周期
  onReady(){
    const tag = (tags || []).find(tag => tag.id === this.data.tagId);
    const color = (tag || {}).color || '#F1857B';
     this.setData({theme: color})
  },

  // 事件处理函数
  bindNicknameChange: function(e) {
    this.setData({ nickname: e.detail.value });
  },
  bindTagChange: function(e, v) {
    const {theme, value: tagId} = e.target.dataset || {};
    this.setData({
      tagId,
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
    const {fullname, nickname, gender, birthday, remark } = this.data;

    // TODO tag
    const data = {
      fullname, nickname, gender, birthday: (new Date(birthday)).getTime(), remark
    }

    post(api.kids, { data })
    .then(res => {
      console.log('创建成功', res);
      wx.navigateBack();
    })
  }
})
