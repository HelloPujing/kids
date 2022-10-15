type Gender = 0 | 1; // 0 femail 1 mail

type KidBasic = {
  fullname: string,
  nickname: string,
  gender: Gender, 
  birth: string,
}

type Kid = KidBasic & {
  id: string,
  tagId?: string,
  category?: number,
  parents?: string,
  remark?: string
}

type KidView = Kid & {
  _age?: number,
  _color?: string
}

type Tag = {
  id: string,
  name: string,
  color: string
}


 