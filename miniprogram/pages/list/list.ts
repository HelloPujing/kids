import { fmtKidList } from "./util";

// pages/list/list.ts
let { calcAge } = require("./util")

let KIDS = require('../../data/kids');

Page({
  /**
   * 页面的初始数据
   */
  data: {
    kids: KIDS,
    icon_girl: 'https://bb-mbb.oss-cn-hangzhou.aliyuncs.com/tmp/girl.png',
    icon_boy: 'https://bb-mbb.oss-cn-hangzhou.aliyuncs.com/tmp/boy.png'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    // add kid
    const app = getApp();
    const kid = app.globalData.tempKid;
    const kids = !!kid ? [kid, ...this.data.kids] : this.data.kids;

    // format kids
    const fmtKids = fmtKidList(kids);

    this.setData({
      kids: fmtKids
    }, () => {
      const app = getApp();
      app.globalData.tempKid = undefined;
    });
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {
    return {
      title: '记录身边好朋友的孩子信息吧',
      path: '/pages/list?id=test'
    }
  },

  handleAdd: function(){
    wx.navigateTo({ url: '/pages/create/create' });
  }
})