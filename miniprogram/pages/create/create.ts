// index.ts
// 获取应用实例
// Pupuu https://developers.weixin.qq.com/miniprogram/dev/framework/app-service/page.html
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
    gender: 1,
    genders: GENDERS,
    birth: '2020-01-01'
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
  bindGenderChange: function(arg1, arg2) {
    console.log(arg1, arg2)
    // this.setData({ gender: e.detail.value });
  },
  bindDateChange: function(e) {
    this.setData({ birth: e.detail.value })
  },
  bindRemarkChange: function(e) {
    this.setData({ remark: e.detail.value });
  },
  bindSubmit: function(){
    const { nickname, fullname, tagId, gender, birth, remark } = this.data || {};
    const data = {nickname, fullname, tagId, gender, birth, remark};
    console.log(data);
  }
})
