// index.ts
// 获取应用实例
// Pupuu https://developers.weixin.qq.com/miniprogram/dev/framework/app-service/page.html

import { api, get, post, put } from "../../api/network";
import { HOST_CDN_IMAGE_UGC } from "../../config/hosts";
import { genAvatarImg, getBoyImg, getGirlImg } from "../../utils/kidAux";
import { chooseImage, upload } from "../../utils/upload";

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
    profileImg: '',
    genders: GENDERS,
    genderImg: getGirlImg(),
    birthday: '2020-01-01',
    remark: '',
  },
  // 生命周期
  onLoad(options){
    const {kidId} = options;
    // console.log(kidId);
    !!kidId && get(`${api.kids}/${kidId}`)
    .then((res: any) => {
      const { id, profileImg, fullname, nickname, builtinTagId, gender, birthday, remark } = res;
      const birthDate = new Date(birthday);
      this.setData({
        kidId: id,
        theme: ((tags || []).find(tag => tag.id === builtinTagId) || {}).color || 'fff',
        ...(profileImg ? {profileImg} : {}),
        ...(gender ? {gender} : {}),
        genderImg: gender === 0 ? getGirlImg() : getBoyImg(),
        ...(nickname ? {nickname} : {}),
        ...(fullname ? {fullname} : {}),
        ...(builtinTagId? {builtinTagId} : {}),
        ...(birthday ? {birthday: `${birthDate.getFullYear()}-${birthDate.getMonth()+1}-${birthDate.getDate()}` } : {}),
        ...(remark ? {remark} : {})
      })
    })
  },

  onReady(){
  },

  // 事件处理函数
  handleCamera: function() {
    chooseImage()
    .then((res: any) => {
      const { tempFiles } = res;
      const [imgObj] = tempFiles || [];
      const { tempFilePath } = imgObj || {};
      this.setData({profileImg: tempFilePath});
      return upload({ img: tempFilePath });
    })
    .then(() => {
      console.log('upload success')
    })
  },
  handleImgPreview: function() {
    const img = this.data.profileImg || this.data.genderImg;
    wx.previewImage({ current: img, urls: [img] });
  },
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
    const gender = Number(e.detail.value);
    this.setData({ 
      gender: Number(gender),
      genderImg: gender === 0 ? getGirlImg() : getBoyImg()
    });
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
    const {kidId, fullname, nickname, gender, birthday, remark, builtinTagId, profileImg } = this.data;

    // TODO tag
    const data = {
      fullname, nickname, gender, birthday: (new Date(birthday)).getTime(), remark,
      builtinTagId, profileImg
    }

    const req = kidId? put(api.kids + `/${kidId}`, { data }) : post(api.kids, { data })
    req.then(res => {
      console.log('创建/修改成功', res);
      wx.navigateBack();
    })
  }
})
