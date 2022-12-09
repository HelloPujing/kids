type Gender = 0 | 1; // 0 femail 1 mail

type KidBasic = {
  fullname: string,
  nickname: string,
  gender: Gender, 
  birthday: string,
}

type Kid = KidBasic & {
  id: string,
  profileImg?: string,
  builtinTagId?: number,
  parents?: string,
  remark?: string
}

type KidWithImgInfo = {
  profileImg?: string,
  gender?: number,
}

type KidView = Kid & {
  _age?: string,
  _grade?: string,
  _color?: string,
  _birthCount?: number, // -1, 0, num
  _avatar?: string, // 根据男女，或用户上传，生成头像链接
}

type Tag = {
  id: number,
  color: string,
  name?: string,
}


 