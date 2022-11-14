type Gender = 0 | 1; // 0 femail 1 mail

type KidBasic = {
  fullname: string,
  nickname: string,
  gender: Gender, 
  birthday: string,
}

type Kid = KidBasic & {
  id: string,
  builtinTagId?: number,
  parents?: string,
  remark?: string
}

type KidView = Kid & {
  _age?: string,
  _grade?: string,
  _color?: string
}

type Tag = {
  id: number,
  name: string,
  color: string
}


 