// index.ts
// 获取应用实例
// Pupuu https://developers.weixin.qq.com/miniprogram/dev/framework/app-service/page.html
// Page({}) register data、customer data、events
const TAGS = [
  {
    name: 'friend’s kid',
    color: '#F1857B'
  },
  {
    name: 'relative’s kid',
    color: '#FAD85A'
  },
  {
    name: 'colleague’s kid',
    color: '#A5DE80'
  },
  {
    name: 'schoolmate’s kid',
    color: '#BAE6F1'
  },
  {
    name: 'neighbour’s kid',
    color: '#C8ACD5'
  },
  {
    name: 'his/her friend',
    color: '#F79F77'
  },
];

Page({
  data: {
    nickName: '',
    tags: TAGS,
    category: '',
    categories: [
      {
        name: '亲戚家',
        color: '#'
      }
    ],
    fullName: '',
    gender: 1,
    birth: ''
  },
  // 事件处理函数
  
})
