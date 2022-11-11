import { api, del, get } from "../../api/network";
import { fmtKidList } from "./util";

// pages/list/list.ts
// let KIDS = require('../../data/kids');

Page({
  /**
   * 页面的初始数据
   */
  data: {
    kids: [],
    icon_girl: 'https://kid-book.oss-cn-hangzhou.aliyuncs.com/image-sys/girl.png',
    icon_boy: 'https://kid-book.oss-cn-hangzhou.aliyuncs.com/image-sys/boy.png'
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
    // todo 目前仅拉取100个
    this.getKidsList();
  },

  getKidsList() {
    get(api.kids, { data: { offset: 0, limit: 100 } })
    .then((res: any) => {
      const {data} = res || {};
      this.setData({ kids: fmtKidList(data) || [] })
      // console.log(res);
    })
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

  handleCode(){
    wx.login({
      success: res => {
        const code = res.code;
        wx.showModal({
          title: '我爱你',
          content: code,
          confirmText: '复制',
          success: () => {
            wx.setClipboardData({ data: code });
          }
        })
    }})
  },

  handleAdd(){
    wx.navigateTo({ url: '/pages/create/create' });
  },

  handleKidTap(e: any) {
    const { kidId } = e.currentTarget.dataset;
    wx.navigateTo({ url: `/pages/create/create?kidId=${kidId}` });
  },

  handleKidLongTap(e: any) {
    const getKidsList = this.getKidsList;
    const { kidId, kidName } = e.currentTarget.dataset || {}

    wx.showModal({
      content: `删除${kidName}？`,
      success() {
        del(`${api.kids}/${kidId}`)
        .then(() => getKidsList());
      }
    })
  }
})