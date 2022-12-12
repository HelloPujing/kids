// index.ts
// 获取应用实例
// Pupuu https://developers.weixin.qq.com/miniprogram/dev/framework/app-service/page.html

import { api, get, post, put } from "../../api/network";
import { genAvatarImg } from "../../utils/kidAux";
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
    genders: GENDERS,
    birthday: '2020-01-01',
    remark: '',
    profileImg: '',
    _avatar: '',
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
        _avatar: genAvatarImg(res),
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
      this.setData({_avatar: tempFilePath});
      return upload({ img: tempFilePath });
    })
    .then(() => {
      console.log('upload success')
    })
  },
  handleImgPreview: function() {
    wx.previewImage({ current: this.data._avatar, urls: [this.data._avatar] });
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
    const { _avatar } = this.data;
    const avatar = genAvatarImg({ gender, profileImg: this.data.profileImg });
    console.log(_avatar, avatar);
    this.setData({ 
      gender: Number(gender),
      ...(_avatar !== avatar ? {_avatar: avatar} : {})
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
    const {kidId, fullname, nickname, gender, birthday, remark, builtinTagId, _avatar } = this.data;

    // TODO tag
    const data = {
      fullname, nickname, gender, birthday: (new Date(birthday)).getTime(), remark,
      builtinTagId, profileImg: _avatar
    }

    const req = kidId? put(api.kids + `/${kidId}`, { data }) : post(api.kids, { data })
    req.then(res => {
      console.log('创建/修改成功', res);
      wx.navigateBack();
    })
  }
})
