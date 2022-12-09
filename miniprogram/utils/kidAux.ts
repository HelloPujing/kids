import { HOST_CDN_IMAGE_UGC, HOST_CDN_IMAGE_SYS } from "../config/hosts";

export const genAvatarImg = (kid: KidWithImgInfo) => {
  let avatarImg = '';
  const {gender, profileImg} = kid || {};

  switch(true) {
    case !!profileImg:
      avatarImg = `${HOST_CDN_IMAGE_UGC}/${profileImg}`;
      break;
    case gender === 0:
      avatarImg = `${HOST_CDN_IMAGE_SYS}/image-sys/girl.png`;
      break;
    case gender === 1:
    default:
      avatarImg = `${HOST_CDN_IMAGE_SYS}/image-sys/boy.png`;
      break;
  }
  
  return avatarImg;
}