type Gender = 0 | 1; // 0 femail 1 mail

type KidBasic = {
  fullname: string,
  nickname: string,
  gender: Gender, 
  birth: string,
}

type Kid = KidBasic & {
  id: string,
  category?: number,
  parents?: string,
  remark?: string
}



 