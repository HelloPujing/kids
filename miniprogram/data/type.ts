type Gender = 0 | 1; // 0 femail 1 mail

type KidBasic = {
  fullName: string,
  nickName: string,
  gender: Gender, 
  birth: string,
}

type Kid = KidBasic & {
  id: string,
  category?: number,
  parents?: string,
  remark?: string
}



 