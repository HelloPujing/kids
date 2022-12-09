const BIZ = {
  Unknown: 0,
  Kid: 1
}

const SUFFIX = {
  PNG: 'PNG',
  JPG: 'JPG',
  JPEG: 'JPEG'
}

export const upload = () => {
  const bizCode = BIZ.Kid;
  const suffix = SUFFIX.PNG;
  const url = `/api/media/signature?biz=${bizCode}&suffix=${suffix}`
  // success data: accessId policy signature storage(bucket objectKey)
  // bucket: bb-mbb
  // objectKey: kid/2022112103/48116169a3c0463cadafea6b8650ec5d.jpg(含路径的完整OSS对象名称)
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