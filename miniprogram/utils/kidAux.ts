import { HOST_CDN_IMAGE_UGC, HOST_CDN_IMAGE_SYS } from "../config/hosts";

export const genAvatarImg = (kid: KidWithImgInfo) => {
  let avatarImg = '';
  const {gender, profileImg} = kid || {};

  switch(true) {
    case !!profileImg:
      avatarImg = profileImg || '';
      break;
    case gender === 0:
      avatarImg = getGirlImg();
      break;
    case gender === 1:
    default:
      avatarImg = getBoyImg();
      break;
  }
  
  return avatarImg;
}

export const getGirlImg = () => `${HOST_CDN_IMAGE_UGC}/sys/girl.png`;
export const getBoyImg = () => `${HOST_CDN_IMAGE_UGC}/sys/boy.png`;