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
    nickName: '',
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
    fullName: '',
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
  bindDateChange: function(e) {
    this.setData({ birth: e.detail.value })
  },
  bindTagChange: function(e, v) {
    const {theme, value: tagId} = e.target.dataset || {};
    console.log(theme, tagId);
    this.setData({theme: theme});
  }
})
