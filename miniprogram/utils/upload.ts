import { api, get } from "../api/network";
import { HOST_BUCKET_IMAGE_UGC } from "../config/hosts";

const BIZ = {
  Unknown: 0,
  Kid: 1
}

/*
@param img
@return 
*/
export const ossSign = (img: string) => {
  const bizCode = BIZ.Kid;
  const imgUrl = img || '';
  const index = imgUrl.lastIndexOf('.');
  const suffix = index > -1 ? imgUrl.substring(index) : 'none';
  
  const url = `${api.mediaSignature}?biz=${bizCode}&suffix=${suffix}`

  return new Promise((resolve, reject) => {
    get(url)
    .then((res: any) => {
      // accessId policy signature storage(bucket objectKey)
      // bucket: bb-mbb 
      // objectKey: kid/2022112103/48116169a3c0463cadafea6b8650ec5d.jpg(含路径的完整OSS对象名称)
      const {accessId, policy, signature, storage} = res || {};
      const {objectKey} = storage || {};
            
      const ossData = { 
        accessId,
        policy,
        signature,
        localFilePath: img, 
        ossFilePath: objectKey 
      };
      // console.log(ossData);
      resolve(ossData)
    })
    .catch(() => {
      reject('getSign fail')
    })
  })
}

export const ossUpload = ({ accessId, signature, policy, ossFilePath, localFilePath }: any) => {
  const host = HOST_BUCKET_IMAGE_UGC;
  const ossAccessKeyId = accessId;
  const key = ossFilePath;
  // const securityToken = '<x-oss-security-token>'; 
  
  const ossData = {
    url: host, // 开发者服务器的URL。
    filePath: localFilePath,
    name: 'file', // 必须填file。
    formData: {
      key,
      policy,
      OSSAccessKeyId: ossAccessKeyId,
      signature,
      // 'x-oss-security-token': securityToken // 使用STS签名时必传。
    }
  }
  console.log(ossData);

  return new Promise((resolve, reject) => {
    wx.uploadFile({
      ...ossData,
      success: (res) => {
        console.log(res);
        if (res.statusCode === 204) {
          console.log('上传成功');
          const cdnUrl = `${host}/${key}`
          resolve(cdnUrl);
        }
      },
      fail: err => {
        console.log(err);
        reject(err);
      }
    });
  })
}

export const chooseImage = () => {
  return new Promise((resolve, reject) => {
    wx.chooseMedia({
      count: 1,
      mediaType: ['image'],
      sourceType: ['album', 'camera'],
      camera: 'back',
      success(res) {
        resolve(res);
      },
      fail(res){
        reject(res)
      }
    })
  })
}